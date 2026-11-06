// Режим «Аудио-диктант / Понимание на слух» (Listening Mode)
// С мгновенной зеленой подсветкой правильно собранных слов и аудио-откликом

import { LISTENING_TASKS } from "../data/listening-tasks.js";
import { sound } from "../audio.js";
import { speech } from "../speech.js";
import { state } from "../state.js";

export class ListeningMode {
  constructor(containerEl) {
    this.container = containerEl;
    this.currentIndex = 0;
    this.selectedTokens = [];
    this.bankTokens = [];
    this.showRu = false;
    this.isCompleted = false;
  }

  init() {
    this.loadTask(0);
  }

  getCurrentTask() {
    return LISTENING_TASKS[this.currentIndex];
  }

  loadTask(index) {
    this.currentIndex = (index + LISTENING_TASKS.length) % LISTENING_TASKS.length;
    const task = this.getCurrentTask();
    this.selectedTokens = [];
    this.showRu = false;
    this.isCompleted = false;
    this.bankTokens = [...task.tokens].sort(() => Math.random() - 0.5);
    this.render();

    // Автоматически озвучиваем фразу целиком при открытии карточки
    setTimeout(() => {
      speech.speak(task.en);
    }, 400);
  }

  render() {
    const task = this.getCurrentTask();
    if (!task) return;

    this.container.innerHTML = `
      <div class="mode-header">
        <div class="mode-badge">🎧 Аудио-диктант (На слух)</div>
        <div class="task-counter">Фраза ${this.currentIndex + 1} из ${LISTENING_TASKS.length}</div>
      </div>

      <div class="task-card listening-card">
        <div class="listening-control-box">
          <div class="audio-buttons-row">
            <button class="btn-audio-play" id="btn-play-normal" title="Слушать на обычной скорости">
              <span class="audio-icon">🔊</span> Слушать фразу
            </button>
            <button class="btn-audio-slow" id="btn-play-slow" title="Слушать замедленно (0.7x)">
              <span class="audio-icon">🐢</span> Медленно
            </button>
            <button class="btn-audio-mic" id="btn-mic-dictate" title="Надиктовать фразу в микрофон">
              <span class="audio-icon">🎙️</span> Сказать вслух
            </button>
          </div>

          <div class="ru-spoiler-box">
            ${
              this.showRu
                ? `<div class="ru-revealed">«${task.ru}»</div>`
                : `<button class="btn-link" id="btn-show-ru">👁️ Показать русский перевод (подсказка)</button>`
            }
          </div>
        </div>

        <div class="builder-slots-area">
          <div class="slots-header-row">
            <span class="slots-label">То, что ты услышал (собери по порядку):</span>
            <span class="slots-status-badge" id="list-status-badge"></span>
          </div>
          <div class="assembled-line" id="assembled-line"></div>
        </div>

        <div class="token-bank-area">
          <div class="bank-label">Банк доступных кирпичиков:</div>
          <div class="token-bank" id="token-bank"></div>
        </div>

        <div class="feedback-area" id="listening-feedback"></div>

        <div class="action-buttons">
          <button class="btn btn-secondary" id="btn-list-reset">Сбросить</button>
          <button class="btn btn-primary" id="btn-list-check">Проверить</button>
          <button class="btn btn-next hidden" id="btn-list-next">Следующая фраза ➔</button>
        </div>
      </div>
    `;

    this.bindEvents();
    this.updateChips();
  }

  bindEvents() {
    const task = this.getCurrentTask();

    // Озвучка
    const playNorm = this.container.querySelector("#btn-play-normal");
    if (playNorm) {
      playNorm.addEventListener("click", () => {
        sound.playClick();
        speech.speak(task.en);
      });
    }

    const playSlow = this.container.querySelector("#btn-play-slow");
    if (playSlow) {
      playSlow.addEventListener("click", () => {
        sound.playClick();
        speech.speakSlow(task.en);
      });
    }

    // Микрофон
    const micBtn = this.container.querySelector("#btn-mic-dictate");
    if (micBtn) {
      micBtn.addEventListener("click", () => this.handleMicClick());
    }

    // Спойлер перевода
    const showRuBtn = this.container.querySelector("#btn-show-ru");
    if (showRuBtn) {
      showRuBtn.addEventListener("click", () => {
        this.showRu = true;
        this.render();
      });
    }

    // Кнопка сброса
    const resetBtn = this.container.querySelector("#btn-list-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        sound.playClick();
        this.loadTask(this.currentIndex);
      });
    }

    // Проверка
    const checkBtn = this.container.querySelector("#btn-list-check");
    if (checkBtn) {
      checkBtn.addEventListener("click", () => this.checkSolution());
    }

    // Следующее задание
    const nextBtn = this.container.querySelector("#btn-list-next");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        sound.playClick();
        this.loadTask(this.currentIndex + 1);
      });
    }
  }

  handleMicClick() {
    const micBtn = this.container.querySelector("#btn-mic-dictate");
    const feedbackEl = this.container.querySelector("#listening-feedback");

    micBtn.classList.add("mic-recording");
    micBtn.innerHTML = `<span>🔴 Говорите...</span>`;

    speech.startListening(
      (transcript) => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span>🎙️</span> Сказать вслух`;
        this.evaluateTranscript(transcript);
      },
      (error) => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span>🎙️</span> Сказать вслух`;
        feedbackEl.innerHTML = `<div class="feedback-box feedback-error"><p>🎙️ ${error}</p></div>`;
      },
      () => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span>🎙️</span> Сказать вслух`;
      }
    );
  }

  evaluateTranscript(transcript) {
    const task = this.getCurrentTask();
    const cleanRecognized = transcript.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
    const cleanExpected = task.en.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();

    if (cleanRecognized === cleanExpected) {
      this.handleCompleteSuccess(task, true);
    } else {
      sound.playError();
      const feedbackEl = this.container.querySelector("#listening-feedback");
      if (feedbackEl) {
        feedbackEl.innerHTML = `
          <div class="feedback-box feedback-error">
            <div class="feedback-title">🎙️ Вы сказали: «${transcript}»</div>
            <p>Близко, но не совсем совпало. Попробуйте еще раз или соберите кирпичиками!</p>
          </div>
        `;
      }
    }
  }

  updateChips() {
    const assembledEl = this.container.querySelector("#assembled-line");
    const bankEl = this.container.querySelector("#token-bank");
    const statusBadge = this.container.querySelector("#list-status-badge");
    const task = this.getCurrentTask();
    if (!assembledEl || !bankEl || !task) return;

    const expectedTokens = task.en.replace(/[.,?!]/g, "").split(" ");

    // 1. Отрисовка собранных слов с мгновенной подсветкой
    if (this.selectedTokens.length === 0) {
      assembledEl.innerHTML = `<div class="empty-placeholder">Слушай аудио и кликай по кирпичикам...</div>`;
      if (statusBadge) statusBadge.innerHTML = "";
    } else {
      let correctCount = 0;
      let hasError = false;

      assembledEl.innerHTML = this.selectedTokens
        .map((token, idx) => {
          const isExpected =
            idx < expectedTokens.length &&
            token.toLowerCase() === expectedTokens[idx].toLowerCase();

          if (isExpected && !hasError) {
            correctCount++;
            return `
              <button class="word-chip chip-assembled chip-step-correct" data-idx="${idx}" title="Правильно услышано!">
                <span class="chip-check-icon">✓</span> ${token} <span class="remove-x">✕</span>
              </button>
            `;
          } else {
            hasError = true;
            return `
              <button class="word-chip chip-assembled chip-wrong-order" data-idx="${idx}" title="Не то слово или нарушен порядок">
                ${token} <span class="remove-x">✕</span>
              </button>
            `;
          }
        })
        .join("");

      // Обновляем статусную полосу реакции
      if (statusBadge) {
        if (!hasError) {
          statusBadge.innerHTML = `<span class="badge-status-progress">🟢 Верно: ${correctCount} из ${expectedTokens.length}</span>`;
        } else {
          statusBadge.innerHTML = `<span class="badge-status-error">🔴 Ошибка на слух! Кликни ✕ чтобы убрать</span>`;
        }
      }

      // Клик по слову в собранной строке -> возврат в банк
      assembledEl.querySelectorAll(".chip-assembled").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (this.isCompleted) return;
          const idx = parseInt(btn.dataset.idx, 10);
          const token = this.selectedTokens.splice(idx, 1)[0];
          this.bankTokens.push(token);
          sound.playClick();
          this.updateChips();
        });
      });

      // Авто-проверка при полной правильной сборке!
      if (!hasError && correctCount === expectedTokens.length && !this.isCompleted) {
        this.handleCompleteSuccess(task, false);
      }
    }

    // 2. Отрисовка банка кирпичиков
    bankEl.innerHTML = this.bankTokens
      .map(
        (token, idx) => `
      <button class="word-chip chip-bank" data-bank-idx="${idx}">
        ${token}
      </button>
    `
      )
      .join("");

    bankEl.querySelectorAll(".chip-bank").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (this.isCompleted) return;
        const bankIdx = parseInt(btn.dataset.bankIdx, 10);
        const token = this.bankTokens.splice(bankIdx, 1)[0];
        this.selectedTokens.push(token);

        // Озвучиваем выбранное слово диктором вслух!
        speech.speak(token, 1.0);
        sound.playClick();

        this.updateChips();
      });
    });
  }

  handleCompleteSuccess(task, fromMic = false) {
    this.isCompleted = true;
    sound.playSuccess();
    state.addXP(fromMic ? 35 : 25);
    state.markSolved("listening", task.id);

    // Озвучиваем победную фразу целиком
    speech.speak(task.en);

    const feedbackEl = this.container.querySelector("#listening-feedback");
    const checkBtn = this.container.querySelector("#btn-list-check");
    const nextBtn = this.container.querySelector("#btn-list-next");
    const statusBadge = this.container.querySelector("#list-status-badge");

    if (statusBadge) {
      statusBadge.innerHTML = `<span class="badge-status-complete">✨ Вся фраза собрана идеально!</span>`;
    }

    if (feedbackEl) {
      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-success">
          <div class="feedback-title">🎯 ${fromMic ? "Фантастика! Распознано 100%:" : "Блестяще! Вы услышали каждое слово:"}</div>
          <div class="solution-display">
            <span>${task.en}</span>
            <button class="btn-voice-mini" id="btn-replay-list-win">🔊</button>
          </div>
          <div class="ru-revealed">«${task.ru}»</div>
          <div class="audio-tip">🎧 <strong>Нюанс слитной речи:</strong> ${task.audioFocus}</div>
        </div>
      `;

      const replayBtn = feedbackEl.querySelector("#btn-replay-list-win");
      if (replayBtn) {
        replayBtn.addEventListener("click", () => speech.speak(task.en));
      }
    }

    if (checkBtn) checkBtn.classList.add("hidden");
    if (nextBtn) nextBtn.classList.remove("hidden");
  }

  checkSolution() {
    const task = this.getCurrentTask();
    const expectedTokens = task.en.replace(/[.,?!]/g, "").split(" ");
    const isMatch =
      this.selectedTokens.length === expectedTokens.length &&
      this.selectedTokens.every((val, idx) => val.toLowerCase() === expectedTokens[idx].toLowerCase());

    if (isMatch) {
      this.handleCompleteSuccess(task, false);
    } else {
      sound.playError();
      state.registerError();
      const feedbackEl = this.container.querySelector("#listening-feedback");
      if (feedbackEl) {
        feedbackEl.innerHTML = `
          <div class="feedback-box feedback-error">
            <div class="feedback-title">Есть неточность на слух!</div>
            <p>Неверные слова подсвечены красным. Послушай еще раз (кнопка 🔊 или 🐢) и исправь!</p>
          </div>
        `;
      }
    }
  }
}
