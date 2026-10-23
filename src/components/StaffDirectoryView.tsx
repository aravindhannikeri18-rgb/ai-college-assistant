import React from 'react';
import { ArrowLeft, Sparkles, Mail, Award, BookOpen, Clock, MessageSquare } from 'lucide-react';
import { STAFF_MEMBERS, COLLEGE_INFO } from '../data/collegeData';

interface StaffDirectoryViewProps {
  onBack: () => void;
  onOpenChatWithQuery: (q: string) => void;
}

export const StaffDirectoryView: React.FC<StaffDirectoryViewProps> = ({
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
          <div>
            <h2 className="font-bold text-slate-800 text-base">Faculty & Staff Directory</h2>
            <p className="text-[11px] text-slate-400 font-medium">{COLLEGE_INFO.staffCount} Dedicated Faculty Members</p>
          </div>
        </div>
        <button
          onClick={() => onOpenChatWithQuery('Tell me about the college faculty and staff members')}
          className="text-blue-600 hover:text-blue-700 p-1"
          title="Ask AI"
        >
          <Sparkles className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Leadership Cards: Principal & Coordinator */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Principal Card */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-4 text-white shadow-md relative overflow-hidden">
            <div className="flex items-center gap-3">
              <img
                src={STAFF_MEMBERS[0].image}
                alt={COLLEGE_INFO.principal}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-white/50 shrink-0 shadow-sm"
              />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full text-blue-100">
                  Principal
                </span>
                <h3 className="font-extrabold text-base mt-1 text-white leading-tight">
                  {COLLEGE_INFO.principal}
                </h3>
                <p className="text-xs text-blue-100 font-medium">Head of Institution</p>
              </div>
            </div>
            <p className="text-xs text-blue-100/90 mt-3 line-clamp-2">
              Leading KLE Society’s College of BCA with academic excellence, digital skill development, and career mentorship.
            </p>
            <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between">
              <span className="text-[11px] text-blue-200">18+ Years Experience</span>
              <button
                onClick={() => onOpenChatWithQuery("Who is your college principal?")}
                className="text-xs font-bold bg-white text-blue-700 px-2.5 py-1 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Ask About Principal
              </button>
            </div>
          </div>

          {/* Coordinator Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-teal-700 rounded-3xl p-4 text-white shadow-md relative overflow-hidden">
            <div className="flex items-center gap-3">
              <img
                src={STAFF_MEMBERS[1].image}
                alt={COLLEGE_INFO.coordinator}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-white/50 shrink-0 shadow-sm"
              />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full text-teal-100">
                  Coordinator
                </span>
                <h3 className="font-extrabold text-base mt-1 text-white leading-tight">
                  {COLLEGE_INFO.coordinator}
                </h3>
                <p className="text-xs text-teal-100 font-medium">College Coordinator & HOD</p>
              </div>
            </div>
            <p className="text-xs text-teal-100/90 mt-3 line-clamp-2">
              Overseeing 1st Semester academic curriculum, laboratory sessions, student progress, and tech events.
            </p>
            <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between">
              <span className="text-[11px] text-teal-200">14+ Years Experience</span>
              <button
                onClick={() => onOpenChatWithQuery("Who is the college coordinator?")}
                className="text-xs font-bold bg-white text-teal-800 px-2.5 py-1 rounded-lg hover:bg-teal-50 transition-colors"
              >
                Ask Coordinator
              </button>
            </div>
          </div>
        </div>

        {/* All 6 Faculty Members List */}
        <div>
          <h3 className="font-bold text-slate-800 text-sm mb-3">All 6 Staff Members</h3>
          <div className="space-y-3">
            {STAFF_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs hover:border-blue-200 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{member.name}</h4>
                      <p className="text-xs font-medium text-blue-600">{member.designation}</p>
                      <p className="text-[11px] text-slate-400">{member.qualification}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md shrink-0">
                    {member.experience}
                  </span>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-[11px]">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    {member.specialization}
                  </span>
                  <button
                    onClick={() => onOpenChatWithQuery(`Tell me about ${member.name}`)}
                    className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1"
                  >
                    <MessageSquare className="w-3 h-3" /> Ask
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
