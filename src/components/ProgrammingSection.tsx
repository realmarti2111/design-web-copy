import { Code, Database, Globe, Smartphone } from "lucide-react";

const ProgrammingSection = () => {
  const skills = [
    {
      title: "C# Development",
      description: "A collection of C# projects demonstrating expertise in object-oriented programming, .NET development, and practical software design. Each application emphasizes maintainability, performance, and clean architecture."
    },
    {
      title: "JavaScript",
      description: "A range of JavaScript projects highlighting dynamic, interactive web experiences using both vanilla JS and modern frameworks like React. Code is structured for clarity, responsiveness, and user engagement."
    },
    {
      title: "HTML & CSS",
      description: "Responsive, well-structured web designs built with semantic HTML and modern CSS techniques. Projects emphasize clean layouts, accessibility, and cross-device compatibility using Flexbox and Grid."
    },
    {
      title: "React",
      description: "Modern web applications built with React, focusing on reusable components, efficient state management, and seamless API integration. Emphasis is placed on performance, scalability, and clean UI logic."
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