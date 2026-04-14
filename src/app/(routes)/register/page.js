'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function RegisterLogin() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate auth action, usually integrating with NextAuth or a custom JWT endpoint.
    alert(`${isLogin ? 'Login' : 'Registration'} submitted successfully! Redirecting...`);
    window.location.href = '/';
  };

  return (
    <div className="container" style={{ paddingTop: '150px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel" 
        style={{ padding: '50px', maxWidth: '500px', width: '100%' }}
      >
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center' }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p style={{ textAlign: 'center', color: '#a1a1aa', marginBottom: '40px' }}>
          {isLogin ? 'Log in to access your premium courses.' : 'Register now to start your tech journey.'}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#e4e4e7' }}>Username / Email</label>
            <input 
              required
              type="text" 
              value={formData.username}
              onChange={e => setFormData({...formData, username: e.target.value})}
              placeholder="johndoe@email.com"
              style={{
                width: '100%', padding: '15px', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '10px', fontSize: '1rem'
              }} 
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#e4e4e7' }}>Password</label>
            <input 
              required
              type="password" 
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              placeholder="••••••••"
              style={{
                width: '100%', padding: '15px', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '10px', fontSize: '1rem'
              }} 
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '20px', width: '100%', fontSize: '1.1rem', padding: '15px' }}>
            {isLogin ? 'Login to Portal' : 'Register Account'}
          </button>
        </form>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <p style={{ color: '#a1a1aa' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
