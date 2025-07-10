import React, { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'uploadedImages';

const LocalImageUploader: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setImages(JSON.parse(saved));
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        const newImages = [...images, result];
        setImages(newImages);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newImages));
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleClear = () => {
    setImages([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <div style={{ margin: '2em 0' }}>
      <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
      <button onClick={handleClear} style={{ marginLeft: '1em' }}>Clear All</button>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '1em', gap: '1em' }}>
        {images.map((img, idx) => (
          <img key={idx} src={img} alt={`uploaded-${idx}`} style={{ maxWidth: 200, maxHeight: 200, borderRadius: 8 }} />
        ))}
      </div>
    </div>
  );
};

export default LocalImageUploader;
