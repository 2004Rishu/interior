import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, CheckCircle2 } from 'lucide-react';
import { RoomCategory } from '../../../api/homepage-data';

interface AskAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: RoomCategory | null;
}

export const AskAIModal: React.FC<AskAIModalProps> = ({ isOpen, onClose, room }) => {
  if (!room) return null;

  // Simulated AI Data based on the room category
  const aiData = {
    houseType: room.category === 'Living' ? 'Villas, Large Apartments, Penthouses' : 
               room.category === 'Kitchen' ? 'Modern Apartments, Independent Houses' : 'All residential properties',
    budget: `${room.startingPrice} - ${(parseFloat(room.startingPrice.replace(/[^0-9.]/g, '')) * 1.8).toFixed(1)}L (Depending on materials)`,
    colors: room.popularStyle.includes('Modern') ? 'Neutral greys, crisp whites, warm woods' : 'Deep earth tones, beige, soft pastels',
    materials: room.category === 'Kitchen' ? 'Quartz countertops, High-gloss acrylic, HDF' : 
               room.category === 'Bathroom' ? 'Anti-slip vitrified tiles, Marble, Brass fixtures' : 'Engineered wood, Teak, Premium fabric',
    lighting: room.category === 'Living' ? 'Layered lighting (Ambient + Accent), Statement Chandelier' : 'Task lighting, Under-cabinet LED strips',
    maintenance: 'Requires weekly dusting. Use non-abrasive cleaners for surfaces. Annual check for hardware tightening.'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-charcoal-950/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4"
          >
            <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-charcoal-900 shadow-2xl border border-border">
              {/* Header */}
              <div className="bg-primary/10 border-b border-primary/20 p-6 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 text-primary font-medium mb-1">
                    <Sparkles size={18} /> Gemini AI Analysis
                  </div>
                  <h3 className="text-xl font-serif text-foreground">Design Insights for {room.name}</h3>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 text-muted-foreground hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid gap-4">
                  
                  <div className="bg-sand-50 dark:bg-black/20 p-4 rounded-xl border border-border">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Suitable House Type</h4>
                    <p className="text-foreground">{aiData.houseType}</p>
                  </div>

                  <div className="bg-sand-50 dark:bg-black/20 p-4 rounded-xl border border-border">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Estimated Budget Range</h4>
                    <p className="text-foreground font-medium text-primary">{aiData.budget}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-sand-50 dark:bg-black/20 p-4 rounded-xl border border-border">
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Recommended Colors</h4>
                      <p className="text-foreground text-sm">{aiData.colors}</p>
                    </div>
                    <div className="bg-sand-50 dark:bg-black/20 p-4 rounded-xl border border-border">
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Materials</h4>
                      <p className="text-foreground text-sm">{aiData.materials}</p>
                    </div>
                  </div>

                   <div className="bg-sand-50 dark:bg-black/20 p-4 rounded-xl border border-border">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Lighting Recommendations</h4>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                      <p className="text-foreground text-sm">{aiData.lighting}</p>
                    </div>
                  </div>

                   <div className="bg-sand-50 dark:bg-black/20 p-4 rounded-xl border border-border">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Maintenance Advice</h4>
                    <p className="text-foreground text-sm">{aiData.maintenance}</p>
                  </div>

                </div>
              </div>
              
              {/* Footer */}
              <div className="p-6 border-t border-border bg-muted/30">
                <p className="text-xs text-center text-muted-foreground">
                  AI recommendations are simulated estimates and may vary based on actual site conditions.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
