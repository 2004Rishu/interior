import { delay, simulateError } from './delay';
import { MOCK_DESIGNERS } from './mocks';
import { type Designer } from '../types/models';

class DesignersRepository {
  async getAll(): Promise<Designer[]> {
    await delay(600);
    simulateError(0.02);
    return MOCK_DESIGNERS;
  }

  async getById(id: string): Promise<Designer | undefined> {
    await delay(400);
    simulateError(0.02);
    return MOCK_DESIGNERS.find((d) => d.id === id);
  }

  async getByCity(city: string): Promise<Designer[]> {
    await delay(500);
    return MOCK_DESIGNERS.filter((d) => d.city.toLowerCase().includes(city.toLowerCase()));
  }
}

export const designersRepository = new DesignersRepository();
