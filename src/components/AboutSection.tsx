const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-about-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <div className="space-y-8 max-w-2xl text-center">
            <h2 className="text-5xl md:text-6xl font-light text-about-text">
              About me
            </h2>
            <div className="text-lg md:text-xl text-about-text/80 leading-relaxed space-y-6">
              <p>
                I'm a creative professional passionate about the intersection of
                technology and visual storytelling. With expertise spanning
                programming, photography, and photo editing, I bring a unique
                perspective to every project.
              </p>
              <p>
                My journey began with a fascination for both the technical
                precision of code and the artistic beauty of captured moments.
                This dual passion has shaped my approach to creating digital
                experiences that are not only functional but also visually
                compelling.
              </p>
              <p>
                Whether I'm developing innovative software solutions, capturing the
                perfect shot, or enhancing images to tell their best story, I'm
                driven by the desire to create work that resonates and inspires.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;