# 🎬 Aarzo Films - Professional Photography & Videography Portfolio

> **Premium Wedding, Portrait & Cinematic Photography Website**

A modern, elegant React + Vite application for a photography and videography studio. Built with Supabase for backend services, Cloudinary for image hosting, and EmailJS for contact form functionality.

---

## 📑 Table of Contents

1. [Project Overview](#-project-overview)
2. [Tech Stack](#-tech-stack)
3. [Project Structure](#-project-structure)
4. [Features](#-features)
5. [Known Issues & Bugs](#-known-issues--bugs)
6. [Strengths](#-strengths)
7. [Weaknesses & Areas for Improvement](#-weaknesses--areas-for-improvement)
8. [Setup & Installation](#-setup--installation)
9. [Environment Variables](#-environment-variables)
10. [Detailed Component Analysis](#-detailed-component-analysis)
11. [Recommendations](#-recommendations)

---

## 🎯 Project Overview

Aarzo Films is a portfolio website designed for a professional photography and videography studio. The website showcases:

- Photography portfolios across multiple categories
- Service offerings
- Client testimonials
- FAQ section
- Contact functionality
- Admin dashboard for content management

---

## 🛠 Tech Stack

| Technology           | Version             | Purpose                        |
| -------------------- | ------------------- | ------------------------------ |
| **React**            | 19.2.0              | Frontend UI Framework          |
| **Vite**             | rolldown-vite 7.2.5 | Build Tool & Dev Server        |
| **React Router DOM** | 7.13.0              | Client-side Routing            |
| **Supabase**         | 2.94.0              | Backend (Auth, Database)       |
| **Framer Motion**    | 12.31.0             | Animations                     |
| **EmailJS**          | 4.4.1               | Email Service for Contact Form |
| **React Icons**      | 5.5.0               | Icon Library                   |
| **Resend**           | 6.9.1               | Email API (unused)             |

### Dev Dependencies

- ESLint with React plugins
- TypeScript types for React (type hints only)
- Vite React Plugin

---

## 📁 Project Structure

```
aarzofilms/
├── public/                    # Static assets
├── src/
│   ├── assets/               # Images, fonts, etc.
│   ├── components/
│   │   ├── About/            # About section component
│   │   ├── Admin/            # Admin dashboard components
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── CategoryManager.jsx
│   │   │   └── ImageManager.jsx
│   │   ├── Contact/          # Contact form component
│   │   ├── FAQ/              # FAQ section
│   │   ├── Footer/           # Footer component
│   │   ├── Gallery/          # Gallery components
│   │   ├── Hero/             # Hero section
│   │   ├── Portfolio/        # Portfolio grid
│   │   ├── Services/         # Services section
│   │   └── Testimonials/     # Testimonials carousel
│   ├── layout/
│   │   └── Navbar/           # Navigation component
│   ├── Pages/                # Page-level components
│   ├── services/
│   │   └── supabaseClient.js # Supabase configuration
│   ├── App.jsx               # Main app with routing
│   └── main.jsx              # Entry point
├── .env                      # Environment variables
├── index.html                # HTML template
├── package.json              # Dependencies
└── vite.config.js            # Vite configuration
```

---

## ✨ Features

### 1. **Public Features**

- ✅ Responsive Hero section with statistics
- ✅ Portfolio gallery with category filtering
- ✅ Real-time image updates from Supabase
- ✅ Services showcase with animated cards
- ✅ Testimonials carousel with auto-play
- ✅ FAQ section with filtering by category
- ✅ Contact form with EmailJS integration
- ✅ Elegant footer with newsletter subscription
- ✅ Modern, glass-morphism design aesthetic

### 2. **Admin Features**

- ✅ Supabase authentication
- ✅ Category management (CRUD)
- ✅ Image upload via Cloudinary
- ✅ Image management with Supabase

### 3. **UI/UX Features**

- ✅ CSS Modules for scoped styling
- ✅ Framer Motion ready for animations
- ✅ Mobile-responsive navigation
- ✅ Scroll-based navbar effects
- ✅ Interactive hover effects

---

## 🐛 Known Issues & Bugs

### ⚠️ CRITICAL: Contact Form UI Not Loading

**Issue:** The Contact Form component displays without proper styling.

**Root Cause:** CSS class mismatch between JSX and CSS Module file.

**Details:**

In `ContactForm.jsx` (Lines 85-117), the component uses:

```jsx
<form className={styles.form} onSubmit={handleSubmit}>
  <h2>Contact Us</h2>
  <input name="name" ... />
  <input name="email" ... />
  <textarea name="message" ... />
  <button type="submit" ...>
```

But in `ContactForm.module.css`, the defined classes are:

```css
.wrapper { ... }       /* ❌ Not used - should wrap the form */
.form { ... }          /* ✅ Used */
.badge { ... }         /* ❌ Not used */
.title { ... }         /* ❌ Not used */
.subtitle { ... }      /* ❌ Not used */
.field { ... }         /* ❌ Not used - inputs should be wrapped */
.button { ... }        /* ❌ Not used - button has no className */
.success { ... }       /* ❌ Not used for success message */
.error { ... }         /* ❌ Not used for error message */
```

**Impact:**

- Form appears unstyled (no background, no spacing)
- Input fields lack floating label effects
- Button lacks golden gradient styling
- Status messages not styled

**Solution:** Update the ContactForm.jsx to match the CSS structure. See [Recommendations](#-recommendations) section.

---

### ⚠️ Route Mismatch Issue

**Issue:** Navigation links point to `/contact` but route is defined as `/contact-form`

**Details:**

- **Navbar.jsx** (Line 205): Links to `/contact`
- **Hero.jsx** (Line 35): "Book a Session" links to `/contact`
- **Services.jsx** (Line 92): CTA links to `/contact`
- **Footer.jsx** (Line 133): Links to `/contact`
- **About.jsx**: Button navigates to `/contact`
- **FAQ.jsx**: Multiple links to `/contact`

- **App.jsx** (Line 30): Route defined as `/contact-form`

**Impact:** Clicking "Contact" or "Get In Touch" anywhere leads to 404 page.

**Solution:** Change route in App.jsx from `/contact-form` to `/contact`:

```jsx
<Route path="/contact" element={<ContactForm />} />
```

---

### ⚠️ Unused Components

| Component                 | Location     | Status                            |
| ------------------------- | ------------ | --------------------------------- |
| `Contact.jsx`             | Pages/       | Not used in routing               |
| `Gallery.jsx`             | Pages/       | Not used in routing               |
| `About.jsx` (Page)        | Pages/       | Not used (component version used) |
| `Services.jsx` (Page)     | Pages/       | Not used (component version used) |
| `FAQ.jsx` (Page)          | Pages/       | Not used (component version used) |
| `Portfolio.jsx` (Page)    | Pages/       | Not used (component version used) |
| `Testimonials.jsx` (Page) | Pages/       | Not used (component version used) |
| Resend package            | package.json | Installed but never used          |

---

### ⚠️ Other Issues

1. **Missing Global Styles:** No `index.css` or global stylesheet for base styling
2. **Hardcoded EmailJS Credentials:** API keys visible in source code
3. **No Error Boundaries:** App lacks error handling for crashes
4. **No Loading States:** Some components lack proper loading indicators
5. **AdminDashboard onLogout prop:** Receives prop but doesn't use it correctly (supabase handles it)
6. **Duplicate Code:** Portfolio.jsx has commented old code (145+ lines)
7. **No 404 Page:** Missing route handling for undefined paths
8. **No SEO Optimization:** Missing meta tags, Open Graph data
9. **Missing Favicon:** Uses default Vite SVG icon

---

## 💪 Strengths

### 1. **Modern Architecture**

- ✅ React 19 with latest features
- ✅ Vite for lightning-fast development
- ✅ CSS Modules for scoped, maintainable styles
- ✅ Clean component-based structure

### 2. **Design Quality**

- ✅ Premium, luxury aesthetic (gold/black color scheme)
- ✅ Glass-morphism effects throughout
- ✅ Consistent design language
- ✅ Beautiful micro-interactions and hover effects
- ✅ Well-crafted animations

### 3. **Backend Integration**

- ✅ Supabase for authentication and database
- ✅ Real-time data subscriptions
- ✅ Cloudinary for optimized image delivery
- ✅ EmailJS for serverless email

### 4. **Code Organization**

- ✅ Logical folder structure
- ✅ Separation of concerns (components, pages, services)
- ✅ CSS Module per component
- ✅ Environment variables for sensitive data

### 5. **User Experience**

- ✅ Auto-rotating testimonials
- ✅ Category-based FAQ filtering
- ✅ Portfolio image lightbox/modal
- ✅ Newsletter subscription
- ✅ Scroll-to-top functionality

### 6. **Admin Features**

- ✅ Protected admin routes
- ✅ Dynamic category creation with auto-slug
- ✅ Image upload with Cloudinary integration
- ✅ Session management

---

## 📉 Weaknesses & Areas for Improvement

### 1. **Security Concerns**

- ⚠️ **EmailJS credentials exposed** in source code (should use env vars)
- ⚠️ **Supabase anon key** in .env but .env is not in .gitignore
- ⚠️ **No input sanitization** on forms
- ⚠️ **No rate limiting** on contact form

### 2. **Code Quality**

- ⚠️ **Large commented code blocks** (Portfolio.jsx has 145 lines commented)
- ⚠️ **Inconsistent naming** (some pages use component names, Contact imports as "Contact")
- ⚠️ **Missing PropTypes/TypeScript** - no type safety
- ⚠️ **Unused dependencies** (resend package)
- ⚠️ **Duplicate component imports** (Gallery.jsx imports ContactForm as "Contact")

### 3. **Performance**

- ⚠️ **No image lazy loading** configured
- ⚠️ **No code splitting** for routes
- ⚠️ **Large CSS files** (Navbar.module.css is 692 lines)
- ⚠️ **No memoization** for expensive computations
- ⚠️ **Real-time subscription** always active (even when not needed)

### 4. **Accessibility (a11y)**

- ⚠️ **Missing ARIA labels** on interactive elements
- ⚠️ **No skip navigation** links
- ⚠️ **Color contrast** may need audit
- ⚠️ **No focus management** for modal
- ⚠️ **Missing alt texts** on some images

### 5. **SEO**

- ⚠️ **No meta tags** in index.html
- ⚠️ **No sitemap.xml**
- ⚠️ **No robots.txt**
- ⚠️ **No structured data** (JSON-LD)
- ⚠️ **Missing Open Graph** tags

### 6. **Testing**

- ⚠️ **No test files** - zero test coverage
- ⚠️ **No testing libraries** installed

### 7. **Developer Experience**

- ⚠️ **No documentation** (original README was default Vite template)
- ⚠️ **No component storybook**
- ⚠️ **No contributing guidelines**

---

## 🚀 Setup & Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd aarzofilms
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file (see [Environment Variables](#-environment-variables))

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Build for production**

   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# EmailJS Configuration (add these)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

**⚠️ Security Note:** Add `.env` to `.gitignore` if not already present.

---

## 📦 Detailed Component Analysis

### Core Components

| Component        | File             | Lines | Purpose          | Status            |
| ---------------- | ---------------- | ----- | ---------------- | ----------------- |
| **App**          | App.jsx          | 45    | Main routing     | ✅ Working        |
| **Navbar**       | Navbar.jsx       | 336   | Navigation       | ✅ Working        |
| **Hero**         | Hero.jsx         | 67    | Landing hero     | ✅ Working        |
| **Portfolio**    | Portfolio.jsx    | 375   | Image gallery    | ✅ Working        |
| **Services**     | Services.jsx     | 102   | Services grid    | ✅ Working        |
| **About**        | About.jsx        | 135   | About section    | ✅ Working        |
| **Testimonials** | Testimonials.jsx | 221   | Reviews carousel | ✅ Working        |
| **FAQ**          | FAQ.jsx          | 222   | FAQ accordion    | ✅ Working        |
| **ContactForm**  | ContactForm.jsx  | 84    | Contact form     | ⚠️ Styling broken |
| **Footer**       | Footer.jsx       | 215   | Site footer      | ✅ Working        |

### Admin Components

| Component           | Purpose           | Status     |
| ------------------- | ----------------- | ---------- |
| **AdminRoute**      | Auth wrapper      | ✅ Working |
| **AdminLogin**      | Login form        | ✅ Working |
| **AdminDashboard**  | Admin panel       | ✅ Working |
| **CategoryManager** | Manage categories | ✅ Working |
| **ImageManager**    | Upload images     | ✅ Working |

---

## 💡 Recommendations

### 1. **Fix Contact Form (High Priority)**

Update `src/components/Contact/ContactForm.jsx`:

```jsx
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setStatus({
            type: "success",
            message: "Message sent successfully ✅",
          });
          setForm({ name: "", email: "", message: "" });
          setLoading(false);
        },
        (error) => {
          console.error(error);
          setStatus({ type: "error", message: "Failed to send message ❌" });
          setLoading(false);
        },
      );
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <span className={styles.badge}>GET IN TOUCH</span>
        <h2 className={styles.title}>Contact Us</h2>
        <p className={styles.subtitle}>
          Ready to capture your special moments? Let's discuss your vision.
        </p>

        <div className={styles.field}>
          <input
            name="name"
            placeholder=" "
            value={form.name}
            onChange={handleChange}
            required
          />
          <label>Your Name</label>
        </div>

        <div className={styles.field}>
          <input
            name="email"
            type="email"
            placeholder=" "
            value={form.email}
            onChange={handleChange}
            required
          />
          <label>Your Email</label>
        </div>

        <div className={`${styles.field} ${styles.textarea}`}>
          <textarea
            name="message"
            placeholder=" "
            value={form.message}
            onChange={handleChange}
            required
            rows="4"
          />
          <label>Your Message</label>
        </div>

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Sending..." : "Send Message"}
          <span className={styles.arrow}>→</span>
        </button>

        {status.message && (
          <p
            className={
              status.type === "success" ? styles.success : styles.error
            }
          >
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
}

export default ContactForm;
```

### 2. **Fix Route Mismatch (High Priority)**

Update `src/App.jsx`:

```jsx
// Change this:
<Route path="/contact-form" element={<ContactForm />} />

// To this:
<Route path="/contact" element={<ContactForm />} />
```

### 3. **Add 404 Page**

Create `src/Pages/NotFound.jsx`:

```jsx
function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "4rem" }}>
      <h1>404 - Page Not Found</h1>
      <a href="/">Go Home</a>
    </div>
  );
}
export default NotFound;
```

Add to App.jsx:

```jsx
<Route path="*" element={<NotFound />} />
```

### 4. **Add Global Styles**

Create `src/index.css`:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    "Inter",
    -apple-system,
    sans-serif;
  background: #0a0a0a;
  color: #ffffff;
  line-height: 1.6;
}

a {
  color: inherit;
  text-decoration: none;
}
```

Import in `main.jsx`:

```jsx
import "./index.css";
```

### 5. **Move Credentials to Environment Variables**

In `ContactForm.jsx`, replace hardcoded values:

```jsx
emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  { ... },
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
)
```

### 6. **Add Lazy Loading for Routes**

```jsx
import { lazy, Suspense } from "react";

const Portfolio = lazy(() => import("./components/Portfolio/Portfolio"));
const About = lazy(() => import("./components/About/About"));

// Wrap routes
<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/portfolio" element={<Portfolio />} />
    ...
  </Routes>
</Suspense>;
```

### 7. **Remove Unused Code**

- Delete commented code in `Portfolio.jsx`
- Remove `resend` from package.json if not needed
- Clean up unused page components

---

## 📊 Summary

| Aspect            | Score      | Notes                                  |
| ----------------- | ---------- | -------------------------------------- |
| **Design**        | ⭐⭐⭐⭐⭐ | Excellent luxury aesthetic             |
| **Functionality** | ⭐⭐⭐⭐   | Works well, minor routing issues       |
| **Code Quality**  | ⭐⭐⭐     | Good structure, needs cleanup          |
| **Security**      | ⭐⭐       | Exposed credentials need fixing        |
| **Performance**   | ⭐⭐⭐     | No major issues, room for optimization |
| **Accessibility** | ⭐⭐       | Needs ARIA labels and focus management |
| **Testing**       | ⭐         | No tests present                       |
| **Documentation** | ⭐         | Was missing until now                  |

**Overall: 3.5/5 ⭐** - A well-designed project with solid foundations that needs security fixes and code cleanup.

---

## 📝 License

This project is proprietary. All rights reserved.

---

## 👥 Contributors

- Aarzo Films Team

---

_Last Updated: February 5, 2026_
