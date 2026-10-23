import React from 'react';
import {
  X,
  Home,
  MessageSquare,
  Building2,
  BookOpen,
  Users,
  ClipboardList,
  Library,
  Info,
  LifeBuoy,
  LogOut,
  Settings,
  Code2,
  Mic,
  GraduationCap
} from 'lucide-react';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeScreen: string;
  onNavigate: (screen: string) => void;
  onOpenVoiceModal: () => void;
  onOpenSourceModal: () => void;
  onOpenSettings: () => void;
  micPermission?: 'granted' | 'denied' | 'prompt' | 'unknown';
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  activeScreen,
  onNavigate,
  onOpenVoiceModal,
  onOpenSourceModal,
  onOpenSettings,
  micPermission,
}) => {
  if (!isOpen) return null;

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'chat', label: 'Chat Assistant', icon: MessageSquare },
    { id: 'college_info', label: 'College Information', icon: Building2 },
    { id: 'syllabus', label: 'Syllabus & Subjects', icon: BookOpen },
    { id: 'staff', label: 'Staff & Faculty', icon: Users },
    { id: 'exam_results', label: 'Exam & Results', icon: ClipboardList },
    { id: 'library', label: 'Library & Resources', icon: Library },
    { id: 'about', label: 'About AI Assistant', icon: Info },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container matching Screen 5 */}
      <div className="relative w-72 sm:w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-250">
        {/* User Profile Header matching Screen 5 */}
        <div className="p-5 bg-gradient-to-b from-blue-50/70 to-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
                alt="Aravind Hannikeri"
                className="w-13 h-13 rounded-full object-cover border-2 border-blue-500 shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-tight">
                Aravind Hannikeri
              </h3>
              <p className="text-xs text-blue-600 font-semibold flex items-center gap-1 mt-0.5">
                <GraduationCap className="w-3.5 h-3.5" /> BCA Student (1st Sem)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                onClose();
                onOpenSettings();
              }}
              className="p-1.5 text-slate-500 hover:text-blue-600 rounded-full hover:bg-slate-100 transition-colors"
              title="Settings & Microphone Options"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Items matching Screen 5 */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 hover:bg-blue-50/70 hover:text-blue-700'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100 my-2">
            {/* Quick Action: Voice Mode */}
            <button
              onClick={() => {
                onClose();
                onOpenVoiceModal();
              }}
              className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100 transition-colors"
            >
              <Mic className="w-5 h-5 text-indigo-600" />
              <span>Voice Assistant Screen</span>
            </button>

            {/* Standalone Source Files Modal */}
            <button
              onClick={() => {
                onClose();
                onOpenSourceModal();
              }}
              className="w-full mt-1.5 flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50/80 hover:bg-emerald-100 transition-colors"
            >
              <Code2 className="w-5 h-5 text-emerald-600" />
              <span>HTML / CSS / JS Files</span>
            </button>

            {/* Settings & Microphone Options */}
            <button
              onClick={() => {
                onClose();
                onOpenSettings();
              }}
              className="w-full mt-1.5 flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100/90 hover:bg-slate-200/80 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <Settings className="w-5 h-5 text-slate-500" />
                <span>Settings & Microphone</span>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  micPermission === 'granted'
                    ? 'bg-emerald-100 text-emerald-800'
                    : micPermission === 'denied'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {micPermission === 'granted' ? 'Allowed 🟢' : micPermission === 'denied' ? 'Blocked 🔴' : 'Check 🟡'}
              </span>
            </button>
          </div>
        </div>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <button
            onClick={() => {
              onNavigate('welcome');
              onClose();
            }}
            className="flex items-center gap-2 text-rose-600 text-xs sm:text-sm font-bold hover:text-rose-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Switch to Welcome Screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
