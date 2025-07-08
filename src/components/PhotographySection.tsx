import PhotoGallery from "./PhotoGallery";

const PhotographySection = () => {
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

        <PhotoGallery />
      </div>
    </section>
  );
};

export default PhotographySection;