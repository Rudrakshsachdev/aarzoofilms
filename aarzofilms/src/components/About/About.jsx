import styles from "./About.module.css";

function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.label}>OUR PHILOSOPHY</span>
            <h2>
              Stories That Live Beyond
              <span className={styles.accent}> The Moment</span>
            </h2>
            
            <div className={styles.quote}>
              <svg className={styles.quoteIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <div className={styles.quoteContent}>
                <p className={styles.quoteText}>
                  "Photography is the story I fail to put into words."
                </p>
                <span className={styles.quoteAuthor}>— Destin Sparks</span>
              </div>
            </div>
          </div>

          <div className={styles.mainContent}>
            <div className={styles.textBlock}>
              <div className={styles.dropCapContainer}>
                <span className={styles.dropCap}>K</span>
                <p className={styles.text}>
                  ing15 Films is a premium photography and cinematic studio dedicated
                  to capturing emotions, connections, and timeless memories. We believe
                  photography is not just about images — it's about stories that stay
                  with you forever.
                </p>
              </div>

              <p className={styles.text}>
                With years of experience across weddings, portraits, and cinematic
                productions, our approach blends artistry with authenticity, ensuring
                every frame feels natural, elegant, and meaningful.
              </p>
              
              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <div className={styles.statIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className={styles.statNumber}>15+</span>
                  <span className={styles.statLabel}>Years Experience</span>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <span className={styles.statNumber}>500+</span>
                  <span className={styles.statLabel}>Happy Clients</span>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className={styles.statNumber}>50+</span>
                  <span className={styles.statLabel}>Awards</span>
                </div>
              </div>
            </div>

            <div className={styles.aside}>
              <div className={styles.values}>
                <div className={styles.valueItem}>
                  <div className={styles.valueIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </div>
                  <div className={styles.valueContent}>
                    <h4>Passion-Driven</h4>
                    <p>Every project is approached with genuine care and enthusiasm.</p>
                    <div className={styles.valueLine}></div>
                  </div>
                </div>
                
                <div className={styles.valueItem}>
                  <div className={styles.valueIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className={styles.valueContent}>
                    <h4>Artistic Excellence</h4>
                    <p>Meticulous attention to detail in every frame we capture.</p>
                    <div className={styles.valueLine}></div>
                  </div>
                </div>
                
                <div className={styles.valueItem}>
                  <div className={styles.valueIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className={styles.valueContent}>
                    <h4>Authentic Connection</h4>
                    <p>Building genuine relationships to capture true emotions.</p>
                    <div className={styles.valueLine}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.signature}>
            <div className={styles.signatureLine}>
              <div className={styles.signatureLineInner}></div>
            </div>
            <div className={styles.signatureContent}>
              <span className={styles.signatureName}>Aarzo Films</span>
              <span className={styles.signatureTitle}>Founder & Creative Director</span>
              <button className={styles.contactBtn} onClick={() => window.location.href = '/contact'}>
                <span>Get in Touch</span>
                <svg className={styles.arrowIcon} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.backgroundElements}>
        <div className={styles.bgElement1}></div>
        <div className={styles.bgElement2}></div>
        <div className={styles.floatingElement1}></div>
        <div className={styles.floatingElement2}></div>
        <div className={styles.floatingElement3}></div>
      </div>
    </section>
  );
}

export default About;