import { Code, Database, Globe, Smartphone } from "lucide-react";

const ProgrammingSection = () => {
  const skills = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Full-Stack Development",
      description: "Building robust web applications with modern frameworks and technologies."
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Database Design",
      description: "Creating efficient and scalable database architectures for complex systems."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web Technologies",
      description: "Expertise in React, TypeScript, Node.js, and modern development tools."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Responsive Design",
      description: "Crafting user experiences that work seamlessly across all devices."
    }
  ];

  return (
    <section id="programming" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-hero-text mb-6">
            Programming
          </h2>
          <p className="text-xl text-hero-subtitle max-w-3xl mx-auto">
            Crafting digital solutions with clean code, innovative thinking, and attention to detail.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div key={index} className="text-center p-6 rounded-lg hover:bg-hero-bg/50 transition-all duration-300">
              <div className="text-hero-text mb-4 flex justify-center">
                {skill.icon}
              </div>
              <h3 className="text-xl font-medium text-hero-text mb-3">
                {skill.title}
              </h3>
              <p className="text-hero-subtitle">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgrammingSection;