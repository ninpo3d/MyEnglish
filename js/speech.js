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
    this.audioStream = null;

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

  async ensureMicPermission() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // ВАЖНО: На Android микрофон блокируется, если удерживать MediaStream!
        // Освобождаем микрофон сразу после получения разрешения:
        stream.getTracks().forEach((track) => track.stop());
        return true;
      } catch (e) {
        console.warn("getUserMedia permission error:", e);
        return false;
      }
    }
    return true;
  }

  async startListening(onResult, onError = null, onEnd = null) {
    const SpeechRecognition = this.getSpeechRecognitionClass();
    if (!SpeechRecognition) {
      if (onError) onError("Распознавание речи не поддерживается браузером. Используйте Chrome или Edge.");
      return;
    }

    if (this.isListening) {
      this.stopListening();
      return;
    }

    const permitted = await this.ensureMicPermission();
    if (!permitted) {
      if (onError) onError("Нет доступа к микрофону. Разрешите доступ в настройках браузера.");
      return;
    }

    const rec = this.createRecognition();
    if (!rec) {
      if (onError) onError("Не удалось инициализировать систему распознавания речи.");
      return;
    }

    this.recognition = rec;
    this.isListening = true;

    let finalTranscript = "";
    let lastInterim = "";
    let hasDeliveredResult = false;

    rec.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const res = event.results[i];
        if (res.isFinal) {
          finalTranscript += res[0].transcript;
        } else {
          interim += res[0].transcript;
        }
      }
      if (interim) {
        lastInterim = interim;
      }

      const text = (finalTranscript || lastInterim).trim();
      if (finalTranscript.trim() && !hasDeliveredResult) {
        hasDeliveredResult = true;
        this.isListening = false;
        try {
          rec.stop();
        } catch (e) {}
        if (onResult) onResult(text);
      }
    };

    rec.onerror = (err) => {
      this.isListening = false;
      let errorMsg = "Ошибка микрофона";
      const code = err.error || "";

      if (code === "no-speech") {
        errorMsg = "Речь не обнаружена. Попробуйте сказать громче и ближе к микрофону.";
      } else if (code === "not-allowed" || code === "service-not-allowed") {
        errorMsg = "Доступ к микрофону запрещен. Разрешите микрофон в настройках.";
      } else if (code === "network") {
        errorMsg = "Ошибка сети сервиса распознавания. Если вы оффлайн, скачайте английский языковой пакет в настройках телефона (Настройки -> Язык и ввод -> Голосовой ввод Google -> Офлайн-распознавание).";
      } else if (code === "audio-capture") {
        errorMsg = "Микрофон занят другим приложением или недоступен.";
      } else if (code) {
        errorMsg = `Ошибка распознавания (${code})`;
      }

      if (onError) onError(errorMsg);
    };

    rec.onend = () => {
      this.isListening = false;
      const finalText = (finalTranscript || lastInterim).trim();
      if (!hasDeliveredResult && finalText) {
        hasDeliveredResult = true;
        if (onResult) onResult(finalText);
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

export const speech = new SpeechEngine();
