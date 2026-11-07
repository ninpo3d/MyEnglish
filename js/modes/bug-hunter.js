// Логика режима «Охотник за багами» (Bug Hunter)
import { BUG_HUNTER_TASKS } from "../data/bug-hunter-tasks.js";
import { sound } from "../audio.js";
import { speech } from "../speech.js";
import { state } from "../state.js";

export class BugHunterMode {
  constructor(containerEl) {
    this.container = containerEl;
    this.currentIndex = 0;
    this.filterLevel = "all";
    this.answered = false;
  }

  init() {
    const list = this.getFilteredTasks();
    const rand = list.length ? Math.floor(Math.random() * list.length) : 0;
    this.loadTask(rand);
  }

  getFilteredTasks() {
    if (this.filterLevel === "all") return BUG_HUNTER_TASKS;
    return BUG_HUNTER_TASKS.filter((t) => t.level === this.filterLevel);
  }

  getCurrentTask() {
    const list = this.getFilteredTasks();
    return list[this.currentIndex % list.length];
  }

  loadTask(index) {
    const list = this.getFilteredTasks();
    this.currentIndex = (index + list.length) % list.length;
    this.answered = false;
    this.render();
  }

  render() {
    const task = this.getCurrentTask();
    const list = this.getFilteredTasks();
    if (!task) return;

    // Разбиваем предложение на слова
    const words = task.sentence.split(" ");

    this.container.innerHTML = `
      <div class="mode-header">
        <div class="mode-badge">🕵️ Охотник за багами</div>
        <div class="filter-controls">
          <button class="filter-btn ${this.filterLevel === "all" ? "active" : ""}" data-level="all">Все (${BUG_HUNTER_TASKS.length})</button>
          <button class="filter-btn ${this.filterLevel === "beginner" ? "active" : ""}" data-level="beginner">Новичок</button>
          <button class="filter-btn ${this.filterLevel === "intermediate" ? "active" : ""}" data-level="intermediate">Средний</button>
          <button class="filter-btn ${this.filterLevel === "tricky" ? "active" : ""}" data-level="tricky">Хитрые ловушки</button>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="task-counter">${this.currentIndex + 1} из ${list.length}</div>
          <button class="btn-random-card" id="btn-hunter-random" title="Случайная фраза">🎲</button>
        </div>
      </div>

      <div class="task-card">
        <div class="hunter-instruction">
          Найди и <strong>кликни по лишнему или ошибочному элементу</strong> в предложении:
        </div>

        <div class="sentence-interactive-box" id="sentence-box">
          ${words
            .map(
              (w, idx) => `
            <button class="interactive-word" data-word-idx="${idx}">${w}</button>
          `
            )
            .join(" ")}
        </div>

        <div class="feedback-area" id="hunter-feedback"></div>

        <div class="action-buttons">
          <button class="btn btn-secondary" id="btn-hunter-prev">◀ Назад</button>
          <button class="btn btn-secondary" id="btn-no-error" ${this.answered ? "disabled" : ""}>Здесь нет ошибки</button>
          <button class="btn btn-next ${this.answered ? "btn-success-next" : ""}" id="btn-hunter-next">
            ${this.answered ? "✨ Следующая фраза ➔" : "Далее ➔"}
          </button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Фильтры уровня сложности
    const filterBtns = this.container.querySelectorAll(".filter-btn");
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.filterLevel = btn.dataset.level;
        sound.playClick();
        this.loadTask(0);
      });
    });

    // Клик по слову
    const wordBtns = this.container.querySelectorAll(".interactive-word");
    wordBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (this.answered) return;
        const clickedIdx = parseInt(btn.dataset.wordIdx, 10);
        this.handleWordClick(clickedIdx, btn);
      });
    });

    // Кнопка "Ошибок нет"
    const noErrorBtn = this.container.querySelector("#btn-no-error");
    if (noErrorBtn) {
      noErrorBtn.addEventListener("click", () => {
        if (this.answered) return;
        this.handleNoErrorClick();
      });
    }

    // Случайное задание
    const randBtn = this.container.querySelector("#btn-hunter-random");
    if (randBtn) {
      randBtn.addEventListener("click", () => {
        sound.playClick();
        const list = this.getFilteredTasks();
        const rand = list.length ? Math.floor(Math.random() * list.length) : 0;
        this.loadTask(rand);
      });
    }

    // Кнопка "Назад"
    const prevBtn = this.container.querySelector("#btn-hunter-prev");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        sound.playClick();
        this.loadTask(this.currentIndex - 1);
      });
    }

    // Кнопка "Далее"
    const nextBtn = this.container.querySelector("#btn-hunter-next");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        sound.playClick();
        this.loadTask(this.currentIndex + 1);
      });
    }
  }

  handleWordClick(clickedIdx, wordElement) {
    const task = this.getCurrentTask();
    const feedbackEl = this.container.querySelector("#hunter-feedback");
    const nextBtn = this.container.querySelector("#btn-hunter-next");

    if (task.hasError && clickedIdx === task.errorWordIndex) {
      // Верно нашли ошибку!
      this.answered = true;
      wordElement.classList.add("word-error-found");

      // Красивая визуальная трансформация слова
      const originalText = wordElement.innerText;
      if (task.correctWord) {
        wordElement.innerHTML = `<span class="struck-text">${originalText}</span> ➔ <span class="fixed-text">${task.correctWord}</span>`;
      } else {
        wordElement.innerHTML = `<span class="struck-text">${originalText}</span> <span class="deleted-tag">✕ лишнее</span>`;
      }

      sound.playSuccess();
      state.addXP(20);
      state.markSolved("bugHunter", task.id);

      // Озвучиваем исправленное правильное предложение
      speech.speak(task.correctSentence);

      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-success">
          <div class="feedback-title">🎯 Точно в цель! Баг нейтрализован:</div>
          <div class="correct-sentence-box">
            <span>Правильно: <strong>${task.correctSentence}</strong></span>
            <button class="btn-voice-mini" id="btn-replay-hunter-fix">🔊</button>
          </div>
          <p class="rule-expl">${task.explanation}</p>
        </div>
      `;

      const replayBtn = feedbackEl.querySelector("#btn-replay-hunter-fix");
      if (replayBtn) {
        replayBtn.addEventListener("click", () => speech.speak(task.correctSentence));
      }

      if (nextBtn) nextBtn.classList.remove("hidden");
    } else {
      // Промах
      sound.playError();
      state.registerError();
      wordElement.classList.add("word-wrong-guess");
      setTimeout(() => wordElement.classList.remove("word-wrong-guess"), 600);

      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-error">
          <div class="feedback-title">Мимо!</div>
          <p>Слово «${wordElement.innerText}» стоит на своем месте и не содержит ошибки. Попробуй другое слово!</p>
        </div>
      `;
    }
  }

  handleNoErrorClick() {
    const task = this.getCurrentTask();
    const feedbackEl = this.container.querySelector("#hunter-feedback");
    const nextBtn = this.container.querySelector("#btn-hunter-next");

    if (!task.hasError) {
      this.answered = true;
      sound.playSuccess();
      state.addXP(20);
      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-success">
          <div class="feedback-title">🎯 Абсолютно верно! Фраза безупречна.</div>
        </div>
      `;
      if (nextBtn) nextBtn.classList.remove("hidden");
    } else {
      sound.playError();
      state.registerError();
      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-error">
          <div class="feedback-title">Ошибка здесь есть!</div>
          <p>Внимательно проверь связки глаголов, модальники или определители.</p>
        </div>
      `;
    }
  }
}
