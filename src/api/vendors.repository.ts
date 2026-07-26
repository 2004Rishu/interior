import { delay } from './delay';

export interface Vendor {
  id: string;
  name: string;
  serviceType: string;
  verified: boolean;
}

const mockVendors: Vendor[] = [];

class VendorsRepository {
  async getAll(): Promise<Vendor[]> {
    await delay(500);
    return mockVendors;
  }
}

export const vendorsRepository = new VendorsRepository();
