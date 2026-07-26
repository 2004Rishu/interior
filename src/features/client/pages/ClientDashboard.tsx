import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FileText, MessageSquare, Calendar, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { projectsRepository } from '../../../api/projects.repository';
import { messagesRepository } from '../../../api/messages.repository';
import { bookingsRepository } from '../../../api/bookings.repository';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/Tabs';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Skeleton } from '../../../components/ui/Skeleton';
import { Button } from '../../../components/ui/Button';

export default function ClientDashboard() {
  const { user } = useAuth();

  // For demo, if user is not logged in, we might still want to show dashboard with fallback 'c1'
  // But standard flow requires login.
  if (!user || user.role !== 'client') {
    return <Navigate to="/login" replace />;
  }

  const { data: projects, isLoading: isProjectsLoading } = useQuery({
    queryKey: ['projects', user.id],
    queryFn: () => projectsRepository.getByClientId(user.id),
  });

  const { data: bookings, isLoading: isBookingsLoading } = useQuery({
    queryKey: ['bookings', user.id],
    queryFn: () => bookingsRepository.getByClient(user.id),
  });

  // To fetch messages, we would ideally fetch by client or project. 
  // We'll fetch messages for the first active project as an example.
  const firstProjectId = projects?.[0]?.id;
  const { data: messages, isLoading: isMessagesLoading } = useQuery({
    queryKey: ['messages', firstProjectId],
    queryFn: () => messagesRepository.getByProject(firstProjectId!),
    enabled: !!firstProjectId,
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
      case 'review':
        return <Badge variant="secondary">Reviewing</Badge>;
      case 'matched':
        return <Badge variant="success">Matched</Badge>;
      case 'in_progress':
        return <Badge variant="default">In Progress</Badge>;
      case 'completed':
        return <Badge variant="outline">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-3xl font-serif text-foreground">Welcome back, {user.name.split(' ')[0]}</h1>
          <p className="mt-2 text-muted-foreground">Manage your project requests, appointments, and messages.</p>
        </header>

        <Tabs defaultValue="projects">
          <TabsList className="mb-8">
            <TabsTrigger value="projects">
              <FileText size={18} className="mr-2" /> Projects
            </TabsTrigger>
            <TabsTrigger value="appointments">
              <Calendar size={18} className="mr-2" /> Appointments
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare size={18} className="mr-2" /> Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <div className="space-y-6">
              {isProjectsLoading ? (
                <>
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-32 w-full" />
                </>
              ) : projects && projects.length > 0 ? (
                projects.map((project) => (
                  <Card key={project.id} className="transition-colors hover:border-primary">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs text-muted-foreground font-mono">{project.id}</span>
                            {getStatusBadge(project.status)}
                          </div>
                          <h3 className="text-xl font-serif text-foreground mb-1">{project.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {project.roomType} • {project.style} • {project.budget}
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-6">
                      <FileText size={32} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-serif text-foreground mb-2">No active projects</h3>
                    <p className="text-muted-foreground mb-6">You haven't started any design projects yet.</p>
                    <Button asChild>
                      <a href="/start-project">Start a Project</a>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="appointments">
            <div className="space-y-6">
              {isBookingsLoading ? (
                <Skeleton className="h-24 w-full" />
              ) : bookings && bookings.length > 0 ? (
                bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-foreground">Consultation</h4>
                        <p className="text-sm text-muted-foreground">{new Date(booking.date).toLocaleString()}</p>
                      </div>
                      <Badge variant="secondary">{booking.status}</Badge>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <p className="text-muted-foreground">No upcoming appointments.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <div className="space-y-6">
              {isMessagesLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="animate-spin text-primary w-8 h-8" />
                </div>
              ) : messages && messages.length > 0 ? (
                messages.map((msg) => (
                  <Card key={msg.id}>
                    <CardContent className="p-4">
                      <p className="text-foreground">{msg.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">{new Date(msg.timestamp).toLocaleString()}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <p className="text-muted-foreground">No messages yet.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
