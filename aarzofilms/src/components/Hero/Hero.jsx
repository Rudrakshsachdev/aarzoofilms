import styles from "./Hero.module.css";

function Hero() {

    const whatsappnumber = "+919876543210"; // Replace with your WhatsApp number
    const whatsappLink = `https://wa.me/${whatsappnumber.replace(/\D/g, "")}`;

    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>

            <div className={styles.content}>
                <div className={styles.contentWrapper}>
                    <div className={styles.badge}>PROFESSIONAL PHOTOGRAPHY</div>

                    <h1>
                        Capturing Moments,
                        <br />
                        <span className={styles.accent}>Creating Memories</span>
                    </h1>

                    <p className={styles.subtitle}>
                        Premium wedding, portrait & cinematic photography crafted with passion and
                        precision. Experience artistry that tells your unique story.
                    </p>

                    <div className={styles.actions}>
                        <a href="#portfolio" className={styles.primaryBtn}>
                            <span>View Portfolio</span>
                            <svg className={styles.btnIcon} viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a href={whatsappLink} className={styles.secondaryBtn} target="_blank" rel="noopener noreferrer">
                            <span>Book a Session</span>
                            <svg className={styles.btnIcon} viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>

                    <div className={styles.stats}>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>500+</span>
                            <span className={styles.statLabel}>PROJECTS</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>15</span>
                            <span className={styles.statLabel}>YEARS</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>100%</span>
                            <span className={styles.statLabel}>SATISFACTION</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.scrollIndicator}>
                <div className={styles.scrollLine}></div>
            </div>
        </section>
    );
}

export default Hero;