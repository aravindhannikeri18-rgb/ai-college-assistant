import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Mic,
  Paperclip,
  Smile,
  Volume2,
  VolumeX,
  RotateCcw,
  MoreVertical,
  CheckCheck,
  Sparkles,
  Bot,
  Copy,
  Check,
  Pause,
  Play
} from 'lucide-react';
import { RobotAvatar } from './RobotAvatar';
import { SUGGESTED_QUESTIONS } from '../data/collegeData';
import { VoiceState } from '../hooks/useVoiceAssistant';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  category?: string;
  isSpeakingNow?: boolean;
}

interface ChatViewProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onClearChat: () => void;
  voiceState: VoiceState;
  onOpenVoiceModal: () => void;
  onSpeakMessage: (text: string, msgId: string) => void;
  onStopSpeech: () => void;
  activeSpeakingId: string | null;
  autoSpeak: boolean;
  onToggleAutoSpeak: () => void;
  onNavigateHome?: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  onSendMessage,
  onClearChat,
  voiceState,
  onOpenVoiceModal,
  onSpeakMessage,
  onStopSpeech,
  activeSpeakingId,
  autoSpeak,
  onToggleAutoSpeak,
}) => {
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const emojis = ['👋', '🎓', '📚', '💻', '✨', '👍', '😊', '🏛️', '❓', '💡'];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, voiceState]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
    setShowEmojiPicker(false);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddEmoji = (emoji: string) => {
    setInputText((prev) => prev + emoji);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      {/* Top Header */}
      <div className="px-4 py-3 bg-white border-b border-slate-200/80 flex items-center justify-between sticky top-0 z-20 shadow-xs">
        <div className="flex items-center gap-3">
          <RobotAvatar size="sm" isSpeaking={voiceState === 'speaking'} isListening={voiceState === 'listening'} />
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-bold text-slate-900 text-sm md:text-base leading-tight">
                Hey Dude AI
              </h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-500 font-medium">KLE BCA College Assistant</p>
          </div>
        </div>

        <div className="flex items-center gap-1 relative">
          <button
            onClick={onToggleAutoSpeak}
            className={`p-2 rounded-full text-xs font-medium transition-colors ${
              autoSpeak ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:bg-slate-100'
            }`}
            title={autoSpeak ? 'AI voice speech enabled' : 'AI voice muted'}
          >
            {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {/* Context Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 top-10 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-30">
              <button
                onClick={() => {
                  onClearChat();
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Clear Chat History
              </button>
              <button
                onClick={() => {
                  onToggleAutoSpeak();
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                {autoSpeak ? 'Disable Voice Speech' : 'Enable Voice Speech'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <RobotAvatar
                size="sm"
                isSpeaking={activeSpeakingId === msg.id}
                className="shrink-0 mb-1"
              />
            )}

            <div
              className={`max-w-[82%] sm:max-w-[70%] rounded-2xl px-4 py-3 shadow-xs relative group ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white text-slate-800 rounded-bl-none border border-slate-100 shadow-sm'
              }`}
            >
              {msg.category && msg.sender === 'ai' && (
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    {msg.category}
                  </span>
                </div>
              )}

              <p className="text-sm leading-relaxed whitespace-pre-line font-normal">
                {msg.text}
              </p>

              <div
                className={`mt-1.5 flex items-center gap-2 text-[10px] ${
                  msg.sender === 'user' ? 'text-blue-100 justify-end' : 'text-slate-400 justify-between'
                }`}
              >
                {msg.sender === 'ai' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (activeSpeakingId === msg.id) {
                          onStopSpeech();
                        } else {
                          onSpeakMessage(msg.text, msg.id);
                        }
                      }}
                      className="text-slate-400 hover:text-blue-600 transition-colors p-0.5"
                      title={activeSpeakingId === msg.id ? 'Stop speaking' : 'Read aloud'}
                    >
                      {activeSpeakingId === msg.id ? (
                        <Pause className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="text-slate-400 hover:text-slate-600 transition-colors p-0.5"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-1">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'user' && <CheckCheck className="w-3.5 h-3.5 text-blue-200" />}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* AI Typing / Thinking Animation */}
        {voiceState === 'thinking' && (
          <div className="flex items-end gap-2.5 justify-start">
            <RobotAvatar size="sm" isListening={true} className="shrink-0 mb-1" />
            <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 border border-slate-100 shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="text-xs text-slate-500 font-medium ml-2">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Carousel */}
      <div className="px-4 py-2 border-t border-slate-100 bg-white/70 backdrop-blur-xs">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Suggested queries:
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {SUGGESTED_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => onSendMessage(q)}
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-blue-50/80 hover:bg-blue-600 hover:text-white text-blue-700 text-xs font-medium border border-blue-100 transition-all shrink-0"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Emoji Picker Popup if active */}
      {showEmojiPicker && (
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
          {emojis.map((emoji, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleAddEmoji(emoji)}
              className="text-lg p-1 hover:scale-125 transition-transform"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Input Bar matching screen 3 */}
      <div className="p-3 bg-white border-t border-slate-200/80">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSendMessage("What is the BCA syllabus?")}
            className="p-2 text-slate-400 hover:text-blue-600 rounded-full hover:bg-slate-100 transition-colors shrink-0"
            title="Attach inquiry / quick sample"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <div className="flex-1 relative flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-slate-100 text-slate-800 placeholder-slate-400 text-sm rounded-full pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute right-3 text-slate-400 hover:text-amber-500 transition-colors"
              title="Add emoji"
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>

          {/* Voice Mic Button */}
          <button
            type="button"
            onClick={onOpenVoiceModal}
            className={`p-2.5 rounded-full transition-all shrink-0 ${
              voiceState === 'listening'
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
            title="Voice mode"
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 text-white shadow-md shadow-blue-500/20 transition-all shrink-0"
            title="Send"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
