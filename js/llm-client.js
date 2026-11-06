// Клиент для подключения к локальным LLM (LM Studio, Ollama, LocalAI, vLLM)
// Использует стандартный OpenAI-совместимый REST API (/v1/chat/completions и /v1/models)

export const AI_PERSONAS = [
  {
    id: "marcus_lead",
    name: "Marcus (Lead Tech Artist)",
    role: "Lead Technical Artist в игровой AAA-студии",
    avatar: "👨‍💻",
    voiceName: "Guy",
    systemPrompt: `You are Marcus, a senior Lead Technical Artist at a modern game studio.
You are talking to a colleague (a Technical Artist) who is practicing their English at a B1 level.
Topic: Unreal Engine / Niagara particle systems, GPU performance, shaders, draw calls, LODs, and project deadlines.

CONVERSATION RULES:
1. Speak in natural, friendly, professional conversational English.
2. Keep your replies concise: 1 to 3 sentences maximum! Never write long monologues.
3. Always ask a relevant follow-up question or make a comment that invites the user to reply.
4. Stay in character at all times.

GRAMMAR COACH RULE (Golden 20% Dragunkin):
If the user made a grammar error (e.g. "I am agree", "must to", "didn't went", "I have no any", missing "it" in "is cold", "depend from"):
At the very end of your response, on a new line, add:
[COACH_TIP: Friendly correction in Russian, e.g. «Помните: agree — глагол, говорим "I agree", а не "I am agree"»]
If there are no mistakes, do NOT add [COACH_TIP].`,
    greeting: "Hey! Glad you made it to the sync. We need to check the Niagara particle budget for the new level before the milestone. How are the frame timings looking on your end?"
  },
  {
    id: "elena_vfx",
    name: "Elena (Senior VFX Artist)",
    role: "Старший VFX-артист, обсуждение визуала и шейдеров",
    avatar: "👩‍🎨",
    voiceName: "Jenny",
    systemPrompt: `You are Elena, a Senior VFX Artist collaborating on dynamic environment effects and magic spells.
You are chatting with your Tech Art colleague practicing English at B1 level.
Topic: Visual feedback, particle colors, texture compression, material blending, overdraw issues, and artistic feel.

CONVERSATION RULES:
1. Speak in friendly, enthusiastic, creative English.
2. Keep answers short: 1 to 3 sentences max.
3. Always end with a question or conversational hook.

GRAMMAR COACH RULE:
If the user made a grammar error, append at the end:
[COACH_TIP: Краткая подсказка по-русски, как сказать правильно]
If no error, do not add [COACH_TIP].`,
    greeting: "Hi there! I just pushed the new explosion effect to Perforce. The visual intensity looks epic, but I'm worried about alpha overdraw in dense combat. What do you think?"
  },
  {
    id: "sarah_interview",
    name: "Sarah (Tech Art Interviewer)",
    role: "Арт-директор на собеседовании (Technical Artist Role)",
    avatar: "💼",
    voiceName: "Aria",
    systemPrompt: `You are Sarah, an Art Director conducting a friendly job interview for a Technical Artist / VFX position.
The candidate is practicing professional English at B1 level.
Topics: Houdini pipelines, Unreal Engine, Python scripting, problem-solving, teamwork, past challenges.

CONVERSATION RULES:
1. Be polite, encouraging, and professional.
2. Ask one clear interview question at a time (1-2 sentences).
3. React warmly to their answer before asking the next question.

GRAMMAR COACH RULE:
If the candidate made a grammar mistake, append at the end:
[COACH_TIP: Подсказка по-русски: как сказать эту фразу на собеседовании грамотнее]
If no error, do not add [COACH_TIP].`,
    greeting: "Hello and welcome! Thank you for joining our interview today. To start off, could you briefly introduce yourself and tell me about your background in Technical Art?"
  },
  {
    id: "alex_colleague",
    name: "Alex (Kitchen Coffee Chat)",
    role: "Коллега по студии, непринуждённый разговор за кофе",
    avatar: "☕",
    voiceName: "Ryan",
    systemPrompt: `You are Alex, a friendly 3D artist at the office kitchen having morning coffee.
You are chatting with the user in casual English (B1 level).
Topic: Weekend plans, favorite video games, gym, movies, lunch plans, funny work stories.

CONVERSATION RULES:
1. Casual, warm, colloquial conversational English.
2. 1 to 2 sentences max. Keep it like real chatting.
3. Always ask a casual question back.

GRAMMAR COACH RULE:
If the user made a grammar error, append at the end:
[COACH_TIP: Подсказка по-русски]
If no error, do not add [COACH_TIP].`,
    greeting: "Morning! Just grabbing another espresso before the standup. Did you get a chance to play that new game over the weekend, or did you take some rest?"
  },
  {
    id: "custom_topic",
    name: "Свободная тема (Custom Topic)",
    role: "Универсальный собеседник B1 на любую тему",
    avatar: "🌐",
    voiceName: "Christopher",
    systemPrompt: `You are a supportive, knowledgeable English conversation partner helping the user practice B1 English.
Keep replies brief (1-3 sentences) and conversational.
Always end with a hook or question.

GRAMMAR COACH RULE:
If the user made a grammar error, append at the end:
[COACH_TIP: Подсказка по-русски]
If no error, do not add [COACH_TIP].`,
    greeting: "Hello! I am ready to talk about any topic you like — game development, hobbies, travel, or anything else. What would you like to discuss today?"
  }
];

export class LocalLLMClient {
  constructor() {
    const savedEp = localStorage.getItem("my_english_llm_endpoint");
    this.endpoint = savedEp ? this.normalizeEndpoint(savedEp) : "http://127.0.0.1:1234/v1";
    this.selectedModel = localStorage.getItem("my_english_llm_model") || "hy-mt1.5-1.8b";
    this.coachModel = localStorage.getItem("my_english_llm_coach_model") || "gemma-3-4b-it-qat";
    this.coachMode = localStorage.getItem("my_english_coach_mode") || "gentle"; // "gentle" | "balanced" | "strict"
    this.temperature = parseFloat(localStorage.getItem("my_english_llm_temp") || "0.7");
    this.autoSpeak = localStorage.getItem("my_english_llm_autospeak") !== "false";
    this.coachEnabled = localStorage.getItem("my_english_llm_coach") !== "false";
    this.availableModels = [];
    this.isConnected = false;
  }

  getCoachModeInfo() {
    switch (this.coachMode) {
      case "gentle":
        return { id: "gentle", label: "🟢 Мягкий B1", title: "Не цепляется к мелочам, исправляет только грубые ошибки" };
      case "balanced":
        return { id: "balanced", label: "🟡 Баланс B1+", title: "Помогает звучать естественно на разговорном B1" };
      case "strict":
        return { id: "strict", label: "🔴 Продвинутый B2", title: "Детальная шлифовка и идиомы для уровня B2" };
      default:
        return { id: "gentle", label: "🟢 Мягкий B1", title: "Не цепляется к мелочам, исправляет только грубые ошибки" };
    }
  }

  cycleCoachMode() {
    const modes = ["gentle", "balanced", "strict"];
    const curIdx = modes.indexOf(this.coachMode);
    this.coachMode = modes[(curIdx + 1) % modes.length];
    localStorage.setItem("my_english_coach_mode", this.coachMode);
    return this.getCoachModeInfo();
  }

  normalizeEndpoint(ep) {
    let clean = (ep || "http://127.0.0.1:1234").trim().replace(/\/+$/, "");
    if (!clean.endsWith("/v1")) {
      clean += "/v1";
    }
    return clean;
  }

  saveSettings(endpoint, model, coachModel, temperature, autoSpeak, coachEnabled = true, coachMode = "gentle") {
    this.endpoint = this.normalizeEndpoint(endpoint);
    this.selectedModel = model || "hy-mt1.5-1.8b";
    this.coachModel = coachModel || "gemma-3-4b-it-qat";
    this.coachMode = coachMode || "gentle";
    this.temperature = parseFloat(temperature) || 0.7;
    this.autoSpeak = !!autoSpeak;
    this.coachEnabled = !!coachEnabled;

    localStorage.setItem("my_english_llm_endpoint", this.endpoint);
    localStorage.setItem("my_english_llm_model", this.selectedModel);
    localStorage.setItem("my_english_llm_coach_model", this.coachModel);
    localStorage.setItem("my_english_coach_mode", this.coachMode);
    localStorage.setItem("my_english_llm_temp", this.temperature.toString());
    localStorage.setItem("my_english_llm_autospeak", this.autoSpeak ? "true" : "false");
    localStorage.setItem("my_english_llm_coach", this.coachEnabled ? "true" : "false");
  }

  // Проверка соединения и получение списка загруженных моделей
  async checkConnection() {
    const url = `${this.endpoint}/models`;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      this.availableModels = (data.data || []).map((m) => m.id);
      this.isConnected = true;

      // Если модель не выбрана, берем первую доступную
      if (!this.selectedModel && this.availableModels.length > 0) {
        this.selectedModel = this.availableModels[0];
        localStorage.setItem("my_english_llm_model", this.selectedModel);
      }

      return {
        ok: true,
        models: this.availableModels,
        currentModel: this.selectedModel || "hy-mt1.5-1.8b",
        coachModel: this.coachModel || "gemma-3-4b-it-qat"
      };
    } catch (err) {
      this.isConnected = false;
      let errorMsg = err.message || "Connection failed";

      if (err.name === "AbortError") {
        errorMsg = "Таймаут соединения (сервер не ответил за 4 сек).";
      } else if (errorMsg.includes("Failed to fetch") || errorMsg.includes("NetworkError")) {
        errorMsg = "Сервер недоступен. Проверьте: запущен ли LM Studio и включен ли тумблер CORS в Local Server!";
      }

      return {
        ok: false,
        error: errorMsg,
        endpoint: this.endpoint
      };
    }
  }

  // Отправка сообщений в чат
  async sendMessage(messages, onChunk = null) {
    const url = `${this.endpoint}/chat/completions`;
    const modelToUse = this.selectedModel || (this.availableModels[0] || "local-model");

    const payload = {
      model: modelToUse,
      messages: messages,
      temperature: this.temperature,
      max_tokens: 300,
      stream: false
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000); // 45с для небольших локальных моделей

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Ошибка LM Studio (HTTP ${res.status}): ${errText || res.statusText}`);
      }

      const data = await res.json();
      const rawContent = data.choices && data.choices[0] && data.choices[0].message
        ? data.choices[0].message.content
        : "";

      return this.parseResponse(rawContent);
    } catch (err) {
      if (err.name === "AbortError") {
        throw new Error("Модель слишком долго отвечает (таймаут 45с). Попробуйте меньшую квантованную модель или снизьте контекст.");
      }
      throw err;
    }
  }

  // Разделение ответа персонажа и грамматического совета Драгункина
  parseResponse(rawText) {
    let cleanText = rawText.trim();
    let coachTip = null;

    // Ищем паттерны: [COACH_TIP: ...] или [DRAGUNKIN_TIP: ...] или [TIP: ...]
    const tipRegex = /\[(?:COACH_TIP|DRAGUNKIN_TIP|TIP|СОВЕТ):\s*([\s\S]*?)\]/i;
    const match = cleanText.match(tipRegex);

    if (match) {
      coachTip = match[1].trim();
      cleanText = cleanText.replace(match[0], "").trim();
    }

    return {
      text: cleanText,
      coachTip: coachTip,
      raw: rawText
    };
  }

  // Быстрый мгновенный анализ по правилам Драгункина (работает даже офлайн)
  checkHeuristicMistakes(userText) {
    const textLower = userText.toLowerCase().trim();
    const findings = [];

    if (/\b(i am agree|i'm agree|i am not agree)\b/i.test(textLower)) {
      findings.push({
        type: "rule",
        issue: "«I am agree»",
        fix: "I agree / I don't agree",
        tip: "В английском «agree» — это глагол действия, а не прилагательное! Поэтому говорим «I agree» без глагола «am»."
      });
    }

    if (/\b(must to|can to|should to|could to|may to)\b/i.test(textLower)) {
      findings.push({
        type: "rule",
        issue: "«must to / can to»",
        fix: "must do / can do",
        tip: "После модальных глаголов (must, can, should) частица «to» сгорает: «I must check», а не «must to check»."
      });
    }

    if (/\b(didn't|did not)\s+(went|saw|took|did|came|found|made|had)\b/i.test(textLower)) {
      findings.push({
        type: "rule",
        issue: "Двойное прошедшее время («didn't went»)",
        fix: "didn't go / didn't see",
        tip: "Вспомогательный «didn't» уже забрал всё прошедшее время на себя! Основной глагол возвращается в начальную форму."
      });
    }

    if (/\b(have no any|has no any)\b/i.test(textLower)) {
      findings.push({
        type: "rule",
        issue: "«have no any»",
        fix: "I don't have any / I have no",
        tip: "В английском строго одно отрицание: либо «I have NO tickets», либо «I DON'T have ANY tickets»."
      });
    }

    if (/\b(depend from|depends from)\b/i.test(textLower)) {
      findings.push({
        type: "rule",
        issue: "«depend from»",
        fix: "depends ON",
        tip: "В английском зависит «НА» чем-то, поэтому всегда используем предлог «on»: «It depends on the budget»."
      });
    }

    if (/\b(i feel myself)\b/i.test(textLower)) {
      findings.push({
        type: "style",
        issue: "«I feel myself»",
        fix: "I feel good / I feel tired",
        tip: "Калька с русского! «I feel myself» в английском звучит двусмысленно (физически трогать себя). Говорите просто «I feel great»."
      });
    }

    return findings;
  }

  // Мягкий доброжелательный разбор фразы пользователя (AI-наставник)
  async reviewUserSpeech(userSpeech, context = "") {
    if (!this.coachEnabled) return null;

    // Сначала проверяем моментальные эвристики Драгункина
    const quickIssues = this.checkHeuristicMistakes(userSpeech);

    // Если нет связи с LM Studio, но сработала эвристика — возвращаем её
    if (!this.isConnected && quickIssues.length > 0) {
      const issue = quickIssues[0];
      return {
        clarity: "Собеседник понял суть",
        naturalVersion: userSpeech.replace(new RegExp(issue.issue, "gi"), issue.fix),
        friendlyTip: issue.tip,
        source: "Правила Драгункина"
      };
    }

    // Запрашиваем мягкий совет у выделенной модели-наставника (Gemma 3 4B)
    const coachModelToUse = this.coachModel || "gemma-3-4b-it-qat";

    let modeGuidance = "";
    if (this.coachMode === "gentle") {
      modeGuidance = `
РЕЖИМ: 🟢 МЯГКИЙ B1 (МАКСИМАЛЬНО ДЕЛИКАТНЫЙ, ДЛЯ НАЧИНАЮЩИХ).
- Твоя цель: НЕ ПРИДИРАТЬСЯ к мелочам! Если смысл фразы понятен — признай: "Понятно на 100%!".
- Исправляй ТОЛЬКО явные ошибки и неестественные разрывы (например: «its save» -> «it saves», «they add» -> «they added», объединение рубленых предложений связкой «and» или «because»).
- В строке NATURAL запиши ГОТОВЫЙ улучшенный вариант на уровне B1 со всеми исправлениями (без сложного C1 академизма).
- Если во фразе пользователя вообще нет ошибок и улучшать нечего — напиши в NATURAL: NONE.`;
    } else if (this.coachMode === "strict") {
      modeGuidance = `
РЕЖИМ: 🔴 СТРОГИЙ B2 (ШЛИФОВКА И ИДИОМАТИЧНОСТЬ).
- Обрати внимание на профессиональную терминологию и естественные идиомы уровня B2.
- В строке NATURAL запиши естественную версию B2, в TIP — нюансы стилистики.`;
    } else {
      modeGuidance = `
РЕЖИМ: 🟡 БАЛАНС B1+ (РАЗГОВОРНЫЙ СТИЛЬ).
- Помоги звучать связно на уверенном уровне B1, используя базовые разговорные связки (and, but, because, so).
- В строке NATURAL запиши готовый связный вариант уровня B1.`;
    }

    const coachPrompt = `Ты — русскоязычный персональный наставник по английскому языку для уровня B1.
Твоя задача — помочь ученику общаться на понятном РАЗГОВОРНОМ АНГЛИЙСКОМ УРОВНЯ B1 без сложного книжного занудства.

ПОЛЬЗОВАТЕЛЬ СКАЗАЛ: "${userSpeech}"
КОНТЕКСТ ДИАЛОГА: "${context}"

${modeGuidance}

ПРАВИЛО ДЛЯ СТРОКИ «NATURAL»:
1. В строке NATURAL ты ОБЯЗАН выдать САМУ ГОТОВУЮ ИСПРАВЛЕННУЮ ФРАЗУ на английском языке!
2. Если ты в пояснении (TIP) рекомендуешь добавить связку ("and", "because"), исправить время ("they added") или вставить пропущенное ("is like") — ВСЕ ЭТИ ИСПРАВЛЕНИЯ ТЫ ОБЯЗАН СРАЗУ ВНЕДРИТЬ В СТРОКУ NATURAL!
3. Запрещено копировать в NATURAL сырую фразу пользователя без исправлений, если ты предлагаешь улучшение!
4. Если фраза пользователя уже идеальна и улучшать ничего не нужно, напиши строго: NATURAL: NONE
5. В строке TIP пиши СТРОГО НА РУССКОМ ЯЗЫКЕ (1-2 коротких дружелюбных предложения).

ПРИМЕР:
Пользователь: "It's a dual gun. its style like a wild west"
Твой ответ:
CLARITY: Понятно на 100%!
NATURAL: It's a dual gun, and its style is like the Wild West.
TIP: Добавили связку «and» и глагол «is» (style is like), чтобы фраза звучала плавно и грамматически чисто.

ФОРМАТ ОТВЕТА (ровно 3 строки):
CLARITY: [Понятно на 100%! / Смысл понятен / Требует уточнения]
NATURAL: [Готовая исправленная фраза на английском с внедренными улучшениями, либо NONE]
TIP: [Краткое дружелюбное пояснение на русском языке]`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15с макс для коуча

      const res = await fetch(`${this.endpoint}/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: coachModelToUse,
          messages: [{ role: "user", content: coachPrompt }],
          temperature: 0.2,
          max_tokens: 180
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const content = data.choices && data.choices[0] && data.choices[0].message
          ? data.choices[0].message.content
          : "";

        const clarityMatch = content.match(/CLARITY:\s*(.*)/i);
        const naturalMatch = content.match(/NATURAL:\s*(.*)/i);
        const tipMatch = content.match(/TIP:\s*([\s\S]*)/i);

        if (clarityMatch || tipMatch || naturalMatch) {
          let natural = naturalMatch ? naturalMatch[1].trim() : null;
          if (natural) {
            natural = natural.replace(/^["'«]+|["'»]+$/g, "").replace(/\s*You could say.*$/i, "").trim();

            // Проверяем: если модель вернула NONE или буквально повторила фразу пользователя (без исправлений)
            const cleanUser = userSpeech.toLowerCase().replace(/[^a-z0-9]/g, "");
            const cleanNat = natural.toLowerCase().replace(/[^a-z0-9]/g, "");
            if (natural.toUpperCase() === "NONE" || cleanUser === cleanNat) {
              natural = null; // Фраза уже верна — не показываем дублирующую плашку!
            }
          }

          let tip = tipMatch ? tipMatch[1].trim() : "Отличный ответ, продолжайте общение!";
          tip = tip.replace(/\b(CLARITY|NATURAL|TIP):\s*/gi, "").replace(/^["'«]+|["'»]+$/g, "").trim();

          return {
            clarity: clarityMatch ? clarityMatch[1].trim().replace(/^["']|["']$/g, "") : "Понятно на 100%!",
            naturalVersion: natural,
            friendlyTip: tip,
            source: "AI-Наставник"
          };
        }
      }
    } catch (e) {
      // Игнорируем ошибку коуча, чтобы не прерывать основной диалог
    }

    // Резервный возврат эвристики, если нейросеть занята
    if (quickIssues.length > 0) {
      const issue = quickIssues[0];
      return {
        clarity: "Смысл понятен",
        naturalVersion: userSpeech.replace(new RegExp(issue.issue, "gi"), issue.fix),
        friendlyTip: issue.tip,
        source: "Правила Драгункина"
      };
    }

    return null;
  }
}

export const llmClient = new LocalLLMClient();
