import { useRef, useEffect } from "react";

const useSectionReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const handle = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          node.classList.add("section-reveal-visible");
        }
      });
    };
    const observer = new window.IntersectionObserver(handle, { threshold: 0.15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
};

const Section = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const ref = useSectionReveal();
  return (
    <section id={id} ref={ref} className="section-reveal opacity-0 translate-y-8 transition-all duration-700">
      {children}
    </section>
  );
};

export default Section;