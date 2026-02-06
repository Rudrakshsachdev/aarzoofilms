import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./layout/Navbar/Navbar";

import Hero from "./components/Hero/Hero";

import Home from "./Pages/Home";

import About from "./components/About/About";

import Services from "./components/Services/Services";

import Testimonials from "./components/Testimonials/Testimonials";

import FAQ from "./components/FAQ/FAQ";

import AdminRoute from "./components/Admin/AdminRoute";

import Portfolio from "./components/Portfolio/Portfolio";

import PortfolioCategory from "./Pages/PortfolioCategory";

import ContactForm from "./components/Contact/ContactForm";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:category" element={<PortfolioCategory />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/admin" element={<AdminRoute />} />
        <Route path="/admin/login" element={<AdminRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
