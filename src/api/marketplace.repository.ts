import { delay } from './delay';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  vendorId: string;
}

const mockProducts: Product[] = [];

class MarketplaceRepository {
  async getAll(): Promise<Product[]> {
    await delay(500);
    return mockProducts;
  }
}

export const marketplaceRepository = new MarketplaceRepository();
