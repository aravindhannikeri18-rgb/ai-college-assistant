import React from 'react';
import {
  Building2,
  BookOpen,
  ClipboardList,
  Library,
  Users2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  GraduationCap,
  MapPin,
  Phone,
  Mic,
  Award
} from 'lucide-react';
import { RobotAvatar } from './RobotAvatar';
import { COLLEGE_INFO } from '../data/collegeData';

interface DashboardViewProps {
  onSelectOption: (optionId: string) => void;
  onOpenChatWithQuery: (query: string) => void;
  onOpenVoiceModal: () => void;
  wakeWordActive: boolean;
  onToggleWakeWord: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSelectOption,
  onOpenChatWithQuery,
  onOpenVoiceModal,
  wakeWordActive,
  onToggleWakeWord,
}) => {
  const quickOptions = [
    {
      id: 'college_info',
      icon: Building2,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      borderHover: 'hover:border-blue-300',
      title: 'College Information',
      subtitle: 'Courses, facilities, staff...',
      action: () => onSelectOption('college_info')
    },
    {
      id: 'syllabus',
      icon: BookOpen,
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-50',
      borderHover: 'hover:border-indigo-300',
      title: 'Syllabus & Subjects',
      subtitle: 'Check 1st sem subjects...',
      action: () => onSelectOption('syllabus')
    },
    {
      id: 'exam_results',
      icon: ClipboardList,
      iconColor: 'text-sky-600',
      iconBg: 'bg-sky-50',
      borderHover: 'hover:border-sky-300',
      title: 'Exam & Results',
      subtitle: 'Time table, internal marks...',
      action: () => onSelectOption('exam_results')
    },
    {
      id: 'library',
      icon: Library,
      iconColor: 'text-violet-600',
      iconBg: 'bg-violet-50',
      borderHover: 'hover:border-violet-300',
      title: 'Library & Resources',
      subtitle: 'Books, e-resources, links...',
      action: () => onSelectOption('library')
    },
    {
      id: 'student_support',
      icon: Users2,
      iconColor: 'text-teal-600',
      iconBg: 'bg-teal-50',
      borderHover: 'hover:border-teal-300',
      title: 'Student Support',
      subtitle: 'Help desk, coordinator...',
      action: () => onSelectOption('student_support')
    },
    {
      id: 'general_questions',
      icon: HelpCircle,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
      borderHover: 'hover:border-amber-300',
      title: 'General Questions',
      subtitle: 'Any college related question',
      action: () => onSelectOption('chat')
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
      {/* Hello Greeting Card matching Screen 2 */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400 p-5 text-white shadow-lg shadow-blue-500/20">
        {/* Background decorative patterns */}
        <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute right-24 top-2 w-16 h-16 rounded-full bg-white/10 blur-md pointer-events-none" />

        <div className="flex items-center justify-between relative z-10">
          <div className="max-w-[62%] sm:max-w-[70%]">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold tracking-wide uppercase text-blue-50 mb-1.5">
              <Sparkles className="w-3 h-3 text-amber-300" /> KLE BCA Gokak
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
              Hello, Aravind!
            </h2>
            <p className="text-xs sm:text-sm text-blue-50/90 mt-1 font-medium leading-relaxed">
              Ask me anything about your college. I'm here to help you! 😊
            </p>

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={onOpenVoiceModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-blue-700 font-bold text-xs hover:bg-blue-50 shadow-sm transition-all transform active:scale-95"
              >
                <Mic className="w-3.5 h-3.5" />
                Talk to AI
              </button>
              <button
                onClick={onToggleWakeWord}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
                  wakeWordActive
                    ? 'bg-emerald-400/90 text-emerald-950 font-bold'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                title="Continuous 'Hey Dude' listening"
              >
                "Hey Dude" {wakeWordActive ? 'Active' : 'Off'}
              </button>
            </div>
          </div>

          <div className="relative shrink-0 flex items-center justify-center">
            <RobotAvatar size="lg" className="animate-float-bot drop-shadow-xl" />
          </div>
        </div>
      </div>

      {/* College Quick Badge Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white p-2.5 rounded-2xl border border-slate-100 shadow-xs text-center">
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">1st Sem</p>
          <p className="text-base sm:text-lg font-black text-blue-600">180</p>
          <p className="text-[10px] text-slate-500 font-medium">Students</p>
        </div>
        <div className="bg-white p-2.5 rounded-2xl border border-slate-100 shadow-xs text-center">
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Staff</p>
          <p className="text-base sm:text-lg font-black text-indigo-600">6</p>
          <p className="text-[10px] text-slate-500 font-medium">Faculty</p>
        </div>
        <div className="bg-white p-2.5 rounded-2xl border border-slate-100 shadow-xs text-center">
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Subjects</p>
          <p className="text-base sm:text-lg font-black text-teal-600">6</p>
          <p className="text-[10px] text-slate-500 font-medium">1st Sem</p>
        </div>
      </div>

      {/* Quick Options Header */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-bold text-slate-800 text-base">Quick Options</h3>
          <span className="text-xs text-blue-600 font-semibold cursor-pointer" onClick={() => onSelectOption('college_info')}>
            View All
          </span>
        </div>

        {/* 6 Quick Options Cards matching Screen 2 */}
        <div className="grid grid-cols-2 gap-3">
          {quickOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                onClick={opt.action}
                className={`p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between group ${opt.borderHover}`}
              >
                <div className={`w-10 h-10 rounded-xl ${opt.iconBg} ${opt.iconColor} flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm leading-snug group-hover:text-blue-600 transition-colors">
                    {opt.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    {opt.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recommended Questions Section */}
      <div className="bg-gradient-to-br from-blue-50/70 to-indigo-50/50 rounded-2xl p-4 border border-blue-100/70">
        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 mb-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          Popular Questions to Ask:
        </div>
        <div className="space-y-1.5">
          {[
            "Who is your college principal?",
            "What are the BCA 1st semester subjects?",
            "Where is the college located?",
            "How many students are in 1st semester BCA?"
          ].map((q, idx) => (
            <button
              key={idx}
              onClick={() => onOpenChatWithQuery(q)}
              className="w-full text-left p-2 rounded-xl bg-white/80 hover:bg-white text-xs font-medium text-slate-700 hover:text-blue-600 border border-slate-100 flex items-center justify-between group transition-all"
            >
              <span>{q}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>
      </div>

      {/* College Info Mini Banner */}
      <div className="rounded-2xl p-3.5 bg-white border border-slate-100 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">{COLLEGE_INFO.name}</p>
            <p className="text-[11px] text-slate-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" /> {COLLEGE_INFO.location}
            </p>
          </div>
        </div>
        <a
          href={`tel:${COLLEGE_INFO.contactNumber}`}
          className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
          title="Call College"
        >
          <Phone className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
