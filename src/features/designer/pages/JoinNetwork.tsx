import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Check, UploadCloud } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Card } from '../../../components/ui/Card';
import { PortfolioManager } from '../components/PortfolioManager';

const designerSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  city: z.string().min(2, 'City and State are required'),
  experienceYears: z.number().min(0, 'Must be a valid number'),
  styles: z.string().min(2, 'Style preference is required'),
  portfolioImages: z.array(z.string()).min(1, 'Please upload at least one portfolio image'),
});

type DesignerFormData = z.infer<typeof designerSchema>;

export default function JoinNetwork() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<DesignerFormData>({
    resolver: zodResolver(designerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      city: '',
      experienceYears: 0,
      styles: '',
      portfolioImages: [],
    },
    mode: 'onTouched',
  });

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger(['firstName', 'lastName', 'email', 'city']);
    } else if (step === 2) {
      isValid = await trigger(['experienceYears', 'styles']);
    }

    if (isValid) {
      setStep((s) => s + 1);
    }
  };

  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = async (data: DesignerFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Application submitted successfully!');
      setStep(4);
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero */}
      <section className="bg-foreground py-24 text-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-serif sm:text-5xl md:text-6xl text-background">Grow your design practice.</h1>
            <p className="mt-6 text-xl text-muted font-light max-w-2xl">
              Join our vetted network of premium interior designers. We connect you with high-intent clients whose style and budget align perfectly with your expertise.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            
            {/* Value Prop */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-serif text-foreground mb-8">Why Interior Me?</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium text-foreground">Pre-Qualified Leads</h3>
                  <p className="mt-2 text-muted-foreground">We do the heavy lifting of vetting clients, budgets, and project scope before they ever reach your inbox.</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-foreground">No Upfront Costs</h3>
                  <p className="mt-2 text-muted-foreground">Joining our network is free. We only earn a transparent commission when you secure a signed contract.</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-foreground">Focus on Design</h3>
                  <p className="mt-2 text-muted-foreground">Spend less time marketing and more time doing what you do best: creating beautiful spaces.</p>
                </div>
              </div>

              <div className="mt-12 bg-muted/30 p-8 rounded-lg">
                <h3 className="font-serif text-xl text-foreground mb-4">The Review Process</h3>
                <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                  <li>Submit your portfolio and details.</li>
                  <li>Our curation team reviews your work.</li>
                  <li>Brief interview to understand your ideal client.</li>
                  <li>Welcome to the network.</li>
                </ol>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <Card className="p-8 md:p-12 shadow-sm relative overflow-hidden">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h2 className="text-2xl font-serif text-foreground mb-6">Professional Details</h2>
                        
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-1">First Name</label>
                            <Input
                              {...register('firstName')}
                              error={!!errors.firstName}
                              helperText={errors.firstName?.message}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-1">Last Name</label>
                            <Input
                              {...register('lastName')}
                              error={!!errors.lastName}
                              helperText={errors.lastName?.message}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                          <Input
                            {...register('email')}
                            type="email"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">City & State</label>
                          <Input
                            {...register('city')}
                            placeholder="e.g. Austin, TX"
                            error={!!errors.city}
                            helperText={errors.city?.message}
                          />
                        </div>

                        <div className="flex justify-end pt-6">
                          <Button type="button" onClick={nextStep}>
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
                        className="space-y-6"
                      >
                        <h2 className="text-2xl font-serif text-foreground mb-6">Experience & Styles</h2>
                        
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">Years of Experience</label>
                          <Input
                            {...register('experienceYears', { valueAsNumber: true })}
                            type="number"
                            min="0"
                            error={!!errors.experienceYears}
                            helperText={errors.experienceYears?.message}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1">Signature Styles</label>
                          <Input
                            {...register('styles')}
                            placeholder="e.g. Modern, Minimalist, Coastal (comma separated)"
                            error={!!errors.styles}
                            helperText={errors.styles?.message}
                          />
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
                        className="space-y-6"
                      >
                        <h2 className="text-2xl font-serif text-foreground mb-2">Upload Portfolio</h2>
                        <p className="text-muted-foreground text-sm mb-6">Showcase your best work. Upload at least one image.</p>
                        
                        <Controller
                          control={control}
                          name="portfolioImages"
                          render={({ field }) => (
                            <PortfolioManager
                              images={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                        {errors.portfolioImages && (
                          <p className="text-sm text-red-500 mt-2">{errors.portfolioImages.message}</p>
                        )}

                        <div className="flex justify-between pt-6">
                          <Button type="button" variant="ghost" onClick={prevStep} disabled={isSubmitting}>
                            <ArrowLeft size={16} className="mr-2" /> Back
                          </Button>
                          <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
                            Submit Application <Check size={16} className="ml-2" />
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {step === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/20 mb-6">
                          <Check size={32} className="text-success" />
                        </div>
                        <h2 className="text-3xl font-serif text-foreground mb-4">Application Received</h2>
                        <p className="text-muted-foreground mb-8">
                          Thank you for applying to join Interior Me. Our curation team will review your portfolio and be in touch within 3-5 business days.
                        </p>
                        <Button asChild variant="outline">
                          <Link to="/">Return Home</Link>
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
