import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const easeInOutCubic = (t: number) =>
  t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;

const scrollToSection = (id: string) => {
  const section = document.getElementById(id);
  if (!section) return;
  const start = window.scrollY;
  const end = section.getBoundingClientRect().top + window.scrollY - 64; // offset for sticky nav
  const duration = 600;
  let startTime: number | null = null;

  function animateScroll(currentTime: number) {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);
    window.scrollTo(0, start + (end - start) * ease);
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }
  requestAnimationFrame(animateScroll);
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About me", href: "#about", id: "about" },
    { name: "Programming", href: "#programming", id: "programming" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Photography", href: "#photography", id: "photography" },
    { name: "Photo Editing", href: "#photo-editing", id: "photo-editing" },
  ];

  const handleNavClick = (id: string) => {
    setTimeout(() => scrollToSection(id), 120); // slight delay for button feedback
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-hero-bg/90 backdrop-blur-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                asChild={false}
                className="text-nav-text hover:text-hero-text hover:bg-nav-hover transition-transform duration-150 active:scale-95"
                onClick={() => handleNavClick(item.id)}
              >
                {item.name}
              </Button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-nav-text hover:text-hero-text p-2 transition-transform duration-150 active:scale-90"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2 bg-hero-bg/95 rounded-lg mt-2">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  asChild={false}
                  className="w-full justify-start text-nav-text hover:text-hero-text hover:bg-nav-hover transition-transform duration-150 active:scale-95"
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => scrollToSection(item.id), 120);
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;