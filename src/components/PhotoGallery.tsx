import { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllImages, addImage, removeImageByIndex, clearAllImages } from "@/lib/imageDb";

// Default placeholder images - replace with your own
const defaultImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800",
  "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800",
  "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800",
];

const PhotoGallery = () => {
  const [images, setImages] = useState<string[]>(defaultImages);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllImages().then((imgs) => {
      if (imgs.length > 0) setImages(imgs);
      setLoading(false);
    });
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const result = e.target?.result as string;
        await addImage(result);
        const imgs = await getAllImages();
        setImages(imgs);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = async (index: number) => {
    await removeImageByIndex(index);
    const imgs = await getAllImages();
    setImages(imgs.length > 0 ? imgs : defaultImages);
  };

  const handleClear = async () => {
    await clearAllImages();
    setImages(defaultImages);
  };

  if (loading) return <div>Loading gallery...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-medium text-hero-text">My Photography</h3>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="photo-upload"
          />
          <Button variant="outline" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Photo
          </Button>
          <Button onClick={handleClear} variant="destructive" className="ml-2">Clear All</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div key={index} className="group relative">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-200">
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => setSelectedImage(image)}
              />
            </div>
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
              onClick={() => removeImage(index)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Modal for full-size image */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="Full size"
              className="max-w-full max-h-full object-contain"
            />
            <Button
              variant="outline"
              size="sm"
              className="absolute top-4 right-4"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;