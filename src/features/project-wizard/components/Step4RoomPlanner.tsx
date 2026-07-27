import React from 'react';
import { useWizard } from '../context/WizardContext';
import { GlassCard } from '../../../components/ui/GlassCard';
import { Plus, Minus, Sofa, Utensils, BedDouble, Bath, Car, Trees, Box } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';

const ROOM_TYPES = [
  { id: 'living', label: 'Living Room', icon: Sofa },
  { id: 'kitchen', label: 'Kitchen', icon: Utensils },
  { id: 'bedroom', label: 'Bedroom', icon: BedDouble },
  { id: 'bathroom', label: 'Bathroom', icon: Bath },
  { id: 'balcony', label: 'Balcony', icon: Trees },
  { id: 'garage', label: 'Garage', icon: Car },
  { id: 'other', label: 'Other Space', icon: Box },
];

export const Step4RoomPlanner: React.FC = () => {
  const { form, nextStep, prevStep } = useWizard();
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'roomPlanner.rooms',
  });

  const handleAddRoom = (typeId: string, label: string) => {
    append({
      id: Math.random().toString(36).substring(7),
      roomType: typeId,
      roomName: label,
      priority: 'medium',
      renovationRequired: true,
    });
  };

  return (
    <GlassCard className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-foreground">Room Planner</h2>
        <p className="mt-2 text-muted-foreground">Select the spaces you want to design to help us calculate material costs.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {ROOM_TYPES.map((type) => {
          const Icon = type.icon;
          const count = (fields as any[]).filter(f => f.roomType === type.id).length;
          
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => handleAddRoom(type.id, type.label)}
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-white hover:border-primary/40 hover:bg-muted/50 transition-all group relative"
            >
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
                  {count}
                </span>
              )}
              <div className="p-3 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <Icon size={24} />
              </div>
              <span className="mt-3 text-sm font-medium text-foreground">{type.label}</span>
            </button>
          );
        })}
      </div>

      {fields.length > 0 && (
        <div className="bg-muted/30 p-6 rounded-2xl border border-border mb-8 space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Added Spaces</h3>
          {fields.map((field: any, index) => (
            <div key={field.id} className="flex items-center justify-between bg-white p-4 rounded-xl border border-border shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">{field.roomName}</span>
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                title="Remove space"
              >
                <Minus size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {form.formState.errors.roomPlanner?.rooms && (
        <p className="mt-4 text-sm text-red-500">{form.formState.errors.roomPlanner.rooms.message}</p>
      )}

      <div className="mt-10 flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted transition-colors font-medium"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-3 rounded-lg bg-charcoal-900 text-white hover:bg-charcoal-800 transition-colors font-medium shadow-sm"
          disabled={fields.length === 0}
        >
          Continue to Design Style
        </button>
      </div>
    </GlassCard>
  );
};
