export interface StorageAdapter {
  uploadFile(file: File, path: string): Promise<string>;
  deleteFile(path: string): Promise<void>;
  getFileUrl(path: string): Promise<string>;
}

export class MockStorageAdapter implements StorageAdapter {
  async uploadFile(file: File, path: string): Promise<string> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return URL.createObjectURL(file);
  }

  async deleteFile(path: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log(`Mock deleted file at ${path}`);
  }

  async getFileUrl(path: string): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return `mock-url-for-${path}`;
  }
}

export const storage = new MockStorageAdapter();
