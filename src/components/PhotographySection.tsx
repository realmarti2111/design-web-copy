import { Camera, Aperture, Eye, Sun } from "lucide-react";

const PhotographySection = () => {
  const specialties = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Portrait Photography",
      description: "Capturing authentic moments and genuine expressions that tell personal stories."
    },
    {
      icon: <Aperture className="w-8 h-8" />,
      title: "Architectural Photography",
      description: "Showcasing the beauty and design of structures with dramatic lighting and composition."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Creative Vision",
      description: "Bringing unique perspectives to every shot through innovative angles and techniques."
    },
    {
      icon: <Sun className="w-8 h-8" />,
      title: "Natural Light",
      description: "Mastering the art of natural lighting to create mood and atmosphere."
    }
  ];

  return (
    <section id="photography" className="py-20 bg-hero-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-hero-text mb-6">
            Photography
          </h2>
          <p className="text-xl text-hero-subtitle max-w-3xl mx-auto">
            Capturing moments that matter, with an eye for composition, light, and storytelling.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialties.map((specialty, index) => (
            <div key={index} className="text-center p-6 rounded-lg hover:bg-background/50 transition-all duration-300">
              <div className="text-hero-text mb-4 flex justify-center">
                {specialty.icon}
              </div>
              <h3 className="text-xl font-medium text-hero-text mb-3">
                {specialty.title}
              </h3>
              <p className="text-hero-subtitle">
                {specialty.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotographySection;