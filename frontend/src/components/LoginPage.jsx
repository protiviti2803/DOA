import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  AlertCircle, 
  UserCheck, 
  CheckCircle2, 
  Layers, 
  KeyRound, 
  Database,
  Building,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('user@doa.local');
  const [password, setPassword] = useState('User@123');
  const [selectedRole, setSelectedRole] = useState('NORMAL_USER');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const PRESET_ACCOUNTS = [
    {
      role: 'NORMAL_USER',
      label: 'Normal User',
      email: 'user@doa.local',
      password: 'User@123',
      name: 'Business Line Analyst',
      dept: 'Risk & Finance Operations',
      desc: 'Create proposals, search & filter active DOA matrix, track proposal lifecycle.',
      theme: 'border-slate-300 hover:border-slate-500 bg-white hover:bg-slate-50/50',
      badge: 'bg-slate-100 text-slate-700 border-slate-200'
    },
    {
      role: 'GOVERNANCE_TEAM',
      label: 'Governance Team',
      email: 'governance@doa.local',
      password: 'GovTeam@123',
      name: 'Risk & Governance Reviewer',
      dept: 'Enterprise Governance & Compliance',
      desc: 'Review submitted proposals, inspect Current vs Proposed diffs, audit trail oversight.',
      theme: 'border-blue-200 hover:border-blue-500 bg-white hover:bg-blue-50/40',
      badge: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      role: 'DOA_ADMINISTRATOR',
      label: 'DOA Administrator',
      email: 'doaadmin@doa.local',
      password: 'DoaAdmin@123',
      name: 'Chief Delegation Officer',
      dept: 'Executive Office / DOA Governance',
      desc: 'Approve & reject proposals, publish into new master versions (v1 ➔ v2), archive records.',
      theme: 'border-teal-200 hover:border-teal-500 bg-white hover:bg-teal-50/40',
      badge: 'bg-teal-50 text-teal-700 border-teal-200'
    },
    {
      role: 'SYSTEM_ADMINISTRATOR',
      label: 'System Administrator',
      email: 'sysadmin@doa.local',
      password: 'SysAdmin@123',
      name: 'IT & System Administrator',
      dept: 'Information Technology / Systems',
      desc: 'System health oversight, database/ETL ingestion telemetry, complete audit ledger.',
      theme: 'border-purple-200 hover:border-purple-500 bg-white hover:bg-purple-50/40',
      badge: 'bg-purple-50 text-purple-700 border-purple-200'
    }
  ];

  const handleSelectPreset = (acc) => {
    setSelectedRole(acc.role);
    setEmail(acc.email);
    setPassword(acc.password);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await api.login(email.trim(), password);
      if (onLoginSuccess) {
        onLoginSuccess({
          id: data.user_id,
          email: data.email,
          full_name: data.full_name,
          role: data.role
        });
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-slate-900">
      {/* Background visual accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <div className="inline-flex items-center justify-center p-3 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl mb-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-2xl tracking-tight text-white">protiviti</span>
            <div className="h-2 w-2 bg-rose-600 rounded-full mt-2.5"></div>
          </div>
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          Delegation of Authority (DoA) Tool
        </h2>
        <p className="mt-2 text-xs text-slate-400 font-medium">
          Confidential Governance &amp; Risk Decision Matrix &bull; Prototype Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl px-4 relative z-10">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-100">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Preset Role Cards for 1-Click Fast Auth */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-600 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> 4 Prototype Roles
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  Select Role Profile to Log In
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any role card below to populate authentic database credentials:
                </p>
              </div>

              <div className="space-y-2.5">
                {PRESET_ACCOUNTS.map((acc) => {
                  const isSelected = selectedRole === acc.role && email === acc.email;
                  return (
                    <div
                      key={acc.role}
                      onClick={() => handleSelectPreset(acc)}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all duration-200 text-left relative ${
                        isSelected 
                          ? 'border-teal-600 bg-teal-50/40 shadow-sm ring-2 ring-teal-500/20' 
                          : acc.theme
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border ${acc.badge}`}>
                              {acc.label}
                            </span>
                            <span className="text-xs font-bold text-slate-800 truncate">
                              {acc.name}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                            {acc.desc}
                          </p>
                          <div className="text-[10px] font-mono text-slate-400 mt-1.5">
                            {acc.email}
                          </div>
                        </div>

                        <div className="flex-shrink-0 pt-0.5">
                          {isSelected ? (
                            <CheckCircle2 className="h-5 w-5 text-teal-600" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border border-slate-300" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Manual Login Form */}
            <div className="lg:col-span-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-8">
              <div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    FastAPI REST Authentication
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1 flex items-center gap-2">
                    <Lock className="h-4 w-4 text-teal-600" />
                    Account Login
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Authenticates against <code className="text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded font-mono text-[11px]">POST /api/auth/login</code>
                  </p>
                </div>

                {error && (
                  <div className="mt-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold flex items-start gap-2 animate-fade-in">
                    <AlertCircle className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Mail className="h-4 w-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. user@doa.local"
                        className="block w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <KeyRound className="h-4 w-4" />
                      </div>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="block w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-md shadow-teal-600/20 transition-all duration-200 transform active:scale-98 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <span>Authenticating...</span>
                      ) : (
                        <>
                          <span>Sign In to Dashboard</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Database className="h-3 w-3 text-slate-400" />
                  SQLite &bull; JWT Bearer
                </span>
                <span>Port 8000 &bull; FastAPI</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
