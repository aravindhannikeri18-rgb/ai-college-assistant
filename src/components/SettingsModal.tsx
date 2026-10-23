import React, { useState } from 'react';
import {
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  Sliders,
  Settings as SettingsIcon,
  Play,
  RotateCcw,
  Check,
  Info,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { MicPermissionState } from '../hooks/useVoiceAssistant';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  micPermission: MicPermissionState;
  isTestingMic: boolean;
  liveMicVolume: number;
  activeMicDevice: string | null;
  onTestMicrophone: () => Promise<boolean>;
  onStopTestingMic: () => void;
  speechError: string | null;
  // Speech synthesis settings
  autoSpeak: boolean;
  onToggleAutoSpeak: () => void;
  wakeWordActive: boolean;
  onToggleWakeWord: () => void;
  voiceRate: number;
  setVoiceRate: (rate: number) => void;
  voicePitch: number;
  setVoicePitch: (pitch: number) => void;
  selectedVoiceName: string | null;
  setSelectedVoiceName: (name: string) => void;
  availableVoices: SpeechSynthesisVoice[];
  onSpeakSample: (text: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  micPermission,
  isTestingMic,
  liveMicVolume,
  activeMicDevice,
  onTestMicrophone,
  onStopTestingMic,
  speechError,
  autoSpeak,
  onToggleAutoSpeak,
  wakeWordActive,
  onToggleWakeWord,
  voiceRate,
  setVoiceRate,
  voicePitch,
  setVoicePitch,
  selectedVoiceName,
  setSelectedVoiceName,
  availableVoices,
  onSpeakSample,
}) => {
  const [showHowToAllow, setShowHowToAllow] = useState<boolean>(false);
  const [testResultSuccess, setTestResultSuccess] = useState<boolean | null>(null);

  if (!isOpen) return null;

  const handleRunMicTest = async () => {
    const success = await onTestMicrophone();
    setTestResultSuccess(success);
  };

  const getPermissionBadge = () => {
    if (micPermission === 'granted') {
      return {
        text: 'Microphone Allowed',
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        dotClass: 'bg-emerald-500',
        icon: CheckCircle2,
        desc: 'Browser permission is granted. Your voice will be captured cleanly.',
      };
    }
    if (micPermission === 'denied') {
      return {
        text: 'Microphone Blocked / Denied',
        badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
        dotClass: 'bg-rose-500',
        icon: AlertTriangle,
        desc: 'Microphone access is blocked in your browser settings. Please allow access below.',
      };
    }
    if (micPermission === 'prompt') {
      return {
        text: 'Permission Pending (Click Test)',
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
        dotClass: 'bg-amber-500',
        icon: HelpCircle,
        desc: 'Microphone permission has not been granted yet. Click "Test Microphone" to prompt permission.',
      };
    }
    return {
      text: 'Permission Status: Check on Demand',
      badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
      dotClass: 'bg-blue-500',
      icon: Info,
      desc: 'Click "Test Microphone" to verify and request access.',
    };
  };

  const badge = getPermissionBadge();
  const BadgeIcon = badge.icon;

  // Filter english voices
  const englishVoices = availableVoices.filter((v) => v.lang.startsWith('en'));
  const displayVoices = englishVoices.length > 0 ? englishVoices : availableVoices;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-blue-100">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-blue-50/70 to-indigo-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <SettingsIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base leading-tight">
                Settings & Microphone Options
              </h3>
              <p className="text-xs text-blue-600 font-semibold">Hey Dude Voice & Permission Controls</p>
            </div>
          </div>

          <button
            onClick={() => {
              onStopTestingMic();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* 1. MICROPHONE PERMISSION STATUS (PRIMARY REQUIREMENT) */}
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Mic className="w-4 h-4 text-blue-600" /> Microphone Permission Status
              </h4>

              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badge.badgeClass}`}
              >
                <span className={`w-2 h-2 rounded-full ${badge.dotClass} animate-pulse`} />
                {badge.text}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {badge.desc}
            </p>

            {/* Live Testing Meter Box */}
            {isTestingMic ? (
              <div className="p-3.5 bg-white rounded-xl border border-blue-200 space-y-2.5 shadow-sm">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-700 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    Microphone is Live & Receiving Audio!
                  </span>
                  <span className="font-bold text-slate-700 font-mono text-sm">{liveMicVolume}%</span>
                </div>

                {/* Animated Audio Volume Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
                  <div
                    className={`h-full rounded-full transition-all duration-75 ${
                      liveMicVolume > 60
                        ? 'bg-gradient-to-r from-emerald-500 via-yellow-400 to-rose-500'
                        : liveMicVolume > 20
                        ? 'bg-gradient-to-r from-blue-500 to-emerald-500'
                        : 'bg-blue-400'
                    }`}
                    style={{ width: `${Math.max(5, liveMicVolume)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Device: <strong>{activeMicDevice || 'Active System Mic'}</strong></span>
                  <span className="text-blue-600 font-semibold">Speak to see meter move</span>
                </div>

                <button
                  onClick={onStopTestingMic}
                  className="w-full mt-2 py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                >
                  Stop Test
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  onClick={handleRunMicTest}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all transform active:scale-98"
                >
                  <Mic className="w-4 h-4" />
                  Test Microphone & Check Permission
                </button>

                <button
                  onClick={() => setShowHowToAllow(!showHowToAllow)}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                >
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  How to Allow?
                </button>
              </div>
            )}

            {/* Error Message if Denied */}
            {speechError && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{speechError}</span>
              </div>
            )}

            {/* How to Allow Guide Dropdown */}
            {showHowToAllow && (
              <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-slate-700 space-y-2 animate-in fade-in">
                <h5 className="font-bold text-blue-900 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  How to allow microphone in your browser:
                </h5>
                <ol className="list-decimal pl-4 space-y-1 text-slate-600 font-normal">
                  <li>
                    Look at the browser address bar at the top (next to the URL).
                  </li>
                  <li>
                    Click the <strong>padlock icon (🔒)</strong> or <strong>site settings (tune icon 🎛️)</strong>.
                  </li>
                  <li>
                    Find <strong>Microphone</strong> in the permissions list and set it to <strong>Allow</strong>.
                  </li>
                  <li>
                    Refresh or click <strong>Test Microphone</strong> above!
                  </li>
                </ol>
              </div>
            )}
          </div>

          {/* 2. "HEY DUDE" WAKE WORD OPTIONS */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  "Hey Dude" Wake Word Detection
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Continuously listen in background for the phrase "Hey Dude"
                </p>
              </div>

              <button
                onClick={onToggleWakeWord}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  wakeWordActive ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    wakeWordActive ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* 3. VOICE SYNTHESIS (TEXT-TO-SPEECH) SETTINGS */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-indigo-600" /> AI Speech Output (Voice) Settings
            </h4>

            {/* Auto Read Aloud Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">Automatic Read Aloud</p>
                <p className="text-[11px] text-slate-500">Speak the college assistant answer immediately</p>
              </div>
              <button
                onClick={onToggleAutoSpeak}
                className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                  autoSpeak ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                {autoSpeak ? 'Enabled' : 'Muted'}
              </button>
            </div>

            {/* Voice Selection */}
            {displayVoices.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Selected English Voice
                </label>
                <div className="relative">
                  <select
                    value={selectedVoiceName || ''}
                    onChange={(e) => setSelectedVoiceName(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8"
                  >
                    <option value="">System Default (Natural English)</option>
                    {displayVoices.map((v, i) => (
                      <option key={i} value={v.name}>
                        {v.name} ({v.lang})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>
            )}

            {/* Speech Speed Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Speaking Rate (Speed)</span>
                <span className="font-mono text-blue-600">{voiceRate.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.75"
                max="1.35"
                step="0.05"
                value={voiceRate}
                onChange={(e) => setVoiceRate(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>Slower (0.75x)</span>
                <span>Normal (1.0x)</span>
                <span>Faster (1.35x)</span>
              </div>
            </div>

            {/* Pitch Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Voice Pitch</span>
                <span className="font-mono text-indigo-600">{voicePitch.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.85"
                max="1.25"
                step="0.05"
                value={voicePitch}
                onChange={(e) => setVoicePitch(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* Test Voice Button */}
            <div className="pt-1 flex gap-2">
              <button
                onClick={() =>
                  onSpeakSample(
                    'Hello! I am Hey Dude, your smart voice assistant for KLE Society’s College of BCA, Gokak.'
                  )
                }
                className="flex-1 py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-indigo-700" />
                Play Sample Audio Voice
              </button>

              <button
                onClick={() => {
                  setVoiceRate(1.0);
                  setVoicePitch(1.05);
                  setSelectedVoiceName('');
                }}
                className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors"
                title="Reset to defaults"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4. STUDENT & APP INFO */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-1.5 text-xs text-slate-600">
            <p className="font-bold text-slate-800">Student Profile & App Context</p>
            <p>User: <strong>Aravind Hannikeri</strong> (BCA 1st Semester)</p>
            <p>Institution: <strong>KLE Society’s College of BCA, Gokak</strong></p>
            <p>Affiliation: <strong>Rani Channamma University (RCU)</strong></p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Settings save automatically</span>
          <button
            onClick={() => {
              onStopTestingMic();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
