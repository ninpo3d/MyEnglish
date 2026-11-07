// Переработанный режим «Трансформер предложений (Рубильники и Времена)»
import { SWITCHBOARD_TASKS } from "../data/switchboard-tasks.js";
import { sound } from "../audio.js";
import { speech } from "../speech.js";
import { state } from "../state.js";

export class SwitchboardMode {
  constructor(containerEl) {
    this.container = containerEl;
    this.currentIndex = 0;
    this.switches = {
      tense: "present_simple",
      mode: "affirmative",
      qWord: "none"
    };
  }

  init() {
    const rand = Math.floor(Math.random() * SWITCHBOARD_TASKS.length);
    this.loadTask(rand);
  }

  getCurrentTask() {
    return SWITCHBOARD_TASKS[this.currentIndex];
  }

  loadTask(index) {
    this.currentIndex = (index + SWITCHBOARD_TASKS.length) % SWITCHBOARD_TASKS.length;
    // Сброс переключателей в начальное положение
    this.switches = {
      tense: "present_simple",
      mode: "affirmative",
      qWord: "none"
    };
    this.render();
  }

  computeStructure(task) {
    const s = task.baseSubject;
    const v = task.baseVerb;
    const obj = task.baseObject ? task.baseObject : "";
    const mod = task.baseModifier ? task.baseModifier : "";
    const rest = `${obj} ${mod}`.trim();

    let prefix = null;
    let switchWord = null;
    let subject = s;
    let actionWord = v;
    let note = "";

    // 1. Вопросительное слово (Наращивание влево)
    if (this.switches.mode === "question" && this.switches.qWord !== "none") {
      prefix = this.switches.qWord.charAt(0).toUpperCase() + this.switches.qWord.slice(1);
    }

    // 2. Логика по временам
    if (this.switches.tense === "future") {
      if (this.switches.mode === "affirmative") {
        actionWord = `will ${v}`;
        note = "Прямой порядок: Хозяин ➔ will + V1";
      } else if (this.switches.mode === "negation") {
        actionWord = `won't ${v}`;
        note = "Отрицание: Хозяин ➔ won't + V1";
      } else if (this.switches.mode === "question") {
        switchWord = prefix ? "will" : "Will";
        subject = s.toLowerCase();
        note = "⚡ РУБИЛЬНИК WILL ПЕРЕПРЫГНУЛ ПЕРЕД ХОЗЯИНОМ!";
      }
    } else if (this.switches.tense === "past") {
      const pastV = v === "buy" ? "bought" : v === "go" ? "went" : v === "call" ? "called" : v + "ed";

      if (this.switches.mode === "affirmative") {
        actionWord = pastV;
        note = "Прошедший факт: 2-я форма глагола (V2)";
      } else if (this.switches.mode === "negation") {
        actionWord = `didn't ${v}`;
        note = "didn't забирает прошлое на себя ➔ глагол в 1-й форме!";
      } else if (this.switches.mode === "question") {
        switchWord = prefix ? "did" : "Did";
        subject = s.toLowerCase();
        actionWord = v; // 1-я форма
        note = "⚡ РУБИЛЬНИК DID ВПЕРЕДИ! Глагол вернулся в 1-ю форму";
      }
    } else if (this.switches.tense === "continuous") {
      const be = s === "He" || s === "She" || s === "It" ? "is" : s === "I" ? "am" : "are";
      const beCap = be.charAt(0).toUpperCase() + be.slice(1);
      const ing = v === "live" ? "living" : v + "ing";

      if (this.switches.mode === "affirmative") {
        actionWord = `${be} ${ing}`;
        note = "Режим «в эфире»: to be + глагол с окончанием -ing";
      } else if (this.switches.mode === "negation") {
        actionWord = `${be} not ${ing}`;
        note = "Отрицание в эфире: to be + not + -ing";
      } else if (this.switches.mode === "question") {
        switchWord = prefix ? be : beCap;
        subject = s.toLowerCase();
        actionWord = ing;
        note = "⚡ РУБИЛЬНИК TO BE ВЫНЕСЕН ВПЕРЕД перед Хозяином!";
      }
    } else {
      // PRESENT SIMPLE
      const isThird = s === "He" || s === "She" || s === "It";
      const doDoes = isThird ? "does" : "do";
      const doDoesCap = isThird ? "Does" : "Do";

      if (this.switches.mode === "affirmative") {
        const sEnding = isThird ? (v === "live" ? "lives" : v === "go" ? "goes" : v + "s") : v;
        actionWord = sEnding;
        note = isThird ? "3-е лицо (he/she): к глаголу липнет окончание -s" : "Обычный регулярный факт";
      } else if (this.switches.mode === "negation") {
        const helper = isThird ? "doesn't" : "don't";
        actionWord = `${helper} ${v}`;
        note = "Отрицатель забирает окончание -s себе!";
      } else if (this.switches.mode === "question") {
        switchWord = prefix ? doDoes : doDoesCap;
        subject = s.toLowerCase();
        actionWord = v;
        note = "⚡ РУБИЛЬНИК ВОПРОСА ВПЕРЕДИ перед Хозяином!";
      }
    }

    let fullSentence = "";
    if (this.switches.mode === "question") {
      const parts = [prefix, switchWord, subject, actionWord, rest].filter(Boolean);
      fullSentence = parts.join(" ").trim() + "?";
    } else {
      const parts = [subject, actionWord, rest].filter(Boolean);
      fullSentence = parts.join(" ").trim() + ".";
    }

    return { prefix, switchWord, subject, actionWord, rest, note, fullSentence };
  }

  render() {
    const task = this.getCurrentTask();
    if (!task) return;

    const struct = this.computeStructure(task);

    this.container.innerHTML = `
      <div class="mode-header">
        <div class="mode-badge">⚡ Трансформер речи (Рубильники)</div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="task-counter">Задача ${this.currentIndex + 1} из ${SWITCHBOARD_TASKS.length}</div>
          <button class="btn-random-card" id="btn-switch-random" title="Случайная задача">🎲</button>
        </div>
      </div>

      <div class="task-card transformer-card">
        <!-- ЦЕЛЬ ЗАДАНИЯ -->
        <div class="transformer-mission">
          <div class="mission-top">
            <span class="mission-label">ЦЕЛЬ ЗАДАНИЯ:</span>
            <span class="mission-task">${task.targetDesc}</span>
          </div>
          <div class="mission-ru">${task.ruTarget}</div>
        </div>

        <!-- ТАБЛО СТРУКТУРЫ ПРЕДЛОЖЕНИЯ -->
        <div class="live-transformer-stage">
          <div class="stage-top-bar">
            <span class="stage-label">РЕЗУЛЬТАТ РАБОТЫ РУБИЛЬНИКОВ:</span>
            <button class="btn-voice-mini" id="btn-speak-stage" title="Послушать фразу">🔊 Слушать</button>
          </div>
          
          <div class="sentence-blocks-row">
            ${struct.prefix ? `<div class="s-block block-qword"><span class="block-tag">⬅ НАРАЩИВАНИЕ</span>${struct.prefix}</div>` : ""}
            ${struct.switchWord ? `<div class="s-block block-switch"><span class="block-tag">⚡ РУБИЛЬНИК</span>${struct.switchWord}</div>` : ""}
            <div class="s-block block-subject"><span class="block-tag">👑 ХОЗЯИН</span>${struct.subject}</div>
            <div class="s-block block-verb"><span class="block-tag">⚙️ ДЕЙСТВИЕ</span>${struct.actionWord}</div>
            ${struct.rest ? `<div class="s-block block-rest">${struct.rest}</div>` : ""}
            <div class="s-block block-punct">${this.switches.mode === "question" ? "?" : "."}</div>
          </div>

          <div class="structure-note-line">
            <span class="note-icon">💡</span>
            <span class="note-text">${struct.note}</span>
          </div>
        </div>

        <!-- ПАНЕЛЬ УПРАВЛЕНИЯ РУБИЛЬНИКАМИ -->
        <div class="controls-panel">
          <!-- 1. ФОРМА РЕЧИ -->
          <div class="ctrl-section">
            <div class="ctrl-label">1. РУБИЛЬНИК ФОРМЫ (ПЕРЕКЛЮЧАТЕЛЬ ПОРЯДКА СЛОВ):</div>
            <div class="ctrl-buttons-row">
              <button class="t-btn ${this.switches.mode === "affirmative" ? "t-active" : ""}" data-switch="mode" data-val="affirmative">
                <span class="t-icon">💬</span> Утверждение
              </button>
              <button class="t-btn t-btn-question ${this.switches.mode === "question" ? "t-active" : ""}" data-switch="mode" data-val="question">
                <span class="t-icon">❓</span> ВОПРОС (рубильник вперед!)
              </button>
              <button class="t-btn ${this.switches.mode === "negation" ? "t-active" : ""}" data-switch="mode" data-val="negation">
                <span class="t-icon">🚫</span> Отрицание
              </button>
            </div>
          </div>

          <!-- 2. ВРЕМЕНА -->
          <div class="ctrl-section">
            <div class="ctrl-label">2. РУБИЛЬНИК ВРЕМЕНИ (4 БАЗОВЫХ ВРЕМЕНИ ИЗ ШПАРГАЛКИ):</div>
            <div class="ctrl-buttons-row">
              <button class="t-btn ${this.switches.tense === "present_simple" ? "t-active" : ""}" data-switch="tense" data-val="present_simple">
                <span class="t-icon">⚡</span> Факт (Simple)
              </button>
              <button class="t-btn ${this.switches.tense === "continuous" ? "t-active" : ""}" data-switch="tense" data-val="continuous">
                <span class="t-icon">📡</span> В эфире (-ing)
              </button>
              <button class="t-btn ${this.switches.tense === "past" ? "t-active" : ""}" data-switch="tense" data-val="past">
                <span class="t-icon">⏳</span> Прошлое (Past)
              </button>
              <button class="t-btn ${this.switches.tense === "future" ? "t-active" : ""}" data-switch="tense" data-val="future">
                <span class="t-icon">🚀</span> Будущее (will)
              </button>
            </div>
          </div>

          <!-- 3. ВОПРОСИТЕЛЬНЫЕ СЛОВА -->
          <div class="ctrl-section ${this.switches.mode === "question" ? "" : "ctrl-dimmed"}">
            <div class="ctrl-label">3. НАРАЩИВАНИЕ ВЛЕВО (ВОПРОСИТЕЛЬНОЕ СЛОВО):</div>
            <div class="ctrl-buttons-row">
              <button class="t-btn ${this.switches.qWord === "none" ? "t-active" : ""}" data-switch="qWord" data-val="none">
                Без вопроса
              </button>
              <button class="t-btn ${this.switches.qWord === "where" ? "t-active" : ""}" data-switch="qWord" data-val="where">
                Where (Где/Куда)
              </button>
              <button class="t-btn ${this.switches.qWord === "why" ? "t-active" : ""}" data-switch="qWord" data-val="why">
                Why (Почему)
              </button>
              <button class="t-btn ${this.switches.qWord === "when" ? "t-active" : ""}" data-switch="qWord" data-val="when">
                When (Когда)
              </button>
            </div>
          </div>
        </div>

        <div class="feedback-area" id="switch-feedback"></div>

        <div class="action-buttons">
          <button class="btn btn-secondary" id="btn-switch-prev">◀ Назад</button>
          <button class="btn btn-primary" id="btn-check-switches">Зафиксировать рубильники</button>
          <button class="btn btn-next" id="btn-next-switches">Далее ➔</button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const btns = this.container.querySelectorAll(".t-btn");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const sw = btn.dataset.switch;
        const val = btn.dataset.val;
        this.switches[sw] = val;
        sound.playSwitch();
        this.render();
      });
    });

    const randBtn = this.container.querySelector("#btn-switch-random");
    if (randBtn) {
      randBtn.addEventListener("click", () => {
        sound.playClick();
        const rand = Math.floor(Math.random() * SWITCHBOARD_TASKS.length);
        this.loadTask(rand);
      });
    }

    const prevBtn = this.container.querySelector("#btn-switch-prev");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        sound.playClick();
        this.loadTask(this.currentIndex - 1);
      });
    }

    const speakStageBtn = this.container.querySelector("#btn-speak-stage");
    if (speakStageBtn) {
      speakStageBtn.addEventListener("click", () => {
        const task = this.getCurrentTask();
        const struct = this.computeStructure(task);
        speech.speak(struct.fullSentence);
      });
    }

    const checkBtn = this.container.querySelector("#btn-check-switches");
    if (checkBtn) {
      checkBtn.addEventListener("click", () => this.checkSwitches());
    }

    const nextBtn = this.container.querySelector("#btn-next-switches");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        sound.playClick();
        this.loadTask(this.currentIndex + 1);
      });
    }
  }

  checkSwitches() {
    const task = this.getCurrentTask();
    const feedbackEl = this.container.querySelector("#switch-feedback");
    const speakStageBtn = this.container.querySelector("#btn-speak-stage");
    if (speakStageBtn) {
      speakStageBtn.addEventListener("click", () => {
        const task = this.getCurrentTask();
        const struct = this.computeStructure(task);
        speech.speak(struct.fullSentence);
      });
    }

    const checkBtn = this.container.querySelector("#btn-check-switches");
    const nextBtn = this.container.querySelector("#btn-next-switches");

    const expected = task.correctSwitches;
    const isTenseCorrect = this.switches.tense === expected.tense;
    const isModeCorrect = this.switches.mode === expected.mode;
    const isQWordCorrect = this.switches.qWord === expected.qWord;

    if (isTenseCorrect && isModeCorrect && isQWordCorrect) {
      sound.playSuccess();
      state.addXP(25);
      state.markSolved("switchboard", task.id);

      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-success">
          <div class="feedback-title">⚡ Блестяще! Цепь замкнута правильно:</div>
          <div class="correct-sentence-box">${task.targetSentence}</div>
          <p class="rule-expl">${task.explanation}</p>
        </div>
      `;

      if (nextBtn) {
        nextBtn.classList.add("btn-success-next");
        nextBtn.innerHTML = "✨ Следующая цель ➔";
      }
    } else {
      sound.playError();
      state.registerError();

      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-error">
          <div class="feedback-title">Цепь пока не замкнулась!</div>
          <p>Внимательно сверься с целью: <strong>${task.ruTarget}</strong> (${task.targetDesc}).</p>
        </div>
      `;
    }
  }
}
