import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProgrammingSection from "@/components/ProgrammingSection";
import PhotographySection from "@/components/PhotographySection";
import PhotoEditingSection from "@/components/PhotoEditingSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProgrammingSection />
      <PhotographySection />
      <PhotoEditingSection />
    </div>
  );
};

export default Index;
