import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import { Sparkles, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { aiRepository } from '../../../api/ai.repository';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Skeleton } from '../../../components/ui/Skeleton';
import { Badge } from '../../../components/ui/Badge';
import { designersRepository } from '../../../api/designers.repository';

interface ProjectDetails {
  roomType: string;
  style: string;
  budget: string;
  city: string;
}

interface GeminiMatchmakerProps {
  projectDetails: ProjectDetails;
  onSelectDesigner?: (designerId: string) => void;
}

export function GeminiMatchmaker({ projectDetails, onSelectDesigner }: GeminiMatchmakerProps) {
  const [hasStarted, setHasStarted] = useState(false);

  const { data: matches, isLoading } = useQuery({
    queryKey: ['ai-matches', projectDetails],
    queryFn: () => aiRepository.getTopMatches(projectDetails),
    enabled: hasStarted,
  });

  // Fetch full designer details for the matches
  const { data: designers } = useQuery({
    queryKey: ['designers'],
    queryFn: () => designersRepository.getAll(),
    enabled: hasStarted, // Optimization to load when started
  });

  return (
    <div className="w-full space-y-6">
      {!hasStarted ? (
        <Card className="bg-primary/5 border-primary/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10">
            <Sparkles className="w-48 h-48 text-primary" />
          </div>
          <CardContent className="p-8 md:p-12 text-center relative z-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
              <Sparkles size={32} className="text-primary" />
            </div>
            <h3 className="text-2xl font-serif text-foreground mb-4">Let our AI find your perfect match</h3>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Gemini AI will analyze your project requirements, location, and style preferences against our directory of premium designers to recommend the top 3 best fits.
            </p>
            <Button onClick={() => setHasStarted(true)} size="lg" className="px-8">
              Generate Matches <Sparkles size={16} className="ml-2" />
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <Sparkles className="text-primary animate-pulse" />
            <h3 className="text-xl font-serif text-foreground">AI Recommendations</h3>
          </div>
          
          <AnimatePresence>
            {isLoading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 text-muted-foreground mb-6">
                  <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  <span className="text-sm font-medium">Analyzing designer portfolios and styles...</span>
                </div>
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <Skeleton className="h-20 w-20 rounded-full" />
                        <div className="flex-1 space-y-3">
                          <Skeleton className="h-6 w-1/3" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-5/6" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            ) : matches && matches.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {matches.map((match, index) => {
                  const fullDesigner = designers?.find(d => d.id === match.designerId);
                  
                  return (
                    <Card key={match.designerId} className="overflow-hidden border-primary/20 transition-all hover:border-primary hover:shadow-md">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex flex-col items-center gap-3 shrink-0">
                            <div className="relative">
                              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20">
                                {fullDesigner ? (
                                  <img src={fullDesigner.imageUrl} alt={fullDesigner.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full bg-muted flex items-center justify-center">
                                    <User className="text-muted-foreground" />
                                  </div>
                                )}
                              </div>
                              <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                                {match.matchScore}% Match
                              </div>
                            </div>
                            {index === 0 && (
                              <Badge variant="default" className="w-full justify-center mt-2">Top Pick</Badge>
                            )}
                          </div>
                          
                          <div className="flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-xl font-serif text-foreground">{match.name}</h4>
                            </div>
                            
                            <p className="text-sm text-muted-foreground leading-relaxed italic mb-4 bg-muted/30 p-3 rounded-lg border border-border/50">
                              "{match.rationale}"
                            </p>
                            
                            <div className="mt-auto flex justify-between items-center">
                              <Link to={`/designers/${match.designerId}`} className="text-sm font-medium text-primary hover:underline">
                                View Full Profile
                              </Link>
                              
                              {onSelectDesigner && (
                                <Button onClick={() => onSelectDesigner(match.designerId)} size="sm">
                                  Select Designer <ArrowRight size={16} className="ml-2" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
