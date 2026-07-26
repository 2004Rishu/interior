import { delay } from './delay';

class AdminRepository {
  async getPlatformStats(): Promise<{ totalUsers: number, activeProjects: number }> {
    await delay(600);
    return { totalUsers: 150, activeProjects: 24 };
  }
}

export const adminRepository = new AdminRepository();
