import React from 'react';
import { ArrowLeft, Mic, MicOff, Settings, Volume2, VolumeX, Pause, Play, Square, Sparkles } from 'lucide-react';
import { AudioWave } from './AudioWave';
import { RobotAvatar } from './RobotAvatar';
import { VoiceState } from '../hooks/useVoiceAssistant';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  voiceState: VoiceState;
  transcript: string;
  interimTranscript: string;
  lastAiAnswer?: string;
  speechError: string | null;
  autoSpeak: boolean;
  wakeWordActive: boolean;
  micPermission?: 'granted' | 'denied' | 'prompt' | 'unknown';
  onOpenSettings?: () => void;
  onToggleListening: () => void;
  onToggleAutoSpeak: () => void;
  onToggleWakeWord: () => void;
  onSelectPrompt: (prompt: string) => void;
  onPauseSpeech: () => void;
  onResumeSpeech: () => void;
  onStopSpeech: () => void;
  isSpeakingPaused: boolean;
}

export const VoiceModal: React.FC<VoiceModalProps> = ({
  isOpen,
  onClose,
  voiceState,
  transcript,
  interimTranscript,
  lastAiAnswer,
  speechError,
  autoSpeak,
  wakeWordActive,
  micPermission,
  onOpenSettings,
  onToggleListening,
  onToggleAutoSpeak,
  onToggleWakeWord,
  onSelectPrompt,
  onPauseSpeech,
  onResumeSpeech,
  onStopSpeech,
  isSpeakingPaused,
}) => {
  if (!isOpen) return null;

  const samplePrompts = [
    "Who is your college principal?",
    "What are the BCA 1st semester subjects?",
    "Where is the college located?",
    "How many students are in 1st sem BCA?",
    "Who is the college coordinator?",
    "What is the college contact number?"
  ];

  const getStatusText = () => {
    switch (voiceState) {
      case 'listening':
        return 'Listening...';
      case 'thinking':
        return 'Thinking...';
      case 'speaking':
        return 'Speaking...';
      default:
        return 'Ready to Listen';
    }
  };

  const getSubStatusText = () => {
    switch (voiceState) {
      case 'listening':
        return 'Speak your question clearly';
      case 'thinking':
        return 'Processing your question...';
      case 'speaking':
        return 'Hey Dude is answering aloud';
      default:
        return 'Tap the microphone or say "Hey Dude"';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[90vh] max-h-[720px] border border-blue-100">
        {/* Top Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-blue-50/50 to-white">
          <button
            onClick={onClose}
            className="p-2 -ml-2 rounded-full text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            title="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <RobotAvatar size="sm" isSpeaking={voiceState === 'speaking'} isListening={voiceState === 'listening'} />
            <div className="text-center">
              <h3 className="font-bold text-slate-800 text-base leading-tight">Voice Assistant</h3>
              <p className="text-[11px] text-blue-600 font-medium">Hey Dude AI</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onToggleAutoSpeak}
              className={`p-2 rounded-full transition-colors ${
                autoSpeak ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:bg-slate-100'
              }`}
              title={autoSpeak ? 'Mute AI voice' : 'Enable AI voice'}
            >
              {autoSpeak ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>

            {onOpenSettings && (
              <button
                onClick={onOpenSettings}
                className="p-2 rounded-full text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                title="Settings & Microphone Status"
              >
                <Settings className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Status Area */}
        <div className="pt-5 pb-2 px-6 text-center space-y-1.5">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                voiceState === 'listening'
                  ? 'bg-red-50 text-red-600 border border-red-200'
                  : voiceState === 'speaking'
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : voiceState === 'thinking'
                  ? 'bg-amber-50 text-amber-600 border border-amber-200'
                  : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  voiceState === 'listening'
                    ? 'bg-red-500 animate-ping'
                    : voiceState === 'speaking'
                    ? 'bg-blue-500 animate-pulse'
                    : 'bg-emerald-500'
                }`}
              />
              {getStatusText()}
            </span>

            {/* Clickable Microphone Allowed Status Badge */}
            {onOpenSettings && (
              <button
                onClick={onOpenSettings}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all ${
                  micPermission === 'granted'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                    : micPermission === 'denied'
                    ? 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100'
                    : 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
                }`}
                title="Click to check or change microphone permission settings"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    micPermission === 'granted'
                      ? 'bg-emerald-500'
                      : micPermission === 'denied'
                      ? 'bg-rose-500'
                      : 'bg-amber-500 animate-pulse'
                  }`}
                />
                {micPermission === 'granted'
                  ? 'Mic Allowed'
                  : micPermission === 'denied'
                  ? 'Mic Blocked (Fix)'
                  : 'Check Mic'}
              </button>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">{getSubStatusText()}</p>
        </div>

        {/* Central Audio / Microphone Interaction */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-4">
          <div className="relative flex items-center justify-center w-full my-auto">
            {/* Left Sound Wave */}
            <div className="hidden sm:block absolute left-4">
              <AudioWave isActive={voiceState === 'listening' || voiceState === 'speaking'} color="#0284C7" />
            </div>

            {/* Glowing Concentric Rings around Mic */}
            <div className="relative flex items-center justify-center">
              {/* Outer Pulse Rings */}
              {(voiceState === 'listening' || voiceState === 'speaking') && (
                <>
                  <div className="absolute w-52 h-52 rounded-full bg-blue-100/60 animate-ping" />
                  <div className="absolute w-44 h-44 rounded-full bg-blue-200/50 animate-pulse" />
                </>
              )}
              <div className="w-36 h-36 rounded-full bg-gradient-to-b from-blue-50 to-blue-100/80 flex items-center justify-center shadow-inner">
                <button
                  onClick={onToggleListening}
                  className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform active:scale-95 ${
                    voiceState === 'listening'
                      ? 'bg-gradient-to-tr from-red-500 to-rose-600 text-white shadow-red-300 ring-4 ring-red-200'
                      : voiceState === 'speaking'
                      ? 'bg-gradient-to-tr from-indigo-500 to-blue-600 text-white shadow-blue-300 ring-4 ring-blue-200'
                      : 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white hover:shadow-xl shadow-blue-300/60 hover:scale-105'
                  }`}
                  title={voiceState === 'listening' ? 'Stop listening' : 'Start talking'}
                >
                  <Mic className={`w-10 h-10 ${voiceState === 'listening' ? 'animate-pulse' : ''}`} />
                </button>
              </div>
            </div>

            {/* Right Sound Wave */}
            <div className="hidden sm:block absolute right-4">
              <AudioWave isActive={voiceState === 'listening' || voiceState === 'speaking'} color="#0284C7" />
            </div>
          </div>

          {/* Transcript / Result Display */}
          <div className="w-full mt-4 min-h-[90px] p-3.5 bg-slate-50/90 rounded-2xl border border-slate-200/70 text-center flex flex-col justify-center">
            {interimTranscript && (
              <p className="text-sm font-medium text-blue-600 italic animate-pulse">
                "{interimTranscript}..."
              </p>
            )}
            {!interimTranscript && transcript && (
              <p className="text-sm font-semibold text-slate-800">
                "{transcript}"
              </p>
            )}
            {!interimTranscript && !transcript && lastAiAnswer && voiceState === 'speaking' && (
              <p className="text-sm text-slate-700 line-clamp-3 leading-relaxed">
                <span className="font-semibold text-blue-600">AI: </span>
                {lastAiAnswer}
              </p>
            )}
            {!interimTranscript && !transcript && (!lastAiAnswer || voiceState === 'idle') && (
              <p className="text-xs text-slate-400">
                Say <strong className="text-blue-600">"Hey Dude"</strong> or tap the microphone to begin.
              </p>
            )}
          </div>

          {/* Speech Error Banner if any */}
          {speechError && (
            <div className="w-full mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 text-center">
              {speechError}
            </div>
          )}

          {/* Wake Word Status Bar */}
          <div className="w-full mt-3 flex items-center justify-between px-3 py-2 bg-blue-50/60 rounded-xl border border-blue-100 text-xs">
            <span className="text-slate-600 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Wake phrase: <span className="font-bold text-blue-700">"Hey Dude"</span>
            </span>
            <button
              onClick={onToggleWakeWord}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                wakeWordActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {wakeWordActive ? 'Active' : 'Turn On'}
            </button>
          </div>
        </div>

        {/* Tip Box matching screen 4 */}
        <div className="px-5 py-2.5 mx-4 mb-3 bg-blue-50/60 rounded-2xl border border-blue-100 flex items-start gap-2.5 text-xs text-slate-600">
          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
            <Mic className="w-3 h-3" />
          </div>
          <div>
            <p className="font-medium text-slate-700">Ask about:</p>
            <p className="text-[11px] text-slate-500">
              College info, principal, syllabus, subjects, staff, 1st sem students, contact number, or location.
            </p>
          </div>
        </div>

        {/* Quick Sample Questions (helpful click to speak / test) */}
        <div className="px-4 pb-2">
          <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-1.5 px-1">
            Quick Test Prompts
          </p>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {samplePrompts.slice(0, 3).map((prompt, i) => (
              <button
                key={i}
                onClick={() => onSelectPrompt(prompt)}
                className="whitespace-nowrap px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-100 hover:text-blue-700 text-slate-700 text-xs transition-colors shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-2">
          {voiceState === 'speaking' ? (
            <div className="flex items-center gap-2 w-full">
              {isSpeakingPaused ? (
                <button
                  onClick={onResumeSpeech}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                >
                  <Play className="w-4 h-4" /> Resume Voice
                </button>
              ) : (
                <button
                  onClick={onPauseSpeech}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-200 text-slate-800 font-medium text-sm flex items-center justify-center gap-2 hover:bg-slate-300 transition-colors"
                >
                  <Pause className="w-4 h-4" /> Pause Voice
                </button>
              )}
              <button
                onClick={onStopSpeech}
                className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-medium text-sm flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
              >
                <Square className="w-4 h-4 text-red-500 fill-red-500" /> Stop
              </button>
            </div>
          ) : voiceState === 'listening' ? (
            <button
              onClick={onToggleListening}
              className="w-full py-3 px-4 rounded-xl border-2 border-red-500 text-red-600 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              Tap to stop
            </button>
          ) : (
            <button
              onClick={onToggleListening}
              className="w-full py-3 px-4 rounded-xl border border-blue-600 text-blue-600 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
            >
              <Mic className="w-4 h-4" />
              Tap to Talk
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
