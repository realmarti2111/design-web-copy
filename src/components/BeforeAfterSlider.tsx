import { useState, useRef, useCallback, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const LOCAL_STORAGE_KEY = "beforeAfterSliders";

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
    title: ""
  },
  {
    id: "2", 
    before: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    after: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&sat=1.5&con=1.1",
    title: ""
  }
];

const BeforeAfterSlider = () => {
  const [sliders, setSliders] = useState<SliderPair[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultSliders;
  });
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);
  const [uploadType, setUploadType] = useState<'before' | 'after'>('before');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sliders));
  }, [sliders]);

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleImageUpload = useCallback((file: File, sliderId: string, type: 'before' | 'after') => {
    if (file.size > MAX_IMAGE_SIZE) {
      alert('Image is too large. Please select an image under 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      try {
        setSliders(prev => {
          const updated = prev.map(slider =>
            slider.id === sliderId
              ? { ...slider, [type]: result }
              : slider
          );
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
          return updated;
        });
      } catch (err) {
        alert('Failed to save image. Try a smaller file.');
      }
      setUploadingFor(null);
    };
    reader.onerror = () => {
      alert('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  }, []);

  const addNewSlider = () => {
    const newSlider: SliderPair = {
      id: Date.now().toString(),
      before: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
      after: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&sat=1.3&con=1.1",
      title: ""
    };
    setSliders(prev => {
      const updated = [...prev, newSlider];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeSlider = (id: string) => {
    setSliders(prev => {
      const updated = prev.filter(slider => slider.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const updateTitle = (id: string, title: string) => {
    setSliders(prev => {
      const updated = prev.map(slider =>
        slider.id === id ? { ...slider, title } : slider
      );
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="space-y-8 pb-40">
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
                placeholder="Add a title (optional)"
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
      <Footer />
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

  // Fix: reset file input value after upload so the same file can be uploaded again
  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);

  const handleBeforeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageUpload(file, 'before');
    if (beforeInputRef.current) beforeInputRef.current.value = '';
  };
  const handleAfterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageUpload(file, 'after');
    if (afterInputRef.current) afterInputRef.current.value = '';
  };

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
            ref={beforeInputRef}
            type="file"
            accept="image/*"
            onChange={handleBeforeChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Button variant="outline" size="sm">
            Upload Before
          </Button>
        </div>
        <div className="relative">
          <input
            ref={afterInputRef}
            type="file"
            accept="image/*"
            onChange={handleAfterChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Button variant="outline" size="sm">
            Upload After
          </Button>
        </div>
      </div>
      <div 
        ref={containerRef}
        className="relative aspect-video overflow-hidden rounded-lg cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onDragStart={e => e.preventDefault()}
        style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none' }}
      >
        {/* Before Image */}
        <img
          src={before}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          draggable={false}
        />
        {/* After Image */}
        <div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)` }}
        >
          <img
            src={after}
            alt="After"
            className="w-full h-full object-cover pointer-events-none select-none"
            draggable={false}
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

// Footer component for contacts and social links
const Footer = () => {
  return (
    <footer className="w-full py-8 bg-black text-center fixed left-0 bottom-0 z-50 border-t-0">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white">
        <span className="font-medium">Contact:</span>
        <span className="flex items-center gap-1 select-text">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" className="inline-block"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" /></svg>
          martiminchev2111@gmail.com
        </span>
        <a
          href="https://instagram.com/marti._.minchev"
          className="hover:underline flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="20" height="20" fill="white" viewBox="0 0 24 24" className="inline-block"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5Zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5Zm5.25.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z"/></svg>
          Instagram
        </a>
        <a
          href="https://tiktok.com/@martinminchev81"
          className="hover:underline flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="20" height="20" fill="white" viewBox="0 0 24 24" className="inline-block"><path d="M17.5 2a1 1 0 0 1 1 1v2.25a3.25 3.25 0 0 0 3.25 3.25h.25a1 1 0 1 1 0 2h-.25A5.25 5.25 0 0 1 16.5 3.25V3a1 1 0 0 1 1-1Zm-4.5 4a1 1 0 0 1 1 1v8.25a2.25 2.25 0 1 1-2.25-2.25a1 1 0 1 1 0 2a.25.25 0 1 0 .25.25V7a1 1 0 0 1 1-1Z"/></svg>
          TikTok
        </a>
      </div>
      <div className="mt-2 text-xs text-gray-400">&copy; {new Date().getFullYear()} Martin Minchev. All rights reserved.</div>
    </footer>
  );
};

export default BeforeAfterSlider;