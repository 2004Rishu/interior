import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, Settings, Clock, DollarSign } from 'lucide-react';

export default function DesignerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'projects' | 'settings'>('projects');

  if (!user || user.role !== 'designer') {
    return <Navigate to="/login" replace />;
  }

  // Pending Review State
  if (user.status === 'pending') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-sand-50 py-12 px-4">
        <div className="max-w-md w-full bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sand-100 mb-6">
            <Clock size={32} className="text-sand-600" />
          </div>
          <h1 className="text-2xl font-serif text-charcoal-900 mb-4">Application Pending Review</h1>
          <p className="text-sand-700 leading-relaxed">
            Thank you for applying to join Interior Me, {user.name.split(' ')[0]}. 
            Our curation team is currently reviewing your portfolio and details. 
            We will notify you via email once your account is approved.
          </p>
        </div>
      </div>
    );
  }

  // Approved State Dashboard
  const mockLeads = [
    {
      id: 'L-298',
      client: 'Sarah Jenkins',
      type: 'Full Interior',
      budget: '$20k - $50k',
      city: 'Austin, TX',
      status: 'New Lead'
    },
    {
      id: 'L-291',
      client: 'Michael Chen',
      type: 'Consultation',
      budget: 'Under $5k',
      city: 'Austin, TX',
      status: 'In Progress'
    }
  ];

  return (
    <div className="min-h-screen bg-sand-50 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-3xl font-serif text-charcoal-900">Designer Portal</h1>
          <p className="mt-2 text-sand-700">Manage your leads, active projects, and profile.</p>
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
                <Briefcase size={18} className="mr-3" /> Assigned Leads
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'settings' ? 'bg-white shadow-sm text-charcoal-900' : 'text-sand-600 hover:bg-sand-100 hover:text-charcoal-900'
                }`}
              >
                <Settings size={18} className="mr-3" /> Profile Settings
              </button>
            </nav>
            
            {/* Quick Stats - Phase 2 placeholder */}
            <div className="mt-8 hidden md:block bg-white p-6 shadow-sm">
              <h3 className="text-sm font-medium text-charcoal-900 uppercase tracking-widest mb-4 flex items-center">
                <DollarSign size={16} className="mr-1" /> Earnings (YTD)
              </h3>
              <p className="text-2xl font-serif text-charcoal-900">$24,500</p>
              <p className="text-xs text-sand-500 mt-1">3 Completed Projects</p>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <h2 className="text-xl font-serif text-charcoal-900 border-b border-sand-200 pb-4">Client Matches</h2>
                
                {mockLeads.map((lead) => (
                  <div key={lead.id} className="bg-white p-6 shadow-sm border border-transparent hover:border-sand-200 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs text-sand-500 font-mono">{lead.id}</span>
                          <span className={`px-3 py-1 text-xs font-medium uppercase tracking-widest ${
                            lead.status === 'New Lead' ? 'bg-charcoal-900 text-white' : 'bg-sand-200 text-charcoal-900'
                          }`}>
                            {lead.status}
                          </span>
                        </div>
                        <h3 className="text-lg font-serif text-charcoal-900">{lead.type}</h3>
                        <p className="text-sm text-sand-600 mt-1">{lead.client} • {lead.city}</p>
                      </div>
                      
                      <div className="text-left md:text-right">
                        <p className="text-sm font-medium text-charcoal-900">Est. Budget</p>
                        <p className="text-sm text-sand-600 mt-1">{lead.budget}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-sand-100 flex gap-4">
                      {lead.status === 'New Lead' ? (
                        <>
                          <button className="text-sm font-medium text-white bg-charcoal-900 px-4 py-2 hover:bg-charcoal-800 transition-colors">Accept Lead</button>
                          <button className="text-sm font-medium text-sand-600 hover:text-charcoal-900 transition-colors">Decline</button>
                        </>
                      ) : (
                        <>
                          <button className="text-sm font-medium text-charcoal-900 hover:text-sand-600 transition-colors">Send Message</button>
                          <button className="text-sm font-medium text-charcoal-900 hover:text-sand-600 transition-colors">Submit Quote</button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white p-8 shadow-sm">
                <h2 className="text-xl font-serif text-charcoal-900 border-b border-sand-200 pb-4 mb-6">Public Profile</h2>
                <form className="space-y-6 max-w-xl">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-900 mb-2">Display Name</label>
                    <input type="text" defaultValue={user.name} className="w-full border-b border-sand-300 bg-transparent py-2 text-charcoal-900 focus:border-charcoal-900 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-900 mb-2">Portfolio URL</label>
                    <input type="url" defaultValue="https://myportfolio.com" className="w-full border-b border-sand-300 bg-transparent py-2 text-charcoal-900 focus:border-charcoal-900 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-900 mb-2">Specialties / Tags</label>
                    <input type="text" defaultValue="Minimalist, Modern, Organic" className="w-full border-b border-sand-300 bg-transparent py-2 text-charcoal-900 focus:border-charcoal-900 focus:outline-none" />
                  </div>
                  <div className="pt-4 border-t border-sand-100">
                    <h3 className="text-lg font-serif text-charcoal-900 mb-4">Contact Details (Private)</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal-900 mb-2">Phone Number</label>
                        <input type="tel" defaultValue={user.phone} readOnly className="w-full border-b border-sand-200 bg-transparent py-2 text-sand-500 cursor-not-allowed" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal-900 mb-2">Email</label>
                        <input type="email" defaultValue={user.email} className="w-full border-b border-sand-300 bg-transparent py-2 text-charcoal-900 focus:border-charcoal-900 focus:outline-none" />
                      </div>
                    </div>
                  </div>
                  <button type="button" className="mt-8 bg-charcoal-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-charcoal-800">
                    Update Profile
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
