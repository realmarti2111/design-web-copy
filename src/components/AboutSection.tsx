const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-about-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-6xl md:text-8xl font-light text-about-text mb-8">
            About me
          </h2>
          <div className="text-xl md:text-2xl text-about-text/80 max-w-4xl mx-auto leading-relaxed">
            <p className="mb-6">
              I'm a creative professional passionate about the intersection of technology and visual storytelling. 
              With expertise spanning programming, photography, and photo editing, I bring a unique perspective 
              to every project.
            </p>
            <p className="mb-6">
              My journey began with a fascination for both the technical precision of code and the artistic 
              beauty of captured moments. This dual passion has shaped my approach to creating digital 
              experiences that are not only functional but also visually compelling.
            </p>
            <p>
              Whether I'm developing innovative software solutions, capturing the perfect shot, or enhancing 
              images to tell their best story, I'm driven by the desire to create work that resonates and inspires.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;