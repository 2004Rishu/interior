import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UploadCloud, X, FileImage, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { storage } from '../../lib/storage';

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
  onUploadError?: (error: Error) => void;
  className?: string;
  maxSizeMB?: number;
}

export function ImageUploader({ 
  onUploadSuccess, 
  onUploadError, 
  className,
  maxSizeMB = 5 
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      onUploadError?.(new Error('File must be an image.'));
      return;
    }
    
    if (file.size > maxSizeMB * 1024 * 1024) {
      onUploadError?.(new Error(`File size must be less than ${maxSizeMB}MB.`));
      return;
    }

    // Create local preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setIsUploading(true);

    try {
      const url = await storage.uploadFile(file, file.name);
      onUploadSuccess(url);
    } catch (err) {
      setPreview(null);
      onUploadError?.(err as Error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const clearImage = () => {
    setPreview(null);
  };

  return (
    <div className={cn('relative w-full', className)}>
      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              'relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg transition-colors bg-muted/50 cursor-pointer',
              isDragging ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted'
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-muted-foreground">
              <UploadCloud className="w-10 h-10 mb-3" />
              <p className="mb-2 text-sm font-medium">
                <span className="font-semibold text-primary">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs">SVG, PNG, JPG or GIF (MAX. {maxSizeMB}MB)</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full h-48 rounded-lg overflow-hidden border border-border"
          >
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
            
            {isUploading ? (
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : (
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  type="button"
                  onClick={clearImage}
                  className="p-1.5 bg-background/80 hover:bg-background rounded-full text-foreground shadow-sm transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            
            {!isUploading && (
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-background/80 rounded text-xs font-medium text-foreground flex items-center shadow-sm">
                <FileImage className="w-3 h-3 mr-1.5" />
                Ready
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
