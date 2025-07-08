import { Palette, Layers, Zap, Sparkles } from "lucide-react";

const PhotoEditingSection = () => {
  const services = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Color Grading",
      description: "Enhancing mood and atmosphere through professional color correction and grading."
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Retouching",
      description: "Detailed retouching to bring out the best in every image while maintaining authenticity."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Creative Effects",
      description: "Adding artistic flair with custom effects and innovative editing techniques."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Enhancement",
      description: "Bringing images to life through careful enhancement of lighting, contrast, and detail."
    }
  ];

  return (
    <section id="photo-editing" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-hero-text mb-6">
            Photo Editing
          </h2>
          <p className="text-xl text-hero-subtitle max-w-3xl mx-auto">
            Transforming good photos into extraordinary visual stories through expert editing and enhancement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center p-6 rounded-lg hover:bg-hero-bg/50 transition-all duration-300">
              <div className="text-hero-text mb-4 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-medium text-hero-text mb-3">
                {service.title}
              </h3>
              <p className="text-hero-subtitle">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoEditingSection;