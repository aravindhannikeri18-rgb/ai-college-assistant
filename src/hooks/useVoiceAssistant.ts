import { useState, useEffect, useRef, useCallback } from 'react';

export type VoiceState = 'idle' | 'listening' | 'thinking' | 'speaking';
export type MicPermissionState = 'granted' | 'denied' | 'prompt' | 'unknown';

export interface VoiceAssistantOptions {
  onQuestionRecognized: (question: string) => void;
  onWakeWordDetected?: () => void;
  autoSpeakDefault?: boolean;
}

export function useVoiceAssistant({
  onQuestionRecognized,
  onWakeWordDetected,
  autoSpeakDefault = true,
}: VoiceAssistantOptions) {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState<string>('');
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [autoSpeak, setAutoSpeak] = useState<boolean>(autoSpeakDefault);
  const [wakeWordActive, setWakeWordActive] = useState<boolean>(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [isSpeakingPaused, setIsSpeakingPaused] = useState<boolean>(false);
  const [audioLevel, setAudioLevel] = useState<number>(0);

  // Microphone Permission & Hardware Diagnostics
  const [micPermission, setMicPermission] = useState<MicPermissionState>('unknown');
  const [isTestingMic, setIsTestingMic] = useState<boolean>(false);
  const [liveMicVolume, setLiveMicVolume] = useState<number>(0);
  const [activeMicDevice, setActiveMicDevice] = useState<string | null>(null);

  // Voice Customization Settings
  const [voiceRate, setVoiceRate] = useState<number>(1.0);
  const [voicePitch, setVoicePitch] = useState<number>(1.05);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  // References
  const recognitionRef = useRef<any>(null);
  const wakeRecognitionRef = useRef<any>(null);
  const isListeningRef = useRef<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Check microphone permissions via Permissions API
  const checkMicPermission = useCallback(async () => {
    if (typeof navigator !== 'undefined' && navigator.permissions && navigator.permissions.query) {
      try {
        const permissionStatus = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        setMicPermission(permissionStatus.state as MicPermissionState);

        permissionStatus.onchange = () => {
          setMicPermission(permissionStatus.state as MicPermissionState);
        };
      } catch (e) {
        // Some browsers or iframe sandbox may not support querying microphone permission name
        console.info('Microphone query not supported by browser Permissions API, will check on demand.');
      }
    }
  }, []);

  useEffect(() => {
    checkMicPermission();
  }, [checkMicPermission]);

  // Load available SpeechSynthesis voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // Audio wave animation simulator when listening or speaking
  useEffect(() => {
    let interval: any;
    if (voiceState === 'listening' || voiceState === 'speaking') {
      interval = setInterval(() => {
        setAudioLevel(Math.random() * 0.7 + 0.3);
      }, 120);
    } else {
      setAudioLevel(0);
    }
    return () => clearInterval(interval);
  }, [voiceState]);

  // Text to Speech
  const speak = useCallback(
    (text: string, onComplete?: () => void) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        console.warn('SpeechSynthesis not supported');
        if (onComplete) onComplete();
        return;
      }

      // Stop any current utterance
      window.speechSynthesis.cancel();

      if (!autoSpeak) {
        if (onComplete) onComplete();
        return;
      }

      setVoiceState('speaking');
      setIsSpeakingPaused(false);

      const cleanText = text.replace(/[*_#`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);

      // Choose selected voice or natural fallback
      const voices = window.speechSynthesis.getVoices();
      let chosenVoice: SpeechSynthesisVoice | undefined;

      if (selectedVoiceName) {
        chosenVoice = voices.find((v) => v.name === selectedVoiceName);
      }

      if (!chosenVoice) {
        chosenVoice = voices.find(
          (v) =>
            (v.name.includes('Natural') ||
              v.name.includes('Google') ||
              v.name.includes('Samantha') ||
              v.name.includes('Karen') ||
              v.name.includes('English')) &&
            v.lang.startsWith('en')
        );
      }

      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }

      utterance.rate = voiceRate;
      utterance.pitch = voicePitch;

      utterance.onend = () => {
        setVoiceState('idle');
        setIsSpeakingPaused(false);
        if (onComplete) onComplete();
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis error:', e);
        setVoiceState('idle');
        setIsSpeakingPaused(false);
        if (onComplete) onComplete();
      };

      window.speechSynthesis.speak(utterance);
    },
    [autoSpeak, voiceRate, voicePitch, selectedVoiceName]
  );

  // Stop live mic testing
  const stopTestingMic = useCallback(() => {
    setIsTestingMic(false);
    setLiveMicVolume(0);
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (e) {}
      audioContextRef.current = null;
    }
  }, []);

  // Request & Test live microphone permission with AudioContext & AnalyserNode
  const testMicrophone = useCallback(async (): Promise<boolean> => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setSpeechError('Microphone media devices API not supported in this environment.');
      setMicPermission('denied');
      return false;
    }

    stopTestingMic();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      setMicPermission('granted');
      setIsTestingMic(true);
      setSpeechError(null);

      // Track active device name
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        setActiveMicDevice(audioTrack.label || 'Default Microphone');
      }

      // Connect Web Audio API to measure volume level
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const audioCtx = new AudioCtx();
        audioContextRef.current = audioCtx;
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const updateMeter = () => {
          if (!mediaStreamRef.current) return;
          analyser.getByteFrequencyData(dataArray);

          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const average = sum / dataArray.length;
          const normalized = Math.min(100, Math.round((average / 128) * 100));
          setLiveMicVolume(normalized);

          animFrameRef.current = requestAnimationFrame(updateMeter);
        };

        updateMeter();
      }

      return true;
    } catch (err: any) {
      console.warn('Microphone permission request error:', err);
      setIsTestingMic(false);
      setLiveMicVolume(0);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setMicPermission('denied');
        setSpeechError('Microphone permission denied. Please allow microphone access in your browser settings.');
      } else {
        setSpeechError(`Could not access microphone: ${err.message || err.name}`);
      }
      return false;
    }
  }, [stopTestingMic]);

  const pauseSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        setIsSpeakingPaused(true);
      }
    }
  }, []);

  const resumeSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsSpeakingPaused(false);
      }
    }
  }, []);

  const stopSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setVoiceState('idle');
      setIsSpeakingPaused(false);
    }
  }, []);

  // Stop active listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (err) {
        // ignore
      }
      recognitionRef.current = null;
    }
    isListeningRef.current = false;
    setVoiceState((prev) => (prev === 'listening' ? 'idle' : prev));
  }, []);

  // Start listening for a single user question
  const startListening = useCallback(() => {
    setSpeechError(null);
    stopSpeech();

    const SpeechRec =
      typeof window !== 'undefined'
        ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        : null;

    if (!SpeechRec) {
      setSpeechError('Voice recognition is not supported in this browser. You can type your questions below.');
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognitionRef.current = recognition;
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        isListeningRef.current = true;
        setVoiceState('listening');
        setTranscript('');
        setInterimTranscript('');
      };

      recognition.onresult = (event: any) => {
        let currentInterim = '';
        let finalQuery = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalQuery += event.results[i][0].transcript;
          } else {
            currentInterim += event.results[i][0].transcript;
          }
        }

        setInterimTranscript(currentInterim);

        if (finalQuery) {
          setTranscript(finalQuery);
          setVoiceState('thinking');
          recognition.stop();
          onQuestionRecognized(finalQuery.trim());
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setSpeechError('Microphone access was denied. Please allow microphone permissions in your browser.');
        } else if (event.error !== 'no-speech') {
          setSpeechError(`Voice error: ${event.error}`);
        }
        setVoiceState('idle');
        isListeningRef.current = false;
      };

      recognition.onend = () => {
        isListeningRef.current = false;
        if (voiceState === 'listening') {
          setVoiceState('idle');
        }
      };

      recognition.start();
    } catch (err: any) {
      console.error('Failed to start speech recognition:', err);
      setSpeechError(err?.message || 'Unable to start microphone.');
      setVoiceState('idle');
    }
  }, [stopSpeech, voiceState, onQuestionRecognized]);

  // Toggle active single-turn listening
  const toggleListening = useCallback(() => {
    if (voiceState === 'listening') {
      stopListening();
    } else {
      startListening();
    }
  }, [voiceState, startListening, stopListening]);

  // Continuous "Hey Dude" Wake Word Detector
  const toggleWakeWord = useCallback(() => {
    const SpeechRec =
      typeof window !== 'undefined'
        ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        : null;

    if (!SpeechRec) {
      setSpeechError('Continuous wake-word detection is not supported in this browser.');
      return;
    }

    if (wakeWordActive) {
      // Turn OFF
      if (wakeRecognitionRef.current) {
        try {
          wakeRecognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
        wakeRecognitionRef.current = null;
      }
      setWakeWordActive(false);
      return;
    }

    // Turn ON
    try {
      const rec = new SpeechRec();
      wakeRecognitionRef.current = rec;
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setWakeWordActive(true);
        setSpeechError(null);
      };

      rec.onresult = (e: any) => {
        for (let i = e.resultIndex; i < e.results.length; ++i) {
          const phrase = e.results[i][0].transcript.toLowerCase();
          if (phrase.includes('hey dude') || phrase.includes('hay dude') || phrase.includes('hey do')) {
            // Wake word detected!
            rec.stop();
            if (onWakeWordDetected) {
              onWakeWordDetected();
            }
            speak('Hey! I’m listening. How can I help you?', () => {
              // Now start listening for question
              setTimeout(() => {
                startListening();
              }, 400);
            });
            return;
          }
        }
      };

      rec.onerror = (e: any) => {
        if (e.error === 'not-allowed') {
          setSpeechError('Microphone permission needed for "Hey Dude" wake-word detection.');
          setWakeWordActive(false);
        }
      };

      rec.onend = () => {
        // If still active and not currently in voice interaction, restart continuous listening
        if (wakeWordActive && voiceState === 'idle') {
          try {
            rec.start();
          } catch (e) {
            // ignore
          }
        }
      };

      rec.start();
      setWakeWordActive(true);
    } catch (err: any) {
      console.warn('Wake-word start error:', err);
      setSpeechError('Could not enable "Hey Dude" background listener.');
      setWakeWordActive(false);
    }
  }, [wakeWordActive, voiceState, onWakeWordDetected, speak, startListening]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
      if (wakeRecognitionRef.current) {
        try {
          wakeRecognitionRef.current.abort();
        } catch (e) {}
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    voiceState,
    setVoiceState,
    transcript,
    interimTranscript,
    isSupported,
    autoSpeak,
    setAutoSpeak,
    wakeWordActive,
    toggleWakeWord,
    speechError,
    setSpeechError,
    startListening,
    stopListening,
    toggleListening,
    speak,
    pauseSpeech,
    resumeSpeech,
    stopSpeech,
    isSpeakingPaused,
    audioLevel,
    // Microphone Permission & Live Test Meter
    micPermission,
    checkMicPermission,
    isTestingMic,
    liveMicVolume,
    activeMicDevice,
    testMicrophone,
    stopTestingMic,
    // Voice customization settings
    voiceRate,
    setVoiceRate,
    voicePitch,
    setVoicePitch,
    selectedVoiceName,
    setSelectedVoiceName,
    availableVoices,
  };
}
