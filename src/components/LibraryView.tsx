import React from 'react';
import { ArrowLeft, Sparkles, Library, BookOpen, ExternalLink, Download, Search } from 'lucide-react';
import { BCA_FIRST_SEM_SUBJECTS } from '../data/collegeData';

interface LibraryViewProps {
  onBack: () => void;
  onOpenChatWithQuery: (q: string) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  onBack,
  onOpenChatWithQuery,
}) => {
  const books = [
    { title: 'Programming in ANSI C', author: 'E. Balagurusamy', subject: 'C Programming', code: 'CS-01' },
    { title: 'Database System Concepts', author: 'Silberschatz & Korth', subject: 'DBMS', code: 'CS-02' },
    { title: 'Engineering Mathematics Vol 1', author: 'B. S. Grewal', subject: 'Mathematics-I', code: 'MATH-01' },
    { title: 'Introduction to the Constitution of India', author: 'Dr. D. D. Basu', subject: 'Indian Constitution', code: 'HUM-01' },
    { title: 'High School English Grammar & Comp', author: 'Wren & Martin', subject: 'English', code: 'ENG-01' },
  ];

  return (
    <div className="flex-1 overflow-y-auto pb-6">
      {/* Header */}
      <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-bold text-slate-800 text-base">Digital Library & E-Resources</h2>
        </div>
        <button
          onClick={() => onOpenChatWithQuery("What books are recommended for BCA 1st semester?")}
          className="text-blue-600 hover:text-blue-700 p-1"
        >
          <Sparkles className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-4 text-white shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-violet-200">KLE Knowledge Center</span>
            <h3 className="text-base font-extrabold">BCA 1st Sem Books & Question Banks</h3>
            <p className="text-xs text-violet-100 mt-0.5">Over 5,000+ technical volumes & digital journals</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Library className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Recommended Books List */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-4">
          <h4 className="font-bold text-slate-800 text-sm mb-3">Prescribed Reference Textbooks</h4>
          <div className="space-y-2.5">
            {books.map((b, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-800 text-xs">{b.title}</h5>
                  <p className="text-[11px] text-slate-500">By {b.author}</p>
                  <span className="inline-block mt-1 text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-semibold">
                    {b.subject}
                  </span>
                </div>
                <button
                  onClick={() => onOpenChatWithQuery(`Tell me about reference books for ${b.subject}`)}
                  className="text-xs text-blue-600 font-bold hover:underline"
                >
                  Ask AI
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => onOpenChatWithQuery("Are there notes available for C Programming and DBMS?")}
          className="w-full py-3 px-4 rounded-xl bg-violet-50 text-violet-700 font-bold text-xs hover:bg-violet-100 transition-colors flex items-center justify-center gap-2"
        >
          <BookOpen className="w-4 h-4 text-violet-600" />
          Ask AI for Study Notes & Question Papers
        </button>
      </div>
    </div>
  );
};
