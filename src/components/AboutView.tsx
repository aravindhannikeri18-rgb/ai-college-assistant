import React from 'react';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Heart,
  Bot,
  Mic,
  Clock,
  ShieldCheck,
  Zap,
  Code2
} from 'lucide-react';
import { RobotAvatar } from './RobotAvatar';

interface AboutViewProps {
  onBack: () => void;
  onOpenVoiceModal: () => void;
  onViewSourceCode?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onBack,
  onOpenVoiceModal,
  onViewSourceCode,
}) => {
  const features = [
    {
      title: 'Instant answers',
      desc: 'Sub-second authoritative answers for all college, staff, and syllabus inquiries.'
    },
    {
      title: 'Voice & text support',
      desc: 'Natural speech-to-text recognition and smooth AI text-to-speech reading aloud.'
    },
    {
      title: '24/7 availability',
      desc: 'Always ready to help students, parents, and visitors anytime.'
    },
    {
      title: 'Simple and easy to use',
      desc: 'Intuitive modern interface with mobile and desktop responsive views.'
    },
    {
      title: '"Hey Dude" Wake Word',
      desc: 'Hands-free voice assistant trigger inspired by cutting-edge voice tech.'
    },
    {
      title: 'BCA 1st Semester Database',
      desc: 'Complete curriculum for all 6 subjects, faculty directory, and campus details.'
    }
  ];

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
          <h2 className="font-bold text-slate-800 text-base">About AI College Assistant</h2>
        </div>
        <span className="p-1 text-blue-600">
          <Sparkles className="w-5 h-5" />
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Banner with Robot Avatar matching Screen 8 */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-100/70 p-5 border border-blue-100 flex items-center justify-between gap-3 shadow-xs">
          <div className="relative shrink-0">
            <RobotAvatar size="lg" className="animate-float-bot" />
          </div>

          <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-blue-100/60 shadow-xs max-w-[58%] text-center">
            <p className="text-xs sm:text-sm font-black text-blue-700 leading-tight">
              Smarter Answers for a Brighter College Journey
            </p>
            <p className="text-[10px] text-slate-500 font-medium mt-1">
              KLE Society’s College of BCA, Gokak
            </p>
          </div>
        </div>

        {/* Narrative Description matching Screen 8 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-2">
          <h3 className="font-bold text-slate-800 text-sm">Personal College Companion</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            AI College Assistant is your personal AI helper for college-related queries. It provides quick,
            accurate and easy-to-understand information about your college, courses, syllabus, exams, results and more.
          </p>
        </div>

        {/* Key Features matching Screen 8 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-blue-600" /> Key Features
          </h3>

          <div className="space-y-2.5">
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-800">{feat.title}</p>
                  <p className="text-[11px] text-slate-500 leading-normal">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Voice Feature Card */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white shadow-md shadow-blue-500/20 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-sm">Try Voice Assistant</h4>
            <p className="text-xs text-blue-100 mt-0.5">Hands-free "Hey Dude" voice queries</p>
          </div>
          <button
            onClick={onOpenVoiceModal}
            className="px-3.5 py-2 rounded-xl bg-white text-blue-600 font-bold text-xs hover:bg-blue-50 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Mic className="w-3.5 h-3.5" /> Start Voice
          </button>
        </div>

        {/* Standalone Project Files trigger */}
        {onViewSourceCode && (
          <button
            onClick={onViewSourceCode}
            className="w-full py-2.5 px-4 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Code2 className="w-4 h-4 text-blue-600" />
            View Separate HTML, CSS & JS Code Files
          </button>
        )}

        {/* Footer Tag matching Screen 8 */}
        <div className="text-center py-2">
          <p className="text-xs font-bold text-slate-500 flex items-center justify-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            Built for Students | BCA Project Expo
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">
            KLE Society’s College of BCA, Gokak • Academic Year 2026-27
          </p>
        </div>
      </div>
    </div>
  );
};
