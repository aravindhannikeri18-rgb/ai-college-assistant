import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  BookOpen,
  Code,
  Database,
  Calculator,
  Shield,
  Languages,
  CheckCircle2,
  Lightbulb
} from 'lucide-react';
import { BCA_FIRST_SEM_SUBJECTS, Subject } from '../data/collegeData';

interface SyllabusViewProps {
  onBack: () => void;
  onOpenChatWithQuery: (q: string) => void;
}

export const SyllabusView: React.FC<SyllabusViewProps> = ({
  onBack,
  onOpenChatWithQuery,
}) => {
  const [selectedSem, setSelectedSem] = useState('1st Sem');
  const [expandedSubjectId, setExpandedSubjectId] = useState<number | null>(3); // C Programming open by default

  const getSubjectIcon = (name: string) => {
    if (name.includes('Kannada') || name.includes('English')) return Languages;
    if (name.includes('C Programming')) return Code;
    if (name.includes('DBMS')) return Database;
    if (name.includes('Math')) return Calculator;
    return Shield;
  };

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
          <h2 className="font-bold text-slate-800 text-base">Syllabus & Subjects</h2>
        </div>
        <button
          onClick={() => onOpenChatWithQuery('What are the BCA 1st semester subjects?')}
          className="text-blue-600 hover:text-blue-700 p-1"
          title="Ask AI"
        >
          <Sparkles className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Semester Tabs matching Screen 7 */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {['1st Sem', '2nd Sem', '3rd Sem', '4th Sem', '5th Sem', '6th Sem'].map((sem) => (
            <button
              key={sem}
              onClick={() => setSelectedSem(sem)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedSem === sem
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {sem}
            </button>
          ))}
        </div>

        {/* BCA Course Header Info */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 text-white shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-blue-200">
              Bachelor of Computer Applications
            </span>
            <h3 className="text-base font-black">BCA 1st Semester Curriculum</h3>
            <p className="text-xs text-blue-100 mt-0.5">
              6 Core & Foundation Subjects • Total Credits: 20
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* 6 Subjects List matching Screen 7 */}
        <div className="space-y-2.5">
          {BCA_FIRST_SEM_SUBJECTS.map((sub: Subject) => {
            const Icon = getSubjectIcon(sub.name);
            const isExpanded = expandedSubjectId === sub.id;

            return (
              <div
                key={sub.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden transition-all duration-200 hover:border-blue-200"
              >
                {/* Subject Header Row */}
                <button
                  onClick={() => setExpandedSubjectId(isExpanded ? null : sub.id)}
                  className="w-full p-3.5 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      {sub.id}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                        {sub.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {sub.code} • {sub.type} • {sub.credits} Credits
                      </p>
                    </div>
                  </div>

                  <div className="text-slate-400 group-hover:text-blue-600 transition-colors">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-50 bg-slate-50/40 space-y-3">
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {sub.description}
                    </p>

                    <div>
                      <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Key Syllabus Units:
                      </p>
                      <div className="grid grid-cols-1 gap-1">
                        {sub.topics.map((topic, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-xs text-slate-600 bg-white p-2 rounded-lg border border-slate-100"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenChatWithQuery(`Tell me about ${sub.name} subject syllabus and exam tips`)}
                      className="w-full py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Ask AI about {sub.name} Notes & Questions
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tip Box matching Screen 7 */}
        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-slate-700 leading-relaxed">
              Need notes, study tips or previous year questions? Just ask me!
            </p>
            <button
              onClick={() => onOpenChatWithQuery("What are the study tips and previous questions for BCA 1st semester?")}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 mt-1 inline-flex items-center gap-1"
            >
              Ask Study Tips Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
