// Логика режима «Экспресс-Тест / Quiz»
import { QUIZ_TASKS } from "../data/quiz-tasks.js";
import { sound } from "../audio.js";
import { state } from "../state.js";

export class QuizMode {
  constructor(containerEl) {
    this.container = containerEl;
    this.currentIndex = 0;
    this.selectedOptionIndex = null;
    this.answered = false;
    this.currentOptions = [];
  }

  init() {
    const rand = Math.floor(Math.random() * QUIZ_TASKS.length);
    this.loadQuestion(rand);
  }

  getCurrentQuestion() {
    return QUIZ_TASKS[this.currentIndex];
  }

  loadQuestion(index) {
    this.currentIndex = (index + QUIZ_TASKS.length) % QUIZ_TASKS.length;
    this.selectedOptionIndex = null;
    this.answered = false;

    // Перемешиваем варианты ответов случайным образом при каждой загрузке вопроса
    const q = this.getCurrentQuestion();
    if (q && q.options) {
      this.currentOptions = q.options
        .map((opt) => ({ ...opt }))
        .sort(() => Math.random() - 0.5);
    }

    this.render();
  }

  render() {
    const q = this.getCurrentQuestion();
    if (!q) return;

    if (!this.currentOptions || this.currentOptions.length === 0) {
      this.currentOptions = q.options
        .map((opt) => ({ ...opt }))
        .sort(() => Math.random() - 0.5);
    }

    this.container.innerHTML = `
      <div class="mode-header">
        <div class="mode-badge">📝 Экспресс-тест Парето</div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="task-counter">Вопрос ${this.currentIndex + 1} из ${QUIZ_TASKS.length}</div>
          <button class="btn-random-card" id="btn-quiz-random" title="Случайный вопрос">🎲</button>
        </div>
      </div>

      <div class="task-card">
        <h2 class="quiz-question-title">${q.question}</h2>

        <div class="quiz-options-grid" id="quiz-options">
          ${this.currentOptions
            .map(
              (opt, idx) => `
            <button class="quiz-option-card ${
              this.answered
                ? opt.correct
                  ? "opt-correct"
                  : idx === this.selectedOptionIndex
                  ? "opt-wrong"
                  : "opt-disabled"
                : ""
            }" data-opt-idx="${idx}" ${this.answered ? "disabled" : ""}>
              <div class="opt-letter">${String.fromCharCode(65 + idx)}</div>
              <div class="opt-text">${opt.text}</div>
            </button>
          `
            )
            .join("")}
        </div>

        <div class="feedback-area" id="quiz-feedback"></div>

        <div class="action-buttons">
          <button class="btn btn-secondary" id="btn-quiz-prev">◀ Назад</button>
          <button class="btn btn-next ${this.answered ? "btn-success-next" : ""}" id="btn-quiz-next">
            ${this.answered ? "✨ Следующий вопрос ➔" : "Далее ➔"}
          </button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const optionBtns = this.container.querySelectorAll(".quiz-option-card");
    optionBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (this.answered) return;
        const optIdx = parseInt(btn.dataset.optIdx, 10);
        this.selectOption(optIdx);
      });
    });

    const randBtn = this.container.querySelector("#btn-quiz-random");
    if (randBtn) {
      randBtn.addEventListener("click", () => {
        sound.playClick();
        const rand = Math.floor(Math.random() * QUIZ_TASKS.length);
        this.loadQuestion(rand);
      });
    }

    const prevBtn = this.container.querySelector("#btn-quiz-prev");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        sound.playClick();
        this.loadQuestion(this.currentIndex - 1);
      });
    }

    const nextBtn = this.container.querySelector("#btn-quiz-next");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        sound.playClick();
        this.loadQuestion(this.currentIndex + 1);
      });
    }
  }

  selectOption(optIdx) {
    this.answered = true;
    this.selectedOptionIndex = optIdx;
    const q = this.getCurrentQuestion();
    const chosen = this.currentOptions[optIdx];
    const feedbackEl = this.container.querySelector("#quiz-feedback");
    const nextBtn = this.container.querySelector("#btn-quiz-next");

    if (chosen.correct) {
      sound.playSuccess();
      state.addXP(20);
      state.markSolved("quiz", q.id);

      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-success">
          <div class="feedback-title">🎯 Абсолютно верно!</div>
          <p class="rule-expl">${q.explanation}</p>
        </div>
      `;
    } else {
      sound.playError();
      state.registerError();

      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-error">
          <div class="feedback-title">❌ Неверно!</div>
          <p class="rule-expl">${q.explanation}</p>
        </div>
      `;
    }

    if (nextBtn) nextBtn.classList.remove("hidden");
    this.render(); // Обновим вид кнопок (зеленый правильный / красный ошибочный)
  }
}
