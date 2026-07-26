import { delay } from './delay';

export interface Booking {
  id: string;
  projectId: string;
  designerId: string;
  clientId: string;
  date: string;
  status: 'scheduled' | 'cancelled' | 'completed';
}

const mockBookings: Booking[] = [];

class BookingsRepository {
  async getByClient(clientId: string): Promise<Booking[]> {
    await delay(400);
    return mockBookings.filter(b => b.clientId === clientId);
  }

  async create(booking: Omit<Booking, 'id' | 'status'>): Promise<Booking> {
    await delay(800);
    const newBooking: Booking = { ...booking, id: Math.random().toString(36).substr(2, 9), status: 'scheduled' };
    mockBookings.push(newBooking);
    return newBooking;
  }
}

export const bookingsRepository = new BookingsRepository();
