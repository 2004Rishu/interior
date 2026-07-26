import { GoogleGenAI } from '@google/genai';
import { designersRepository } from './designers.repository';

// Initialize the Gemini client
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || 'mock-key' });

export interface MatchResult {
  designerId: string;
  name: string;
  matchScore: number; // 0 to 100
  rationale: string;
}

class AiRepository {
  async generateProjectSummary(prompt: string): Promise<string> {
    if (!apiKey) {
      return `[Mock AI Summary]: Based on "${prompt}", we recommend focusing on natural light and minimal textures.`;
    }
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || '';
  }

  async getTopMatches(projectDetails: { roomType: string; style: string; budget: string; city: string }): Promise<MatchResult[]> {
    const allDesigners = await designersRepository.getAll();
    
    // Create a prompt that injects the designer data
    const prompt = `
      You are an expert interior design matchmaker. 
      I have a client with the following project requirements:
      Room Type: ${projectDetails.roomType}
      Style Preferences: ${projectDetails.style}
      Budget: ${projectDetails.budget}
      City: ${projectDetails.city}

      Here is our directory of available interior designers in JSON format:
      ${JSON.stringify(allDesigners.map(d => ({
        id: d.id,
        name: d.name,
        city: d.city,
        styles: d.styles,
        experienceYears: d.experienceYears,
        bio: d.bio,
        rating: d.rating
      })))}

      Analyze the designers and select the top 3 best fits for the client.
      Return exactly a JSON array of objects with the following schema:
      [
        {
          "designerId": "string",
          "name": "string",
          "matchScore": number (0-100),
          "rationale": "string explaining exactly why this designer is a good fit based on the client's criteria"
        }
      ]
      Only return valid JSON without markdown block wrappers.
    `;

    if (!apiKey) {
      // Return mock matches if no API key is provided
      return allDesigners.slice(0, 3).map((d, index) => ({
        designerId: d.id,
        name: d.name,
        matchScore: 95 - (index * 5),
        rationale: `This is a simulated AI response. ${d.name} matches your criteria well.`,
      }));
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
      });
      
      const text = response.text || '[]';
      const parsedMatches: MatchResult[] = JSON.parse(text);
      return parsedMatches;
    } catch (err) {
      console.error('Failed to generate AI matches', err);
      // Fallback
      return allDesigners.slice(0, 3).map((d, index) => ({
        designerId: d.id,
        name: d.name,
        matchScore: 95 - (index * 5),
        rationale: `Fallback response due to API error. ${d.name} might be a good fit.`,
      }));
    }
  }
}

export const aiRepository = new AiRepository();
