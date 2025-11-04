import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Courses from "@/components/Courses";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useAutoCloseLovableBadge } from "@/hooks/useAutoCloseLovableBadge";

const Index = () => {
  useAutoCloseLovableBadge();
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="hero">
        <Hero />
        <About />
        <Courses />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
