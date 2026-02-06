import { useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "./ContactForm.module.css";

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, // Your Service ID
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Your Template ID
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY, // Your Public Key
      )
      .then(
        () => {
          setStatus({
            type: "success",
            message: "Message sent successfully! We'll get back to you within 24 hours.",
          });
          setForm({ name: "", email: "", message: "" });
          setLoading(false);
          
          // Reset success message after 5 seconds
          setTimeout(() => {
            setStatus({ type: "", message: "" });
          }, 5000);
        },
        (error) => {
          console.error(error);
          setStatus({ 
            type: "error", 
            message: "Failed to send message. Please try again or contact us directly." 
          });
          setLoading(false);
          
          // Reset error message after 5 seconds
          setTimeout(() => {
            setStatus({ type: "", message: "" });
          }, 5000);
        },
      );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formHeader}>
            <span className={styles.badge}>GET IN TOUCH</span>
            <h2 className={styles.title}>Contact Us</h2>
            <p className={styles.subtitle}>
              Ready to capture your special moments? Let's discuss your vision.
            </p>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formFields}>
              <div className={`${styles.field} ${focusedField === 'name' ? styles.focused : ''}`}>
                <div className={styles.fieldWrapper}>
                  <input
                    name="name"
                    placeholder=" "
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    required
                    disabled={loading}
                  />
                  <label>
                    <span className={styles.labelText}>Your Name</span>
                    <div className={styles.fieldLine}></div>
                  </label>
                </div>
                <svg className={styles.fieldIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>

              <div className={`${styles.field} ${focusedField === 'email' ? styles.focused : ''}`}>
                <div className={styles.fieldWrapper}>
                  <input
                    name="email"
                    type="email"
                    placeholder=" "
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    required
                    disabled={loading}
                  />
                  <label>
                    <span className={styles.labelText}>Your Email</span>
                    <div className={styles.fieldLine}></div>
                  </label>
                </div>
                <svg className={styles.fieldIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>

              <div className={`${styles.field} ${styles.textarea} ${focusedField === 'message' ? styles.focused : ''}`}>
                <div className={styles.fieldWrapper}>
                  <textarea
                    name="message"
                    placeholder=" "
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    required
                    rows="4"
                    disabled={loading}
                  />
                  <label>
                    <span className={styles.labelText}>Your Message</span>
                    <div className={styles.fieldLine}></div>
                  </label>
                </div>
                <svg className={styles.fieldIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                </svg>
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className={styles.button}
              >
                {loading ? (
                  <>
                    <div className={styles.spinner}></div>
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </>
                )}
              </button>

              {status.message && (
                <div className={`${styles.status} ${styles[status.type]}`}>
                  <svg className={styles.statusIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    {status.type === "success" ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    )}
                  </svg>
                  <span>{status.message}</span>
                </div>
              )}
            </div>

            <div className={styles.contactInfo}>
              <div className={styles.infoCard}>
                <h3>Other Ways to Connect</h3>
                <p>Prefer to reach out directly? Here are our contact details:</p>
                
                <div className={styles.contactItems}>
                  <a href="mailto:hello@aarzofilms.com" className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <div>
                      <span className={styles.contactLabel}>Email</span>
                      <span className={styles.contactValue}>aarzoofilmproduction@gmail.com</span>
                    </div>
                  </a>
                  
                  <a href="tel:+911234567890" className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                    </div>
                    <div>
                      <span className={styles.contactLabel}>Phone</span>
                      <span className={styles.contactValue}>+91 12345 67890</span>
                    </div>
                  </a>
                  
                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <span className={styles.contactLabel}>Response Time</span>
                      <span className={styles.contactValue}>Within 24 hours</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.infoNote}>
                <svg className={styles.noteIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p>We typically respond within 24 hours. For urgent inquiries, please call us directly.</p>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className={styles.backgroundElements}>
        <div className={styles.bgElement1}></div>
        <div className={styles.bgElement2}></div>
      </div>
    </div>
  );
}

export default ContactForm;