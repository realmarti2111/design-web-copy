const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen bg-hero-bg relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/6ee5cb46-eae3-48f7-8a94-07b4c5d0d47a.png')`,
        }}
      >
        <div className="absolute inset-0 bg-hero-bg/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-start min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-8xl font-light text-hero-text mb-6 leading-tight">
              Martin Minchev
            </h1>
            <p className="text-xl md:text-2xl text-hero-subtitle leading-relaxed max-w-xl">
              Blending technology and artistry to create, capture, and elevate visual stories.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;