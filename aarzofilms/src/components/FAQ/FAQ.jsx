import { useState } from "react";
import styles from "./FAQ.module.css";

const faqs = [
  {
    id: 1,
    question: "How far in advance should we book?",
    answer: "We recommend booking at least 3–6 months in advance to ensure availability, especially during peak wedding seasons. For weekend weddings, we suggest securing your date 9-12 months ahead to guarantee our services.",
    category: "Booking",
    icon: "📅"
  },
  {
    id: 2,
    question: "Do you travel for destination shoots?",
    answer: "Yes, we love destination weddings and shoots. We've captured stories across India and internationally. Travel and accommodation details are customized in our premium packages and discussed during consultation.",
    category: "Travel",
    icon: "✈️"
  },
  {
    id: 3,
    question: "How long does it take to receive the final photos?",
    answer: "Typically, final edited photographs are delivered within 3–4 weeks after the shoot. For weddings, we provide a sneak peek within 48 hours and the full gallery in 4-6 weeks, ensuring each image receives individual attention.",
    category: "Delivery",
    icon: "⏱️"
  },
  {
    id: 4,
    question: "Do you offer customized packages?",
    answer: "Absolutely. Every story is unique, and we tailor our packages based on your requirements and vision. We offer à la carte services and full packages, all customizable to fit your specific needs.",
    category: "Packages",
    icon: "🎨"
  },
  {
    id: 5,
    question: "How do we book a session?",
    answer: "You can book a session by filling out the contact form or reaching out to us directly via email or phone. We begin with a complimentary consultation to understand your vision before securing your date with a deposit.",
    category: "Process",
    icon: "📝"
  },
  {
    id: 6,
    question: "What is your photography style?",
    answer: "We blend documentary, editorial, and fine art styles to create timeless imagery. Our approach focuses on authentic emotions, elegant composition, and cinematic storytelling that feels both natural and artful.",
    category: "Style",
    icon: "🎬"
  },
  {
    id: 7,
    question: "Do you work with a second shooter?",
    answer: "Yes, for weddings and larger events, we work with a dedicated second photographer to ensure comprehensive coverage. This allows us to capture multiple angles and moments simultaneously.",
    category: "Team",
    icon: "👥"
  },
  {
    id: 8,
    question: "What happens if you're unavailable on our date?",
    answer: "We maintain a network of trusted associate photographers with similar style and quality. If unavailable, we'll personally recommend talented professionals from our network and help coordinate the transition.",
    category: "Availability",
    icon: "🤝"
  },
];

const categories = ["All", "Booking", "Travel", "Delivery", "Packages", "Style", "Process"];

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [filter, setFilter] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFAQs = filter === "All" 
    ? faqs 
    : faqs.filter(faq => faq.category === filter);

  return (
    <section className={styles.faq} id="faq">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>COMMON QUESTIONS</span>
          <h2>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>
            Find answers to common questions about our photography services, 
            booking process, and what to expect when working with us.
          </p>
        </div>

        <div className={styles.categories}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryBtn} ${
                filter === category ? styles.active : ""
              }`}
              onClick={() => setFilter(category)}
            >
              {category}
              {filter === category && (
                <span className={styles.categoryIndicator}></span>
              )}
            </button>
          ))}
        </div>

        <div className={styles.faqGrid}>
          <div className={styles.faqList}>
            {filteredFAQs.map((item, index) => (
              <div
                key={item.id}
                className={`${styles.item} ${
                  activeIndex === index ? styles.active : ""
                } ${hoveredIndex === index ? styles.hovered : ""}`}
                onClick={() => toggleFAQ(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={styles.itemHeader}>
                  <div className={styles.questionMeta}>
                    <span className={styles.categoryTag}>{item.category}</span>
                    <span className={styles.icon}>{item.icon}</span>
                  </div>
                  
                  <div className={styles.question}>
                    <h3>{item.question}</h3>
                    <div className={styles.questionIcon}>
                      <div className={styles.iconLine1}></div>
                      <div className={styles.iconLine2}></div>
                    </div>
                  </div>
                </div>

                <div className={styles.answer}>
                  <div className={styles.answerLine}></div>
                  <p>{item.answer}</p>
                  <button 
                    className={styles.readMore}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = '/contact';
                    }}
                  >
                    Ask Another Question
                    <svg className={styles.arrowIcon} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                <div className={styles.itemOverlay}></div>
                <div className={styles.itemGlow}></div>
              </div>
            ))}
          </div>

          <div className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h4>Still have questions?</h4>
              <p>We're here to help you with any specific inquiries about your project.</p>
              
              <div className={styles.contactOptions}>
                <a href="mailto:hello@aarzofilms.com" className={styles.contactOption}>
                  <div className={styles.contactIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <span className={styles.contactTitle}>Email Us</span>
                    <span className={styles.contactDetail}>aarzoofilmproduction@gmail.com</span>
                  </div>
                </a>
                
                <a href="tel:+911234567890" className={styles.contactOption}>
                  <div className={styles.contactIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <span className={styles.contactTitle}>Call Us</span>
                    <span className={styles.contactDetail}>+91 12345 67890</span>
                  </div>
                </a>
              </div>
              
              <a href="/contact" className={styles.contactBtn}>
                Schedule a Consultation
              </a>
            </div>
            
            <div className={styles.statsCard}>
              <h5>Quick Facts</h5>
              <div className={styles.quickFacts}>
                <div className={styles.fact}>
                  <span className={styles.factNumber}>24-48</span>
                  <span className={styles.factLabel}>Hours for sneak peek</span>
                </div>
                <div className={styles.fact}>
                  <span className={styles.factNumber}>100%</span>
                  <span className={styles.factLabel}>Satisfaction rate</span>
                </div>
                <div className={styles.fact}>
                  <span className={styles.factNumber}>50+</span>
                  <span className={styles.factLabel}>Destinations covered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.backgroundElements}>
        <div className={styles.bgElement1}></div>
        <div className={styles.bgElement2}></div>
      </div>
    </section>
  );
}

export default FAQ;