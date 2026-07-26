import { z } from 'zod';

const envSchema = z.object({
  VITE_GEMINI_API_KEY: z.string().min(1, 'VITE_GEMINI_API_KEY is required.'),
  VITE_API_URL: z.string().optional(),
});

const getEnv = () => {
  const env = {
    VITE_GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
    VITE_API_URL: import.meta.env.VITE_API_URL,
  };

  const parsed = envSchema.safeParse(env);

  if (!parsed.success) {
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors
    );
    throw new Error('Invalid environment variables. Check console for details.');
  }

  return parsed.data;
};

export const env = getEnv();
