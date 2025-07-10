import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProgrammingSection from "@/components/ProgrammingSection";
import ProjectsSection from "@/components/ProjectsSection";
import PhotographySection from "@/components/PhotographySection";
import PhotoEditingSection from "@/components/PhotoEditingSection";
import Section from "@/components/ui/Section";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Section id="home">
        <HeroSection />
      </Section>
      <Section id="about">
        <AboutSection />
      </Section>
      <Section id="programming">
        <ProgrammingSection />
      </Section>
      <Section id="projects">
        <ProjectsSection />
      </Section>
      <Section id="photography">
        <PhotographySection />
      </Section>
      <Section id="photo-editing">
        <PhotoEditingSection />
      </Section>
    </div>
  );
};

export default Index;
