import React from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Clock, 
  CheckCircle, 
  Send, 
  AlertCircle, 
  ShieldCheck, 
  Layers, 
  ArrowRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';

export default function NormalUserDashboard({ 
  userStats, 
  currentUser, 
  onNavigateTab, 
  onNewRequest,
  kpis
}) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Role Workspace Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-teal-500/20 border border-teal-500/30 rounded-full text-[10px] font-extrabold tracking-widest uppercase text-teal-300">
                Business Line Analyst Workspace
              </span>
              <span className="text-xs text-slate-400 font-mono">RBAC: NORMAL_USER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {currentUser?.full_name?.split(' ')[0] || 'Analyst'}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Explore active Delegation of Authority rules across Finance and Risk domains, draft new authority change requests, and track your submitted governance proposals.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 flex-shrink-0">
            <button
              onClick={() => onNavigateTab('search')}
              className="px-4 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
            >
              <Search className="h-4 w-4 text-teal-300" />
              <span>Search DoA Matrix</span>
            </button>
            <button
              onClick={onNewRequest}
              className="px-5 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shadow-lg shadow-teal-500/20 transform hover:-translate-y-0.5"
            >
              <Plus className="h-4 w-4" />
              <span>Propose Change Request</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analyst KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">My Total Submissions</span>
            <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-3">
            {userStats?.total_my_requests ?? 0}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 font-medium">
            <span>Authored by {currentUser?.email}</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">Under Governance Review</span>
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-amber-600 mt-3">
            {userStats?.my_pending ?? 0}
          </div>
          <div className="text-[11px] text-amber-700/80 mt-1 flex items-center gap-1 font-medium">
            <span>Awaiting committee validation</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">Approved Proposals</span>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <CheckCircle className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-blue-600 mt-3">
            {userStats?.my_approved ?? 0}
          </div>
          <div className="text-[11px] text-blue-700/80 mt-1 flex items-center gap-1 font-medium">
            <span>Pending executive publication</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-extrabold uppercase tracking-wider">Active Published Matrix</span>
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 mt-3">
            {userStats?.total_published_doa ?? kpis?.sourceRecords ?? 58}
          </div>
          <div className="text-[11px] text-emerald-700/80 mt-1 flex items-center gap-1 font-medium">
            <span>Live corporate delegation rules</span>
          </div>
        </div>
      </div>

      {/* Analyst Submissions Table & Quick Workflow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: My Recent Submissions */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-800 text-base">My Recent Change Proposals</h3>
              <p className="text-xs text-slate-500">Live status of your authored authority rule modifications</p>
            </div>
            <button
              onClick={() => onNavigateTab('queue')}
              className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              View All in Queue <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {(!userStats?.recent_submissions || userStats.recent_submissions.length === 0) ? (
            <div className="py-12 text-center text-slate-400">
              <FileCheck className="h-10 w-10 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-semibold">You haven't authored any change proposals yet.</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Click "Propose Change Request" to create your first rule change.</p>
              <button
                onClick={onNewRequest}
                className="mt-4 px-4 py-2 bg-teal-50 text-teal-700 border border-teal-200 rounded-xl text-xs font-bold hover:bg-teal-100 transition-all"
              >
                Create Proposal
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 overflow-x-auto">
              {userStats.recent_submissions.map(sub => (
                <div key={sub.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900">#{sub.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        sub.request_type === 'ADD' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        sub.request_type === 'MODIFY' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {sub.request_type}
                      </span>
                      <span className="text-xs font-bold text-slate-700 truncate">
                        {sub.department} &bull; {sub.process}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 italic truncate">
                      "{sub.rationale || 'Rule proposal'}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                      sub.status === 'SUBMITTED' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      sub.status === 'APPROVED' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      sub.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {sub.status}
                    </span>
                    <button
                      onClick={() => onNavigateTab('queue')}
                      className="text-xs text-slate-400 hover:text-slate-700 p-1"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Guidance & RBAC Boundaries */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-teal-600" />
              Role Permissions: Normal User
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-emerald-700">
                <span className="font-bold">✓</span>
                <span>Search and filter all published DOA matrix records</span>
              </div>
              <div className="flex items-start gap-2 text-emerald-700">
                <span className="font-bold">✓</span>
                <span>Draft and submit ADD, MODIFY, and DELETE proposals</span>
              </div>
              <div className="flex items-start gap-2 text-emerald-700">
                <span className="font-bold">✓</span>
                <span>Track proposal status in your personal Change Queue</span>
              </div>
              <div className="flex items-start gap-2 text-slate-400">
                <span className="font-bold">✗</span>
                <span>Direct record approval or master publication (Restricted to DOA Admin)</span>
              </div>
              <div className="flex items-start gap-2 text-slate-400">
                <span className="font-bold">✗</span>
                <span>Compliance audit trail access (Restricted to Governance/Admins)</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-indigo-50 border border-teal-200/60 rounded-2xl p-5 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-800">
              Quick Rule Explorer
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Need to check current signing authority limits? Open the Explorer Matrix to filter by Function (Risk vs Finance) and Business Line.
            </p>
            <button
              onClick={() => onNavigateTab('search')}
              className="mt-2 text-xs font-bold text-teal-700 hover:text-teal-900 underline flex items-center gap-1"
            >
              Open Search DoA Matrix <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
