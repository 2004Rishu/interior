import { delay } from './delay';

export interface Payment {
  id: string;
  projectId: string;
  amount: number;
  status: 'pending' | 'paid';
  date: string;
}

const mockPayments: Payment[] = [];

class PaymentsRepository {
  async getByProject(projectId: string): Promise<Payment[]> {
    await delay(400);
    return mockPayments.filter(p => p.projectId === projectId);
  }
}

export const paymentsRepository = new PaymentsRepository();
