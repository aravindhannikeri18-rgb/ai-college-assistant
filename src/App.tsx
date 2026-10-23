/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Home,
  MessageSquare,
  Building2,
  BookOpen,
  Users,
  Phone,
  Mic,
  Menu,
  Sparkles,
  Volume2,
  VolumeX,
  Code2,
  Smartphone,
  Monitor,
  GraduationCap,
  History,
  MoreHorizontal,
  ChevronRight,
  Shield,
  MapPin,
  Clock,
  ArrowRight,
  UserCheck,
  Settings as SettingsIcon
} from 'lucide-react';

// Data & Hooks
import {
  COLLEGE_INFO,
  BCA_FIRST_SEM_SUBJECTS,
  STAFF_MEMBERS,
  SUGGESTED_QUESTIONS,
  matchQuestion
} from './data/collegeData';
import { useVoiceAssistant, VoiceState } from './hooks/useVoiceAssistant';

// Components
import { RobotAvatar } from './components/RobotAvatar';
import { AudioWave } from './components/AudioWave';
import { VoiceModal } from './components/VoiceModal';
import { ChatView, ChatMessage } from './components/ChatView';
import { DashboardView } from './components/DashboardView';
import { CollegeInfoView } from './components/CollegeInfoView';
import { SyllabusView } from './components/SyllabusView';
import { AboutView } from './components/AboutView';
import { StaffDirectoryView } from './components/StaffDirectoryView';
import { ExamResultsView } from './components/ExamResultsView';
import { LibraryView } from './components/LibraryView';
import { StudentSupportView } from './components/StudentSupportView';
import { SidebarDrawer } from './components/SidebarDrawer';
import { WelcomeSplashScreen } from './components/WelcomeSplashScreen';
import { SourceCodeModal } from './components/SourceCodeModal';
import { SettingsModal } from './components/SettingsModal';

export default function App() {
  // Screen state for the Mobile Frame view
  const [activeScreen, setActiveScreen] = useState<string>('dashboard');
  // View layout mode: 'mobile' (matches reference image mockups) or 'desktop' (full responsive web portal)
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');

  // Modals & Drawers
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Active speaking message ID for individual speech bubbles
  const [activeSpeakingId, setActiveSpeakingId] = useState<string | null>(null);

  // Initial chat history with welcome message
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'ai',
      text: "Hello, Aravind! I am Hey Dude, your AI College Assistant for KLE Society’s College of BCA, Gokak. How can I help you today?",
      timestamp: '09:40 AM',
      category: 'Welcome'
    },
    {
      id: 'user-sample-1',
      sender: 'user',
      text: 'What is the BCA syllabus?',
      timestamp: '09:41 AM'
    },
    {
      id: 'ai-sample-1',
      sender: 'ai',
      text: "The BCA 1st Semester syllabus includes:\n\n1. Kannada\n2. English\n3. C Programming\n4. DBMS (Database Management System)\n5. Mathematics 1\n6. Indian Constitution\n\nLet me know if you need more details about any subject!",
      timestamp: '09:41 AM',
      category: 'Syllabus'
    },
    {
      id: 'user-sample-2',
      sender: 'user',
      text: 'Thank you!',
      timestamp: '09:42 AM'
    },
    {
      id: 'ai-sample-2',
      sender: 'ai',
      text: "You're very welcome! Feel free to ask about our principal, staff, location, or exam dates anytime. 😊",
      timestamp: '09:42 AM',
      category: 'Support'
    }
  ]);

  // Handle new incoming query (from text input, click prompt, or voice recognition)
  const handleProcessQuery = (queryText: string) => {
    if (!queryText.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsgId = 'user-' + Date.now();
    const newUserMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: queryText,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, newUserMsg]);

    // Calculate smart answer
    const match = matchQuestion(queryText);
    const aiMsgId = 'ai-' + Date.now();

    // Small delay to simulate thinking
    setTimeout(() => {
      const newAiMsg: ChatMessage = {
        id: aiMsgId,
        sender: 'ai',
        text: match.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: match.category,
      };

      setMessages((prev) => [...prev, newAiMsg]);

      // Speak aloud if voice enabled
      setActiveSpeakingId(aiMsgId);
      voice.speak(match.answer, () => {
        setActiveSpeakingId(null);
      });
    }, 450);
  };

  // Voice Assistant Hook
  const voice = useVoiceAssistant({
    onQuestionRecognized: (question) => {
      handleProcessQuery(question);
    },
    onWakeWordDetected: () => {
      setIsVoiceModalOpen(true);
    },
    autoSpeakDefault: true,
  });

  const handleSpeakSingleMessage = (text: string, msgId: string) => {
    setActiveSpeakingId(msgId);
    voice.speak(text, () => {
      setActiveSpeakingId(null);
    });
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'msg-cleared-' + Date.now(),
        sender: 'ai',
        text: "Chat cleared! How can I assist you with KLE BCA College info?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: 'Assistant'
      }
    ]);
  };

  const handleOpenChatWithQuery = (query: string) => {
    setActiveScreen('chat');
    handleProcessQuery(query);
  };

  // Render content inside the Mobile Screen Frame (matching reference screens)
  const renderMobileScreen = () => {
    switch (activeScreen) {
      case 'welcome':
        return (
          <WelcomeSplashScreen
            onGetStarted={() => setActiveScreen('dashboard')}
            onLogin={() => setActiveScreen('dashboard')}
          />
        );
      case 'dashboard':
        return (
          <DashboardView
            onSelectOption={(opt) => setActiveScreen(opt)}
            onOpenChatWithQuery={handleOpenChatWithQuery}
            onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
            wakeWordActive={voice.wakeWordActive}
            onToggleWakeWord={voice.toggleWakeWord}
          />
        );
      case 'chat':
        return (
          <ChatView
            messages={messages}
            onSendMessage={handleProcessQuery}
            onClearChat={handleClearChat}
            voiceState={voice.voiceState}
            onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
            onSpeakMessage={handleSpeakSingleMessage}
            onStopSpeech={() => {
              voice.stopSpeech();
              setActiveSpeakingId(null);
            }}
            activeSpeakingId={activeSpeakingId}
            autoSpeak={voice.autoSpeak}
            onToggleAutoSpeak={() => voice.setAutoSpeak(!voice.autoSpeak)}
            onNavigateHome={() => setActiveScreen('dashboard')}
          />
        );
      case 'college_info':
        return (
          <CollegeInfoView
            onBack={() => setActiveScreen('dashboard')}
            onOpenChatWithQuery={handleOpenChatWithQuery}
          />
        );
      case 'syllabus':
        return (
          <SyllabusView
            onBack={() => setActiveScreen('dashboard')}
            onOpenChatWithQuery={handleOpenChatWithQuery}
          />
        );
      case 'staff':
        return (
          <StaffDirectoryView
            onBack={() => setActiveScreen('dashboard')}
            onOpenChatWithQuery={handleOpenChatWithQuery}
          />
        );
      case 'exam_results':
        return (
          <ExamResultsView
            onBack={() => setActiveScreen('dashboard')}
            onOpenChatWithQuery={handleOpenChatWithQuery}
          />
        );
      case 'library':
        return (
          <LibraryView
            onBack={() => setActiveScreen('dashboard')}
            onOpenChatWithQuery={handleOpenChatWithQuery}
          />
        );
      case 'student_support':
        return (
          <StudentSupportView
            onBack={() => setActiveScreen('dashboard')}
            onOpenChatWithQuery={handleOpenChatWithQuery}
          />
        );
      case 'about':
        return (
          <AboutView
            onBack={() => setActiveScreen('dashboard')}
            onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
            onViewSourceCode={() => setIsSourceModalOpen(true)}
          />
        );
      default:
        return (
          <DashboardView
            onSelectOption={(opt) => setActiveScreen(opt)}
            onOpenChatWithQuery={handleOpenChatWithQuery}
            onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
            wakeWordActive={voice.wakeWordActive}
            onToggleWakeWord={voice.toggleWakeWord}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-800 flex flex-col selection:bg-blue-200">
      {/* Global Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
          {/* Logo & College Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors md:hidden"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => {
                setActiveScreen('dashboard');
              }}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-sm font-black text-slate-900 leading-tight">
                  AI College Assistant
                </h1>
                <p className="text-[11px] text-blue-600 font-semibold tracking-wide hidden sm:block">
                  KLE Society’s College of BCA, Gokak
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-600">
            <button
              onClick={() => { setActiveScreen('dashboard'); setViewMode('desktop'); }}
              className={`hover:text-blue-600 transition-colors ${activeScreen === 'dashboard' ? 'text-blue-600 font-bold' : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => { setActiveScreen('college_info'); }}
              className={`hover:text-blue-600 transition-colors ${activeScreen === 'college_info' ? 'text-blue-600 font-bold' : ''}`}
            >
              About College
            </button>
            <button
              onClick={() => { setActiveScreen('staff'); }}
              className={`hover:text-blue-600 transition-colors ${activeScreen === 'staff' ? 'text-blue-600 font-bold' : ''}`}
            >
              Principal & Staff
            </button>
            <button
              onClick={() => { setActiveScreen('syllabus'); }}
              className={`hover:text-blue-600 transition-colors ${activeScreen === 'syllabus' ? 'text-blue-600 font-bold' : ''}`}
            >
              BCA 1st Semester
            </button>
            <button
              onClick={() => { setActiveScreen('student_support'); }}
              className={`hover:text-blue-600 transition-colors ${activeScreen === 'student_support' ? 'text-blue-600 font-bold' : ''}`}
            >
              Contact & Support
            </button>
          </nav>

          {/* Action Buttons: View Mode Switcher, Standalone Files, Talk to AI */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setViewMode('mobile')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
                  viewMode === 'mobile'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                title="View smartphone frame matching uploaded screens"
              >
                <Smartphone className="w-3.5 h-3.5" /> Mobile UI
              </button>
              <button
                onClick={() => setViewMode('desktop')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
                  viewMode === 'desktop'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                title="View wide desktop college portal"
              >
                <Monitor className="w-3.5 h-3.5" /> Web Portal
              </button>
            </div>

            {/* Standalone Code Files button */}
            <button
              onClick={() => setIsSourceModalOpen(true)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-xs"
              title="View & copy separate index.html, style.css, script.js files"
            >
              <Code2 className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden md:inline">HTML/CSS/JS Files</span>
            </button>

            {/* Microphone Permission Status Indicator & Settings Trigger */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
                voice.micPermission === 'granted'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : voice.micPermission === 'denied'
                  ? 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100'
                  : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
              }`}
              title="Click to check or update Microphone permission and voice settings"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  voice.micPermission === 'granted'
                    ? 'bg-emerald-500'
                    : voice.micPermission === 'denied'
                    ? 'bg-rose-500'
                    : 'bg-amber-500 animate-pulse'
                }`}
              />
              <span className="hidden md:inline">Mic:</span>
              <span>
                {voice.micPermission === 'granted'
                  ? 'Allowed 🟢'
                  : voice.micPermission === 'denied'
                  ? 'Blocked 🔴'
                  : 'Check Mic 🎙️'}
              </span>
            </button>

            {/* Prominent "Talk to AI" button */}
            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20 transform active:scale-95 transition-all"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Talk to AI</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start p-3 sm:p-6 w-full">
        {viewMode === 'mobile' ? (
          /* ====================================================================
             MOBILE APP EXPERIENCE (Pixel-perfect smartphone frame matching the 8 screens)
             ==================================================================== */
          <div className="w-full max-w-[420px] bg-white rounded-[40px] shadow-2xl border-[6px] border-slate-800/90 overflow-hidden flex flex-col h-[820px] relative transition-all duration-300">
            {/* iPhone Notch / Dynamic Island & Status Bar */}
            <div className="h-9 px-6 pt-1.5 flex items-center justify-between text-[11px] font-semibold text-slate-800 bg-white select-none z-30 shrink-0">
              <span>9:41</span>
              {/* Camera pill */}
              <div className="w-20 h-4 bg-slate-900 rounded-full" />
              <div className="flex items-center gap-1 text-slate-800">
                <span className="text-[10px]">5G</span>
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>

            {/* In-App Mobile Top Header (only for non-welcome screens) */}
            {activeScreen !== 'welcome' && (
              <div className="px-4 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between z-20 shrink-0">
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="p-1.5 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span className="font-extrabold text-sm text-slate-800">
                    AI College Assistant
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="p-1.5 text-slate-500 hover:text-blue-600 rounded-full hover:bg-slate-100 transition-colors"
                    title="Settings & Microphone Status"
                  >
                    <SettingsIcon className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="w-8 h-8 rounded-full overflow-hidden border border-blue-200"
                    title="Aravind Hannikeri Profile"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
                      alt="Aravind"
                      className="w-full h-full object-cover"
                    />
                  </button>
                </div>
              </div>
            )}

            {/* Screen Content View */}
            <div className="flex-1 overflow-hidden flex flex-col bg-slate-50/50">
              {renderMobileScreen()}
            </div>

            {/* Bottom App Navigation Bar (Screen 2 / Screen 3 style) */}
            {activeScreen !== 'welcome' && (
              <div className="h-16 bg-white border-t border-slate-100 px-4 flex items-center justify-around z-20 shrink-0 shadow-lg shadow-slate-200/50">
                <button
                  onClick={() => setActiveScreen('dashboard')}
                  className={`flex flex-col items-center gap-0.5 transition-colors ${
                    activeScreen === 'dashboard' ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  <span className="text-[10px]">Home</span>
                </button>

                <button
                  onClick={() => setActiveScreen('chat')}
                  className={`flex flex-col items-center gap-0.5 transition-colors ${
                    activeScreen === 'chat' ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-[10px]">Chat</span>
                </button>

                {/* Floating Blue Center Mic Button matching Screen 2 */}
                <button
                  onClick={() => setIsVoiceModalOpen(true)}
                  className="w-12 h-12 rounded-full -mt-5 bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all ring-4 ring-white"
                  title="Tap to Talk"
                >
                  <Mic className="w-6 h-6" />
                </button>

                <button
                  onClick={() => setActiveScreen('syllabus')}
                  className={`flex flex-col items-center gap-0.5 transition-colors ${
                    activeScreen === 'syllabus' ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="text-[10px]">Syllabus</span>
                </button>

                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <MoreHorizontal className="w-5 h-5" />
                  <span className="text-[10px]">More</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* ====================================================================
             FULL COLLEGE PORTAL / DESKTOP RESPONSIVE LAYOUT
             ==================================================================== */
          <div className="w-full max-w-6xl space-y-8 animate-in fade-in duration-300">
            {/* HERO SECTION */}
            <section className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
              <div className="max-w-2xl relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-blue-100 mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  KLE Society’s College of BCA, Gokak
                </span>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
                  Welcome to AI College Assistant
                </h2>
                <p className="text-base sm:text-lg text-blue-50/90 mb-8 font-medium leading-relaxed">
                  Your smart voice-powered college information assistant. Ask about principal, coordinator, subjects, staff, 180 BCA 1st sem students, or location!
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => {
                      setViewMode('mobile');
                      setActiveScreen('chat');
                    }}
                    className="px-6 py-3 rounded-full bg-white text-blue-700 font-extrabold text-sm hover:bg-blue-50 shadow-md transition-all flex items-center gap-2"
                  >
                    <span>Start Chatting</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsVoiceModalOpen(true)}
                    className="px-6 py-3 rounded-full border-2 border-white text-white font-extrabold text-sm hover:bg-white/10 transition-all flex items-center gap-2"
                  >
                    <Mic className="w-4 h-4" />
                    <span>Talk to AI ("Hey Dude")</span>
                  </button>
                </div>
              </div>

              <div className="hidden lg:flex absolute right-12 bottom-6 items-center justify-center">
                <RobotAvatar size="xl" className="animate-float-bot drop-shadow-2xl scale-125" />
              </div>
            </section>

            {/* COLLEGE OVERVIEW CARDS */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">About College & Key Administration</h3>
                  <p className="text-xs text-slate-500 font-medium">Authoritative institutional credentials</p>
                </div>
                <button
                  onClick={() => setIsVoiceModalOpen(true)}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Mic className="w-3.5 h-3.5" /> Ask AI via Voice
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 font-bold">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Principal</p>
                  <h4 className="text-base font-extrabold text-slate-800 mt-1">{COLLEGE_INFO.principal}</h4>
                  <p className="text-xs text-slate-500 mt-1">Head of Institution</p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Coordinator</p>
                  <h4 className="text-base font-extrabold text-slate-800 mt-1">{COLLEGE_INFO.coordinator}</h4>
                  <p className="text-xs text-slate-500 mt-1">College Coordinator</p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3 font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Staff & Students</p>
                  <h4 className="text-base font-extrabold text-slate-800 mt-1">
                    {COLLEGE_INFO.studentCount1stSem} Students • {COLLEGE_INFO.staffCount} Staff
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">1st Semester BCA Strength</p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
                  <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3 font-bold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Campus Location</p>
                  <h4 className="text-base font-extrabold text-slate-800 mt-1">{COLLEGE_INFO.location}</h4>
                  <p className="text-xs text-slate-500 mt-1">Phone: {COLLEGE_INFO.contactNumber}</p>
                </div>
              </div>
            </section>

            {/* BCA 1ST SEMESTER SUBJECTS GRID */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    BCA = {COLLEGE_INFO.bcaFullName}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                    BCA 1st Semester Subjects
                  </h3>
                </div>
                <p className="text-xs text-slate-500">6 Core and Foundation Papers</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {BCA_FIRST_SEM_SUBJECTS.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-blue-300 hover:bg-blue-50/30 transition-all group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                        {sub.id}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                          {sub.name}
                        </h4>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {sub.code} • {sub.credits} Credits
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {sub.description}
                    </p>
                    <button
                      onClick={() => {
                        setViewMode('mobile');
                        setActiveScreen('chat');
                        handleProcessQuery(`Tell me about ${sub.name} subject syllabus`);
                      }}
                      className="mt-3 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      Ask AI about {sub.name} →
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* CHATBOT DEMO PANEL */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="max-w-md">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Main AI Feature
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  Try "Hey Dude" in the Interactive Mobile View
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Experience voice questions, audio wave animations, suggested questions, and instant answers matching the official design specification.
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => {
                      setViewMode('mobile');
                      setActiveScreen('chat');
                    }}
                    className="px-5 py-2.5 rounded-full bg-blue-600 text-white font-bold text-xs shadow-md hover:bg-blue-700 transition-colors"
                  >
                    Launch Chat Assistant
                  </button>
                  <button
                    onClick={() => setIsVoiceModalOpen(true)}
                    className="px-5 py-2.5 rounded-full border border-blue-600 text-blue-600 font-bold text-xs hover:bg-blue-50 transition-colors"
                  >
                    Open Voice Screen
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 max-w-sm w-full">
                <p className="text-xs font-bold text-slate-700 mb-2">Try saying or asking:</p>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <p className="p-2 rounded-lg bg-white border border-slate-100 font-medium">"Hey Dude"</p>
                  <p className="p-2 rounded-lg bg-white border border-slate-100 font-medium">"Who is your college principal?"</p>
                  <p className="p-2 rounded-lg bg-white border border-slate-100 font-medium">"What is the full form of BCA?"</p>
                  <p className="p-2 rounded-lg bg-white border border-slate-100 font-medium">"Where is the college located?"</p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Voice Assistant Modal */}
      <VoiceModal
        isOpen={isVoiceModalOpen}
        onClose={() => {
          setIsVoiceModalOpen(false);
          voice.stopListening();
          voice.stopSpeech();
        }}
        voiceState={voice.voiceState}
        transcript={voice.transcript}
        interimTranscript={voice.interimTranscript}
        lastAiAnswer={messages.filter(m => m.sender === 'ai').slice(-1)[0]?.text}
        speechError={voice.speechError}
        autoSpeak={voice.autoSpeak}
        wakeWordActive={voice.wakeWordActive}
        micPermission={voice.micPermission}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onToggleListening={voice.toggleListening}
        onToggleAutoSpeak={() => voice.setAutoSpeak(!voice.autoSpeak)}
        onToggleWakeWord={voice.toggleWakeWord}
        onSelectPrompt={(prompt) => {
          handleProcessQuery(prompt);
          setActiveScreen('chat');
        }}
        onPauseSpeech={voice.pauseSpeech}
        onResumeSpeech={voice.resumeSpeech}
        onStopSpeech={voice.stopSpeech}
        isSpeakingPaused={voice.isSpeakingPaused}
      />

      {/* User Profile & Navigation Drawer */}
      <SidebarDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeScreen={activeScreen}
        onNavigate={(screen) => setActiveScreen(screen)}
        onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
        onOpenSourceModal={() => setIsSourceModalOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        micPermission={voice.micPermission}
      />

      {/* Standalone Source Files Modal (for college project submission) */}
      <SourceCodeModal
        isOpen={isSourceModalOpen}
        onClose={() => setIsSourceModalOpen(false)}
      />

      {/* Settings & Microphone Diagnostics Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        micPermission={voice.micPermission}
        isTestingMic={voice.isTestingMic}
        liveMicVolume={voice.liveMicVolume}
        activeMicDevice={voice.activeMicDevice}
        onTestMicrophone={voice.testMicrophone}
        onStopTestingMic={voice.stopTestingMic}
        speechError={voice.speechError}
        autoSpeak={voice.autoSpeak}
        onToggleAutoSpeak={() => voice.setAutoSpeak(!voice.autoSpeak)}
        wakeWordActive={voice.wakeWordActive}
        onToggleWakeWord={voice.toggleWakeWord}
        voiceRate={voice.voiceRate}
        setVoiceRate={voice.setVoiceRate}
        voicePitch={voice.voicePitch}
        setVoicePitch={voice.setVoicePitch}
        selectedVoiceName={voice.selectedVoiceName}
        setSelectedVoiceName={voice.setSelectedVoiceName}
        availableVoices={voice.availableVoices}
        onSpeakSample={(sample) => voice.speak(sample)}
      />

      {/* Footer */}
      <footer className="mt-auto py-5 bg-white border-t border-slate-200 text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-700">
          KLE Society’s College of BCA, Gokak • AI College Assistant
        </p>
        <p className="text-[11px] text-slate-400 mt-1">
          Principal: {COLLEGE_INFO.principal} • Coordinator: {COLLEGE_INFO.coordinator} • Location: {COLLEGE_INFO.location} • Contact: {COLLEGE_INFO.contactNumber}
        </p>
      </footer>
    </div>
  );
}
