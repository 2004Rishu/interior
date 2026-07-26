import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Settings, FileText, CheckCircle2, Clock, MapPin } from 'lucide-react';

export default function ClientDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'projects' | 'settings'>('projects');

  if (!user || user.role !== 'client') {
    return <Navigate to="/login" replace />;
  }

  const mockProjects = [
    {
      id: 'PRJ-1029',
      title: 'Master Bedroom Redesign',
      status: 'In Progress',
      date: 'Oct 12, 2023',
      designer: 'Elena Rodriguez',
      type: 'Full Interior',
    },
    {
      id: 'PRJ-1084',
      title: 'Garage Epoxy Flooring',
      status: 'Matched',
      date: 'Nov 04, 2023',
      designer: 'Apex Floors',
      type: 'Epoxy Flooring',
    },
    {
      id: 'PRJ-1102',
      title: 'Kitchen Consultation',
      status: 'Lead',
      date: 'Just now',
      designer: 'Pending Match',
      type: 'Consultation',
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Lead':
        return <span className="bg-sand-200 text-charcoal-900 px-3 py-1 text-xs font-medium uppercase tracking-widest">Reviewing</span>;
      case 'Matched':
        return <span className="bg-sage-200 text-sage-900 px-3 py-1 text-xs font-medium uppercase tracking-widest">Matched</span>;
      case 'In Progress':
        return <span className="bg-charcoal-900 text-white px-3 py-1 text-xs font-medium uppercase tracking-widest">In Progress</span>;
      case 'Completed':
        return <span className="bg-transparent border border-sand-300 text-charcoal-900 px-3 py-1 text-xs font-medium uppercase tracking-widest">Completed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-sand-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-3xl font-serif text-charcoal-900">Welcome back, {user.name.split(' ')[0]}</h1>
          <p className="mt-2 text-sand-700">Manage your project requests and account settings.</p>
        </header>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar Nav */}
          <aside className="w-full md:w-64 shrink-0">
            <nav className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
              <button
                onClick={() => setActiveTab('projects')}
                className={`flex items-center px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'projects' ? 'bg-white shadow-sm text-charcoal-900' : 'text-sand-600 hover:bg-sand-100 hover:text-charcoal-900'
                }`}
              >
                <FileText size={18} className="mr-3" /> My Projects
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'settings' ? 'bg-white shadow-sm text-charcoal-900' : 'text-sand-600 hover:bg-sand-100 hover:text-charcoal-900'
                }`}
              >
                <Settings size={18} className="mr-3" /> Account Settings
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <h2 className="text-xl font-serif text-charcoal-900 border-b border-sand-200 pb-4">Active Requests & Projects</h2>
                
                {mockProjects.map((project) => (
                  <div key={project.id} className="bg-white p-6 shadow-sm border border-transparent hover:border-sand-200 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs text-sand-500 font-mono">{project.id}</span>
                          {getStatusBadge(project.status)}
                        </div>
                        <h3 className="text-lg font-serif text-charcoal-900">{project.title}</h3>
                        <p className="text-sm text-sand-600 mt-1">{project.type}</p>
                      </div>
                      
                      <div className="text-left md:text-right">
                        <p className="text-sm font-medium text-charcoal-900">Assigned To</p>
                        <p className="text-sm text-sand-600 flex items-center md:justify-end mt-1">
                          {project.status === 'Lead' ? (
                            <><Clock size={14} className="mr-1.5 text-sand-400" /> {project.designer}</>
                          ) : (
                            <><CheckCircle2 size={14} className="mr-1.5 text-sage-600" /> {project.designer}</>
                          )}
                        </p>
                      </div>
                    </div>
                    
                    {project.status !== 'Lead' && (
                      <div className="mt-6 pt-4 border-t border-sand-100 flex gap-4">
                        <button className="text-sm font-medium text-charcoal-900 hover:text-sand-600 transition-colors">View Quote</button>
                        <button className="text-sm font-medium text-charcoal-900 hover:text-sand-600 transition-colors">Message Designer</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white p-8 shadow-sm">
                <h2 className="text-xl font-serif text-charcoal-900 border-b border-sand-200 pb-4 mb-6">Profile Settings</h2>
                <form className="space-y-6 max-w-lg">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-900 mb-2">Full Name</label>
                    <input type="text" defaultValue={user.name} className="w-full border-b border-sand-300 bg-transparent py-2 text-charcoal-900 focus:border-charcoal-900 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-900 mb-2">Phone Number</label>
                    <input type="tel" defaultValue={user.phone} readOnly className="w-full border-b border-sand-200 bg-transparent py-2 text-sand-500 cursor-not-allowed" />
                    <p className="mt-1 text-xs text-sand-500">Phone number is used for authentication and cannot be changed here.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-900 mb-2">Email Address</label>
                    <input type="email" defaultValue={user.email} className="w-full border-b border-sand-300 bg-transparent py-2 text-charcoal-900 focus:border-charcoal-900 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-900 mb-2">Location</label>
                    <input type="text" defaultValue={user.city || 'Not specified'} className="w-full border-b border-sand-300 bg-transparent py-2 text-charcoal-900 focus:border-charcoal-900 focus:outline-none" />
                  </div>
                  <button type="button" className="bg-charcoal-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-charcoal-800">
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
