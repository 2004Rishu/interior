import { delay, simulateError } from './delay';
import { Project } from '../types/models';

export interface Match {
  id: string;
  projectId: string;
  designerId: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  // Denormalized for display
  projectTitle: string;
  clientName: string;
  budget: string;
}

const mockMatches: Match[] = [
  {
    id: 'm1',
    projectId: 'p1',
    designerId: 'd1',
    status: 'pending',
    createdAt: new Date().toISOString(),
    projectTitle: 'Master Bedroom Redesign',
    clientName: 'Sarah Jenkins',
    budget: '$20k - $50k',
  },
  {
    id: 'm2',
    projectId: 'p2',
    designerId: 'd1',
    status: 'accepted',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    projectTitle: 'Kitchen Remodel',
    clientName: 'Michael Chen',
    budget: '$50k+',
  }
];

class MatchesRepository {
  async getByDesigner(designerId: string): Promise<Match[]> {
    await delay(600);
    simulateError(0.02);
    return mockMatches.filter(m => m.designerId === designerId);
  }

  async updateStatus(matchId: string, status: 'accepted' | 'declined'): Promise<Match> {
    await delay(400);
    const matchIndex = mockMatches.findIndex(m => m.id === matchId);
    if (matchIndex === -1) throw new Error('Match not found');
    
    mockMatches[matchIndex] = { ...mockMatches[matchIndex], status };
    return mockMatches[matchIndex];
  }
}

export const matchesRepository = new MatchesRepository();
