import BeforeAfterSlider from "./BeforeAfterSlider";

const PhotoEditingSection = () => {
  return (
    <section id="photo-editing" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light text-hero-text mb-6">
            Photo Editing
          </h2>
          <p className="text-xl text-hero-subtitle max-w-3xl mx-auto">
            Transforming good photos into extraordinary visual stories through expert editing and enhancement.
          </p>
        </div>

        <BeforeAfterSlider />
      </div>
    </section>
  );
};

export default PhotoEditingSection;