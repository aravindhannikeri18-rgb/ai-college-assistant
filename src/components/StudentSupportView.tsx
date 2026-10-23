import React from 'react';
import { ArrowLeft, Sparkles, Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck, HeartHandshake } from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData';

interface StudentSupportViewProps {
  onBack: () => void;
  onOpenChatWithQuery: (q: string) => void;
}

export const StudentSupportView: React.FC<StudentSupportViewProps> = ({
  onBack,
  onOpenChatWithQuery,
}) => {
  return (
    <div className="flex-1 overflow-y-auto pb-6">
      {/* Header */}
      <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-bold text-slate-800 text-base">Student Support & Helpdesk</h2>
        </div>
        <button
          onClick={() => onOpenChatWithQuery("How can student support help me?")}
          className="text-blue-600 hover:text-blue-700 p-1"
        >
          <Sparkles className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 p-4 text-white shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-200">KLE Student Care</span>
            <h3 className="text-base font-extrabold">Student Mentorship & Help Desk</h3>
            <p className="text-xs text-teal-100 mt-0.5">Assistance for 1st Semester BCA Students</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <HeartHandshake className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Contact info list */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-4 space-y-3">
          <h4 className="font-bold text-slate-800 text-sm">Official Contact Channels</h4>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Helpline Number</p>
              <a href={`tel:${COLLEGE_INFO.contactNumber}`} className="text-xs sm:text-sm font-bold text-blue-600 hover:underline">
                {COLLEGE_INFO.contactNumber}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Campus Location</p>
              <p className="text-xs sm:text-sm font-bold text-slate-800">{COLLEGE_INFO.location}</p>
              <p className="text-[11px] text-slate-500">Gokak, Karnataka - {COLLEGE_INFO.pincode}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Office Timings</p>
              <p className="text-xs sm:text-sm font-bold text-slate-800">{COLLEGE_INFO.timings}</p>
            </div>
          </div>
        </div>

        {/* Support Officials */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-xs">
            <p className="text-[10px] uppercase font-bold text-blue-600">Head of Institution</p>
            <p className="text-xs font-bold text-slate-800 mt-1">{COLLEGE_INFO.principal}</p>
            <p className="text-[10px] text-slate-400">Principal</p>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-xs">
            <p className="text-[10px] uppercase font-bold text-teal-600">Student Coordinator</p>
            <p className="text-xs font-bold text-slate-800 mt-1">{COLLEGE_INFO.coordinator}</p>
            <p className="text-[10px] text-slate-400">College Coordinator</p>
          </div>
        </div>

        {/* Direct Ask CTA */}
        <button
          onClick={() => onOpenChatWithQuery("Where is the college located and who should I contact for admissions?")}
          className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-500/20 transition-colors flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          Ask Hey Dude AI for Immediate Assistance
        </button>
      </div>
    </div>
  );
};
