// Режим «Аудио-диктант / Понимание на слух» (Listening Mode)
// Включает:
// 1. Аудио-диктант 52 разговорных фраз (B1)
// 2. Тренажёр чисел и счёта на слух (1–100, ловушки -TEEN vs -TY)
// 3. Поддержку микрофона, проверки произношения и свободную навигацию (◀, ▶, 🎲)

import { LISTENING_TASKS } from "../data/listening-tasks.js";
import { NUMBER_WORDS_1_TO_20, TENS_WORDS, TEEN_TY_PAIRS, numberToEnglish, parseSpokenNumber } from "../data/numbers-data.js";
import { sound } from "../audio.js";
import { speech, normalizeSpeechTranscript } from "../speech.js";
import { state } from "../state.js";

export class ListeningMode {
  constructor(containerEl) {
    this.container = containerEl;
    this.activeTab = "phrases"; // "phrases" | "numbers"

    // Состояние фраз
    this.currentIndex = 0;
    this.selectedTokens = [];
    this.bankTokens = [];
    this.showRu = false;
    this.isCompleted = false;

    // Состояние чисел
    this.numberSubmode = "teen_ty"; // "teen_ty" | "one_to_twenty" | "random_100" | "cheatsheet"
    this.pairIndex = 0;
    this.currentTargetNumber = 14;
    this.targetNumberWord = "fourteen";
    this.numberFeedback = null;
    this.isNumberAnswered = false;

    // Настройка автоперехода к следующему
    this.autoNext = localStorage.getItem("myenglish_auto_next") !== "false";
    this.autoNextTimer = null;
  }

  clearAutoNext() {
    if (this.autoNextTimer) {
      clearTimeout(this.autoNextTimer);
      this.autoNextTimer = null;
    }
  }

  init() {
    this.clearAutoNext();
    // Стартовая фраза выбирается случайно!
    const rand = Math.floor(Math.random() * LISTENING_TASKS.length);
    this.pairIndex = Math.floor(Math.random() * TEEN_TY_PAIRS.length);
    this.setupNewNumberTask();
    this.loadTask(rand);
  }

  // ========================================================
  // 1. АУДИО-ДИКТАНТ РАЗГОВОРНЫХ ФРАЗ
  // ========================================================

  getCurrentTask() {
    return LISTENING_TASKS[this.currentIndex];
  }

  loadTask(index) {
    this.clearAutoNext();
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
    }, 350);
  }

  render() {
    if (this.activeTab === "numbers") {
      this.renderNumbersTrainer();
      return;
    }

    const task = this.getCurrentTask();
    if (!task) return;

    this.container.innerHTML = `
      <div class="subtabs-bar" style="display: inline-flex; background: rgba(10, 16, 30, 0.85); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 9999px; padding: 5px; gap: 4px; margin-bottom: 20px;">
        <button class="subtab-btn active" data-subtab="phrases" style="background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%); color: #ffffff; border: none; border-radius: 9999px; padding: 8px 20px; font-size: 13.5px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4);">
          <span>🎧</span> Разговорные фразы (${LISTENING_TASKS.length})
        </button>
        <button class="subtab-btn" data-subtab="numbers" style="background: transparent; color: #94a3b8; border: none; border-radius: 9999px; padding: 8px 20px; font-size: 13.5px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;">
          <span>🔢</span> Тренажёр чисел (1–100 & -teen / -ty)
        </button>
      </div>

      <div class="mode-header">
        <div class="mode-badge">🎧 Аудио-диктант (На слух)</div>
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <button class="btn-auto-next ${this.autoNext ? "active" : ""}" id="btn-toggle-auto-next" title="Автопереход к следующей фразе при правильном ответе">
            ⚡ Авто: ${this.autoNext ? "ВКЛ" : "ВЫКЛ"}
          </button>
          <div class="task-counter">Фраза ${this.currentIndex + 1} из ${LISTENING_TASKS.length}</div>
          <button class="btn-random-card" id="btn-list-random" title="Случайная фраза">🎲 Случайная</button>
        </div>
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
        <div class="action-bar-spacer"></div>

        <div class="action-buttons">
          <button class="btn btn-secondary" id="btn-list-prev">◀ Назад</button>
          <button class="btn btn-secondary" id="btn-list-reset">Сбросить</button>
          <button class="btn btn-primary" id="btn-list-check">Проверить</button>
          <button class="btn btn-next ${this.isCompleted ? "btn-success-next" : ""}" id="btn-list-next">
            ${this.isCompleted ? "✨ Следующая фраза ➔" : "Далее ➔"}
          </button>
        </div>
      </div>
    `;

    this.bindPhraseEvents();
    this.updateChips();
  }

  bindPhraseEvents() {
    const task = this.getCurrentTask();

    // Переключение подвкладок
    const subtabBtns = this.container.querySelectorAll(".subtab-btn");
    subtabBtns.forEach((b) => {
      b.addEventListener("click", () => {
        sound.playClick();
        this.activeTab = b.dataset.subtab;
        this.render();
      });
    });

    // Случайная фраза
    const randBtn = this.container.querySelector("#btn-list-random");
    if (randBtn) {
      randBtn.addEventListener("click", () => {
        sound.playClick();
        const rand = Math.floor(Math.random() * LISTENING_TASKS.length);
        this.loadTask(rand);
      });
    }

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

    // Тумблер автоперехода
    const autoBtn = this.container.querySelector("#btn-toggle-auto-next");
    if (autoBtn) {
      autoBtn.addEventListener("click", () => {
        this.clearAutoNext();
        this.autoNext = !this.autoNext;
        localStorage.setItem("myenglish_auto_next", this.autoNext ? "true" : "false");
        sound.playClick();
        this.render();
      });
    }

    // Навигация
    const prevBtn = this.container.querySelector("#btn-list-prev");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        this.clearAutoNext();
        sound.playClick();
        this.loadTask(this.currentIndex - 1);
      });
    }

    const resetBtn = this.container.querySelector("#btn-list-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        this.clearAutoNext();
        sound.playClick();
        this.loadTask(this.currentIndex);
      });
    }

    const checkBtn = this.container.querySelector("#btn-list-check");
    if (checkBtn) {
      checkBtn.addEventListener("click", () => this.checkSolution());
    }

    const nextBtn = this.container.querySelector("#btn-list-next");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        this.clearAutoNext();
        sound.playClick();
        this.loadTask(this.currentIndex + 1);
      });
    }
  }

  handleMicClick() {
    const micBtn = this.container.querySelector("#btn-mic-dictate");
    const feedbackEl = this.container.querySelector("#listening-feedback");
    const task = this.getCurrentTask();

    micBtn.classList.add("mic-recording");
    micBtn.innerHTML = `<span>⏳ Подключение...</span>`;

    if (feedbackEl) {
      feedbackEl.innerHTML = `<div class="feedback-box" style="background: rgba(37,99,235,0.1); border: 1px dashed rgba(59,130,246,0.3);"><p>⏳ Инициализация микрофона... Говорите после включения красного индикатора.</p></div>`;
    }

    speech.startListening(
      (transcript) => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span>🎙️</span> Сказать вслух`;

        // Нормализуем речь (раскрываем беглые сокращения I'd -> I would и т.д.)
        const normalized = normalizeSpeechTranscript(transcript);
        const words = normalized.replace(/[.,?!]/g, "").split(/\s+/).filter(Boolean);

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
        this.evaluateTranscript(transcript);
      },
      (error) => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span>🎙️</span> Сказать вслух`;
        if (feedbackEl) {
          feedbackEl.innerHTML = `<div class="feedback-box feedback-error"><p>🎙️ ${error}</p></div>`;
        }
      },
      () => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span>🎙️</span> Сказать вслух`;
      },
      (interim) => {
        if (feedbackEl) {
          feedbackEl.innerHTML = `
            <div class="feedback-box" style="background: rgba(37,99,235,0.15); border: 1px solid rgba(59,130,246,0.4);">
              <p>🎙️ <b>Слышу в реальном времени:</b> <i>«${interim}»</i>...</p>
            </div>
          `;
        }
      },
      () => {
        micBtn.innerHTML = `<span>🔴 Слушаю, говорите...</span>`;
        if (feedbackEl) {
          feedbackEl.innerHTML = `<div class="feedback-box" style="background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3);"><p>🔴 <b>Микрофон активен!</b> Произнесите фразу на английском.</p></div>`;
        }
      }
    );
  }

  evaluateTranscript(transcript) {
    const task = this.getCurrentTask();
    const cleanRecognized = normalizeSpeechTranscript(transcript).replace(/[^a-z0-9 ]/g, "").trim();
    const cleanExpected = normalizeSpeechTranscript(task.en).replace(/[^a-z0-9 ]/g, "").trim();

    if (cleanRecognized === cleanExpected) {
      this.handleCompleteSuccess(task, true);
    } else {
      sound.playError();
      const feedbackEl = this.container.querySelector("#listening-feedback");
      if (feedbackEl) {
        const recWords = cleanRecognized.split(/\s+/).filter(Boolean);
        const expWords = cleanExpected.split(/\s+/).filter(Boolean);

        const diffHtml = recWords
          .map((word, idx) => {
            const expectedWord = expWords[idx];
            if (expectedWord && word === expectedWord) {
              return `<span style="color: #4ade80; font-weight: 600;">${word}</span>`;
            } else {
              const hint = expectedWord
                ? ` (ожидалось: <b style="color: #4ade80;">${expectedWord}</b>)`
                : "";
              return `<span style="color: #f87171; text-decoration: underline; font-weight: bold;">${word}</span>${hint}`;
            }
          })
          .join(" ");

        feedbackEl.innerHTML = `
          <div class="feedback-box feedback-error">
            <div class="feedback-title">🎙️ Распознано: «${diffHtml}»</div>
            <p>Близко, но не совсем совпало. Обратите внимание на выделенные слова или нажмите <b>«Проверить»</b> / соберите кирпичиками!</p>
          </div>
        `;
      }
    }
  }

  updateChips() {
    const assembledEl = this.container.querySelector("#assembled-line");
    const bankEl = this.container.querySelector("#token-bank");
    const statusBadge = this.container.querySelector("#list-status-badge");
    const nextBtn = this.container.querySelector("#btn-list-next");
    const task = this.getCurrentTask();
    if (!assembledEl || !bankEl || !task) return;

    const expectedTokens = task.en.replace(/[.,?!]/g, "").split(" ");

    // 1. Отрисовка собранных слов с мгновенной подсветкой
    if (this.selectedTokens.length === 0) {
      assembledEl.innerHTML = `<div class="empty-placeholder">Слушай аудио и кликай по кирпичикам или надиктуй вслух...</div>`;
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
              <button class="word-chip chip-correct chip-assembled" data-idx="${idx}" title="Кликни, чтобы вернуть">
                ✓ ${token} <span class="chip-remove">✕</span>
              </button>
            `;
          } else {
            hasError = true;
            return `
              <button class="word-chip chip-wrong chip-assembled" data-idx="${idx}" title="Кликни, чтобы вернуть">
                ✗ ${token} <span class="chip-remove">✕</span>
              </button>
            `;
          }
        })
        .join("");

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

    speech.speak(task.en);

    const feedbackEl = this.container.querySelector("#listening-feedback");
    const nextBtn = this.container.querySelector("#btn-list-next");
    const statusBadge = this.container.querySelector("#list-status-badge");

    if (statusBadge) {
      statusBadge.innerHTML = `<span class="badge-status-complete">✨ Вся фраза собрана идеально!</span>`;
    }

    if (nextBtn) {
      nextBtn.classList.add("btn-success-next");
      nextBtn.innerHTML = `✨ Следующая фраза ➔`;
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

    // Автопереход к следующей фразе, если включён тумблер
    if (this.autoNext) {
      this.clearAutoNext();
      this.autoNextTimer = setTimeout(() => {
        this.loadTask(this.currentIndex + 1);
      }, 1500);
    }
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

  // ========================================================
  // 2. ТРЕНАЖЁР ЧИСЕЛ И СЧЁТА НА СЛУХ (1–100 & -TEEN/-TY)
  // ========================================================

  setupNewNumberTask() {
    this.isNumberAnswered = false;
    this.numberFeedback = null;

    if (this.numberSubmode === "teen_ty") {
      const pair = TEEN_TY_PAIRS[this.pairIndex % TEEN_TY_PAIRS.length];
      // Случайно выбираем, озвучивать ли число на -teen или десяток на -ty
      const pickTeen = Math.random() < 0.5;
      this.currentTargetNumber = pickTeen ? pair.teenNum : pair.tyNum;
      this.targetNumberWord = pickTeen ? pair.teenWord : pair.tyWord;
    } else if (this.numberSubmode === "one_to_twenty") {
      this.currentTargetNumber = Math.floor(Math.random() * 20) + 1;
      this.targetNumberWord = numberToEnglish(this.currentTargetNumber);
    } else if (this.numberSubmode === "random_100") {
      this.currentTargetNumber = Math.floor(Math.random() * 100) + 1;
      this.targetNumberWord = numberToEnglish(this.currentTargetNumber);
    }
  }

  renderNumbersTrainer() {
    const pair = TEEN_TY_PAIRS[this.pairIndex % TEEN_TY_PAIRS.length];

    this.container.innerHTML = `
      <div class="subtabs-bar" style="display: inline-flex; background: rgba(10, 16, 30, 0.85); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 9999px; padding: 5px; gap: 4px; margin-bottom: 20px;">
        <button class="subtab-btn" data-subtab="phrases" style="background: transparent; color: #94a3b8; border: none; border-radius: 9999px; padding: 8px 20px; font-size: 13.5px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;">
          <span>🎧</span> Разговорные фразы (${LISTENING_TASKS.length})
        </button>
        <button class="subtab-btn active" data-subtab="numbers" style="background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%); color: #ffffff; border: none; border-radius: 9999px; padding: 8px 20px; font-size: 13.5px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4);">
          <span>🔢</span> Тренажёр чисел (1–100 & -teen / -ty)
        </button>
      </div>

      <div class="mode-header">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="mode-badge">🔢 Тренажёр чисел на слух</div>
          <button class="btn-auto-next ${this.autoNext ? "active" : ""}" id="btn-toggle-auto-next-num" title="Автопереход к следующему числу при правильном ответе">
            ⚡ Авто: ${this.autoNext ? "ВКЛ" : "ВЫКЛ"}
          </button>
        </div>
        <div class="category-filters-row">
          <button class="filter-btn ${this.numberSubmode === "teen_ty" ? "active" : ""}" data-num-sub="teen_ty">
            ⚡ Ловушки -teen vs -ty (13/30 — 19/90)
          </button>
          <button class="filter-btn ${this.numberSubmode === "one_to_twenty" ? "active" : ""}" data-num-sub="one_to_twenty">
            🎯 Базовые 1–20
          </button>
          <button class="filter-btn ${this.numberSubmode === "random_100" ? "active" : ""}" data-num-sub="random_100">
            🎲 Любое число 1–100
          </button>
          <button class="filter-btn ${this.numberSubmode === "cheatsheet" ? "active" : ""}" data-num-sub="cheatsheet">
            📖 Шпаргалка & Правило
          </button>
        </div>
      </div>

      <div class="task-card">
        ${
          this.numberSubmode === "cheatsheet"
            ? this.renderNumberCheatsheet()
            : this.renderNumberExerciseView(pair)
        }
      </div>
    `;

    this.bindNumberEvents();
  }

  renderNumberExerciseView(pair) {
    return `
      <div class="number-big-display">
        <div style="font-size: 12.5px; text-transform: uppercase; letter-spacing: 2px; color: #94a3b8; margin-bottom: 8px; font-weight: 700;">
          🎧 Слушай диктора и определи число на слух:
        </div>
        <div class="number-digit" id="num-secret-display">
          ${this.isNumberAnswered ? this.currentTargetNumber : "🎧 ???"}
        </div>
        <div class="number-word" id="num-word-display" style="color: #f8fafc; font-weight: 700;">
          ${this.isNumberAnswered ? this.targetNumberWord : "«Нажмите 🔊 или назовите число вслух»"}
        </div>
        <div class="number-phonetic" id="num-phonetic-display" style="color: #cbd5e1; max-width: 500px; margin: 8px auto 0;">
          ${this.isNumberAnswered && this.numberSubmode === "teen_ty" ? pair.tip : ""}
        </div>
      </div>

      <div class="listening-control-box">
        <div class="audio-buttons-row">
          <button class="btn-audio-play" id="btn-play-number">
            <span class="audio-icon">🔊</span> Слушать число
          </button>
          <button class="btn-audio-slow" id="btn-play-number-slow">
            <span class="audio-icon">🐢</span> Медленно
          </button>
          <button class="btn-audio-mic" id="btn-mic-number">
            <span class="audio-icon">🎙️</span> Сказать число вслух
          </button>
        </div>
      </div>

      ${
        this.numberSubmode === "teen_ty"
          ? `
            <div style="text-align: center; font-size: 14px; color: #94a3b8; margin: 16px 0 8px; font-weight: 600;">
              Какое число прозвучало? Выберите карточку или назовите в микрофон:
            </div>
            <div class="number-choice-grid">
              <button class="btn-number-choice" data-choice-val="${pair.teenNum}" style="background: linear-gradient(160deg, #152238 0%, #0c1424 100%); color: #f8fafc; border: 1.5px solid rgba(56, 189, 248, 0.35); border-radius: 18px; padding: 22px 18px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
                <div style="font-size: 11px; text-transform: uppercase; font-weight: 800; letter-spacing: 0.8px; color: #38bdf8; background: rgba(56,189,248,0.12); padding: 2px 10px; border-radius: 9999px; border: 1px solid rgba(56,189,248,0.25);">🔔 Ударный -ТИИН</div>
                <span style="font-size: 34px; font-weight: 800; color: #38bdf8; text-shadow: 0 0 15px rgba(56,189,248,0.45); line-height: 1.1;">${pair.teenNum}</span>
                <span style="font-size: 18px; font-weight: 700; color: #f8fafc; letter-spacing: 0.5px;">${pair.teenStress}</span>
                <span style="font-size: 13px; color: #94a3b8;">${pair.teenPhonetic}</span>
              </button>
              <button class="btn-number-choice" data-choice-val="${pair.tyNum}" style="background: linear-gradient(160deg, #241d1a 0%, #151110 100%); color: #f8fafc; border: 1.5px solid rgba(245, 158, 11, 0.35); border-radius: 18px; padding: 22px 18px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
                <div style="font-size: 11px; text-transform: uppercase; font-weight: 800; letter-spacing: 0.8px; color: #fbbf24; background: rgba(245,158,11,0.12); padding: 2px 10px; border-radius: 9999px; border: 1px solid rgba(245,158,11,0.25);">⚡ Ударная ПЕРВАЯ</div>
                <span style="font-size: 34px; font-weight: 800; color: #f59e0b; text-shadow: 0 0 15px rgba(245,158,11,0.45); line-height: 1.1;">${pair.tyNum}</span>
                <span style="font-size: 18px; font-weight: 700; color: #f8fafc; letter-spacing: 0.5px;">${pair.tyStress}</span>
                <span style="font-size: 13px; color: #94a3b8;">${pair.tyPhonetic}</span>
              </button>
            </div>
          `
          : `
            <div style="text-align: center; margin: 18px 0;">
              <div style="font-size: 14px; color: #94a3b8; margin-bottom: 10px; font-weight: 600;">
                Введите число цифрами или назовите по-английски в микрофон:
              </div>
              <div class="number-input-row">
                <input type="number" class="number-input-field" id="num-direct-input" placeholder="№" min="1" max="100" />
                <button class="btn btn-primary" id="btn-num-submit">Проверить</button>
              </div>
            </div>
          `
      }

      <div class="feedback-area" id="number-feedback">
        ${this.numberFeedback || ""}
      </div>
      <div class="action-bar-spacer"></div>

      <div class="action-buttons">
        <button class="btn btn-secondary" id="btn-num-prev">◀ Предыдущее</button>
        <button class="btn btn-secondary" id="btn-num-random">🎲 Случайное</button>
        <button class="btn btn-next ${this.isNumberAnswered ? "btn-success-next" : ""}" id="btn-num-next">
          ${this.isNumberAnswered ? "✨ Следующее число ➔" : "Следующее ➔"}
        </button>
      </div>
    `;
  }

  renderNumberCheatsheet() {
    return `
      <div style="padding: 10px 0;">
        <div style="background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 12px; padding: 18px; margin-bottom: 20px;">
          <h3 style="color: #38bdf8; margin: 0 0 10px; font-size: 18px;">💡 Главное правило: -TEEN vs -TY (Ударение решает всё!)</h3>
          <p style="margin: 0 0 8px; line-height: 1.5; color: #e2e8f0;">
            В английском языке разница между <b>13–19</b> и <b>30–90</b> определяется <b>УДАРЕНИЕМ</b>:
          </p>
          <ul style="margin: 0 0 10px 20px; line-height: 1.6; color: #cbd5e1;">
            <li><b>13–19 (-TEEN):</b> Ударение ВСЕГДА падает на долгий конец <b>-TEEN</b>: <code>thir-TEEN</code>, <code>four-TEEN</code>, <code>fif-TEEN</code>. Звук [ии] тянется!</li>
            <li><b>20–90 (-TY):</b> Ударение ВСЕГДА падает на <b>ПЕРВЫЙ СЛОГ</b>: <code>THIR-ty</code>, <code>FOR-ty</code>, <code>FIF-ty</code>. Окончание короткое и глухое [ти].</li>
            <li><b>Ловушка орфографии:</b> Число <b>40 (forty)</b> пишется <b>БЕЗ буквы «u»</b>, в отличие от 4 (four) и 14 (fourteen)!</li>
          </ul>
        </div>

        <h4 style="color: #f8fafc; margin: 16px 0 8px;">🔢 Нажмите на любое число, чтобы послушать правильное произношение:</h4>
        
        <div style="font-weight: bold; color: #38bdf8; margin-top: 12px;">Базовые числа (1–20):</div>
        <div class="number-table-grid">
          ${Object.entries(NUMBER_WORDS_1_TO_20)
            .map(
              ([num, data]) => `
            <div class="number-table-chip" data-num-val="${num}">
              <b>${num}</b> <span>${data.word}</span> 🔊
            </div>
          `
            )
            .join("")}
        </div>

        <div style="font-weight: bold; color: #f59e0b; margin-top: 18px;">Десятки (20–100):</div>
        <div class="number-table-grid">
          ${Object.entries(TENS_WORDS)
            .map(
              ([num, data]) => `
            <div class="number-table-chip" data-num-val="${num}">
              <b>${num}</b> <span>${data.word}</span> 🔊
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  bindNumberEvents() {
    // Переключение подвкладок
    const subtabBtns = this.container.querySelectorAll(".subtab-btn");
    subtabBtns.forEach((b) => {
      b.addEventListener("click", () => {
        sound.playClick();
        this.activeTab = b.dataset.subtab;
        this.render();
      });
    });

    // Фильтры режимов чисел
    const numSubBtns = this.container.querySelectorAll("[data-num-sub]");
    numSubBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        sound.playClick();
        this.numberSubmode = btn.dataset.numSub;
        this.setupNewNumberTask();
        this.render();
      });
    });

    if (this.numberSubmode === "cheatsheet") {
      // Клик по числам в шпаргалке для озвучки
      this.container.querySelectorAll(".number-table-chip").forEach((chip) => {
        chip.addEventListener("click", () => {
          const val = parseInt(chip.dataset.numVal, 10);
          const enWord = numberToEnglish(val);
          sound.playClick();
          speech.speak(enWord);
        });
      });
      return;
    }

    // Озвучка числа
    const playNorm = this.container.querySelector("#btn-play-number");
    if (playNorm) {
      playNorm.addEventListener("click", () => {
        sound.playClick();
        speech.speak(this.targetNumberWord, 1.0);
      });
    }

    const playSlow = this.container.querySelector("#btn-play-number-slow");
    if (playSlow) {
      playSlow.addEventListener("click", () => {
        sound.playClick();
        speech.speakSlow(this.targetNumberWord);
      });
    }

    // Авто-озвучка при первой загрузке карточки
    setTimeout(() => {
      speech.speak(this.targetNumberWord, 1.0);
    }, 300);

    // Микрофон для тренировки произношения числа
    const micBtn = this.container.querySelector("#btn-mic-number");
    if (micBtn) {
      micBtn.addEventListener("click", () => this.handleNumberMic());
    }

    // Кнопки выбора (в режиме -teen vs -ty)
    const choiceBtns = this.container.querySelectorAll(".btn-number-choice");
    choiceBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (this.isNumberAnswered) return;
        const val = parseInt(btn.dataset.choiceVal, 10);
        this.handleNumberAnswer(val, btn);
      });
    });

    // Прямой ввод числа цифрами
    const submitBtn = this.container.querySelector("#btn-num-submit");
    const inputEl = this.container.querySelector("#num-direct-input");
    if (submitBtn && inputEl) {
      const handleDirect = () => {
        if (this.isNumberAnswered) return;
        const val = parseInt(inputEl.value, 10);
        if (!isNaN(val)) {
          this.handleNumberAnswer(val);
        }
      };
      submitBtn.addEventListener("click", handleDirect);
      inputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleDirect();
      });
    }

    // Тумблер автоперехода по числам
    const autoNumBtn = this.container.querySelector("#btn-toggle-auto-next-num");
    if (autoNumBtn) {
      autoNumBtn.addEventListener("click", () => {
        this.clearAutoNext();
        this.autoNext = !this.autoNext;
        localStorage.setItem("myenglish_auto_next", this.autoNext ? "true" : "false");
        sound.playClick();
        this.render();
      });
    }

    // Навигация по числам
    const nextBtn = this.container.querySelector("#btn-num-next");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        this.clearAutoNext();
        sound.playClick();
        this.pairIndex++;
        this.setupNewNumberTask();
        this.render();
      });
    }

    const prevBtn = this.container.querySelector("#btn-num-prev");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        this.clearAutoNext();
        sound.playClick();
        this.pairIndex = (this.pairIndex - 1 + TEEN_TY_PAIRS.length) % TEEN_TY_PAIRS.length;
        this.setupNewNumberTask();
        this.render();
      });
    }

    const randBtn = this.container.querySelector("#btn-num-random");
    if (randBtn) {
      randBtn.addEventListener("click", () => {
        this.clearAutoNext();
        sound.playClick();
        this.pairIndex = Math.floor(Math.random() * TEEN_TY_PAIRS.length);
        this.setupNewNumberTask();
        this.render();
      });
    }
  }

  handleNumberMic() {
    const micBtn = this.container.querySelector("#btn-mic-number");
    const feedbackEl = this.container.querySelector("#number-feedback");
    if (!micBtn) return;

    micBtn.classList.add("mic-recording");
    micBtn.innerHTML = `<span>⏳ Подключение...</span>`;

    if (feedbackEl) {
      feedbackEl.innerHTML = `<div class="feedback-box" style="background: rgba(37,99,235,0.1); border: 1px dashed rgba(59,130,246,0.3);"><p>⏳ Включение микрофона... Назовите число по-английски.</p></div>`;
    }

    speech.startListening(
      (transcript) => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span>🎙️</span> Сказать число вслух`;

        const parsed = parseSpokenNumber(transcript);
        if (parsed !== null) {
          this.handleNumberAnswer(parsed, null, transcript);
        } else {
          sound.playError();
          if (feedbackEl) {
            feedbackEl.innerHTML = `
              <div class="feedback-box feedback-error">
                <div class="feedback-title">🎙️ Распознано: «${transcript}»</div>
                <p>Число не распознано. Произнесите число чётче, например: <b>«${this.targetNumberWord}»</b>.</p>
              </div>
            `;
          }
        }
      },
      (err) => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span>🎙️</span> Сказать число вслух`;
        if (feedbackEl) {
          feedbackEl.innerHTML = `<div class="feedback-box feedback-error"><p>🎙️ ${err}</p></div>`;
        }
      },
      () => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span>🎙️</span> Сказать число вслух`;
      },
      (interim) => {
        if (feedbackEl) {
          feedbackEl.innerHTML = `
            <div class="feedback-box" style="background: rgba(37,99,235,0.15); border: 1px solid rgba(59,130,246,0.4);">
              <p>🎙️ <b>Слышу в реальном времени:</b> <i>«${interim}»</i>...</p>
            </div>
          `;
        }
      },
      () => {
        micBtn.innerHTML = `<span>🔴 Слушаю, говорите...</span>`;
        if (feedbackEl) {
          feedbackEl.innerHTML = `<div class="feedback-box" style="background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3);"><p>🔴 <b>Говорите!</b> Произнесите число по-английски.</p></div>`;
        }
      }
    );
  }

  handleNumberAnswer(chosenVal, clickedBtn = null, spokenRaw = null) {
    this.isNumberAnswered = true;
    const isCorrect = chosenVal === this.currentTargetNumber;
    const pair = TEEN_TY_PAIRS[this.pairIndex % TEEN_TY_PAIRS.length];

    if (clickedBtn) {
      clickedBtn.classList.add(isCorrect ? "choice-correct" : "choice-wrong");
    }

    const secretEl = this.container.querySelector("#num-secret-display");
    const wordEl = this.container.querySelector("#num-word-display");
    const phoneticEl = this.container.querySelector("#num-phonetic-display");
    const nextBtn = this.container.querySelector("#btn-num-next");
    const feedbackEl = this.container.querySelector("#number-feedback");

    if (secretEl) secretEl.textContent = this.currentTargetNumber;
    if (wordEl) wordEl.textContent = this.targetNumberWord;
    if (phoneticEl && this.numberSubmode === "teen_ty") phoneticEl.textContent = pair.tip;

    if (nextBtn) {
      nextBtn.classList.add("btn-success-next");
      nextBtn.innerHTML = `✨ Следующее число ➔`;
    }

    if (isCorrect) {
      sound.playSuccess();
      state.addXP(spokenRaw ? 30 : 20);

      const msg = spokenRaw
        ? `🎯 Идеальное произношение! Вы сказали «${spokenRaw}» (${chosenVal}), ударение поставлено безупречно!`
        : `🎯 В яблочко! Диктор произнёс именно ${this.targetNumberWord} (${this.currentTargetNumber}).`;

      this.numberFeedback = `
        <div class="feedback-box feedback-success">
          <div class="feedback-title">${msg}</div>
          <div class="audio-tip">💡 <strong>Фонетический акцент:</strong> ${
            this.numberSubmode === "teen_ty"
              ? pair.tip
              : `Число ${this.currentTargetNumber} читается как «${this.targetNumberWord}».`
          }</div>
        </div>
      `;

      // Автопереход к следующему числу, если включён тумблер
      if (this.autoNext) {
        this.clearAutoNext();
        this.autoNextTimer = setTimeout(() => {
          this.pairIndex++;
          this.setupNewNumberTask();
          this.render();
        }, 1250);
      }
    } else {
      sound.playError();
      state.registerError();

      const chosenWord = numberToEnglish(chosenVal);
      this.numberFeedback = `
        <div class="feedback-box feedback-error">
          <div class="feedback-title">⚠️ Не совсем: вы выбрали ${chosenWord} (${chosenVal}), а звучало ${this.targetNumberWord} (${this.currentTargetNumber})!</div>
          <p>${
            this.numberSubmode === "teen_ty"
              ? `<b>В чём разница:</b> ${pair.tip}`
              : `Обратите внимание на звучание «${this.targetNumberWord}». Нажмите 🔊 чтобы послушать ещё раз.`
          }</p>
        </div>
      `;
    }

    if (feedbackEl) {
      feedbackEl.innerHTML = this.numberFeedback;
    }
  }
}
