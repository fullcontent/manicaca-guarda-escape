import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import BeachGallery from "@/components/BeachGallery";
import Location from "@/components/Location";
import Accommodations from "@/components/Accommodations";
import PousadaGallery from "@/components/PousadaGallery";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Experience />
      <BeachGallery />
      <Location />
      <Accommodations />
      <PousadaGallery />
      <Pricing />
      <Contact />
    </div>
  );
};

export default Index;
