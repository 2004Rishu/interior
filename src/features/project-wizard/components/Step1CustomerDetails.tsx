import React from 'react';
import { useWizard } from '../context/WizardContext';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { GlassCard } from '../../../components/ui/GlassCard';
import { Button } from '../../../components/ui/Button';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const Step1CustomerDetails: React.FC = () => {
  const { form, nextStep } = useWizard();
  const { register, formState: { errors } } = form;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-serif text-foreground">Customer Details</h2>
        <p className="mt-2 text-muted-foreground">Let's start by getting to know you.</p>
      </div>

      <GlassCard className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <Input
              {...register('customer.fullName')}
              placeholder="John Doe"
              error={!!errors.customer?.fullName}
              helperText={errors.customer?.fullName?.message}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <Input
              type="email"
              {...register('customer.email')}
              placeholder="john@example.com"
              error={!!errors.customer?.email}
              helperText={errors.customer?.email?.message}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Mobile Number</label>
            <Input
              type="tel"
              {...register('customer.mobile')}
              placeholder="+1 234 567 8900"
              error={!!errors.customer?.mobile}
              helperText={errors.customer?.mobile?.message}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">WhatsApp Number (Optional)</label>
            <Input
              type="tel"
              {...register('customer.whatsapp')}
              placeholder="Same as mobile"
              error={!!errors.customer?.whatsapp}
              helperText={errors.customer?.whatsapp?.message}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Preferred Contact Method</label>
            <Select
              {...register('customer.contactMethod')}
              error={!!errors.customer?.contactMethod}
              helperText={errors.customer?.contactMethod?.message}
              options={[
                { value: 'whatsapp', label: 'WhatsApp' },
                { value: 'phone', label: 'Phone Call' },
                { value: 'email', label: 'Email' },
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Consultation Type</label>
            <Select
              {...register('customer.consultationType')}
              error={!!errors.customer?.consultationType}
              helperText={errors.customer?.consultationType?.message}
              options={[
                { value: 'video', label: 'Video Call (Virtual)' },
                { value: 'site', label: 'Site Visit (In-Person)' },
                { value: 'office', label: 'Office Meeting' },
              ]}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Language</label>
            <Select
              {...register('customer.language')}
              error={!!errors.customer?.language}
              helperText={errors.customer?.language?.message}
              options={[
                { value: 'english', label: 'English' },
                { value: 'spanish', label: 'Spanish' },
                { value: 'hindi', label: 'Hindi' },
                { value: 'french', label: 'French' },
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Existing Customer?</label>
            <Select
              {...register('customer.existingCustomer')}
              error={!!errors.customer?.existingCustomer}
              helperText={errors.customer?.existingCustomer?.message}
              options={[
                { value: 'no', label: 'No, I am a new customer' },
                { value: 'yes', label: 'Yes, I have worked with you before' },
              ]}
            />
          </div>
        </div>
      </GlassCard>

      <div className="flex justify-end pt-6">
        <Button type="button" onClick={nextStep} className="px-8">
          Next Step <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};
