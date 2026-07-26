import { delay, simulateError } from './delay';

export type ProjectStatus = 'draft' | 'matched' | 'in_progress' | 'review' | 'completed';

export interface Project {
  id: string;
  clientId: string;
  designerId?: string;
  title: string;
  roomType: string;
  style: string;
  budget: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}

const mockProjects: Project[] = [
  {
    id: 'p1',
    clientId: 'c1',
    designerId: '1',
    title: 'Modern Living Room Upgrade',
    roomType: 'Living Room',
    style: 'Modern Minimalist',
    budget: '$5,000 - $10,000',
    status: 'in_progress',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

class ProjectsRepository {
  async getByClientId(clientId: string): Promise<Project[]> {
    await delay(600);
    simulateError(0.05);
    return mockProjects.filter(p => p.clientId === clientId || 'c1' === clientId); // 'c1' is fallback for demo
  }

  async getByDesignerId(designerId: string): Promise<Project[]> {
    await delay(600);
    return mockProjects.filter(p => p.designerId === designerId);
  }

  async create(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<Project> {
    await delay(1000);
    const newProject: Project = {
      ...project,
      id: 'mock-proj-' + Math.random().toString(36).substr(2, 9),
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockProjects.push(newProject);
    return newProject;
  }
}

export const projectsRepository = new ProjectsRepository();
