// Модуль интерактивного словаря с мгновенным переводом слов по наведению / клику
// Содержит локальный кеш частых B1 и Tech Art / VFX терминов + онлайн-перевод через MyMemory API
// Имеет компактный полупрозрачный дизайн, который никогда не перекрывает текст строки

import { flashcardsService } from "./flashcards-service.js";
import { sound } from "./audio.js";

export const BUILTIN_VOCABULARY = {
  // Базовые местоимения и связки (фундамент B1)
  "your": "ваш / твой",
  "you": "вы / ты",
  "my": "мой / моя",
  "me": "мне / меня",
  "he": "он",
  "him": "его / ему",
  "his": "его",
  "she": "она",
  "her": "её / ей",
  "we": "мы",
  "us": "нам / нас",
  "our": "наш / наша",
  "they": "они",
  "them": "их / им",
  "their": "их",
  "it": "это / оно / он",
  "its": "его / её (для систем/вещей)",
  "this": "этот / эта / это",
  "that": "тот / та / то",
  "these": "эти",
  "those": "те",
  "and": "и / а",
  "but": "но / а",
  "because": "потому что",
  "so": "так что / поэтому",
  "or": "или",
  "with": "с / вместе с",
  "without": "без",
  "for": "для / ради",
  "about": "о / про",
  "from": "из / от",
  "to": "к / в / чтобы",
  "in": "в / внутри",
  "on": "на",
  "at": "в / около",
  "like": "как / похожий / нравиться",
  "have": "иметь / есть",
  "has": "имеет",
  "had": "имел",
  "can": "могу / умею",
  "could": "мог / мог бы",
  "will": "будет / буду",
  "would": "бы (хотел бы)",
  "should": "следует / стоит",
  "must": "должен / обязан",
  "is": "является / есть",
  "are": "являются / есть",
  "am": "являюсь / есть",
  "was": "был / была",
  "were": "были",
  "be": "быть",
  "been": "был (причастие)",
  "there": "там / туда",
  "here": "здесь / сюда",
  "where": "где / куда",
  "when": "когда",
  "why": "почему",
  "how": "как",
  "what": "что / какой",
  "which": "какой / который",
  "who": "кто",
  "all": "все / всё",
  "some": "несколько / некоторые",
  "any": "любой / какой-либо",
  "best": "лучший / лучше всего",
  "better": "лучше",
  "good": "хороший / хорошо",
  "well": "хорошо / итак",
  "new": "новый",
  "old": "старый",
  "first": "первый",
  "last": "последний",
  "next": "следующий",
  "game": "игра",
  "games": "игры",
  "playstyle": "стиль игры",
  "style": "стиль",
  "gun": "оружие / пистолет",
  "guns": "оружие / пушки",
  "dual": "двойной / парный",
  "wild": "дикий",
  "west": "запад (Wild West = Дикий Запад)",
  "additions": "дополнения / новинки",
  "addition": "дополнение",
  "builds": "сборки / билды",
  "build": "сборка / билд",
  "cyberpunk": "киберпанк",
  "worldbuilding": "построение мира / лор",
  "immersive": "захватывающий / глубокий",
  "storytelling": "повествование / сюжет",
  "thrilling": "захватывающий / волнующий",
  "experience": "опыт / впечатление",
  "sounds": "звучит",
  "sound": "звук / звучать",
  "known": "известен",
  "know": "знать",
  "tried": "пробовал / пытался",
  "try": "пробовать / пытаться",

  // Частые разговорные слова B1
  "made": "добрался / сделал (made it = успел/добрался)",
  "make": "делать / создавать",
  "makes": "делает",
  "making": "создание / делая",
  "glad": "рад / приятно",
  "sync": "созвон / синхронизация команды",
  "level": "уровень локации",
  "levels": "уровни",
  "need": "нужно / требуется",
  "needs": "требуется",
  "looking": "выглядит / смотрится",
  "look": "смотреть / выглядеть",
  "looks": "выглядит",
  "end": "сторона (on your end = с твоей стороны)",
  "before": "до / перед",
  "after": "после",
  "great": "отлично / великолепно",
  "good": "хорошо",
  "ready": "готов",
  "sure": "уверен / конечно",
  "work": "работать / работа",
  "working": "работает / работая",
  "worked": "работало",
  "works": "работает",
  "check": "проверить",
  "checking": "проверяю",
  "checked": "проверил",
  "think": "думать / считать",
  "thought": "подумал / мысль",
  "agree": "согласен",
  "understand": "понимать",
  "understood": "понял",
  "mean": "иметь в виду / значить",
  "fix": "исправить / починить",
  "fixed": "исправил",
  "run": "запустить / работать",
  "running": "работает / запущен",
  "test": "тест / проверять",
  "tested": "проверен",
  "testing": "тестирование",
  "update": "обновить / обновление",
  "updated": "обновил",
  "change": "изменить / изменение",
  "changed": "изменил",
  "start": "начать",
  "started": "начал",
  "finish": "закончить",
  "finished": "закончил",

  // GameDev & Tech Art & VFX термины
  "budget": "бюджет / лимит ресурсов (памяти, времени кадра)",
  "budgets": "бюджеты",
  "performance": "производительность / быстродействие",
  "particle": "частица (эффекта)",
  "particles": "частицы",
  "shader": "шейдер (программа визуализации)",
  "shaders": "шейдеры",
  "overdraw": "овердроу (многократное перекрытие прозрачных пикселей)",
  "timing": "тайминг / время кадра",
  "timings": "тайминги кадров (миллисекунды)",
  "frame": "кадр",
  "frames": "кадры",
  "milestone": "контрольная точка / дедлайн этапа",
  "standup": "стендап (короткий утренний созвон)",
  "explosion": "взрыв",
  "intensity": "интенсивность / яркость",
  "dense": "плотный / густой",
  "combat": "бой / сражение",
  "pipeline": "пайплайн (процесс разработки/передачи ассетов)",
  "asset": "ассет (ресурс игры, модель, текстура)",
  "assets": "ассеты",
  "texture": "текстура",
  "textures": "текстуры",
  "compression": "сжатие",
  "blending": "смешивание (цветов/слоев)",
  "latency": "задержка / лаг",
  "stutter": "микрофриз / подёргивание",
  "stuttering": "подёргивания экрана",
  "draw": "рисовать / вызов",
  "calls": "вызовы отрисовки (draw calls)",
  "call": "вызов",
  "optimize": "оптимизировать",
  "optimized": "оптимизированный",
  "optimization": "оптимизация",
  "reduce": "уменьшить / сократить",
  "memory": "память (GPU/RAM)",
  "resolution": "разрешение (экрана/текстур)",
  "smoke": "дым",
  "sparks": "искры",
  "spark": "искра",
  "fire": "огонь / пламя",
  "magic": "магия",
  "spell": "заклинание",
  "spells": "заклинания",
  "collision": "коллизия / столкновение",
  "physics": "физика",
  "lighting": "освещение",
  "shadows": "тени",
  "mesh": "полигональная сетка / 3D-модель",
  "meshes": "сетки / меши",
  "emitter": "эмиттер (источник частиц)",
  "emitters": "эмиттеры",
  "rate": "частота / скорость",
  "spawn": "порождать / создавать",
  "lifetime": "время жизни",
  "velocity": "скорость (векторная)",
  "alpha": "прозрачность (альфа-канал)",
  "material": "материал",
  "materials": "материалы",
  "instance": "инстанс (экземпляр)",
  "instances": "инстансы",
  "developed": "разработал / создал",
  "specialize": "специализироваться",
  "specializes": "специализируется",
  "specializing": "специализируясь",
  "approach": "подход / метод решения",
  "approaches": "подходы",
  "challenge": "профессиональная сложность / вызов",
  "challenges": "сложности",
  "tradeoff": "компромисс между взаимоисключающими параметрами",
  "trade-off": "компромисс (качество vs скорость)",
  "fidelity": "достоверность / реалистичность визуала",
  "bandwidth": "пропускная способность шины памяти",
  "profile": "профилировать / замерять тайминги кадра",
  "profiling": "профилирование / замер нагрузки железа",
  "bottleneck": "узкое место (бутылочное горлышко)",
  "bottlenecks": "узкие места",
  "bake": "запекать (свет/текстуры)",
  "baking": "запекание",
  "baked": "запечённый",
  "blocker": "блокирующая проблема (блокер)",
  "blockers": "блокеры",
  "clarify": "уточнить / прояснить",
  "clarifying": "уточняя",
  "standpoint": "точка зрения / ракурс",
  "perspective": "перспектива / художественная точка зрения",
  "perforce": "Perforce (система контроля версий в геймдеве)",
  "commit": "коммит (отправка изменений)",
  "push": "отправить изменения",
  "pull": "скачать изменения",
  "branch": "ветка разработки",
  "merge": "слияние веток",
  "issue": "проблема / баг",
  "issues": "проблемы",
  "delay": "задержка",
  "deadline": "крайний срок",
  "estimate": "оценка времени",
  "feedback": "обратная связь / отзыв",
  "review": "проверка / ревью",
  "approve": "одобрить / утвердить",
  "approved": "одобрено",
  "reject": "отклонить",
  "schedule": "график / расписание",
  "priority": "приоритет",
  "urgent": "срочно",
  "colleague": "коллега",
  "interview": "собеседование",
  "experience": "опыт",
  "background": "бэкграунд / опыт работы",
  "candidate": "кандидат",
  "skills": "навыки",
  "skill": "навык",
  "workflow": "рабочий процесс",
  "challenge": "трудная задача / вызов",
  "solution": "решение",
  "solve": "решать проблему",
  "improve": "улучшать",
  "worried": "обеспокоен",
  "epic": "эпично / круто",
  "casual": "неформальный / повседневный",
  "welcome": "добро пожаловать",
  "introduce": "представиться",
  "discuss": "обсудить",
  "discussion": "обсуждение",
  "actually": "на самом деле / вообще-то",
  "honestly": "честно говоря",
  "suppose": "полагаю / думаю",
  "meanwhile": "тем временем",
  "instead": "вместо этого",
  "however": "однако / тем не менее",
  "therefore": "поэтому / следовательно",
  "definitely": "определённо / точно",
  "probably": "вероятно / скорее всего",
  "perhaps": "возможно / пожалуй"
};

class DictionaryService {
  constructor() {
    this.enabled = localStorage.getItem("my_english_dict_enabled") !== "false";
    this.cache = {};

    // Загружаем сохранённый кеш из localStorage
    try {
      const saved = localStorage.getItem("my_english_dict_cache");
      if (saved) {
        this.cache = JSON.parse(saved);
      }
    } catch (e) {
      this.cache = {};
    }

    this.tooltipEl = null;
    this.activeWordSpan = null;
    this.hideTimeout = null;
    this.initTooltipDOM();
  }

  toggleEnabled() {
    this.enabled = !this.enabled;
    localStorage.setItem("my_english_dict_enabled", this.enabled ? "true" : "false");
    return this.enabled;
  }

  initTooltipDOM() {
    if (document.getElementById("dict-floating-tooltip")) {
      this.tooltipEl = document.getElementById("dict-floating-tooltip");
      return;
    }

    const tip = document.createElement("div");
    tip.id = "dict-floating-tooltip";
    tip.className = "dict-compact-pill";
    tip.style.display = "none";
    tip.innerHTML = `
      <span class="pill-en" id="tip-en-word">...</span>
      <span class="pill-arrow">➔</span>
      <span class="pill-ru" id="tip-ru-trans">...</span>
      <button class="pill-speak-btn" id="tip-speak-btn" title="Произнести слово">🔊</button>
      <button class="pill-star-btn" id="tip-star-btn" title="Добавить в карточки для повторения">⭐</button>
    `;

    document.body.appendChild(tip);
    this.tooltipEl = tip;

    // Звук слова
    tip.querySelector("#tip-speak-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      const word = tip.querySelector("#tip-en-word").innerText;
      this.speakWord(word);
    });

    // Сохранение слова в карточки
    tip.querySelector("#tip-star-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      const word = tip.querySelector("#tip-en-word").innerText;
      const trans = tip.querySelector("#tip-ru-trans").innerText;
      let context = "";
      if (this.activeWordSpan) {
        const bubble = this.activeWordSpan.closest(".ai-msg-bubble, .bubble-text, .chat-bubble");
        if (bubble) context = bubble.innerText.trim();
      }
      flashcardsService.addWord(word, trans, context, "", "casual");
      const starBtn = tip.querySelector("#tip-star-btn");
      starBtn.classList.add("star-saved");
      starBtn.innerText = "✓";
      sound.playSuccess();
      setTimeout(() => {
        starBtn.innerText = "⭐";
        starBtn.classList.remove("star-saved");
      }, 1500);
    });
  }

  speakWord(word) {
    if (window.speechSynthesis && word) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(word);
      u.lang = "en-US";
      u.rate = 0.92;
      window.speechSynthesis.speak(u);
    }
  }

  // Оборачивает английские слова в HTML-строке в интерактивные спаны
  wrapWords(text) {
    if (!text) return "";

    return text.replace(/\b([a-zA-Z]{2,})\b/g, (match) => {
      return `<span class="dict-word" data-word="${match}" title="Кликните, чтобы услышать произношение">${match}</span>`;
    });
  }

  // Подключение обработчиков наведения к контейнеру с сообщениями
  bindContainer(container) {
    if (!container) return;

    container.addEventListener("mouseenter", (e) => {
      if (!this.enabled) return;
      const target = e.target.closest(".dict-word");
      if (target) {
        this.showTooltip(target);
      }
    }, true);

    container.addEventListener("mouseleave", (e) => {
      const target = e.target.closest(".dict-word");
      if (target) {
        this.scheduleHide();
      }
    }, true);

    // Клик по слову сразу озвучивает его и обновляет подсказку
    container.addEventListener("click", (e) => {
      const target = e.target.closest(".dict-word");
      if (target) {
        const rawWord = target.dataset.word || target.innerText;
        this.speakWord(rawWord);
        this.showTooltip(target, true);
      }
    });
  }

  async getTranslation(rawWord) {
    const word = rawWord.toLowerCase().trim();

    // 1. Проверяем встроенный локальный словарь (0 мс, офлайн)
    if (BUILTIN_VOCABULARY[word]) {
      return BUILTIN_VOCABULARY[word];
    }

    // Проверяем формы слов (множественное число или -ing / -ed / -s)
    if (word.endsWith("s") && BUILTIN_VOCABULARY[word.slice(0, -1)]) {
      return BUILTIN_VOCABULARY[word.slice(0, -1)];
    }
    if (word.endsWith("ed") && BUILTIN_VOCABULARY[word.slice(0, -2)]) {
      return BUILTIN_VOCABULARY[word.slice(0, -2)];
    }
    if (word.endsWith("ing") && BUILTIN_VOCABULARY[word.slice(0, -3)]) {
      return BUILTIN_VOCABULARY[word.slice(0, -3)];
    }

    // 2. Проверяем сохраненный кеш
    if (this.cache[word]) {
      return this.cache[word];
    }

    // 3. Онлайн-запрос к бесплатному публичному API переводов MyMemory
    if (navigator.onLine) {
      try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|ru`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (data && data.responseData && data.responseData.translatedText) {
            const trans = data.responseData.translatedText.toLowerCase();
            this.cache[word] = trans;
            try {
              localStorage.setItem("my_english_dict_cache", JSON.stringify(this.cache));
            } catch (err) {}
            return trans;
          }
        }
      } catch (err) {}
    }

    return "кликните для озвучки";
  }

  async showTooltip(targetEl, immediate = false) {
    if (!this.tooltipEl || !this.enabled) return;

    if (this.hideTimeout) clearTimeout(this.hideTimeout);

    const rawWord = targetEl.dataset.word || targetEl.innerText;
    this.activeWordSpan = targetEl;

    const enWordEl = this.tooltipEl.querySelector("#tip-en-word");
    const ruTransEl = this.tooltipEl.querySelector("#tip-ru-trans");

    enWordEl.innerText = rawWord;
    ruTransEl.innerText = "...";
    this.tooltipEl.style.display = "flex";

    // Позиционируем плашку над словом с гарантированным зазором
    this.positionTooltip(targetEl);

    const translation = await this.getTranslation(rawWord);

    // Если курсор уже перешёл на другое слово — не перезаписываем
    if (this.activeWordSpan !== targetEl) return;

    ruTransEl.innerText = translation;
    this.positionTooltip(targetEl);
  }

  positionTooltip(targetEl) {
    if (!this.tooltipEl || !targetEl) return;

    const rect = targetEl.getBoundingClientRect();
    const tipWidth = this.tooltipEl.offsetWidth || 180;
    const tipHeight = this.tooltipEl.offsetHeight || 34;
    const gap = 8; // Гарантированный зазор, чтобы НЕ перекрывать текст строки

    // Центрируем плашку относительно конкретного слова
    let left = rect.left + window.scrollX + rect.width / 2 - tipWidth / 2;

    // Проверяем: есть ли свободное место СВЕРХУ от слова
    let isAbove = true;
    let top = rect.top + window.scrollY - tipHeight - gap;

    // Если до верхнего края окна меньше 12px, переносим плашку СНИЗУ под слово
    if (rect.top - tipHeight - gap < 12) {
      isAbove = false;
      top = rect.bottom + window.scrollY + gap;
    }

    // Защита от выхода за экран по горизонтали
    const screenMargin = 12;
    if (left < screenMargin) left = screenMargin;
    if (left + tipWidth > window.innerWidth - screenMargin) {
      left = window.innerWidth - tipWidth - screenMargin;
    }

    this.tooltipEl.classList.toggle("pill-placed-above", isAbove);
    this.tooltipEl.classList.toggle("pill-placed-below", !isAbove);
    this.tooltipEl.style.left = `${Math.round(left)}px`;
    this.tooltipEl.style.top = `${Math.round(top)}px`;
  }

  scheduleHide() {
    if (this.hideTimeout) clearTimeout(this.hideTimeout);
    this.hideTimeout = setTimeout(() => {
      if (this.tooltipEl) {
        this.tooltipEl.style.display = "none";
      }
      this.activeWordSpan = null;
    }, 200);
  }
}

export const dictionary = new DictionaryService();
