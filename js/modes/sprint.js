// Режим «Блиц-спринт / Разговорная реакция» (Speed Sprint)
import { SPRINT_TASKS } from "../data/sprint-tasks.js";
import { sound } from "../audio.js";
import { speech } from "../speech.js";
import { state } from "../state.js";

export class SprintMode {
  constructor(containerEl) {
    this.container = containerEl;
    this.currentIndex = 0;
    this.timer = null;
    this.timeLeft = 5;
    this.totalTime = 5;
    this.isAnswered = false;
    this.combo = 0;
    this.score = 0;
  }

  init() {
    this.currentIndex = 0;
    this.combo = 0;
    this.score = 0;
    this.loadQuestion(0);
  }

  getCurrentTask() {
    return SPRINT_TASKS[this.currentIndex % SPRINT_TASKS.length];
  }

  loadQuestion(index) {
    this.clearTimer();
    this.currentIndex = index;
    const task = this.getCurrentTask();
    this.timeLeft = task.timeLimit || 5;
    this.totalTime = this.timeLeft;
    this.isAnswered = false;

    // Перемешиваем варианты
    this.shuffledOptions = [...task.options]
      .map((opt) => ({ ...opt }))
      .sort(() => Math.random() - 0.5);

    this.render();
    this.startTimer();
  }

  startTimer() {
    const timerBar = this.container.querySelector("#sprint-timer-bar");
    const timerText = this.container.querySelector("#sprint-timer-sec");

    this.timer = setInterval(() => {
      this.timeLeft -= 0.1;
      if (timerText) timerText.innerText = Math.max(0, this.timeLeft).toFixed(1) + "s";
      if (timerBar) {
        const pct = Math.max(0, (this.timeLeft / this.totalTime) * 100);
        timerBar.style.width = `${pct}%`;
        if (pct < 30) {
          timerBar.style.backgroundColor = "#ef4444";
        } else if (pct < 60) {
          timerBar.style.backgroundColor = "#f59e0b";
        }
      }

      if (this.timeLeft <= 0) {
        this.clearTimer();
        this.handleTimeout();
      }
    }, 100);
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  render() {
    const task = this.getCurrentTask();
    if (!task) return;

    this.container.innerHTML = `
      <div class="mode-header">
        <div class="mode-badge">⚡ Блиц-спринт (Убей переводчика в голове)</div>
        <div class="sprint-header-stats">
          <span class="sprint-combo">🔥 Комбо: x${this.combo}</span>
          <span class="task-counter">Раунд ${this.currentIndex + 1} из ${SPRINT_TASKS.length}</span>
        </div>
      </div>

      <div class="task-card sprint-card">
        <div class="sprint-timer-track">
          <div class="sprint-timer-bar" id="sprint-timer-bar" style="width: 100%"></div>
        </div>
        <div class="sprint-timer-badge" id="sprint-timer-sec">${this.timeLeft.toFixed(1)}s</div>

        <div class="sprint-prompt">
          <span class="sprint-label">ПЕРЕВЕДИ МГНОВЕННО БЕЗ ПАУЗЫ:</span>
          <h2 class="sprint-phrase">«${task.ru}»</h2>
        </div>

        <div class="sprint-options-grid" id="sprint-options">
          ${this.shuffledOptions
            .map(
              (opt, idx) => `
            <button class="sprint-opt-btn" data-idx="${idx}">
              <span class="opt-key">${idx + 1}</span>
              <span class="opt-val">${opt.text}</span>
            </button>
          `
            )
            .join("")}
        </div>

        <div class="feedback-area" id="sprint-feedback"></div>

        <div class="action-buttons">
          <button class="btn btn-next hidden" id="btn-sprint-next">Следующий раунд ➔</button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const btns = this.container.querySelectorAll(".sprint-opt-btn");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (this.isAnswered) return;
        const idx = parseInt(btn.dataset.idx, 10);
        this.selectOption(idx, btn);
      });
    });

    const nextBtn = this.container.querySelector("#btn-sprint-next");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        sound.playClick();
        this.loadQuestion(this.currentIndex + 1);
      });
    }

    // Поддержка горячих клавиш 1, 2, 3 для молниеносного ответа с клавиатуры
    this.keyHandler = (e) => {
      if (this.isAnswered) return;
      if (["1", "2", "3"].includes(e.key)) {
        const num = parseInt(e.key, 10) - 1;
        const btn = btns[num];
        if (btn) this.selectOption(num, btn);
      }
    };
    window.addEventListener("keydown", this.keyHandler, { once: true });
  }

  selectOption(idx, buttonEl) {
    this.clearTimer();
    this.isAnswered = true;
    const task = this.getCurrentTask();
    const chosen = this.shuffledOptions[idx];
    const feedbackEl = this.container.querySelector("#sprint-feedback");
    const nextBtn = this.container.querySelector("#btn-sprint-next");

    if (chosen.correct) {
      this.combo += 1;
      this.score += 10 * this.combo;
      sound.playSuccess();
      state.addXP(15 + this.combo * 2);
      buttonEl.classList.add("sprint-correct");

      // Озвучиваем правильный ответ
      speech.speak(chosen.text);

      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-success">
          <div class="feedback-title">⚡ Молниеносно! Комбо x${this.combo}</div>
          <p>💡 <em>${task.ruleTip}</em></p>
        </div>
      `;

      // При высоком темпе автоматически переключаем через 1.2 секунды
      setTimeout(() => {
        if (this.currentIndex + 1 < SPRINT_TASKS.length) {
          this.loadQuestion(this.currentIndex + 1);
        } else {
          if (nextBtn) nextBtn.classList.remove("hidden");
        }
      }, 1200);
    } else {
      this.combo = 0;
      sound.playError();
      state.registerError();
      buttonEl.classList.add("sprint-wrong");

      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-error">
          <div class="feedback-title">Стоп! Ошибка сбила комбо.</div>
          <p>💡 Подсказка: ${task.ruleTip}</p>
        </div>
      `;

      if (nextBtn) nextBtn.classList.remove("hidden");
    }
  }

  handleTimeout() {
    this.isAnswered = true;
    this.combo = 0;
    sound.playError();
    state.registerError();
    const task = this.getCurrentTask();
    const feedbackEl = this.container.querySelector("#sprint-feedback");
    const nextBtn = this.container.querySelector("#btn-sprint-next");

    feedbackEl.innerHTML = `
      <div class="feedback-box feedback-error">
        <div class="feedback-title">⏰ Время вышло! Внутренний переводчик победил.</div>
        <p>💡 Подсказка: ${task.ruleTip}</p>
      </div>
    `;

    if (nextBtn) nextBtn.classList.remove("hidden");
  }
}
