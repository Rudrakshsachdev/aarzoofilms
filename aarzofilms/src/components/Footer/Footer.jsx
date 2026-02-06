import { useState } from "react";
import styles from "./Footer.module.css";

function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubscribed(true);
    setEmail("");
    setIsSubmitting(false);
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Section */}
        <div className={styles.topSection}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <h3>Aarzo<span>Films</span></h3>
              <div className={styles.logoLine}></div>
            </div>
            <p className={styles.tagline}>
              Capturing emotions, stories, and timeless moments through
              photography and cinematic films.
            </p>
            
            <div className={styles.socialLinks}>
              <a 
                href="https://www.instagram.com/aarzoo_films?igsh=MWFoc2JrZXBtY2NzeA==" 
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="4.5" strokeWidth="1.5"/>
                  <circle cx="18" cy="6" r="1" fill="currentColor"/>
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" strokeWidth="1.5"/>
                </svg>
              </a>
              <a 
                href="https://pinterest.com" 
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeWidth="1.5"/>
                  <path d="M12 16a4 4 0 110-8 4 4 0 010 8z" strokeWidth="1.5"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com" 
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58z" strokeWidth="1.5"/>
                  <path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" strokeWidth="1.5"/>
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.navigation}>
            <div className={styles.navSection}>
              <h4>Navigation</h4>
              <div className={styles.navLinks}>
                <a href="/" className={styles.navLink}>Home</a>
                <a href="/portfolio" className={styles.navLink}>Portfolio</a>
                <a href="/about" className={styles.navLink}>About</a>
                <a href="/services" className={styles.navLink}>Services</a>
                <a href="/testimonials" className={styles.navLink}>Testimonials</a>
                <a href="/contact" className={styles.navLink}>Contact</a>
              </div>
            </div>

            <div className={styles.navSection}>
              <h4>Services</h4>
              <div className={styles.navLinks}>
                <a href="/services/wedding" className={styles.navLink}>Wedding Photography</a>
                <a href="/services/portrait" className={styles.navLink}>Portrait Sessions</a>
                <a href="/services/cinematic" className={styles.navLink}>Cinematic Films</a>
                <a href="/services/pre-wedding" className={styles.navLink}>Pre-Wedding Shoots</a>
                <a href="/services/events" className={styles.navLink}>Event Coverage</a>
                <a href="/services/commercial" className={styles.navLink}>Commercial Work</a>
              </div>
            </div>
          </div>

          <div className={styles.newsletter}>
            <h4>Stay Inspired</h4>
            <p>Subscribe to receive our latest work, photography tips, and exclusive offers.</p>
            
            <form onSubmit={handleSubscribe} className={styles.subscribeForm}>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={styles.emailInput}
                  required
                  disabled={isSubmitting || isSubscribed}
                />
                <button 
                  type="submit" 
                  className={styles.subscribeBtn}
                  disabled={isSubmitting || isSubscribed || !email}
                >
                  {isSubmitting ? (
                    <div className={styles.spinner}></div>
                  ) : isSubscribed ? (
                    <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  ) : (
                    <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  )}
                </button>
              </div>
              
              {isSubscribed && (
                <div className={styles.successMessage}>
                  <span>Thank you for subscribing!</span>
                </div>
              )}
            </form>
            
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span>aarzoofilmproduction@gmail.com</span>
              </div>
              <div className={styles.contactItem}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            <span>© {new Date().getFullYear()} Aarzo Films. All rights reserved.</span>
            <div className={styles.legalLinks}>
              <a href="/privacy" className={styles.legalLink}>Privacy Policy</a>
              <a href="/terms" className={styles.legalLink}>Terms of Service</a>
              <a href="/cookies" className={styles.legalLink}>Cookie Policy</a>
            </div>
          </div>
          
          <button 
            className={styles.backToTop}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.bgElement1}></div>
        <div className={styles.bgElement2}></div>
      </div>
    </footer>
  );
}

export default Footer;