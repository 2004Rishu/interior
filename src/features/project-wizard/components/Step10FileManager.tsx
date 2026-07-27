import React, { useState } from 'react';
import { useWizard } from '../context/WizardContext';
import { GlassCard } from '../../../components/ui/GlassCard';
import { Upload, File, X, Image as ImageIcon } from 'lucide-react';

export const Step10FileManager: React.FC = () => {
  const { nextStep, prevStep } = useWizard();
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <GlassCard className="p-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-serif text-foreground">Upload Floor Plan</h2>
        <p className="mt-2 text-muted-foreground">Upload your 2D floor plan or pictures of your space to help us generate an accurate estimate.</p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
          isDragging ? 'border-primary bg-primary/5' : 'border-border bg-muted/20 hover:bg-muted/40'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileInput}
          accept="image/*,.pdf"
        />
        <div className="flex flex-col items-center pointer-events-none">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
            <Upload size={32} className="text-primary" />
          </div>
          <h3 className="text-lg font-medium text-foreground">Drag & drop files here</h3>
          <p className="text-sm text-muted-foreground mt-2">or click to browse from your computer</p>
          <p className="text-xs text-muted-foreground mt-4">Supported formats: PDF, JPG, PNG (Max 10MB)</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-8 space-y-3">
          <h4 className="text-sm font-medium text-foreground">Uploaded Files</h4>
          {files.map((file, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border border-border shadow-sm">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 bg-primary/10 text-primary rounded-md shrink-0">
                  {file.type.includes('image') ? <ImageIcon size={20} /> : <File size={20} />}
                </div>
                <div className="truncate">
                  <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(idx)}
                className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-full transition-colors shrink-0"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted transition-colors font-medium"
        >
          Back
        </button>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={nextStep}
            className="px-6 py-3 rounded-lg text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            Skip for now
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="px-6 py-3 rounded-lg bg-charcoal-900 text-white hover:bg-charcoal-800 transition-colors font-medium shadow-sm"
          >
            Continue to AI Review
          </button>
        </div>
      </div>
    </GlassCard>
  );
};
