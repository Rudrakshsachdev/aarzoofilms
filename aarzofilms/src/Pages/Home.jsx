import Hero from "../components/Hero/Hero";
import ServicesSection from "../components/Services/Services";
import About from "../components/About/About";
import Testimonials from "../components/Testimonials/Testimonials";
import FAQ from "../components/FAQ/FAQ";
import Footer from "../components/Footer/Footer";
import Portfolio from "../components/Portfolio/Portfolio";
import ContactForm from "../components/Contact/ContactForm";

function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <Portfolio />
      <About />
      
      <Testimonials />
      <FAQ />
      <ContactForm />
     
      <Footer />
    </>
  );
}

export default Home;
