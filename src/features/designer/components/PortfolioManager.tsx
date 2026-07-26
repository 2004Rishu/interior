import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2 } from 'lucide-react';
import { ImageUploader } from '../../../components/shared/ImageUploader';

interface PortfolioManagerProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export function PortfolioManager({ images, onChange }: PortfolioManagerProps) {
  const handleUploadSuccess = (url: string) => {
    onChange([...images, url]);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    onChange(images.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <AnimatePresence>
          {images.map((url, index) => (
            <motion.div
              key={`${url}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              layout
              className="relative aspect-[4/3] rounded-lg overflow-hidden group"
            >
              <img 
                src={url} 
                alt={`Portfolio piece ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-sm"
                  aria-label="Remove image"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="max-w-md mx-auto">
        <ImageUploader onUploadSuccess={handleUploadSuccess} />
      </div>
    </div>
  );
}
