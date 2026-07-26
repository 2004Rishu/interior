import { delay, simulateError } from './delay';
import { User, UserRole } from '../context/AuthContext';

export interface LoginParams {
  phone: string;
  pin: string;
}

export interface SignupParams {
  name: string;
  phone: string;
  email: string;
  pin: string;
  role: UserRole;
  city?: string;
}

class AuthRepository {
  async login(params: LoginParams): Promise<User> {
    await delay(800);
    simulateError(0.05);

    if (params.phone === '9999999999') {
      throw new Error('Invalid credentials.');
    }

    // Mock successful login
    return {
      id: 'mock-user-' + Math.random().toString(36).substr(2, 9),
      name: 'Test User',
      phone: params.phone,
      role: 'client',
      status: 'approved',
    };
  }

  async signup(params: SignupParams): Promise<User> {
    await delay(1200);
    simulateError(0.1);

    if (params.phone === '9999999999') {
      throw new Error('Phone number already registered.');
    }

    return {
      id: 'mock-user-' + Math.random().toString(36).substr(2, 9),
      name: params.name,
      phone: params.phone,
      email: params.email,
      role: params.role,
      city: params.city,
      status: params.role === 'designer' ? 'pending' : 'approved',
    };
  }

  async logout(): Promise<void> {
    await delay(400);
  }
}

export const authRepository = new AuthRepository();
