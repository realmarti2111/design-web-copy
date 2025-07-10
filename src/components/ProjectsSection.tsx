import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Social Media App",
      description: "A social media application that allows users to share photos, videos, and stories with their friends and followers. Built with React, Node.js, and MongoDB.",
      link: "https://pgtkspace.com"
    },
    {
      title: "Task Management App",
      description: "A productivity application for managing tasks and projects. Features include drag-and-drop organization, priority settings, and deadline reminders.",
      link: "https://realmarti2111.github.io/To-do-app/"
    }

  ];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-hero-text mb-6">
            Projects
          </h2>
          <p className="text-xl text-hero-subtitle max-w-3xl mx-auto">
            Showcasing my development work through real-world applications and solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-hero-text">{project.title}</CardTitle>
                <CardDescription className="text-hero-subtitle">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Project content could go here, like an image */}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    View Project <ExternalLink className="ml-1" size={16} />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection; 