import React, { useState } from 'react';
import './Login.css';
import { User, Lock, Eye, EyeOff, ArrowRight, ShieldAlert, Activity, BarChart2 } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [playerId, setPlayerId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  // 🛑 1. Naya state add karein
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // ID sirf numbers mein honi chahiye
    if (!/^\d+$/.test(playerId)) {
      setErrorMsg('PLAYER ID MUST CONTAIN ONLY NUMBERS/DIGITS!');
      return;
    }

    if (isSignUp) {
      // 📝 SIGN UP LOGIC
      if (!playerId || !password || !playerName) {
        setErrorMsg('PLEASE FILL IN ALL CREDENTIALS & HUNTER NAME!');
        return;
      }
      localStorage.setItem('solo_player_id', playerId);
      localStorage.setItem('solo_password', password);
      localStorage.setItem('solo_player_name', playerName); // 🛑 Naam save ho gaya
      
      setSuccessMsg('AWAKENING SUCCESSFUL! NOW LOGIN TO SYSTEM.');
      setTimeout(() => {
        setIsSignUp(false);
        setSuccessMsg('');
        setPassword('');
      }, 1500);

    } else {
      // 🔐 LOGIN LOGIC
      const savedId = localStorage.getItem('solo_player_id');
      const savedPass = localStorage.getItem('solo_password');

      if (!savedId) {
        // First time auto-login setup
        localStorage.setItem('solo_player_id', playerId);
        localStorage.setItem('solo_password', password);
        localStorage.setItem('solo_player_name', playerName || 'Hunter');
        localStorage.setItem('is_logged_in', 'true'); 
        localStorage.setItem('player_id', playerId); 
        if (onLogin) onLogin();
        return;
      }

      if (playerId === savedId && password === savedPass) {
        localStorage.setItem('is_logged_in', 'true');
        localStorage.setItem('player_id', playerId);
        
        // Agar pehle se naam saved nahi tha to default rakh lein
        if(!localStorage.getItem('solo_player_name')) {
          localStorage.setItem('solo_player_name', 'Hunter');
        }

        if (onLogin) onLogin();
      } else {
        setErrorMsg('INVALID PLAYER ID OR PASSWORD!');
      }
    }
  };

  return (
    <div className="login-wrapper">
      {/* Top Header */}
      <header className="login-header">
        <div className="system-brand">
            <div className="system-logo">✧</div>
            <span>SOLO LEVELING SYSTEM</span>
        </div>
        <div className="system-status">
            <span>SYSTEM STATUS</span>
            <span className="status-dot"></span>
            <strong>ONLINE</strong>
        </div>
      </header>

      {/* Vertical Texts */}
      <div className="vertical-text left-text">나 혼 자 만 레 벨 업</div>
      <div className="vertical-text right-text">
        {"THE SYSTEM CHOOSES ONLY ONE".replace(/ /g, '\u00A0\u00A0')}
      </div>

      {/* Main Login/Signup Box */}
      <main className="login-main">
        <div className="login-glass-box">
          
          <div className="system-header-main">
            <span className="welcome">{isSignUp ? "NEW PLAYER AWAKENING" : "WELCOME, PLAYER"}</span>
            <h1>SOLO LEVELING</h1>
            <div className="system-title">
                <span></span>
                SYSTEM
                <span></span>
            </div>
          </div>

          <div className="login-form-container">
            <div className="form-divider">
              <span className="diamond"></span> {isSignUp ? "PLAYER REGISTRATION" : "PLAYER LOGIN"} <span className="diamond"></span>
            </div>

            {/* Error & Success Alerts */}
            {errorMsg && <div style={{ color: '#ef4444', textAlign: 'center', marginBottom: '15px', fontSize: '11px', fontFamily: 'Orbitron', letterSpacing: '1px', textShadow: '0 0 8px #ef4444' }}>{errorMsg}</div>}
            {successMsg && <div style={{ color: '#00ff88', textAlign: 'center', marginBottom: '15px', fontSize: '11px', fontFamily: 'Orbitron', letterSpacing: '1px', textShadow: '0 0 8px #00ff88' }}>{successMsg}</div>}

            <form onSubmit={handleSubmit}>
              
              {/* 🛑 HUNTER NAME (Sirf Signup par show hoga aur aapki hi CSS classes use karega) */}
              {isSignUp && (
                <div className="input-group">
                  <label>HUNTER NAME</label>
                  <div className="input-box">
                    <User />
                    <input 
                      type="text" 
                      placeholder="Enter your Hunter Name" 
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      required={isSignUp} 
                    />
                  </div>
                </div>
              )}

              <div className="input-group">
                <label>PLAYER ID</label>
                <div className="input-box">
                  <User />
                  <input 
                    type="text" 
                    placeholder="Enter your Player ID" 
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="input-group">
                <label>PASSWORD</label>
                <div className="input-box">
                  <Lock />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder={isSignUp ? "Create your Password" : "Enter your Password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                  <button 
                    type="button" 
                    className="eye-btn" 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="system-login">
                <span>{isSignUp ? "REGISTER TO SYSTEM" : "LOGIN TO SYSTEM"}</span>
                <ArrowRight />
              </button>
              
              {/* Toggle between Login and Sign Up */}
              <div className="forgot-password" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span className="diamond-micro"></span> 
                  <span style={{ color: '#64748b', fontSize: '11px', fontFamily: 'Orbitron' }}>
                    {isSignUp ? "Already registered?" : "New hunter?"}
                  </span>
                  <button 
                    type="button" 
                    onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(''); setSuccessMsg(''); }}
                    style={{ background: 'none', border: 'none', color: '#6d7cff', cursor: 'pointer', fontFamily: 'Orbitron', fontSize: '11px', textDecoration: 'underline', letterSpacing: '1px' }}
                  >
                    {isSignUp ? "Login here" : "Sign Up"}
                  </button>
                  <span className="diamond-micro"></span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Bottom Footer Panels */}
      <footer className="login-footer">
        <div className="footer-panel">
          <div className="panel-icon"><ShieldAlert size={28} /></div>
          <div className="panel-text">
            <h4>SYSTEM NOTICE</h4>
            <p>Ensure your credentials are correct<br/>to access the system.</p>
          </div>
        </div>
        <div className="footer-panel">
          <div className="panel-icon"><Activity size={28} /></div>
          <div className="panel-text">
            <h4>SECURITY PROTOCOL</h4>
            <p>All data is encrypted<br/>and secured.</p>
          </div>
        </div>
        <div className="footer-panel">
          <div className="panel-icon"><BarChart2 size={28} /></div>
          <div className="panel-text">
            <h4>VERSION</h4>
            <p>V 1.0.0<br/>Build 2026.08.18</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
