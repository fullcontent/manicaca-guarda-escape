import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Location from "@/components/Location";
import Accommodations from "@/components/Accommodations";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Experience />
      <Location />
      <Accommodations />
      <Gallery />
      <Contact />
    </div>
  );
};

export default Index;
