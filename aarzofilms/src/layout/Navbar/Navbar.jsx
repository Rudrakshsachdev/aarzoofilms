import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import styles from "./Navbar.module.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleMouseMove = (e) => {
    if (navRef.current) {
      const nav = navRef.current;
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      nav.style.setProperty("--mouse-x", `${x}px`);
      nav.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
        onMouseMove={handleMouseMove}
      >
        <div className={styles.gradientOverlay}></div>

        <div className={styles.navContainer}>
          {/* Logo with animated border */}
          <div className={styles.logoContainer}>
            <NavLink to="/" className={styles.logoLink}>
              <div className={styles.logoWrapper}>
                <span className={styles.logoText}>
                  Aarzoo<span className={styles.logoAccent}>Films</span>
                </span>
                <div className={styles.logoUnderline}></div>
              </div>
            </NavLink>
            <div className={styles.logoTagline}>Visual Storytelling</div>
          </div>

          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  <span className={styles.linkText}>Home</span>
                  <span className={styles.linkHover}></span>
                </NavLink>
              </li>

              <li className={styles.navItem}>
                <NavLink
                  to="/portfolio"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  <span className={styles.linkText}>Portfolio</span>
                  <span className={styles.linkHover}></span>
                </NavLink>
              </li>

              <li className={styles.navItem}>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  <span className={styles.linkText}>About</span>
                  <span className={styles.linkHover}></span>
                </NavLink>
              </li>

              <li className={styles.navItem}>
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  <span className={styles.linkText}>Services</span>
                  <span className={styles.linkHover}></span>
                </NavLink>
              </li>

              <li className={styles.navItem}>
                <NavLink
                  to="/testimonials"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  <span className={styles.linkText}>Testimonials</span>
                  <span className={styles.linkHover}></span>
                </NavLink>
              </li>

              <li className={styles.navItem}>
                <NavLink
                  to="/faq"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  <span className={styles.linkText}>FAQ</span>
                  <span className={styles.linkHover}></span>
                </NavLink>
              </li>
            </ul>

            <div className={styles.navActions}>
              <NavLink to="/admin/login" className={styles.contactButton}>
                <span className={styles.buttonText}>Login</span>
                <div className={styles.buttonHover}></div>
                <div className={styles.buttonShine}></div>
              </NavLink>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.menuToggle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <FiX className={styles.menuIcon} />
            ) : (
              <FiMenu className={styles.menuIcon} />
            )}
            <span className={styles.menuLabel}>
              {isMenuOpen ? "Close" : "Menu"}
            </span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className={styles.scrollIndicator}></div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.active : ""}`}
      >
        <div className={styles.mobileMenuHeader}>
          <div className={styles.mobileLogo}>
            Aarzo<span>Films</span>
          </div>
          <div className={styles.mobileTagline}>Premium Visual Production</div>
        </div>

        <div className={styles.mobileNav}>
          <NavLink
            to="/"
            className={styles.mobileLink}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className={styles.mobileLinkNum}>01</span>
            <span className={styles.mobileLinkText}>Home</span>
          </NavLink>

          <NavLink
            to="/portfolio"
            className={styles.mobileLink}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className={styles.mobileLinkNum}>02</span>
            <span className={styles.mobileLinkText}>Portfolio</span>
          </NavLink>

          <NavLink
            to="/about"
            className={styles.mobileLink}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className={styles.mobileLinkNum}>03</span>
            <span className={styles.mobileLinkText}>About</span>
          </NavLink>

          <NavLink
            to="/services"
            className={styles.mobileLink}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className={styles.mobileLinkNum}>04</span>
            <span className={styles.mobileLinkText}>Services</span>
          </NavLink>

          <NavLink
            to="/testimonials"
            className={styles.mobileLink}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className={styles.mobileLinkNum}>05</span>
            <span className={styles.mobileLinkText}>Testimonials</span>
          </NavLink>

          <NavLink
            to="/faq"
            className={styles.mobileLink}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className={styles.mobileLinkNum}>06</span>
            <span className={styles.mobileLinkText}>FAQ</span>
          </NavLink>
        </div>

        <div className={styles.mobileActions}>
          <NavLink
            to="/admin/login"
            className={styles.mobileContactButton}
            onClick={() => setIsMenuOpen(false)}
          >
            Login
            <div className={styles.mobileButtonArrow}>→</div>
          </NavLink>

          <div className={styles.mobileFooter}>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Email</span>
                <span className={styles.contactValue}>
                  hello@aarzofilms.com
                </span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Phone</span>
                <span className={styles.contactValue}>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop Overlay */}
      {isMenuOpen && (
        <div className={styles.backdrop} onClick={() => setIsMenuOpen(false)} />
      )}
    </>
  );
}

export default Navbar;
