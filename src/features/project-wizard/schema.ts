import { z } from 'zod';

export const customerDetailsSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  mobile: z.string().min(10, 'Valid mobile number is required'),
  whatsapp: z.string().optional(),
  contactMethod: z.string().min(1, 'Please select a contact method'),
  consultationType: z.string().min(1, 'Please select a consultation type'),
  language: z.string().min(1, 'Please select a language'),
  timeZone: z.string().optional(),
  existingCustomer: z.enum(['yes', 'no']),
  referralSource: z.string().optional(),
});

export const propertyInfoSchema = z.object({
  propertyType: z.string().min(1, 'Property type is required'),
  propertyName: z.string().min(1, 'Property name/number is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  buildingAge: z.string().optional(),
  constructionStatus: z.enum(['new', 'renovation']),
  possessionStatus: z.string().optional(),
  carpetArea: z.number().min(100, 'Carpet area must be at least 100 sq ft'),
  totalFloors: z.number().optional(),
  liftAvailability: z.boolean().default(false),
});

export const homeConfigSchema = z.object({
  configuration: z.string().min(1, 'Configuration is required'),
});

export const roomSchema = z.object({
  id: z.string(),
  roomName: z.string().min(1, 'Room name is required'),
  roomType: z.string().min(1, 'Room type is required'),
  length: z.number().optional(),
  width: z.number().optional(),
  priority: z.enum(['high', 'medium', 'low']).default('medium'),
  renovationRequired: z.boolean().default(true),
});

export const roomPlannerSchema = z.object({
  rooms: z.array(roomSchema).min(1, 'At least one room is required'),
});

export const designSchema = z.object({
  stylePreferences: z.array(z.string()).default([]),
  materialPreference: z.string().optional(),
});

export const smartHomeSchema = z.object({
  wantsSmartHome: z.boolean().optional(),
  features: z.array(z.string()).default([]),
});

export const budgetSchema = z.object({
  minAmount: z.number().default(500000),
  maxAmount: z.number().default(1000000),
  priority: z.enum(['cost-effective', 'balanced', 'premium', 'luxury']).default('balanced'),
  package: z.string().optional(),
});

export const preferencesSchema = z.object({
  assignedDesigner: z.string().optional(),
});

export const fileManagerSchema = z.object({
  files: z.array(z.any()).default([]),
});

// The master schema combining everything
export const projectWizardSchema = z.object({
  customer: customerDetailsSchema,
  property: propertyInfoSchema,
  homeConfig: homeConfigSchema,
  roomPlanner: roomPlannerSchema,
  design: designSchema,
  smartHome: smartHomeSchema,
  budget: budgetSchema,
  preferences: preferencesSchema,
  files: fileManagerSchema,
});

export type ProjectWizardData = z.infer<typeof projectWizardSchema>;

// Default values for new projects
export const defaultWizardData: Partial<ProjectWizardData> = {
  customer: {
    existingCustomer: 'no',
    contactMethod: 'whatsapp',
    consultationType: 'video',
    language: 'english',
    fullName: '',
    email: '',
    mobile: '',
  },
  property: {
    constructionStatus: 'new',
    liftAvailability: false,
    propertyType: 'new-home',
    propertyName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    carpetArea: 1000,
  },
  homeConfig: {
    configuration: '',
  },
  roomPlanner: {
    rooms: [],
  },
  design: {
    stylePreferences: [],
    materialPreference: 'premium',
  },
  smartHome: {
    features: [],
  },
  budget: {
    minAmount: 500000,
    maxAmount: 1000000,
    priority: 'balanced',
  },
  preferences: {
    assignedDesigner: '',
  },
  files: {
    files: [],
  },
};
