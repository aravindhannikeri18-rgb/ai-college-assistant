import React from 'react';
import {
  ArrowLeft,
  MapPin,
  GraduationCap,
  Users,
  Globe,
  Phone,
  UserCheck,
  User,
  Sparkles,
  Award,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData';

interface CollegeInfoViewProps {
  onBack: () => void;
  onOpenChatWithQuery: (q: string) => void;
}

export const CollegeInfoView: React.FC<CollegeInfoViewProps> = ({
  onBack,
  onOpenChatWithQuery,
}) => {
  return (
    <div className="flex-1 overflow-y-auto pb-6">
      {/* Top Header */}
      <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-bold text-slate-800 text-base">College Information</h2>
        </div>
        <button
          onClick={() => onOpenChatWithQuery('Tell me everything about the college')}
          className="text-blue-600 hover:text-blue-700 p-1"
          title="Ask AI"
        >
          <Sparkles className="w-5 h-5" />
        </button>
      </div>

      {/* College Campus Photo Banner matching Screen 6 */}
      <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-800">
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200"
          alt="KLE Society's College of BCA Gokak Campus"
          className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

        {/* Floating badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-blue-700 shadow-sm flex items-center gap-1">
          <Award className="w-3.5 h-3.5 text-blue-600" /> KLE Society
        </div>

        {/* Banner text */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <h1 className="text-lg sm:text-xl font-black leading-tight drop-shadow-sm">
            {COLLEGE_INFO.name}
          </h1>
          <p className="text-xs text-blue-200 font-medium mt-0.5">
            {COLLEGE_INFO.tagline}
          </p>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Info Cards List matching Screen 6 */}
        <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-xs flex items-start gap-3 hover:border-blue-200 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Location</p>
            <p className="text-sm font-bold text-slate-800 mt-0.5">{COLLEGE_INFO.location}</p>
            <p className="text-xs text-slate-500">Gokak, Karnataka - {COLLEGE_INFO.pincode}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-xs flex items-start gap-3 hover:border-blue-200 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Principal</p>
            <p className="text-sm font-bold text-slate-800 mt-0.5">{COLLEGE_INFO.principal}</p>
            <p className="text-xs text-slate-500">M.Sc. (Comp. Sci.), M.Phil. • Head of Institution</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-xs flex items-start gap-3 hover:border-blue-200 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">College Coordinator</p>
            <p className="text-sm font-bold text-slate-800 mt-0.5">{COLLEGE_INFO.coordinator}</p>
            <p className="text-xs text-slate-500">MCA, M.Tech • Academic Coordination & Student Mentor</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-xs flex items-start gap-3 hover:border-blue-200 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Courses Offered</p>
            <p className="text-sm font-bold text-slate-800 mt-0.5">{COLLEGE_INFO.bcaFullName} (BCA)</p>
            <p className="text-xs text-slate-500">Affiliated to Rani Channamma University, Belagavi</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-xs flex items-start gap-3 hover:border-blue-200 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">College Strength & Staff</p>
            <div className="flex items-center gap-4 mt-0.5">
              <div>
                <span className="text-xs text-slate-500">1st Semester: </span>
                <span className="text-sm font-bold text-blue-600">{COLLEGE_INFO.studentCount1stSem} students</span>
              </div>
              <div>
                <span className="text-xs text-slate-500">Faculty Staff: </span>
                <span className="text-sm font-bold text-purple-600">{COLLEGE_INFO.staffCount} members</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5">
              <Phone className="w-4 h-4" />
            </div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase">Contact Number</p>
            <a href={`tel:${COLLEGE_INFO.contactNumber}`} className="text-xs sm:text-sm font-bold text-blue-600 hover:underline">
              {COLLEGE_INFO.contactNumber}
            </a>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-1.5">
              <Globe className="w-4 h-4" />
            </div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase">Website</p>
            <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">{COLLEGE_INFO.website}</p>
          </div>
        </div>

        {/* Facilities Bullet Points */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-2xl p-4 border border-blue-100/60 mt-3">
          <h3 className="font-bold text-slate-800 text-xs sm:text-sm mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-600" /> Campus Facilities
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {COLLEGE_INFO.facilities.map((fac, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                {fac}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom CTA Button matching Screen 6 */}
        <button
          onClick={() => onOpenChatWithQuery("What is the full form of BCA and tell me about the college?")}
          className="w-full mt-4 py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
        >
          <MessageSquare className="w-4 h-4" />
          Ask Hey Dude About College
        </button>
      </div>
    </div>
  );
};
