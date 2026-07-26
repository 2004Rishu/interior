import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Briefcase, Settings, Clock, DollarSign, CheckCircle2, XCircle, TrendingUp, Users, Calendar } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { matchesRepository } from '../../../api/matches.repository';
import { projectsRepository } from '../../../api/projects.repository';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/Tabs';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Skeleton } from '../../../components/ui/Skeleton';
import { Button } from '../../../components/ui/Button';
import toast from 'react-hot-toast';

export default function DesignerDashboard() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  if (!user || user.role !== 'designer') {
    return <Navigate to="/login" replace />;
  }

  // Pending Review State
  if (user.status === 'pending') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-background py-12 px-4">
        <Card className="max-w-md w-full p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-6">
            <Clock size={32} className="text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-serif text-foreground mb-4">Application Pending Review</h1>
          <p className="text-muted-foreground leading-relaxed">
            Thank you for applying to join Interior Me, {user.name.split(' ')[0]}. 
            Our curation team is currently reviewing your portfolio and details. 
            We will notify you via email once your account is approved.
          </p>
        </Card>
      </div>
    );
  }

  const { data: matches, isLoading: isMatchesLoading } = useQuery({
    queryKey: ['matches', user.id],
    queryFn: () => matchesRepository.getByDesigner(user.id),
  });

  const { data: projects, isLoading: isProjectsLoading } = useQuery({
    queryKey: ['projects-designer', user.id],
    queryFn: () => projectsRepository.getByDesignerId(user.id),
  });

  const updateMatchMutation = useMutation({
    mutationFn: ({ matchId, status }: { matchId: string; status: 'accepted' | 'declined' }) =>
      matchesRepository.updateStatus(matchId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches', user.id] });
      toast.success('Match status updated.');
    },
    onError: () => {
      toast.error('Failed to update match status.');
    },
  });

  const activeProjects = projects?.filter(p => p.designerId === user.id) || [];
  const pendingMatches = matches?.filter(m => m.status === 'pending') || [];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-3xl font-serif text-foreground">Designer Portal</h1>
          <p className="mt-2 text-muted-foreground">Manage your leads, active projects, and profile.</p>
        </header>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue="matches">
              <TabsList className="mb-8">
                <TabsTrigger value="matches">
                  <Briefcase size={18} className="mr-2" /> Client Matches
                  {pendingMatches.length > 0 && (
                    <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-bold">
                      {pendingMatches.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="projects">
                  <Settings size={18} className="mr-2" /> Active Projects
                </TabsTrigger>
                <TabsTrigger value="analytics">
                  <TrendingUp size={18} className="mr-2" /> Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="matches">
                <div className="space-y-6">
                  {isMatchesLoading ? (
                    <>
                      <Skeleton className="h-32 w-full" />
                      <Skeleton className="h-32 w-full" />
                    </>
                  ) : pendingMatches.length > 0 ? (
                    pendingMatches.map((match) => (
                      <Card key={match.id} className="transition-colors hover:border-primary">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-xs text-muted-foreground font-mono">{match.id}</span>
                                <Badge variant="secondary">New Match</Badge>
                              </div>
                              <h3 className="text-xl font-serif text-foreground mb-1">{match.projectTitle}</h3>
                              <p className="text-sm text-muted-foreground">
                                Client: {match.clientName} • Budget: {match.budget}
                              </p>
                            </div>
                            <div className="flex gap-3 mt-4 md:mt-0">
                              <Button 
                                variant="outline" 
                                className="border-red-200 text-red-600 hover:bg-red-50"
                                onClick={() => updateMatchMutation.mutate({ matchId: match.id, status: 'declined' })}
                                disabled={updateMatchMutation.isPending}
                              >
                                <XCircle size={16} className="mr-2" /> Decline
                              </Button>
                              <Button 
                                variant="default"
                                onClick={() => updateMatchMutation.mutate({ matchId: match.id, status: 'accepted' })}
                                disabled={updateMatchMutation.isPending}
                              >
                                <CheckCircle2 size={16} className="mr-2" /> Accept Match
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card className="text-center py-12">
                      <CardContent>
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-6">
                          <Briefcase size={32} className="text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-serif text-foreground mb-2">No new matches</h3>
                        <p className="text-muted-foreground">We'll notify you when a new client matches your profile.</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="projects">
                <div className="space-y-6">
                  {isProjectsLoading ? (
                    <Skeleton className="h-48 w-full" />
                  ) : activeProjects.length > 0 ? (
                    activeProjects.map((project) => (
                      <Card key={project.id}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-serif text-foreground">{project.title}</h3>
                              <p className="text-sm text-muted-foreground">{project.roomType} • {project.style}</p>
                            </div>
                            <Badge variant="outline">{project.status}</Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">View Details</Button>
                            <Button variant="outline" size="sm">Message Client</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card className="text-center py-12">
                      <CardContent>
                        <p className="text-muted-foreground">No active projects at the moment.</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="analytics">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Earnings</h3>
                        <DollarSign size={20} className="text-primary" />
                      </div>
                      <p className="text-3xl font-serif text-foreground">$24,500</p>
                      <p className="text-sm text-success mt-2">+12% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Completed Projects</h3>
                        <CheckCircle2 size={20} className="text-primary" />
                      </div>
                      <p className="text-3xl font-serif text-foreground">12</p>
                      <p className="text-sm text-muted-foreground mt-2">All time</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Profile Views</h3>
                        <Users size={20} className="text-primary" />
                      </div>
                      <p className="text-3xl font-serif text-foreground">842</p>
                      <p className="text-sm text-success mt-2">+5% from last week</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
