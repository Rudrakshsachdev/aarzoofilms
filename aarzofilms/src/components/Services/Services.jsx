import styles from "./Services.module.css";

const services = [
  {
    title: "Wedding Photography",
    description:
      "Timeless wedding photography capturing emotions, rituals, and candid moments with cinematic elegance.",
  },
  {
    title: "Pre-Wedding Shoots",
    description:
      "Stylized pre-wedding shoots designed to tell your love story with creativity and intimacy.",
  },
  {
    title: "Cinematic Videography",
    description:
      "High-end cinematic films crafted with storytelling, motion, and mood.",
  },
  {
    title: "Portrait Photography",
    description:
      "Elegant portraits that reflect personality, confidence, and authenticity.",
  },
];

function Services() {
  return (
    <section className={styles.services}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>WHAT WE OFFER</span>
          <h2 className={styles.heading}>Our Services</h2>
          <p className={styles.intro}>
            Specialized photography and videography services crafted to capture 
            the essence of your most cherished moments with artistic precision.
          </p>
        </div>

        <div className={styles.list}>
          {services.map((service, index) => (
            <div
              key={index}
              className={styles.item}
              style={{ "--index": index }}
            >
              <div className={styles.card}>
                <div className={styles.cardContent}>
                  <div className={styles.indexWrapper}>
                    <span className={styles.index}>0{index + 1}</span>
                    <div className={styles.indexLine}></div>
                  </div>
                  
                  <div className={styles.serviceHeader}>
                    <h3>{service.title}</h3>
                    <svg 
                      className={styles.serviceIcon} 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="1.5" 
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </div>
                  
                  <p className={styles.description}>{service.description}</p>
                  
                  <div className={styles.serviceFeatures}>
                    <span className={styles.feature}>Custom Packages</span>
                    <span className={styles.feature}>Professional Editing</span>
                    <span className={styles.feature}>Digital Delivery</span>
                  </div>
                </div>
                
                <div className={styles.cardOverlay}></div>
                <div className={styles.cardHoverEffect}></div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <p className={styles.ctaText}>
            Ready to create something beautiful together?
          </p>
          <a href="/contact" className={styles.ctaButton}>
            <span>Discuss Your Project</span>
            <svg className={styles.arrowIcon} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Services;