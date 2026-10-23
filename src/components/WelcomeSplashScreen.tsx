import React from 'react';
import { ArrowRight, GraduationCap, Mic, Sparkles } from 'lucide-react';
import { RobotAvatar } from './RobotAvatar';
import { COLLEGE_INFO } from '../data/collegeData';

interface WelcomeSplashScreenProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export const WelcomeSplashScreen: React.FC<WelcomeSplashScreenProps> = ({
  onGetStarted,
  onLogin,
}) => {
  return (
    <div className="relative flex-1 flex flex-col justify-between p-6 overflow-hidden bg-gradient-to-b from-blue-50 via-white to-blue-50/40 text-center">
      {/* Background college silhouette hint */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Top Header matching Screen 1 */}
      <div className="pt-4 z-10 flex flex-col items-center">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 mb-3">
          <GraduationCap className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-blue-900 tracking-tight leading-tight">
          AI College
          <br />
          <span className="text-blue-600">Assistant</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2 max-w-xs">
          Your Smart Companion for College Information
        </p>
        <span className="text-[11px] font-bold text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full mt-2">
          {COLLEGE_INFO.shortName}
        </span>
      </div>

      {/* Center Robot Hero with "Hi!" speech bubble matching Screen 1 */}
      <div className="my-auto py-6 relative flex flex-col items-center justify-center z-10">
        <div className="relative">
          {/* "Hi!" Speech Bubble */}
          <div className="absolute -top-3 -right-4 sm:-right-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-xs sm:text-sm px-3.5 py-1.5 rounded-full shadow-lg shadow-blue-500/30 animate-bounce">
            Hi! 👋
            <div className="absolute -bottom-1 left-3 w-2 h-2 bg-cyan-500 rotate-45" />
          </div>

          {/* Robot Avatar */}
          <RobotAvatar size="xl" className="animate-float-bot drop-shadow-2xl" />
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Powered by Hey Dude Voice Engine
        </div>
      </div>

      {/* Bottom Actions matching Screen 1 */}
      <div className="space-y-3 z-10 max-w-sm mx-auto w-full">
        <button
          onClick={onGetStarted}
          className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transform active:scale-98 transition-all"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          onClick={onLogin}
          className="w-full py-3.5 px-6 rounded-2xl border-2 border-blue-600 text-blue-600 font-bold text-sm sm:text-base hover:bg-blue-50/60 transition-all"
        >
          Login
        </button>

        {/* Footer Slogan matching Screen 1 */}
        <p className="text-[11px] font-semibold text-slate-400 tracking-wider pt-2">
          Ask • Get Answers • Stay Connected
        </p>
      </div>
    </div>
  );
};
