import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, CheckCircle, ExternalLink } from 'lucide-react';

interface SourceCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SourceCodeModal: React.FC<SourceCodeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const getFileUrl = () => {
    switch (activeTab) {
      case 'html': return '/standalone.html';
      case 'css': return '/style.css';
      case 'js': return '/script.js';
    }
  };

  const getFileName = () => {
    switch (activeTab) {
      case 'html': return 'index.html';
      case 'css': return 'style.css';
      case 'js': return 'script.js';
    }
  };

  const handleCopyCode = async () => {
    try {
      const res = await fetch(getFileUrl());
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-blue-100">
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">Project Source Files</h3>
              <p className="text-xs text-slate-500">Standalone HTML, CSS & JavaScript for College Submission</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* File Tabs */}
        <div className="px-5 pt-3 pb-2 flex items-center justify-between border-b border-slate-100 bg-white">
          <div className="flex gap-2">
            {[
              { id: 'html', label: 'index.html (Semantic HTML)' },
              { id: 'css', label: 'style.css (Separate CSS)' },
              { id: 'js', label: 'script.js (Separate JS)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={getFileUrl()}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              Open Raw <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold flex items-center gap-1 hover:bg-blue-100 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
        </div>

        {/* Explanatory banner */}
        <div className="px-5 py-2.5 bg-blue-50/70 border-b border-blue-100 text-xs text-blue-800 flex items-center justify-between">
          <span>
            These 3 standalone files are stored in <code>/public/{getFileName()}</code>, ready for college lab exams, viva, or pure vanilla browser execution without any build step!
          </span>
        </div>

        {/* Code Preview area */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-900 text-slate-200 font-mono text-xs leading-relaxed">
          <p className="text-slate-400 mb-2">// File: {getFileName()} (Click "Copy Code" or "Open Raw" above to get full content)</p>
          <pre className="overflow-x-auto whitespace-pre-wrap">
            {activeTab === 'html' && `<!-- AI COLLEGE ASSISTANT – KLE Society’s College of BCA, Gokak -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI COLLEGE ASSISTANT – KLE Society’s College of BCA, Gokak</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  ... Full responsive semantic college portal with Hey Dude assistant ...
  <script src="script.js"></script>
</body>
</html>`}
            {activeTab === 'css' && `/* style.css - Modern, Colorful, Responsive Design with Glassmorphism & Animations */
:root {
  --primary-blue: #2563eb;
  --accent-purple: #7c3aed;
  --accent-cyan: #06b6d4;
  --bg-main: #f0f4fd;
}
/* Cards, Subjects, Voice Visualizer, Responsive layouts */`}
            {activeTab === 'js' && `// script.js - Smart Question Matcher, SpeechRecognition & SpeechSynthesis
const COLLEGE_DATABASE = {
  name: "KLE Society’s College of BCA, Gokak",
  principal: "Mr. Prashant Kivati",
  coordinator: "Mr. Malakajan Bagavan",
  staffCount: 6,
  firstSemStudents: 180,
  contactNumber: "101-334-433",
  location: "Gokak, near Bellikata, in front",
  subjects: ["Kannada", "English", "C Programming", "DBMS", "Mathematics-I", "Indian Constitution"]
};
// Wake Word "Hey Dude" + Voice controls`}
          </pre>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 font-bold text-xs text-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
