import React from 'react';
import { ArrowLeft, Sparkles, Calendar, Clock, Award, FileText, CheckCircle2 } from 'lucide-react';
import { BCA_FIRST_SEM_SUBJECTS } from '../data/collegeData';

interface ExamResultsViewProps {
  onBack: () => void;
  onOpenChatWithQuery: (q: string) => void;
}

export const ExamResultsView: React.FC<ExamResultsViewProps> = ({
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
          <h2 className="font-bold text-slate-800 text-base">Exam & Results Portal</h2>
        </div>
        <button
          onClick={() => onOpenChatWithQuery("When are the 1st semester BCA examinations?")}
          className="text-blue-600 hover:text-blue-700 p-1"
        >
          <Sparkles className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Status card */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-sky-600 p-4 text-white shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-100 mb-1">
            <Calendar className="w-3.5 h-3.5" /> 1st Semester Academic Schedule
          </div>
          <h3 className="text-base font-extrabold">Internal Assessment & Exam Timetable</h3>
          <p className="text-xs text-blue-100 mt-1">
            RCU Belagavi affiliated exam pattern (80 Marks Theory + 20 Marks Internal)
          </p>
        </div>

        {/* Exam Schedule Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-4">
          <h4 className="font-bold text-slate-800 text-sm mb-3">BCA 1st Sem Upcoming Exam Schedule</h4>
          <div className="space-y-2.5">
            {BCA_FIRST_SEM_SUBJECTS.map((sub, idx) => (
              <div
                key={sub.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-100 text-xs"
              >
                <div>
                  <span className="font-bold text-slate-800">{sub.name}</span>
                  <p className="text-[11px] text-slate-400">{sub.code} • 10:00 AM – 1:00 PM</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 font-bold text-[10px]">
                    Internal + Final
                  </span>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">80 Marks</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Results Inquiry CTA */}
        <button
          onClick={() => onOpenChatWithQuery("How to check BCA 1st semester results?")}
          className="w-full py-3 px-4 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
        >
          <Award className="w-4 h-4 text-blue-600" />
          Ask AI about Results & Evaluation Criteria
        </button>
      </div>
    </div>
  );
};
