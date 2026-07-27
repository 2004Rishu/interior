import React from 'react';
import { useWizard } from '../context/WizardContext';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { GlassCard } from '../../../components/ui/GlassCard';
import { Button } from '../../../components/ui/Button';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export const Step2PropertyInfo: React.FC = () => {
  const { form, nextStep, prevStep } = useWizard();
  const { register, formState: { errors } } = form;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-serif text-foreground">Property Information</h2>
        <p className="mt-2 text-muted-foreground">Tell us about the property you'd like us to work on.</p>
      </div>

      <GlassCard className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Property Type</label>
            <Select
              {...register('property.propertyType')}
              error={!!errors.property?.propertyType}
              helperText={errors.property?.propertyType?.message}
              options={[
                { value: 'apartment', label: 'Apartment' },
                { value: 'villa', label: 'Villa' },
                { value: 'independent_house', label: 'Independent House' },
                { value: 'duplex', label: 'Duplex' },
                { value: 'penthouse', label: 'Penthouse' },
                { value: 'commercial_office', label: 'Commercial Office' },
                { value: 'restaurant', label: 'Restaurant' },
                { value: 'retail_shop', label: 'Retail Shop' },
              ]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Project Type</label>
            <Select
              {...register('property.constructionStatus')}
              error={!!errors.property?.constructionStatus}
              helperText={errors.property?.constructionStatus?.message}
              options={[
                { value: 'new', label: 'New Construction / Bare Shell' },
                { value: 'renovation', label: 'Renovation / Remodeling' },
              ]}
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Property Name / Society / Building Name</label>
            <Input
              {...register('property.propertyName')}
              placeholder="e.g. Prestige Shantiniketan"
              error={!!errors.property?.propertyName}
              helperText={errors.property?.propertyName?.message}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Complete Address</label>
            <Input
              {...register('property.address')}
              placeholder="House/Flat No, Street, Landmark"
              error={!!errors.property?.address}
              helperText={errors.property?.address?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <Input
              {...register('property.city')}
              placeholder="e.g. Bangalore"
              error={!!errors.property?.city}
              helperText={errors.property?.city?.message}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">State</label>
            <Input
              {...register('property.state')}
              placeholder="e.g. Karnataka"
              error={!!errors.property?.state}
              helperText={errors.property?.state?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">ZIP Code</label>
            <Input
              {...register('property.zipCode')}
              placeholder="e.g. 560048"
              error={!!errors.property?.zipCode}
              helperText={errors.property?.zipCode?.message}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Carpet Area (sq ft)</label>
            <Input
              type="number"
              {...register('property.carpetArea', { valueAsNumber: true })}
              placeholder="1200"
              error={!!errors.property?.carpetArea}
              helperText={errors.property?.carpetArea?.message}
            />
          </div>
        </div>
      </GlassCard>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="ghost" onClick={prevStep}>
          <ArrowLeft size={16} className="mr-2" /> Previous
        </Button>
        <Button type="button" onClick={nextStep} className="px-8">
          Next Step <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};
