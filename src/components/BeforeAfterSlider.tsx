import { useState, useRef, useCallback } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SliderPair {
  id: string;
  before: string;
  after: string;
  title: string;
}

const defaultSliders: SliderPair[] = [
  {
    id: "1",
    before: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800",
    after: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&sat=2&con=1.2&sharp=1",
    title: "Color Enhancement"
  },
  {
    id: "2", 
    before: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    after: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&sat=1.5&con=1.1",
    title: "Landscape Editing"
  }
];

const BeforeAfterSlider = () => {
  const [sliders, setSliders] = useState<SliderPair[]>(defaultSliders);
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);
  const [uploadType, setUploadType] = useState<'before' | 'after'>('before');

  const handleImageUpload = useCallback((file: File, sliderId: string, type: 'before' | 'after') => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setSliders(prev => prev.map(slider => 
        slider.id === sliderId 
          ? { ...slider, [type]: result }
          : slider
      ));
      setUploadingFor(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const addNewSlider = () => {
    const newSlider: SliderPair = {
      id: Date.now().toString(),
      before: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
      after: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&sat=1.3&con=1.1",
      title: "New Edit"
    };
    setSliders(prev => [...prev, newSlider]);
  };

  const removeSlider = (id: string) => {
    setSliders(prev => prev.filter(slider => slider.id !== id));
  };

  const updateTitle = (id: string, title: string) => {
    setSliders(prev => prev.map(slider => 
      slider.id === id ? { ...slider, title } : slider
    ));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-medium text-hero-text">Before & After</h3>
        <Button onClick={addNewSlider} variant="outline" className="flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Add New Comparison
        </Button>
      </div>

      <div className="grid gap-8">
        {sliders.map((slider) => (
          <div key={slider.id} className="bg-background/50 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                value={slider.title}
                onChange={(e) => updateTitle(slider.id, e.target.value)}
                className="bg-transparent text-lg font-medium text-hero-text border-none outline-none"
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeSlider(slider.id)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <BeforeAfterComparison
              before={slider.before}
              after={slider.after}
              onImageUpload={(file, type) => handleImageUpload(file, slider.id, type)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

interface BeforeAfterComparisonProps {
  before: string;
  after: string;
  onImageUpload: (file: File, type: 'before' | 'after') => void;
}

const BeforeAfterComparison = ({ before, after, onImageUpload }: BeforeAfterComparisonProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, [isDragging]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-4">
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onImageUpload(file, 'before');
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Button variant="outline" size="sm">
            Upload Before
          </Button>
        </div>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onImageUpload(file, 'after');
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Button variant="outline" size="sm">
            Upload After
          </Button>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="relative aspect-video overflow-hidden rounded-lg cursor-ew-resize"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      >
        {/* Before Image */}
        <img
          src={before}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* After Image */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)` }}
        >
          <img
            src={after}
            alt="After"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Slider Line */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
          Before
        </div>
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
          After
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;