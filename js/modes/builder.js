// Логика режима «Конструктор предложений» (Sentence Assembler)
import { BUILDER_TASKS } from "../data/builder-tasks.js";
import { sound } from "../audio.js";
import { speech } from "../speech.js";
import { state } from "../state.js";

export class BuilderMode {
  constructor(containerEl) {
    this.container = containerEl;
    this.currentIndex = 0;
    this.selectedTokens = [];
    this.bankTokens = [];
  }

  init() {
    this.loadTask(this.currentIndex || 0);
  }

  getCurrentTask() {
    return BUILDER_TASKS[this.currentIndex];
  }

  loadTask(index) {
    this.currentIndex = (index + BUILDER_TASKS.length) % BUILDER_TASKS.length;
    const task = this.getCurrentTask();
    this.selectedTokens = [];
    // Перемешиваем кирпичики для банка
    this.bankTokens = [...task.tokens].sort(() => Math.random() - 0.5);
    this.render();
  }

  render() {
    const task = this.getCurrentTask();
    if (!task) return;

    if (this.bankTokens.length === 0 && this.selectedTokens.length === 0) {
      this.bankTokens = [...task.tokens].sort(() => Math.random() - 0.5);
    }

    this.container.innerHTML = `
      <div class="mode-header">
        <div class="mode-badge">🧩 Конструктор речи</div>
        <div class="task-counter">Задание ${this.currentIndex + 1} из ${BUILDER_TASKS.length}</div>
      </div>

      <div class="task-card">
        <div class="theme-label">${task.theme}</div>
        <h2 class="target-phrase">«${task.ru}»</h2>
        <div class="hint-box">
          <span class="hint-icon">💡</span>
          <span class="hint-text">${task.hint}</span>
        </div>

        <div class="builder-slots-area">
          <div class="slots-label">Собранное предложение (порядок слов фиксирован):</div>
          <div class="assembled-line" id="assembled-line"></div>
        </div>

        <div class="token-bank-area">
          <div class="bank-label">Банк доступных кирпичиков:</div>
          <div class="token-bank" id="token-bank"></div>
        </div>

        <div class="feedback-area" id="builder-feedback"></div>

        <div class="action-buttons">
          <button class="btn btn-mic" id="btn-builder-mic" title="Назовите предложение вслух">🎙️ Сказать вслух</button>
          <button class="btn btn-secondary" id="btn-builder-reset">Сбросить</button>
          <button class="btn btn-primary" id="btn-builder-check">Проверить скелет</button>
          <button class="btn btn-next hidden" id="btn-builder-next">Следующее задание ➔</button>
        </div>
      </div>
    `;

    // Привязываем статические события один раз на карточку
    const micBtn = this.container.querySelector("#btn-builder-mic");
    if (micBtn) {
      micBtn.addEventListener("click", () => this.handleMicInput());
    }

    const resetBtn = this.container.querySelector("#btn-builder-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        sound.playClick();
        this.loadTask(this.currentIndex);
      });
    }

    const checkBtn = this.container.querySelector("#btn-builder-check");
    if (checkBtn) {
      checkBtn.addEventListener("click", () => this.checkSolution());
    }

    const nextBtn = this.container.querySelector("#btn-builder-next");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        sound.playClick();
        this.loadTask(this.currentIndex + 1);
      });
    }

    // Отрисовываем кирпичики без перерисовки всей карточки
    this.updateChips();
  }

  handleMicInput() {
    const micBtn = this.container.querySelector("#btn-builder-mic");
    const feedbackEl = this.container.querySelector("#builder-feedback");
    const task = this.getCurrentTask();

    micBtn.classList.add("mic-recording");
    micBtn.innerHTML = `<span>🔴 Слушаю...</span>`;

    speech.startListening(
      (transcript) => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span>🎙️ Сказать вслух</span>`;

        const words = transcript.replace(/[.,?!]/g, "").split(/\s+/).filter(Boolean);
        // Сверяем распознанные слова с банком
        this.selectedTokens = [];
        this.bankTokens = [...task.tokens];

        words.forEach((w) => {
          const bankIdx = this.bankTokens.findIndex(
            (t) => t.toLowerCase() === w.toLowerCase()
          );
          if (bankIdx !== -1) {
            const token = this.bankTokens.splice(bankIdx, 1)[0];
            this.selectedTokens.push(token);
          }
        });

        this.updateChips();
        this.checkSolution();
      },
      (error) => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span>🎙️ Сказать вслух</span>`;
        if (feedbackEl) {
          feedbackEl.innerHTML = `<div class="feedback-box feedback-error"><p>🎙️ ${error}</p></div>`;
        }
      },
      () => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span>🎙️ Сказать вслух</span>`;
      }
    );
  }

  // Обновляет ТОЛЬКО область кирпичиков без перерисовки карточки и без мигания экрана
  updateChips() {
    const assembledEl = this.container.querySelector("#assembled-line");
    const bankEl = this.container.querySelector("#token-bank");
    if (!assembledEl || !bankEl) return;

    // 1. Собранная строка
    if (this.selectedTokens.length === 0) {
      assembledEl.innerHTML = `<div class="empty-placeholder">Нажимай на слова внизу, чтобы собрать скелет фразы...</div>`;
    } else {
      assembledEl.innerHTML = this.selectedTokens
        .map(
          (token, idx) => `
        <button class="word-chip chip-assembled" data-idx="${idx}" title="Кликни, чтобы вернуть в банк">
          ${token}
          <span class="remove-x">✕</span>
        </button>
      `
        )
        .join("");

      // Клик по собранному кирпичику -> вернуть в банк
      assembledEl.querySelectorAll(".chip-assembled").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.dataset.idx, 10);
          const token = this.selectedTokens.splice(idx, 1)[0];
          this.bankTokens.push(token);
          sound.playClick();
          this.clearFeedback();
          this.updateChips();
        });
      });
    }

    // 2. Банк кирпичиков
    bankEl.innerHTML = this.bankTokens
      .map(
        (token, idx) => `
      <button class="word-chip chip-bank" data-bank-idx="${idx}">
        ${token}
      </button>
    `
      )
      .join("");

    // Клик по кирпичику в банке -> добавить в собранное
    bankEl.querySelectorAll(".chip-bank").forEach((btn) => {
      btn.addEventListener("click", () => {
        const bankIdx = parseInt(btn.dataset.bankIdx, 10);
        const token = this.bankTokens.splice(bankIdx, 1)[0];
        this.selectedTokens.push(token);

        // Озвучиваем выбранный кирпичик
        speech.speak(token, 1.0);
        sound.playClick();

        this.clearFeedback();
        this.updateChips();
      });
    });
  }

  clearFeedback() {
    const feedbackEl = this.container.querySelector("#builder-feedback");
    if (feedbackEl) feedbackEl.innerHTML = "";
    const checkBtn = this.container.querySelector("#btn-builder-check");
    const nextBtn = this.container.querySelector("#btn-builder-next");
    if (checkBtn) checkBtn.classList.remove("hidden");
    if (nextBtn) nextBtn.classList.add("hidden");
  }

  checkSolution() {
    const task = this.getCurrentTask();
    const feedbackEl = this.container.querySelector("#builder-feedback");
    const checkBtn = this.container.querySelector("#btn-builder-check");
    const nextBtn = this.container.querySelector("#btn-builder-next");
    const assembledEl = this.container.querySelector("#assembled-line");

    const isMatch =
      this.selectedTokens.length === task.solution.length &&
      this.selectedTokens.every((val, idx) => val === task.solution[idx]);

    if (isMatch) {
      sound.playSuccess();
      state.addXP(25);
      state.markSolved("builder", task.id);

      // Подсвечиваем все кирпичики изумрудно-зеленым успехом
      if (assembledEl) {
        assembledEl.querySelectorAll(".chip-assembled").forEach((chip) => {
          chip.classList.add("chip-step-correct");
        });
      }

      // Произносим собранную английскую фразу вслух
      const fullSentence = task.solution.join(" ");
      speech.speak(fullSentence);

      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-success">
          <div class="feedback-title">🎯 Идеально! Порядок слов и связи соблюдены:</div>
          <div class="solution-display">
            <span>${fullSentence}</span>
            <button class="btn-voice-mini" id="btn-replay-solution" title="Послушать еще раз">🔊</button>
          </div>
          <div class="structure-breakdown">
            ${task.structure.map((part) => `<span class="structure-badge">${part}</span>`).join(" ")}
          </div>
        </div>
      `;

      const replayBtn = feedbackEl.querySelector("#btn-replay-solution");
      if (replayBtn) {
        replayBtn.addEventListener("click", () => speech.speak(fullSentence));
      }

      if (checkBtn) checkBtn.classList.add("hidden");
      if (nextBtn) nextBtn.classList.remove("hidden");
    } else {
      sound.playError();
      state.registerError();

      // Подсвечиваем верные слова зеленым, а ошибочные красным зачёркиванием!
      if (assembledEl) {
        const chips = assembledEl.querySelectorAll(".chip-assembled");
        chips.forEach((chip, idx) => {
          if (idx < task.solution.length && this.selectedTokens[idx] === task.solution[idx]) {
            chip.classList.add("chip-step-correct");
          } else {
            chip.classList.add("chip-wrong-order");
          }
        });
      }

      let advice = "Порядок слов или выбор элементов не совпадает.";
      if (this.selectedTokens.length < task.solution.length) {
        advice = "Предложение не закончено! Не хватает ключевых звеньев цепи.";
      }

      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-error">
          <div class="feedback-title">⚠️ Скелет предложения сломан!</div>
          <p>${advice}</p>
          <div class="error-hint">Неправильные элементы подсвечены <strong>красным</strong>. Обрати внимание на подсказку: <em>${task.hint}</em></div>
        </div>
      `;
    }
  }
}
