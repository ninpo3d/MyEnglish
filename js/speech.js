// Голосовой движок с поддержкой богатой палитры естественных голосов (Microsoft Edge Natural & Chrome)
// Назначает разные индивидуальные голоса разным персонажам диалогов

class SpeechEngine {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.recognition = null;
    this.allVoices = [];
    this.maleVoices = [];
    this.femaleVoices = [];
    this.defaultVoice = null;
    this.isListening = false;

    this.initVoices();
    this.initRecognition();
  }

  initVoices() {
    if (!this.synth) return;

    const categorizeVoices = () => {
      this.allVoices = this.synth.getVoices().filter((v) => v.lang.startsWith("en"));
      if (this.allVoices.length === 0) return;

      // Приоритет естественным голосам Edge (Online Natural) и Google
      const naturalVoices = this.allVoices.filter(
        (v) => v.name.includes("Natural") || v.name.includes("Online") || v.name.includes("Google")
      );
      const voicePool = naturalVoices.length > 0 ? naturalVoices : this.allVoices;

      // Женские голоса
      this.femaleVoices = voicePool.filter(
        (v) =>
          v.name.includes("Jenny") ||
          v.name.includes("Aria") ||
          v.name.includes("Sonia") ||
          v.name.includes("Zira") ||
          v.name.includes("Female") ||
          v.name.includes("Steffi")
      );

      // Мужские голоса
      this.maleVoices = voicePool.filter(
        (v) =>
          v.name.includes("Guy") ||
          v.name.includes("Ryan") ||
          v.name.includes("Christopher") ||
          v.name.includes("David") ||
          v.name.includes("George") ||
          v.name.includes("Male") ||
          v.name.includes("Mark")
      );

      // Дефолтный нейтральный голос
      this.defaultVoice =
        this.maleVoices.find((v) => v.name.includes("Guy")) ||
        this.femaleVoices.find((v) => v.name.includes("Jenny")) ||
        this.allVoices[0] ||
        null;
    };

    categorizeVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = categorizeVoices;
    }
  }

  // Подбор индивидуального голоса под персонажа
  getVoiceForCharacter(characterName = "") {
    const nameLower = characterName.toLowerCase();

    // Женские персонажи
    const isFemale =
      nameLower.includes("elena") ||
      nameLower.includes("sarah") ||
      nameLower.includes("emily") ||
      nameLower.includes("chloe") ||
      nameLower.includes("jenny") ||
      nameLower.includes("anna");

    if (isFemale && this.femaleVoices.length > 0) {
      // Ищем Jenny или Aria
      return (
        this.femaleVoices.find((v) => v.name.includes("Jenny")) ||
        this.femaleVoices.find((v) => v.name.includes("Aria")) ||
        this.femaleVoices[0]
      );
    }

    // Мужские персонажи с разной окраской
    if (this.maleVoices.length > 0) {
      if (nameLower.includes("mark") || nameLower.includes("director") || nameLower.includes("marcus")) {
        // Серьёзный глубокий голос для тимлида / режиссера
        return (
          this.maleVoices.find((v) => v.name.includes("Guy")) ||
          this.maleVoices.find((v) => v.name.includes("Christopher")) ||
          this.maleVoices[0]
        );
      } else if (nameLower.includes("alex") || nameLower.includes("david") || nameLower.includes("sam")) {
        return (
          this.maleVoices.find((v) => v.name.includes("Ryan")) ||
          this.maleVoices.find((v) => v.name.includes("George")) ||
          this.maleVoices[0]
        );
      }
      return this.maleVoices[0];
    }

    return this.defaultVoice;
  }

  // Озвучивание реплики от лица конкретного персонажа
  speakAs(text, characterName = "", rate = 0.95, onEnd = null) {
    const voice = this.getVoiceForCharacter(characterName);
    this.speakWithVoice(text, voice, rate, onEnd);
  }

  // Базовое воспроизведение
  speak(text, rate = 0.95, onEnd = null) {
    this.speakWithVoice(text, this.defaultVoice, rate, onEnd);
  }

  speakSlow(text, onEnd = null) {
    this.speakWithVoice(text, this.defaultVoice, 0.72, onEnd);
  }

  speakWithVoice(text, chosenVoice, rate = 0.95, onEnd = null) {
    if (!this.synth) return;
    try {
      if (this.synth.speaking || this.synth.pending) {
        this.synth.cancel();
      }
      if (this.synth.paused) {
        this.synth.resume();
      }

      let actualRate = 0.95;
      let actualPitch = 1.0;
      if (typeof rate === "number" && !isNaN(rate)) {
        actualRate = rate;
      } else if (typeof rate === "object" && rate !== null) {
        if (typeof rate.rate === "number") actualRate = rate.rate;
        if (typeof rate.pitch === "number") actualPitch = rate.pitch;
      }

      const cleanText = (text || "").replace(/[*_#~]/g, "").trim();
      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "en-US";
      utterance.rate = actualRate;
      utterance.pitch = actualPitch;

      // Обеспечиваем выбор английского голоса
      let voiceToUse = chosenVoice || this.defaultVoice;
      if (!voiceToUse && this.synth.getVoices) {
        const enVoices = this.synth.getVoices().filter((v) => v.lang.startsWith("en"));
        if (enVoices.length > 0) voiceToUse = enVoices[0];
      }
      if (voiceToUse) {
        utterance.voice = voiceToUse;
      }

      if (onEnd) {
        utterance.onend = onEnd;
        utterance.onerror = onEnd;
      }

      this.synth.speak(utterance);
    } catch (err) {
      console.warn("Speech synthesis error:", err);
    }
  }

  getSpeechRecognitionClass() {
    return window.SpeechRecognition || window.webkitSpeechRecognition || null;
  }

  initRecognition() {
    const SpeechRecognition = this.getSpeechRecognitionClass();
    if (!SpeechRecognition) {
      console.warn("Web Speech Recognition API не поддерживается в этом браузере.");
      return;
    }
  }

  createRecognition() {
    const SpeechRecognition = this.getSpeechRecognitionClass();
    if (!SpeechRecognition) return null;

    const rec = new SpeechRecognition();
    rec.lang = "en-US";
    rec.continuous = false;
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    return rec;
  }

  startListening(onResult, onError = null, onEnd = null, onInterim = null, onStart = null) {
    const SpeechRecognition = this.getSpeechRecognitionClass();
    if (!SpeechRecognition) {
      if (onError) onError("Распознавание речи не поддерживается браузером. Используйте Chrome или Edge.");
      return;
    }

    if (this.isListening) {
      this.stopListening();
    }

    const rec = this.createRecognition();
    if (!rec) {
      if (onError) onError("Не удалось инициализировать систему распознавания речи.");
      return;
    }

    this.recognition = rec;
    this.isListening = true;

    let recognizedTranscript = "";
    let finalTranscript = "";

    rec.onstart = () => {
      if (onStart) onStart();
    };

    rec.onresult = (event) => {
      let interim = "";
      let currentFinal = "";

      for (let i = 0; i < event.results.length; ++i) {
        const item = event.results[i];
        if (item && item[0]) {
          if (item.isFinal) {
            currentFinal += item[0].transcript + " ";
          } else {
            interim += item[0].transcript + " ";
          }
        }
      }

      if (currentFinal) {
        finalTranscript = currentFinal.trim();
      }

      const fullText = (finalTranscript ? finalTranscript + " " + interim : interim).trim();
      if (fullText) {
        recognizedTranscript = fullText;
        if (onInterim) {
          onInterim(fullText);
        }
      }
    };

    rec.onerror = (err) => {
      this.isListening = false;
      const code = err.error || "";
      let errorMsg = "Ошибка микрофона";

      if (code === "no-speech") {
        errorMsg = "Речь не обнаружена. Подождите, пока индикатор загорится красным, и говорите ближе к микрофону.";
      } else if (code === "not-allowed" || code === "service-not-allowed") {
        errorMsg = "Доступ к микрофону запрещен в настройках браузера.";
      } else if (code === "network") {
        errorMsg = "Ошибка сети сервиса распознавания. В офлайн-режиме Android скачайте пакет English в настройках.";
      } else if (code === "audio-capture") {
        errorMsg = "Микрофон занят другим приложением или недоступен.";
      } else if (code === "aborted") {
        return;
      } else if (code) {
        errorMsg = `Ошибка распознавания (${code})`;
      }

      if (onError) onError(errorMsg);
    };

    rec.onend = () => {
      this.isListening = false;
      const textToDeliver = (finalTranscript || recognizedTranscript).trim();
      if (textToDeliver) {
        if (onResult) onResult(textToDeliver);
      }
      if (onEnd) onEnd();
    };

    try {
      rec.start();
    } catch (e) {
      this.isListening = false;
      if (onError) onError(e.message || "Не удалось запустить микрофон.");
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {}
      this.isListening = false;
    }
  }
}

// Нормализатор разговорной речи (раскрывает беглые английские сокращения: I'd -> I would, don't -> do not)
export function normalizeSpeechTranscript(text) {
  if (!text) return "";
  let clean = text.toLowerCase().trim();

  const contractions = [
    [/\bi'd\b/g, "i would"],
    [/\byou'd\b/g, "you would"],
    [/\bhe'd\b/g, "he would"],
    [/\bshe'd\b/g, "she would"],
    [/\bwe'd\b/g, "we would"],
    [/\bthey'd\b/g, "they would"],
    [/\bi'll\b/g, "i will"],
    [/\byou'll\b/g, "you will"],
    [/\bhe'll\b/g, "he will"],
    [/\bshe'll\b/g, "she will"],
    [/\bwe'll\b/g, "we will"],
    [/\bthey'll\b/g, "they will"],
    [/\bi'm\b/g, "i am"],
    [/\byou're\b/g, "you are"],
    [/\bwe're\b/g, "we are"],
    [/\bthey're\b/g, "they are"],
    [/\bdon't\b/g, "do not"],
    [/\bdoesn't\b/g, "does not"],
    [/\bdidn't\b/g, "did not"],
    [/\bcan't\b/g, "cannot"],
    [/\bwon't\b/g, "will not"],
    [/\bisn't\b/g, "is not"],
    [/\baren't\b/g, "are not"],
    [/\bwasn't\b/g, "was not"],
    [/\bweren't\b/g, "were not"],
    [/\bhaven't\b/g, "have not"],
    [/\bhasn't\b/g, "has not"],
    [/\bhadn't\b/g, "had not"],
    [/\bit's\b/g, "it is"],
    [/\bthat's\b/g, "that is"],
    [/\bwhat's\b/g, "what is"],
    [/\bthere's\b/g, "there is"]
  ];

  for (const [pattern, replacement] of contractions) {
    clean = clean.replace(pattern, replacement);
  }

  return clean;
}

export const speech = new SpeechEngine();
