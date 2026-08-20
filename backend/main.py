from fastapi import FastAPI, Depends
from sqlalchemy import create_engine, Column, Integer, String, JSON
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import random
from datetime import date, datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

# ================= DATABASE SETUP =================
# 🎯 SUPABASE (PostgreSQL) CLOUD DATABASE CONNECTION
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")


# PostgreSQL mein 'check_same_thread' ki zaroorat nahi hoti
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# اب ہم receiver_email فنکشن کے اندر پاس کریں گے
def send_system_email(receiver_email: str, subject: str, body: str):
    # یہ دونوں چیزیں اب ہم .env فائل سے محفوظ طریقے سے اٹھائیں گے
    sender_email = os.getenv("SENDER_EMAIL") 
    sender_password = os.getenv("EMAIL_PASSWORD") 
    
    try:
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = receiver_email  # <--- اب یہ ڈائنیمک ہو گیا ہے!
        msg['Subject'] = subject
        
        # HTML بھیجنے کے لیے 'html' کر دیا ہے تاکہ خوبصورت ای میل جائے
        msg.attach(MIMEText(body, 'html'))
        
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, receiver_email, msg.as_string())
        server.quit()
        print(f"✅ System Alert sent successfully to {receiver_email}")
        
    except Exception as e:
        print(f"❌ Email failed: {e}")

# ================= QUEST POOLS =================

MASTER_DISCIPLINE_POOL = [
    {"title": "Fajr & Spiritual Start", "description": "Offer Fajr Prayer and Recite Holy Quran", "maxProgress": 1, "unit": "session", "xpReward": 8, "goldReward": 25, "icon": "book"},
    {"title": "Physical Awakening", "description": "Complete 100 Push-ups with proper form", "maxProgress": 100, "unit": "reps", "xpReward": 3, "goldReward": 15, "icon": "dumbbell"},
    {"title": "Hydration Discipline", "description": "Drink at least 12 Glasses of Water", "maxProgress": 12, "unit": "glasses", "xpReward": 5, "goldReward": 10, "icon": "drop"},
    {"title": "Deep Focus Study Routine", "description": "Academic studies & deep focus learning session", "maxProgress": 120, "unit": "min", "xpReward": 9, "goldReward": 20, "icon": "pages"},
    {"title": "Iron Will Gym", "description": "Intense Gym Workout & Muscle Training", "maxProgress": 1, "unit": "session", "xpReward": 10, "goldReward": 22, "icon": "dumbbell"},
    {"title": "Cardio Endurance", "description": "Running, Jogging or Fast Walking", "maxProgress": 30, "unit": "min", "xpReward": 6, "goldReward": 15, "icon": "run"},
    {"title": "Knowledge Absorption", "description": "Read Book or Educational Documentation", "maxProgress": 20, "unit": "pages", "xpReward": 4, "goldReward": 10, "icon": "book"},
    {"title": "Strategic Thinking & Logic", "description": "Study complex problem solving or strategic concepts", "maxProgress": 1, "unit": "session", "xpReward": 8, "goldReward": 20, "icon": "pages"},
    {"title": "Practical Skill Training", "description": "Work on hands-on tools or practical projects", "maxProgress": 1, "unit": "session", "xpReward": 8, "goldReward": 20, "icon": "pages"},
    {"title": "Dhuhr Prayer", "description": "Offer Dhuhr Prayer on time", "maxProgress": 1, "unit": "session", "xpReward": 5, "goldReward": 12, "icon": "meditate"},
    {"title": "Asr Prayer", "description": "Offer Asr Prayer on time", "maxProgress": 1, "unit": "session", "xpReward": 5, "goldReward": 12, "icon": "run"},
    {"title": "Maghrib Prayer", "description": "Offer Maghrib Prayer on time", "maxProgress": 1, "unit": "session", "xpReward": 5, "goldReward": 12, "icon": "meditate"},
    {"title": "Isha Prayer", "description": "Offer Isha Prayer and Quran reflection", "maxProgress": 1, "unit": "session", "xpReward": 6, "goldReward": 15, "icon": "meditate"},
    {"title": "Analytical Problem Solving", "description": "Solve logic or puzzle challenges", "maxProgress": 2, "unit": "problems", "xpReward": 9, "goldReward": 18, "icon": "pages"},
    {"title": "Client & Network Outreach", "description": "Send proposals or communicate with professional contacts", "maxProgress": 3, "unit": "clients", "xpReward": 8, "goldReward": 22, "icon": "book"},
    {"title": "Workflow Automation Strategy", "description": "Optimize personal workflow or system scripts", "maxProgress": 1, "unit": "feature", "xpReward": 9, "goldReward": 20, "icon": "pages"},
    {"title": "Information Structuring", "description": "Design or organize database and record systems", "maxProgress": 1, "unit": "session", "xpReward": 8, "goldReward": 18, "icon": "pages"},
    {"title": "Workspace Cleansing", "description": "Organize physical desk and clean up digital files", "maxProgress": 1, "unit": "session", "xpReward": 3, "goldReward": 8, "icon": "drop"},
    {"title": "Absolute Diet Control", "description": "Zero junk food and zero refined sugar today", "maxProgress": 1, "unit": "day", "xpReward": 7, "goldReward": 15, "icon": "meditate"},
    {"title": "Professional Branding", "description": "Update LinkedIn, Portfolio, or CV/Resume", "maxProgress": 1, "unit": "session", "xpReward": 6, "goldReward": 14, "icon": "book"},
    {"title": "Cold Shower Endurance", "description": "Take a cold shower to build mental resilience", "maxProgress": 1, "unit": "session", "xpReward": 7, "goldReward": 12, "icon": "drop"},
    {"title": "Core Strengthening", "description": "Perform Planks and core exercises", "maxProgress": 3, "unit": "sets", "xpReward": 4, "goldReward": 10, "icon": "dumbbell"},
    {"title": "Deep Work Pomodoro", "description": "Complete a 90-minute focused study sprint", "maxProgress": 90, "unit": "min", "xpReward": 9, "goldReward": 20, "icon": "pages"},
    {"title": "System & Process Refinement", "description": "Clean up and optimize personal workflow tasks", "maxProgress": 1, "unit": "session", "xpReward": 7, "goldReward": 15, "icon": "pages"},
    {"title": "External Resource Integration", "description": "Integrate and test new tools or modules", "maxProgress": 1, "unit": "session", "xpReward": 8, "goldReward": 18, "icon": "pages"},
    {"title": "Advanced Practical Lab", "description": "Test analytical or research models", "maxProgress": 1, "unit": "session", "xpReward": 9, "goldReward": 20, "icon": "pages"},
    {"title": "Structural Planning & Design", "description": "Build and document new project structures", "maxProgress": 1, "unit": "session", "xpReward": 8, "goldReward": 18, "icon": "pages"},
    {"title": "UI/UX & Presentation Polish", "description": "Improve visual styling and presentation layout", "maxProgress": 1, "unit": "session", "xpReward": 6, "goldReward": 15, "icon": "pages"},
    {"title": "Stretching & Mobility", "description": "Morning or evening full body stretching routine", "maxProgress": 15, "unit": "min", "xpReward": 3, "goldReward": 10, "icon": "run"},
    {"title": "Digital Detox Hour", "description": "Stay completely off social media for 1 hour", "maxProgress": 60, "unit": "min", "xpReward": 5, "goldReward": 12, "icon": "meditate"},
    {"title": "Progress Commitment", "description": "Push meaningful progress and update records", "maxProgress": 1, "unit": "commit", "xpReward": 4, "goldReward": 10, "icon": "pages"}
]

WEEKLY_QUESTS_POOL = [
    {"title": "Monarch's Crucible", "description": "Complete 25 Daily Tasks this week with absolute discipline.", "maxProgress": 25, "xpReward": 20, "goldReward": 50, "icon": "⚔️", "color": "#8b5cf6"},
    {"title": "Iron Titan Protocol", "description": "Complete 30 Gym & Fitness Tasks in 7 days.", "maxProgress": 30, "xpReward": 18, "goldReward": 45, "icon": "🛡️", "color": "#ef4444"},
    {"title": "Mastery Sprint", "description": "Execute 20 Study or Skill Development Tasks this week.", "maxProgress": 20, "xpReward": 19, "goldReward": 48, "icon": "💻", "color": "#3b82f6"},
    {"title": "The Professional's Empire", "description": "Send 15 client proposals or complete major project milestones.", "maxProgress": 15, "xpReward": 20, "goldReward": 50, "icon": "💰", "color": "#fbbf24"},
    {"title": "Spiritual Fortress", "description": "Maintain all daily prayers and Quran recitation for 7 straight days.", "maxProgress": 7, "xpReward": 17, "goldReward": 35, "icon": "🕌", "color": "#10b981"},
    {"title": "Master Architect", "description": "Build, test, and deploy 1 complete project module.", "maxProgress": 1, "xpReward": 20, "goldReward": 50, "icon": "🏗️", "color": "#06b6d4"},
    {"title": "Endurance Marathon", "description": "Accumulate 20km of running or intense cardio this week.", "maxProgress": 20, "xpReward": 16, "goldReward": 30, "icon": "🏃", "color": "#f97316"},
    {"title": "Library of the Monarch", "description": "Read 100 pages of advanced educational books or notes.", "maxProgress": 100, "xpReward": 15, "goldReward": 25, "icon": "📚", "color": "#8b5cf6"},
    {"title": "Advanced Mastery Training", "description": "Train and optimize 2 complex skill concepts.", "maxProgress": 2, "xpReward": 20, "goldReward": 45, "icon": "🤖", "color": "#ec4899"},
    {"title": "Flawless Hunter Week", "description": "Achieve a perfect 7-day streak without entering the Penalty Zone.", "maxProgress": 7, "xpReward": 20, "goldReward": 50, "icon": "👑", "color": "#fbbf24"},
    {"title": "Equipment & Gear Mastery", "description": "Complete 5 precision setup or tool-integration tasks.", "maxProgress": 5, "xpReward": 18, "goldReward": 40, "icon": "🔌", "color": "#3b82f6"},
    {"title": "Absolute Domination", "description": "Complete 30 total tasks across all categories this week.", "maxProgress": 30, "xpReward": 20, "goldReward": 50, "icon": "⚡", "color": "#ef4444"}
]

MAIN_QUESTS_POOL = [
    {"title": "System Calibration", "description": "Complete 4 Tasks today to calibrate the System.", "maxProgress": 4, "xpReward": 100, "goldReward": 100, "icon": "⚙️", "color": "#fbbf24"},
    {"title": "Strength of a Hunter", "description": "Complete 2 Physical Tasks today.", "maxProgress": 2, "xpReward": 100, "goldReward": 100, "icon": "🏋️", "color": "#22c55e"},
    {"title": "Deep Focus State", "description": "Complete 3 Study or Skill Tasks today.", "maxProgress": 3, "xpReward": 100, "goldReward": 100, "icon": "🧠", "color": "#06b6d4"},
    {"title": "Shadow Army Prep", "description": "Finish 5 total Tasks today for maximum yield.", "maxProgress": 5, "xpReward": 100, "goldReward": 100, "icon": "🌑", "color": "#8b5cf6"},
    {"title": "The Professional's Bread", "description": "Reply to clients or finish a professional milestone today.", "maxProgress": 1, "xpReward": 100, "goldReward": 100, "icon": "💼", "color": "#3b82f6"},
    {"title": "Strategic Supremacy", "description": "Solve 2 complex logic or planning problems today.", "maxProgress": 2, "xpReward": 100, "goldReward": 100, "icon": "🧩", "color": "#ec4899"},
    {"title": "Equipment Integration", "description": "Test and set up one tool or equipment piece today.", "maxProgress": 1, "xpReward": 100, "goldReward": 100, "icon": "🔌", "color": "#f97316"},
    {"title": "Absolute Vitality", "description": "Drink 12 glasses of water and maintain peak health.", "maxProgress": 2, "xpReward": 100, "goldReward": 100, "icon": "❤️", "color": "#ef4444"},
    {"title": "Scholar's Path", "description": "Complete pending university or self-study assignments today.", "maxProgress": 1, "xpReward": 100, "goldReward": 100, "icon": "🎓", "color": "#8b5cf6"},
    {"title": "Ultimate Discipline", "description": "Complete ALL daily tasks without skipping today.", "maxProgress": 1, "xpReward": 100, "goldReward": 100, "icon": "🔥", "color": "#fbbf24"}
]

EVENT_QUESTS_POOL = [
    {"title": "Client Outreach", "description": "Complete 2 tasks related to client outreach or portfolio.", "maxProgress": 2, "xpReward": 45, "goldReward": 25, "icon": "📧", "color": "#ec4899"},
    {"title": "Obstacle Extermination", "description": "Complete 3 tasks to debug and optimize workflow.", "maxProgress": 3, "xpReward": 40, "goldReward": 22, "icon": "🐛", "color": "#f97316"},
    {"title": "Rest & Recovery", "description": "Complete 2 easy tasks and focus on health today.", "maxProgress": 2, "xpReward": 20, "goldReward": 15, "icon": "🧘", "color": "#10b981"},
    {"title": "Double XP Event", "description": "Complete 6 Tasks today for a massive reward.", "maxProgress": 6, "xpReward": 50, "goldReward": 25, "icon": "⚡", "color": "#fbbf24"},
    {"title": "Competition Preparation", "description": "Prepare logic, slides, or prototypes for a competition.", "maxProgress": 1, "xpReward": 45, "goldReward": 24, "icon": "🏆", "color": "#3b82f6"},
    {"title": "Automation Deployment", "description": "Successfully run or test your automation routine without errors.", "maxProgress": 1, "xpReward": 40, "goldReward": 20, "icon": "🎙️", "color": "#8b5cf6"},
    {"title": "Exhibition Showcase", "description": "Work on a physical model or presentation for an event.", "maxProgress": 1, "xpReward": 50, "goldReward": 25, "icon": "🚀", "color": "#ef4444"},
    {"title": "Cheat Meal Amnesty", "description": "Enjoy one cheat meal completely guilt-free today.", "maxProgress": 1, "xpReward": 10, "goldReward": 15, "icon": "🍔", "color": "#f59e0b"},
    {"title": "System Maintenance", "description": "Organize old messy records or optimize a workflow system.", "maxProgress": 1, "xpReward": 35, "goldReward": 18, "icon": "🛠️", "color": "#64748b"},
    {"title": "Sudden Dungeon Break", "description": "An emergency task appeared! Complete 2 hours of deep work.", "maxProgress": 2, "xpReward": 50, "goldReward": 25, "icon": "🌀", "color": "#9333ea"}
]

def get_new_daily_tasks(count=4):
    selected = random.sample(MASTER_DISCIPLINE_POOL, min(count, len(MASTER_DISCIPLINE_POOL)))
    tasks = []
    for i, t in enumerate(selected):
        tasks.append({
            "id": i + 1, "title": t["title"], "description": t["description"], "currentProgress": 0, 
            "maxProgress": t["maxProgress"], "unit": t["unit"], "xpReward": t["xpReward"], 
            "goldReward": t["goldReward"], "icon": t["icon"], "isComplete": False
        })
    return tasks

def generate_category_quests(category, count):
    pool = []
    if category == "WEEKLY": pool = WEEKLY_QUESTS_POOL
    elif category == "MAIN": pool = MAIN_QUESTS_POOL
    elif category == "EVENT": pool = EVENT_QUESTS_POOL
    
    selected = random.sample(pool, min(count, len(pool)))
    quests = []
    for i, q in enumerate(selected):
        quests.append({
            "id": f"{category}_{random.randint(1000, 9999)}_{i}",
            "category": category,
            "title": q["title"],
            "description": q["description"],
            "progress": 0,
            "maxProgress": q["maxProgress"],
            "xpReward": q["xpReward"],
            "goldReward": q["goldReward"],
            "icon": q["icon"],
            "color": q["color"],
            "isClaimed": False
        })
    return quests

def calculate_rank(level):
    if level < 15: return "E", "D"
    elif level < 30: return "D", "C"
    elif level < 50: return "C", "B"
    elif level < 75: return "B", "A"
    elif level < 100: return "A", "S"
    else: return "S", "MAX"

class PlayerDB(Base):
    __tablename__ = "player"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=True)
    name = Column(String, default="SUNG JINWOO")
    name_changes_left = Column(Integer, default=3) 
    title = Column(String, default="The Disciplined")
    level = Column(Integer, default=1)
    current_xp = Column(Integer, default=0)
    required_xp = Column(Integer, default=500)
    rank = Column(String, default="E")
    gold = Column(Integer, default=0) 
    inventory = Column(JSON, default=json.dumps([])) 
    available_ap = Column(Integer, default=0)
    streak_days = Column(Integer, default=0)
    last_active_date = Column(String, default=str(date.today()))
    penalty_active = Column(Integer, default=0)
    penalty_progress = Column(Integer, default=0)
    email_sent_today = Column(Integer, default=0)
    stats = Column(JSON, default=json.dumps({"strength": 10, "agility": 10, "vitality": 10, "intelligence": 10, "perception": 10}))
    daily_tasks = Column(JSON, default=json.dumps(get_new_daily_tasks(7)))
    center_quests = Column(JSON, default=json.dumps([]))

Base.metadata.create_all(bind=engine)
app = FastAPI(title="Solo Leveling System API")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@app.on_event("startup")
def startup_event():
    db = SessionLocal()
    if not db.query(PlayerDB).first():
        db.add(PlayerDB())
        db.commit()
    db.close()

class PlayerUpdatePayload(BaseModel):
    name: str
    nameChangesLeft: int
    level: int
    currentXP: int
    requiredXP: int
    gold: int 
    inventory: list
    availableAP: int
    streakDays: int
    penaltyActive: int
    penaltyProgress: int
    stats: dict
    dailyTasks: list
    centerQuests: list

@app.get("/api/player/{player_id}")
def get_player_stats(player_id: int, name: str = "Hunter", db: Session = Depends(get_db)):
    player = db.query(PlayerDB).filter(PlayerDB.id == player_id).first()
    today_str = str(date.today())
    
    # 🎯 1. NAYA HUNTER AUTO-CREATE LOGIC (WITH ALL FIELDS)
    if not player:
        new_player = PlayerDB(
            id=player_id,
            name=name,
            name_changes_left=1,        # 🛑 Missing tha, add kar diya
            title="The Awakened",
            level=1,
            current_xp=0,
            required_xp=500,
            gold=0,
            rank="E-Rank",              # 🛑 Missing tha
            penalty_active=0,
            penalty_progress=0,
            streak_days=0,
            available_ap=0,
            email_sent_today=0,         # 🛑 Missing tha
            last_active_date=today_str, # 🛑 Sab se zaroori! Iske bina system crash ho raha tha
            stats=json.dumps({"strength": 10, "agility": 10, "vitality": 10, "intelligence": 10, "perception": 10}),
            inventory=json.dumps([]),
            daily_tasks=json.dumps([]),
            center_quests=json.dumps([])
        )
        db.add(new_player)
        db.commit()
        db.refresh(new_player)
        player = new_player

    # 🎯 2. JSON SAFE PARSING
    tasks_list = json.loads(player.daily_tasks) if isinstance(player.daily_tasks, str) else (player.daily_tasks or [])
    quests_list = json.loads(player.center_quests) if isinstance(player.center_quests, str) else (player.center_quests or [])
    stats_dict = json.loads(player.stats) if isinstance(player.stats, str) else (player.stats or {})
    inventory_list = json.loads(player.inventory) if isinstance(player.inventory, str) else (player.inventory or [])

    # 🎯 3. IF QUESTS ARE EMPTY (First Time Startup)
    if not quests_list:
        new_quests = []
        new_quests.extend(generate_category_quests("WEEKLY", 1))
        new_quests.extend(generate_category_quests("MAIN", 2))
        new_quests.extend(generate_category_quests("EVENT", 1))
        player.center_quests = json.dumps(new_quests)
        quests_list = new_quests
        db.commit()
        
    # 🎯 4. IF TASKS ARE EMPTY (First Time Startup)
    if not tasks_list:
        tasks_list = get_new_daily_tasks(4)
        for idx, task in enumerate(tasks_list):
            task['id'] = idx + 1
        player.daily_tasks = json.dumps(tasks_list)
        db.commit()

    # 🎯 5. DAILY/WEEKLY RESET LOGIC
    if player.last_active_date != today_str:
        last_date = datetime.strptime(player.last_active_date, "%Y-%m-%d").date()
        today_date = date.today()
        is_weekly_reset = last_date.isocalendar()[1] != today_date.isocalendar()[1] or (today_date - last_date).days >= 7

        completed_count = sum(1 for t in tasks_list if t.get('isComplete', False))
        if completed_count >= 4:
            player.streak_days += 1
            player.penalty_active = 0
            player.penalty_progress = 0
        else:
            player.streak_days = 0
            player.penalty_active = 1
            player.penalty_progress = 0
            # send_system_email("⚠️ SYSTEM ALERT: Penalty Zone Activated!", "Complete your survival tasks!")
            
        uncompleted_tasks = [t for t in tasks_list if not t.get('isComplete', False)]
        new_random_tasks = get_new_daily_tasks(4)
        combined_tasks = uncompleted_tasks + new_random_tasks
        for idx, task in enumerate(combined_tasks):
            task['id'] = idx + 1
        player.daily_tasks = json.dumps(combined_tasks)
        tasks_list = combined_tasks

        old_quests = quests_list
        new_quests = []
        
        if is_weekly_reset:
            new_quests.extend(generate_category_quests("WEEKLY", 1))
        else:
            new_quests.extend([q for q in old_quests if q.get('category') == 'WEEKLY'])
            
        new_quests.extend(generate_category_quests("MAIN", 2))
        new_quests.extend(generate_category_quests("EVENT", 1))

        player.center_quests = json.dumps(new_quests)
        quests_list = new_quests
        player.last_active_date = today_str
        player.email_sent_today = 0
        db.commit()

    current_rank, next_rank = calculate_rank(player.level)
    player.rank = current_rank
    db.commit()

    return {
        "id": player.id,
        "name": player.name, "nameChangesLeft": player.name_changes_left, 
        "title": player.title, "level": player.level,
        "currentXP": player.current_xp, "requiredXP": player.required_xp,
        "gold": player.gold, "inventory": inventory_list,
        "rank": player.rank, "availableAP": player.available_ap,
        "streakDays": player.streak_days, "penaltyActive": player.penalty_active, 
        "penaltyProgress": player.penalty_progress,
        "stats": stats_dict, "dailyTasks": tasks_list, "centerQuests": quests_list
    }


@app.put("/api/player/update/{player_id}")
def update_player_stats(player_id: int, data: PlayerUpdatePayload, db: Session = Depends(get_db)):
    # 🛑 Yahan bhi filter lagaya hai taake sirf active user ka data hi update ho
    player = db.query(PlayerDB).filter(PlayerDB.id == player_id).first()
    
    if player:
        player.name = data.name
        player.name_changes_left = data.nameChangesLeft
        player.level = data.level
        player.current_xp = data.currentXP
        player.required_xp = data.requiredXP
        player.gold = data.gold 
        player.inventory = json.dumps(data.inventory)
        player.available_ap = data.availableAP
        player.streak_days = data.streakDays
        player.penalty_active = data.penaltyActive
        player.penalty_progress = data.penaltyProgress
        player.stats = json.dumps(data.stats)
        player.daily_tasks = json.dumps(data.dailyTasks)
        player.center_quests = json.dumps(data.centerQuests)
        
        all_done = all(t.get('isComplete', False) for t in data.dailyTasks)
        if all_done and player.email_sent_today == 0 and len(data.dailyTasks) > 0:
            player.email_sent_today = 1
            
            # 🛑 یہاں ہم نے ڈیزائن اور 3 چیزیں (ای میل، ٹائٹل، میسج) پوری کر دیں 🛑
            email_subject = "🏆 CONGRATULATIONS: Daily Quests Cleared!"
            email_body = """
            <div style="background-color: #0a0f1a; color: #58a6ff; padding: 25px; border: 1px solid #00ff00; border-radius: 8px;">
                <h2 style="color: #00ff00; text-align: center;">STATUS: CLEARED</h2>
                <hr style="border-color: #00ff00;">
                <p>Hunter, you have successfully completed all your daily tasks!</p>
                <p>The System acknowledges your growth.</p>
                <br>
                <p style="color: #00ff00; font-weight: bold;">[ SYSTEM ADMIN ]</p>
            </div>
            """
            
            send_system_email(player.email, email_subject, email_body)

        current_rank, _ = calculate_rank(data.level)
        player.rank = current_rank
        db.commit()
        return {"message": "System Synced!"}
        
    return {"error": "Player not found"}
from pydantic import BaseModel

# 1. یہ ماڈل فرنٹ اینڈ سے یوزر کا نام اور ای میل پکڑے گا
class PlayerCreate(BaseModel):
    name: str
    email: str

# 2. یہ وہ فنکشن ہے جو فرنٹ اینڈ کال کرے گا اور ای میل جائے گی
@app.post("/api/player/signup")
async def trigger_awakening_email(player: PlayerCreate):
    
    email_subject = "AWAKENING COMPLETE: Welcome to the System"
    
    # سولو لیولنگ تھیم والی زبردست HTML ای میل
    email_body = f"""
    <div style="background-color: #0a0f1a; color: #58a6ff; padding: 25px; font-family: 'Courier New', Courier, monospace; border: 1px solid #1f6feb; border-radius: 8px;">
        <h2 style="text-align: center; text-transform: uppercase; letter-spacing: 2px;">System Notification</h2>
        <hr style="border-color: #1f6feb;">
        <h3>Welcome Hunter <b style="color: white;">{player.name}</b>!</h3>
        <p>Your awakening is successful. The System is now ONLINE.</p>
        <p>Prepare yourself. Complete your daily quests to level up. Failure to do so will result in penalty zones.</p>
        <br>
        <p style="color: #ff4444; font-weight: bold;">[ SYSTEM ADMIN ]</p>
    </div>
    """
    
    # آپ کے بنائے ہوئے ای میل فنکشن کو یہاں چلایا جائے گا
    send_system_email(player.email, email_subject, email_body)
    
    return {"message": "Awakening email sent successfully!"}

class DailyQuestComplete(BaseModel):
    name: str
    email: str

@app.post("/api/quest/daily-complete")
async def daily_quest_cleared_email(player: DailyQuestComplete):
    email_subject = "✅ DAILY QUEST CLEARED: The System is Satisfied"
    
    email_body = f"""
    <div style="background-color: #0a0f1a; color: #58a6ff; padding: 25px; border: 1px solid #00ff00; border-radius: 8px;">
        <h2 style="color: #00ff00; text-align: center;">STATUS: RECOVERED</h2>
        <hr style="border-color: #00ff00;">
        <p>Hunter <b>{player.name}</b>,</p>
        <p>You have successfully completed <b>ALL</b> your Daily Quests.</p>
        <p>The System acknowledges your effort. Your rewards have been added to your inventory.</p>
        <br>
        <p style="color: #00ff00; font-weight: bold;">[ SYSTEM ADMIN ]</p>
    </div>
    """
    send_system_email(player.email, email_subject, email_body)
    return {"message": "Daily Quest completion email sent!"}

class PenaltyActiveEmail(BaseModel):
    name: str
    email: str

@app.post("/api/system/penalty-active")
async def penalty_activated_email(player: PenaltyActiveEmail):
    email_subject = "🛑 SYSTEM ALERT: PENALTY ZONE ACTIVATED"
    
    email_body = f"""
    <div style="background-color: #1a0a0a; color: #ff4444; padding: 25px; border: 1px solid #ff0000; border-radius: 8px; font-family: 'Courier New', Courier, monospace;">
        <h2 style="color: #ff0000; text-align: center; text-transform: uppercase;">Penalty Initiated</h2>
        <hr style="border-color: #ff0000;">
        <p>Hunter <b style="color: white;">{player.name}</b>,</p>
        <p>You failed to complete your Daily Quests in time.</p>
        <p>You have been forcefully teleported to the <b>Penalty Zone</b>.</p>
        <p style="color: yellow;">Objective: Survive for the required duration.</p>
        <br>
        <p style="font-weight: bold; font-size: 18px;">[ SURVIVE. ]</p>
    </div>
    """
    send_system_email(player.email, email_subject, email_body)
    return {"message": "Penalty active email sent!"}
