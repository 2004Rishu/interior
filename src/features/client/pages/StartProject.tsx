import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { projectsRepository } from '../../../api/projects.repository';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Card } from '../../../components/ui/Card';
import { GeminiMatchmaker } from '../../ai/components/GeminiMatchmaker';

const projectSchema = z.object({
  projectType: z.string().min(1, 'Please select a project type.'),
  roomType: z.string().min(2, 'Room type is required'),
  city: z.string().min(2, 'City and State are required'),
  budget: z.string().min(1, 'Please select a budget range'),
  style: z.string().min(2, 'Style preference is required'),
  designerId: z.string().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function StartProject() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preSelectedDesignerId = searchParams.get('designerId');

  const { user } = useAuth(); // If no user, we will fallback to a default client in repo for demo

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectType: undefined,
      roomType: '',
      city: '',
      budget: '',
      style: '',
      designerId: preSelectedDesignerId || undefined,
    },
    mode: 'onTouched',
  });

  const projectType = watch('projectType');
  const formData = watch();

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger(['projectType']);
    } else if (step === 2) {
      isValid = await trigger(['roomType', 'style']);
    } else if (step === 3) {
      isValid = await trigger(['budget', 'city']);
    }

    if (isValid) {
      // If we have a pre-selected designer and we are on step 3, we can skip step 4 (matchmaker)
      if (step === 3 && preSelectedDesignerId) {
        handleSubmit(onSubmit)();
      } else {
        setStep((s) => s + 1);
      }
    }
  };

  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      await projectsRepository.create({
        clientId: user?.id || 'c1',
        designerId: data.designerId,
        title: `${data.projectType} - ${data.roomType}`,
        roomType: data.roomType,
        style: data.style,
        budget: data.budget,
      });
      toast.success('Project details submitted successfully!');
      
      // Route to dashboard
      navigate('/dashboard/client');
    } catch (error) {
      toast.error('Failed to submit project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDesignerSelect = (designerId: string) => {
    setValue('designerId', designerId);
    handleSubmit(onSubmit)();
  };

  return (
    <div className="min-h-[80vh] bg-background py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-serif text-foreground">Start Your Project</h1>
          <p className="mt-4 text-muted-foreground">Tell us about your space. Free consultation, no obligation.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12 flex items-center justify-center space-x-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  step >= i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
              >
                {step > i ? <Check size={16} /> : i}
              </div>
              {i < 4 && (
                <div
                  className={`h-1 w-12 mx-2 rounded transition-colors ${
                    step > i ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <Card className="p-8 md:p-12 shadow-sm relative overflow-hidden">
          <form onSubmit={(e) => { e.preventDefault(); /* handled manually for multi-step */ }}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-serif text-foreground">What type of project is this?</h2>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                      { id: 'Full Remodel', label: 'Full Remodel', desc: 'Complete teardown & rebuild' },
                      { id: 'Furnishing & Decor', label: 'Furnishing & Decor', desc: 'Styling existing spaces' },
                      { id: 'New Construction', label: 'New Construction', desc: 'Building from scratch' },
                      { id: 'Consultation', label: 'Consultation Only', desc: 'Expert advice & ideas' },
                    ].map((type) => (
                      <label
                        key={type.id}
                        className={`relative flex cursor-pointer rounded-lg border p-4 transition-colors hover:bg-muted/50 ${
                          projectType === type.id ? 'border-primary bg-primary/5' : 'border-border bg-background'
                        }`}
                      >
                        <input
                          type="radio"
                          value={type.id}
                          className="peer sr-only"
                          {...register('projectType')}
                        />
                        <div className="flex flex-col">
                          <span className={`font-medium ${projectType === type.id ? 'text-primary' : 'text-foreground'}`}>
                            {type.label}
                          </span>
                          <span className="mt-1 text-sm text-muted-foreground">
                            {type.desc}
                          </span>
                        </div>
                        {projectType === type.id && (
                          <Check className="absolute right-4 top-4 text-primary" size={20} />
                        )}
                      </label>
                    ))}
                  </div>
                  {errors.projectType && <p className="text-sm text-destructive">{errors.projectType.message}</p>}
                  
                  <div className="flex justify-end pt-6">
                    <Button type="button" onClick={nextStep} disabled={!projectType}>
                      Continue <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-serif text-foreground">Tell us about the space.</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Room Type</label>
                      <Input
                        {...register('roomType')}
                        placeholder="e.g. Master Bedroom, Garage, Full House"
                        error={!!errors.roomType}
                        helperText={errors.roomType?.message}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Style Preferences</label>
                      <Input
                        {...register('style')}
                        placeholder="e.g. Modern Minimalist, Industrial, Transitional"
                        error={!!errors.style}
                        helperText={errors.style?.message}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-6">
                    <Button type="button" variant="ghost" onClick={prevStep}>
                      <ArrowLeft size={16} className="mr-2" /> Back
                    </Button>
                    <Button type="button" onClick={nextStep}>
                      Continue <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-2xl font-serif text-foreground">Final details.</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Budget Range</label>
                      <Select
                        {...register('budget')}
                        error={!!errors.budget}
                        helperText={errors.budget?.message}
                        options={[
                          { value: 'under_5k', label: 'Under $5,000' },
                          { value: '5k_20k', label: '$5,000 - $20,000' },
                          { value: '20k_50k', label: '$20,000 - $50,000' },
                          { value: '50k_plus', label: '$50,000+' },
                        ]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">City & State</label>
                      <Input
                        {...register('city')}
                        placeholder="e.g. Austin, TX"
                        error={!!errors.city}
                        helperText={errors.city?.message}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-6">
                    <Button type="button" variant="ghost" onClick={prevStep} disabled={isSubmitting}>
                      <ArrowLeft size={16} className="mr-2" /> Back
                    </Button>
                    <Button type="button" onClick={nextStep} disabled={isSubmitting} isLoading={isSubmitting}>
                      {preSelectedDesignerId ? 'Submit Request' : 'Find Matches'} 
                      {!preSelectedDesignerId && <ArrowRight size={16} className="ml-2" />}
                      {preSelectedDesignerId && <Check size={16} className="ml-2" />}
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 4 && !preSelectedDesignerId && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="mb-4">
                    <Button type="button" variant="ghost" onClick={prevStep} disabled={isSubmitting} className="mb-6">
                      <ArrowLeft size={16} className="mr-2" /> Back to details
                    </Button>
                    <h2 className="text-2xl font-serif text-foreground mb-2">Your Matches</h2>
                  </div>
                  
                  <GeminiMatchmaker 
                    projectDetails={{
                      roomType: formData.roomType,
                      style: formData.style,
                      budget: formData.budget,
                      city: formData.city,
                    }}
                    onSelectDesigner={handleDesignerSelect}
                  />

                  {/* Fallback if they just want to submit without selecting */}
                  <div className="pt-8 border-t border-border mt-8 text-center">
                    <p className="text-muted-foreground text-sm mb-4">Or skip matchmaker and let our curation team assign a designer</p>
                    <Button type="button" variant="outline" onClick={() => handleSubmit(onSubmit)()} disabled={isSubmitting} isLoading={isSubmitting}>
                      Skip & Submit Request <Check size={16} className="ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Card>
      </div>
    </div>
  );
}
