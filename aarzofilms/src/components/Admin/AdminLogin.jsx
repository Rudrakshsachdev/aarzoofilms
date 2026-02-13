

import { useState } from "react";
import { supabase } from "../../services/supabaseClient";
import styles from "./AdminLogin.module.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid credentials. Please try again.");
    }

    setLoading(false);
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginWrapper}>
        <div className={styles.loginHeader}>
          <div className={styles.logo}>
            <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <h2>Aarzo Films Admin</h2>
          </div>
          <p className={styles.subtitle}>Secure access to portfolio management</p>
        </div>

        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div className={styles.formHeader}>
            <span className={styles.badge}>ADMIN ACCESS</span>
            <h3>Sign In</h3>
            <p>Enter your credentials to access the admin panel</p>
          </div>

          <div className={`${styles.field} ${focusedField === 'email' ? styles.focused : ''}`}>
            <div className={styles.fieldWrapper}>
              <input
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                required
                disabled={loading}
              />
              <label>
                <span className={styles.labelText}>Admin Email</span>
                <div className={styles.fieldLine}></div>
              </label>
            </div>
            <svg className={styles.fieldIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>

          <div className={`${styles.field} ${focusedField === 'password' ? styles.focused : ''}`}>
            <div className={styles.fieldWrapper}>
              <input
                type="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => handleFocus('password')}
                onBlur={handleBlur}
                required
                disabled={loading}
              />
              <label>
                <span className={styles.labelText}>Password</span>
                <div className={styles.fieldLine}></div>
              </label>
            </div>
            <svg className={styles.fieldIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>

          {error && (
            <div className={styles.error}>
              <svg className={styles.errorIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading} 
            className={styles.loginButton}
          >
            {loading ? (
              <>
                <div className={styles.spinner}></div>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </>
            )}
          </button>

          <div className={styles.securityNote}>
            <svg className={styles.securityIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <span>Secure admin portal. Access is restricted to authorized personnel only.</span>
          </div>
        </form>

        <div className={styles.loginFooter}>
          <span>© {new Date().getFullYear()} Aarzo Films Admin Portal</span>
          <span>All rights reserved</span>
        </div>
      </div>

      <div className={styles.backgroundElements}>
        <div className={styles.bgElement1}></div>
        <div className={styles.bgElement2}></div>
      </div>
    </div>
  );
}

export default AdminLogin;