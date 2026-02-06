import { useState, useEffect } from 'react';
import styles from "./Testimonials.module.css";

const testimonials = [
  {
    id: 1,
    name: "Ritika & Aman",
    role: "Wedding Client",
    message: "Aarzo Films captured our wedding beautifully. Every emotion, every detail felt natural and timeless. Looking at our photos feels like reliving the day again.",
    rating: 5,
    date: "March 2024",
  },
  {
    id: 2,
    name: "Neha Sharma",
    role: "Portrait Session",
    message: "The team made me feel completely comfortable. The portraits were elegant, minimal, and truly reflected my personality.",
    rating: 5,
    date: "February 2024",
  },
  {
    id: 3,
    name: "Karan & Priya",
    role: "Pre-Wedding Shoot",
    message: "From planning to execution, everything was seamless. The cinematic style and storytelling were beyond our expectations.",
    rating: 5,
    date: "January 2024",
  },
  {
    id: 4,
    name: "Rohit Verma",
    role: "Event Coverage",
    message: "Professional, punctual, and incredibly creative. Aarzo Films delivered moments we didn't even realize were happening.",
    rating: 5,
    date: "December 2023",
  },
  {
    id: 5,
    name: "Sanya & Raj",
    role: "Destination Wedding",
    message: "Handled our destination wedding with absolute perfection. The cinematic film brought tears to our eyes.",
    rating: 5,
    date: "November 2023",
  },
  {
    id: 6,
    name: "Arjun Mehta",
    role: "Corporate Portfolio",
    message: "Exceptional professionalism. The team understood our brand aesthetic perfectly and delivered stunning corporate portraits.",
    rating: 5,
    date: "October 2023",
  },
];

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  return (
    <section className={styles.testimonials} id="testimonials">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>VOICES OF TRUST</span>
          <h2 className={styles.title}>Client Stories</h2>
          <p className={styles.subtitle}>
            Experience the moments we've captured through the eyes of those we've served.
          </p>
        </div>

        <div className={styles.testimonialGrid}>
          <div className={styles.featuredCard} 
               onMouseEnter={() => setIsPaused(true)}
               onMouseLeave={() => setIsPaused(false)}>
            <div className={styles.quoteIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            
            <div className={styles.messageWrapper}>
              <p className={styles.message}>"{testimonials[activeIndex].message}"</p>
            </div>

            <div className={styles.rating}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={styles.star} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
            </div>

            <div className={styles.client}>
              <div className={styles.clientInfo}>
                <span className={styles.name}>{testimonials[activeIndex].name}</span>
                <span className={styles.role}>{testimonials[activeIndex].role}</span>
              </div>
              <span className={styles.date}>{testimonials[activeIndex].date}</span>
            </div>

            <div className={styles.cardOverlay}></div>
            <div className={styles.cardGlow}></div>
          </div>

          <div className={styles.sidebar}>
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`${styles.sidebarCard} ${activeIndex === index ? styles.active : ''}`}
                onClick={() => handleDotClick(index)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className={styles.sidebarContent}>
                  <div className={styles.sidebarClient}>
                    <div className={styles.sidebarAvatar}>
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className={styles.sidebarInfo}>
                      <span className={styles.sidebarName}>{testimonial.name}</span>
                      <span className={styles.sidebarRole}>{testimonial.role}</span>
                    </div>
                  </div>
                  <svg className={styles.sidebarArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
                <div className={styles.sidebarLine}></div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.dots}>
            {testimonials.slice(0, 6).map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${activeIndex === index ? styles.active : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <div className={styles.navigation}>
            <button 
              className={styles.navButton}
              onClick={handlePrev}
              aria-label="Previous testimonial"
            >
              <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button 
              className={styles.navButton}
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>4.9/5</span>
            <span className={styles.statLabel}>Average Rating</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>98%</span>
            <span className={styles.statLabel}>Client Satisfaction</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>200+</span>
            <span className={styles.statLabel}>Stories Captured</span>
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

export default Testimonials;