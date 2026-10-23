/**
 * ==========================================================================
 * AI COLLEGE ASSISTANT - KLE Society's College of BCA, Gokak
 * script.js - Core Functional Script
 * Features:
 *  - College Knowledge Base
 *  - Smart Question Matcher
 *  - Speech-to-Text (Web Speech API)
 *  - Text-to-Speech Voice Engine
 *  - "Hey Dude" Wake Word Continuous Listener
 *  - Chat UI & Audio Wave Controls
 * ==========================================================================
 */

// 1. COLLEGE KNOWLEDGE BASE OBJECT
const COLLEGE_DATABASE = {
  name: "KLE Society’s College of BCA, Gokak",
  principal: "Mr. Prashant Kivati",
  coordinator: "Mr. Malakajan Bagavan",
  staffCount: 6,
  bcaFullName: "Bachelor of Computer Applications",
  firstSemStudents: 180,
  contactNumber: "101-334-433",
  location: "Gokak, near Bellikata, in front",
  subjects: [
    "Kannada",
    "English",
    "C Programming",
    "DBMS (Database Management System)",
    "Mathematics-I",
    "Indian Constitution"
  ]
};

// 2. SMART QUESTION MATCHING ENGINE
function answerCollegeQuery(userQuery) {
  const q = userQuery.trim().toLowerCase();

  // Greeting / Wake phrase
  if (q.includes("hey dude") || q.includes("hi dude") || q.includes("hello dude")) {
    return "Hey! I’m listening. How can I help you?";
  }

  // Principal
  if (q.includes("principal") || q.includes("prashant") || q.includes("kivati") || q.includes("head of college")) {
    return "The principal of our college is Mr. Prashant Kivati.";
  }

  // Coordinator
  if (q.includes("coordinator") || q.includes("co-ordinator") || q.includes("malakajan") || q.includes("bagavan") || q.includes("hod")) {
    return "The college coordinator is Mr. Malakajan Bagavan.";
  }

  // Staff Count
  if (q.includes("staff") || q.includes("faculty") || q.includes("teachers") || q.includes("professors") || q.includes("how many staff")) {
    return `There are ${COLLEGE_DATABASE.staffCount} staff members in our college.`;
  }

  // BCA Full Form
  if (q.includes("full form") || q.includes("fullform") || q.includes("stand for") || q.includes("what is bca") || q.includes("meaning of bca")) {
    return "BCA stands for Bachelor of Computer Applications.";
  }

  // Students in 1st Semester
  if (q.includes("how many students") || q.includes("student count") || q.includes("strength") || q.includes("1st sem") || q.includes("first sem") && q.includes("student")) {
    return `There are ${COLLEGE_DATABASE.firstSemStudents} students in the 1st semester BCA.`;
  }

  // College Name
  if (q.includes("name of your college") || q.includes("college name") || q.includes("what is your college") || q.includes("which college")) {
    return `The name of our college is ${COLLEGE_DATABASE.name}.`;
  }

  // 1st Sem Subjects
  if (q.includes("subject") || q.includes("syllabus") || q.includes("curriculum") || q.includes("course")) {
    return `The subjects are ${COLLEGE_DATABASE.subjects.join(", ")}.`;
  }

  // Contact Number
  if (q.includes("contact") || q.includes("phone") || q.includes("number") || q.includes("call") || q.includes("mobile")) {
    return `The college contact number is ${COLLEGE_DATABASE.contactNumber}.`;
  }

  // Location / Address
  if (q.includes("where") || q.includes("location") || q.includes("address") || q.includes("place") || q.includes("bellikata") || q.includes("gokak")) {
    return `Our college is located in ${COLLEGE_DATABASE.location}.`;
  }

  // Default Fallback
  return "Sorry, I don't have that information yet. Please ask me about our college, BCA courses, subjects, staff, students or contact information.";
}

// 3. TEXT TO SPEECH (TTS)
let autoVoiceEnabled = true;

function speakText(text, callback) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel(); // clear previous

  if (!autoVoiceEnabled) {
    if (callback) callback();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = 1.05;

  // Try natural English voice
  const voices = window.speechSynthesis.getVoices();
  const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
  if (naturalVoice) utterance.voice = naturalVoice;

  const micStatus = document.getElementById('mic-status-text');
  if (micStatus) micStatus.innerText = "Speaking...";

  utterance.onend = () => {
    if (micStatus) micStatus.innerText = "Tap to Talk";
    if (callback) callback();
  };

  utterance.onerror = () => {
    if (micStatus) micStatus.innerText = "Tap to Talk";
    if (callback) callback();
  };

  window.speechSynthesis.speak(utterance);
}

// 4. SPEECH TO TEXT (STT) & MIC CONTROL
let recognition = null;
let isListening = false;

function initSpeechRecognition() {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    console.warn("SpeechRecognition not supported in this browser.");
    return null;
  }
  const rec = new SpeechRec();
  rec.lang = 'en-US';
  rec.interimResults = false;
  rec.continuous = false;

  rec.onstart = () => {
    isListening = true;
    updateMicUI(true, "Listening...");
  };

  rec.onresult = (e) => {
    const text = e.results[0][0].transcript;
    handleUserMessage(text);
  };

  rec.onerror = (e) => {
    console.error("Speech recognition error:", e.error);
    updateMicUI(false, "Tap to Talk");
    isListening = false;
  };

  rec.onend = () => {
    isListening = false;
    updateMicUI(false, "Tap to Talk");
  };

  return rec;
}

function updateMicUI(listening, statusText) {
  const micBtn = document.getElementById('chat-mic-btn');
  const micStatus = document.getElementById('mic-status-text');
  if (micBtn) {
    if (listening) {
      micBtn.classList.add('listening');
    } else {
      micBtn.classList.remove('listening');
    }
  }
  if (micStatus) {
    micStatus.innerText = statusText;
  }
}

function toggleMicrophone() {
  if (!recognition) {
    recognition = initSpeechRecognition();
  }
  if (!recognition) {
    alert("Voice recognition is not supported in this browser. Please type your message.");
    return;
  }

  if (isListening) {
    recognition.abort();
    isListening = false;
    updateMicUI(false, "Tap to Talk");
  } else {
    try {
      recognition.start();
    } catch (err) {
      console.warn("Could not start recognition:", err);
    }
  }
}

// 5. "HEY DUDE" CONTINUOUS WAKE WORD DETECTION
let wakeWordRecognizer = null;
let wakeWordActive = false;

function toggleWakeWordDetection() {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    alert("Wake-word continuous recognition is not supported in this browser.");
    return;
  }

  if (wakeWordActive) {
    if (wakeWordRecognizer) {
      wakeWordRecognizer.abort();
      wakeWordRecognizer = null;
    }
    wakeWordActive = false;
    updateWakeWordUI(false);
    return;
  }

  wakeWordRecognizer = new SpeechRec();
  wakeWordRecognizer.continuous = true;
  wakeWordRecognizer.interimResults = true;
  wakeWordRecognizer.lang = 'en-US';

  wakeWordRecognizer.onstart = () => {
    wakeWordActive = true;
    updateWakeWordUI(true);
  };

  wakeWordRecognizer.onresult = (e) => {
    for (let i = e.resultIndex; i < e.results.length; ++i) {
      const phrase = e.results[i][0].transcript.toLowerCase();
      if (phrase.includes("hey dude") || phrase.includes("hay dude")) {
        wakeWordRecognizer.stop();
        speakText("Hey! I’m listening. How can I help you?", () => {
          setTimeout(() => {
            toggleMicrophone();
          }, 300);
        });
        return;
      }
    }
  };

  wakeWordRecognizer.onend = () => {
    if (wakeWordActive && !isListening) {
      try {
        wakeWordRecognizer.start();
      } catch (err) {}
    }
  };

  try {
    wakeWordRecognizer.start();
    wakeWordActive = true;
    updateWakeWordUI(true);
  } catch (err) {
    console.error("Failed to start wake word listener:", err);
  }
}

function updateWakeWordUI(active) {
  const wakeBtn = document.getElementById('wake-word-btn');
  if (wakeBtn) {
    wakeBtn.innerText = active ? 'Hey Dude: Active 🟢' : 'Hey Dude: Turn On 🎙️';
  }
}

// 6. MESSAGE HANDLING & DOM RENDERING
function handleUserMessage(queryText) {
  if (!queryText || !queryText.trim()) return;

  const chatContainer = document.getElementById('chat-messages-box');
  if (!chatContainer) return;

  // Append User Bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'msg-bubble msg-user';
  userBubble.innerText = queryText;
  chatContainer.appendChild(userBubble);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Process Answer
  const answer = answerCollegeQuery(queryText);

  // Show thinking indicator briefly
  const thinkingBubble = document.createElement('div');
  thinkingBubble.className = 'msg-bubble msg-ai';
  thinkingBubble.innerText = "Thinking...";
  chatContainer.appendChild(thinkingBubble);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  setTimeout(() => {
    thinkingBubble.innerText = answer;
    chatContainer.scrollTop = chatContainer.scrollHeight;
    speakText(answer);
  }, 400);
}

// 7. EVENT LISTENERS SETUP ON LOAD
document.addEventListener('DOMContentLoaded', () => {
  // Input form submission
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input-field');

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = chatInput.value.trim();
      if (val) {
        handleUserMessage(val);
        chatInput.value = '';
      }
    });
  }

  // Mic button
  const micBtn = document.getElementById('chat-mic-btn');
  if (micBtn) {
    micBtn.addEventListener('click', toggleMicrophone);
  }

  // Suggested questions chips
  document.querySelectorAll('.chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      handleUserMessage(btn.innerText);
    });
  });

  // Talk to AI hero buttons
  const heroTalkAi = document.getElementById('hero-talk-ai-btn');
  if (heroTalkAi) {
    heroTalkAi.addEventListener('click', () => {
      toggleMicrophone();
      const chatbotSection = document.getElementById('chatbot-section');
      if (chatbotSection) chatbotSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const wakeWordBtn = document.getElementById('wake-word-btn');
  if (wakeWordBtn) {
    wakeWordBtn.addEventListener('click', toggleWakeWordDetection);
  }
});
