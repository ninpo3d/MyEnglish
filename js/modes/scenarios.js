// Режим «Ролевые диалоги B1» (Roleplay Scenarios & Live AI Partner)
// 1. Сюжетные сценарии (13 готовых тренажеров)
// 2. Живой AI-собеседник (LM Studio)
// 3. Интерактивный перевод слов по наведению / клику (Dictionary)
// 4. Мягкий доброжелательный AI-наставник речи (Coach Review)

import { ROLEPLAY_SCENARIOS } from "../data/scenarios-tasks.js";
import { sound } from "../audio.js";
import { speech } from "../speech.js";
import { state } from "../state.js";
import { AI_PERSONAS, llmClient } from "../llm-client.js";
import { dictionary } from "../dictionary.js";

export class ScenariosMode {
  constructor(containerEl) {
    this.container = containerEl;

    // Режим подвкладки: "static" (готовые сценарии) или "ai" (живой LM Studio)
    this.activeSubView = localStorage.getItem("my_english_scenarios_subview") || "static";

    // Состояние готовых сценариев
    this.scenarioIndex = 0;
    this.stepIndex = 0;
    this.staticHistory = [];
    this.isAnswering = false;
    this.currentOptions = [];
    this.lastRenderedStepKey = null;
    const savedEcho = localStorage.getItem("my_english_echo_reply");
    this.echoUserReply = savedEcho !== null ? savedEcho === "true" : false;

    // Состояние живого AI-диалога
    this.aiPersonaIndex = 0;
    this.aiMessages = [];
    this.aiIsGenerating = false;
    this.aiSettingsOpen = false;
    this.aiConnection = { checked: false, ok: false, error: null, model: "" };
  }

  init() {
    if (this.activeSubView === "ai") {
      this.initAIMode();
    } else {
      this.initStaticMode();
    }
  }

  initStaticMode() {
    this.scenarioIndex = 0;
    this.stepIndex = 0;
    this.staticHistory = [];
    this.isAnswering = false;
    this.lastRenderedStepKey = null;
    this.render();
    this.speakCurrentNpc();
  }

  async initAIMode() {
    const persona = AI_PERSONAS[this.aiPersonaIndex];
    if (this.aiMessages.length === 0) {
      this.aiMessages = [
        {
          role: "assistant",
          text: persona.greeting,
          coachTip: null,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ];
    }
    this.render();

    // Автоматическая проверка связи с локальным сервером LM Studio
    this.checkLLMStatus();

    // Озвучиваем приветствие если автоозвучка включена
    if (llmClient.autoSpeak && this.aiMessages.length === 1) {
      setTimeout(() => {
        speech.speakAs(persona.greeting, persona.name);
      }, 400);
    }
  }

  async checkLLMStatus() {
    const res = await llmClient.checkConnection();
    this.aiConnection = {
      checked: true,
      ok: res.ok,
      error: res.error || null,
      model: res.currentModel || ""
    };
    this.updateStatusBadge();
  }

  updateStatusBadge() {
    const badge = this.container.querySelector("#llm-status-badge");
    if (!badge) return;

    if (!this.aiConnection.checked) {
      badge.className = "llm-status-pill status-checking";
      badge.innerHTML = `<span class="dot"></span> Подключение...`;
    } else if (this.aiConnection.ok) {
      badge.className = "llm-status-pill status-online";
      badge.title = `LM Studio активен (${llmClient.endpoint})`;
      const shortCoach = (llmClient.coachModel || "Gemma").split("-")[0];
      badge.innerHTML = `<span class="dot"></span> 2x AI: <strong>${this.aiConnection.model}</strong> + <strong>${shortCoach}</strong>`;
    } else {
      badge.className = "llm-status-pill status-offline";
      badge.title = this.aiConnection.error || "Не подключен";
      badge.innerHTML = `<span class="dot"></span> LM Studio: Офлайн (клик для настройки)`;
    }
  }

  switchSubView(view) {
    this.activeSubView = view;
    localStorage.setItem("my_english_scenarios_subview", view);
    sound.playClick();
    this.init();
  }

  render() {
    this.container.innerHTML = `
      <!-- ВЕРХНИЙ ПЕРЕКЛЮЧАТЕЛЬ ПОДРЕЖИМОВ -->
      <div class="scenarios-main-nav">
        <button class="sc-main-tab-btn ${this.activeSubView === "static" ? "active" : ""}" id="btn-tab-static">
          <span>📚</span> Сюжетные сценарии (${ROLEPLAY_SCENARIOS.length})
        </button>
        <button class="sc-main-tab-btn ${this.activeSubView === "ai" ? "active" : ""}" id="btn-tab-ai">
          <span>🤖</span> Живой AI-собеседник (LM Studio)
          <span class="ai-spark-tag">LIVE</span>
        </button>
      </div>

      <div id="subview-container">
        ${this.activeSubView === "ai" ? this.renderAIContent() : this.renderStaticContent()}
      </div>

      ${this.aiSettingsOpen ? this.renderSettingsModal() : ""}
    `;

    this.bindCommonEvents();
    if (this.activeSubView === "ai") {
      this.bindAIEvents();
      if (this.aiSettingsOpen) {
        this.bindSettingsEvents();
      }
      this.updateStatusBadge();
    } else {
      this.bindStaticEvents();
    }
  }

  bindCommonEvents() {
    const btnStatic = this.container.querySelector("#btn-tab-static");
    const btnAI = this.container.querySelector("#btn-tab-ai");

    if (btnStatic) btnStatic.addEventListener("click", () => this.switchSubView("static"));
    if (btnAI) btnAI.addEventListener("click", () => this.switchSubView("ai"));
  }

  // ==========================================
  // 1. СТАТИЧЕСКИЕ ГОТОВЫЕ СЦЕНАРИИ
  // ==========================================

  getCurrentScenario() {
    return ROLEPLAY_SCENARIOS[this.scenarioIndex];
  }

  getCurrentStep() {
    const sc = this.getCurrentScenario();
    return sc ? sc.steps[this.stepIndex] : null;
  }

  speakCurrentNpc() {
    const sc = this.getCurrentScenario();
    const step = this.getCurrentStep();
    if (sc && step) {
      setTimeout(() => {
        speech.speakAs(step.npcSay, sc.character);
      }, 350);
    }
  }

  renderStaticContent() {
    const sc = this.getCurrentScenario();
    const step = this.getCurrentStep();
    if (!sc) return "";

    this.isAnswering = false;

    // Перемешиваем варианты ответов при каждом новом шаге
    const stepKey = `${this.scenarioIndex}_${this.stepIndex}`;
    if (step && this.lastRenderedStepKey !== stepKey) {
      this.lastRenderedStepKey = stepKey;
      this.currentOptions = step.options
        .map((opt) => ({ ...opt }))
        .sort(() => Math.random() - 0.5);
    }

    return `
      <div class="mode-header">
        <div class="mode-badge">🎭 Ролевой диалог B1</div>
        <div class="scenario-selector">
          ${ROLEPLAY_SCENARIOS.map(
            (s, idx) => `
            <button class="sc-tab-btn ${idx === this.scenarioIndex ? "sc-tab-active" : ""}" data-sc-idx="${idx}">
              ${s.title}
            </button>
          `
          ).join("")}
        </div>
      </div>

      <div class="task-card scenario-card">
        <div class="scenario-info-bar">
          <div class="sc-char-badge">👤 Собеседник: <strong>${sc.character}</strong></div>
          <div class="sc-desc">${sc.description}</div>
          <div class="sc-info-controls">
            <span class="sc-progress">Реплика ${this.stepIndex + 1} из ${sc.steps.length}</span>
            <label class="echo-toggle-wrap" title="Показывать перевод слов при наведении курсора">
              <input type="checkbox" id="chk-static-dict" ${dictionary.enabled ? "checked" : ""}>
              <span class="echo-label-text">🔤 Словарь</span>
            </label>
            <label class="echo-toggle-wrap" title="Если включено, робот будет зачитывать вслух ваш ответ">
              <input type="checkbox" id="chk-echo-reply" ${this.echoUserReply ? "checked" : ""}>
              <span class="echo-label-text">🔊 Дублировать ответ</span>
            </label>
          </div>
        </div>

        <!-- ДИАЛОГОВЫЙ ЧАТ -->
        <div class="chat-dialog-box" id="chat-box">
          ${this.staticHistory
            .map(
              (msg) => `
            <div class="chat-bubble ${msg.sender === "npc" ? "bubble-npc" : "bubble-user"}">
              <div class="bubble-sender">${msg.sender === "npc" ? sc.character : "Вы"}</div>
              <div class="bubble-text">${msg.sender === "npc" ? dictionary.wrapWords(msg.text) : msg.text}</div>
            </div>
          `
            )
            .join("")}

          <!-- ТЕКУЩАЯ РЕПЛИКА СОБЕСЕДНИКА -->
          ${
            step
              ? `
            <div class="chat-bubble bubble-npc bubble-current">
              <div class="bubble-sender">${sc.character} <button class="btn-voice-mini" id="btn-replay-npc" title="Послушать голос персонажа">🔊</button></div>
              <div class="bubble-text">«${dictionary.wrapWords(step.npcSay)}»</div>
              <div class="bubble-ru">(${step.npcRu})</div>
            </div>
          `
              : ""
          }
        </div>

        ${
          step
            ? `
          <div class="user-reply-area">
            <div class="user-mission-box">
              <div class="mission-top-row">
                <span class="mission-tag">ВАША РЕПЛИКА:</span>
                <button class="btn-sc-mic" id="btn-sc-mic" title="Сказать фразу в микрофон">
                  <span class="mic-icon">🎙️</span> Ответить голосом
                </button>
              </div>
              <div class="mission-ru-text">${step.userTaskRu}</div>
              <div class="mission-hint">💡 <em>${step.hint}</em></div>
            </div>

            <div class="reply-options-list" id="reply-options-list">
              ${this.currentOptions
                .map(
                  (opt, idx) => `
                <button class="reply-opt-btn" data-opt-idx="${idx}">
                  <span class="opt-indicator"></span>
                  <span class="opt-body">${opt.text}</span>
                </button>
              `
                )
                .join("")}
            </div>
          </div>
        `
            : `
          <div class="scenario-completed-box">
            <div class="completed-badge">🎉 ДИАЛОГ УСПЕШНО ЗАВЕРШЁН!</div>
            <p>Вы уверенно провели разговор по всем правилам грамматики B1.</p>
            <button class="btn btn-primary" id="btn-next-scenario">Перейти к следующему диалогу ➔</button>
          </div>
        `
        }

        <div class="feedback-area" id="scenario-feedback"></div>
      </div>
    `;
  }

  bindStaticEvents() {
    const sc = this.getCurrentScenario();

    // Подключаем словарь наведения к окну чата
    const chatBox = this.container.querySelector("#chat-box");
    if (chatBox) {
      dictionary.bindContainer(chatBox);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    this.container.querySelectorAll(".sc-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.scenarioIndex = parseInt(btn.dataset.scIdx, 10);
        this.stepIndex = 0;
        this.staticHistory = [];
        this.lastRenderedStepKey = null;
        sound.playClick();
        this.render();
        this.speakCurrentNpc();
      });
    });

    const replayBtn = this.container.querySelector("#btn-replay-npc");
    if (replayBtn) {
      replayBtn.addEventListener("click", () => {
        const step = this.getCurrentStep();
        if (step && sc) speech.speakAs(step.npcSay, sc.character);
      });
    }

    const dictCheckbox = this.container.querySelector("#chk-static-dict");
    if (dictCheckbox) {
      dictCheckbox.addEventListener("change", (e) => {
        dictionary.enabled = e.target.checked;
        localStorage.setItem("my_english_dict_enabled", dictionary.enabled ? "true" : "false");
        sound.playClick();
      });
    }

    const echoCheckbox = this.container.querySelector("#chk-echo-reply");
    if (echoCheckbox) {
      echoCheckbox.addEventListener("change", (e) => {
        this.echoUserReply = e.target.checked;
        localStorage.setItem("my_english_echo_reply", this.echoUserReply ? "true" : "false");
        sound.playClick();
      });
    }

    const micBtn = this.container.querySelector("#btn-sc-mic");
    if (micBtn) {
      micBtn.addEventListener("click", () => this.handleStaticMicReply());
    }

    this.container.querySelectorAll(".reply-opt-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (this.isAnswering) return;
        const idx = parseInt(btn.dataset.optIdx, 10);
        this.handleStaticReply(idx, btn);
      });
    });

    const nextScBtn = this.container.querySelector("#btn-next-scenario");
    if (nextScBtn) {
      nextScBtn.addEventListener("click", () => {
        this.scenarioIndex = (this.scenarioIndex + 1) % ROLEPLAY_SCENARIOS.length;
        this.stepIndex = 0;
        this.staticHistory = [];
        this.lastRenderedStepKey = null;
        sound.playClick();
        this.render();
        this.speakCurrentNpc();
      });
    }
  }

  handleStaticMicReply() {
    const micBtn = this.container.querySelector("#btn-sc-mic");
    const feedbackEl = this.container.querySelector("#scenario-feedback");
    const step = this.getCurrentStep();
    if (!step) return;

    micBtn.classList.add("mic-recording");
    micBtn.innerHTML = `<span>🔴 Слушаю вас...</span>`;

    speech.startListening(
      (transcript) => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span class="mic-icon">🎙️</span> Ответить голосом`;

        const cleanSaid = transcript.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
        const correctOptIdx = this.currentOptions.findIndex((o) => o.correct);
        const correctOpt = this.currentOptions[correctOptIdx];
        const cleanExpected = correctOpt.text.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();

        const btn = this.container.querySelector(`.reply-opt-btn[data-opt-idx="${correctOptIdx}"]`);

        if (cleanSaid === cleanExpected || cleanSaid.includes(cleanExpected.slice(0, 15))) {
          if (btn) this.handleStaticReply(correctOptIdx, btn, true);
        } else {
          sound.playError();
          feedbackEl.innerHTML = `
            <div class="feedback-box feedback-error">
              <div class="feedback-title">🎙️ Вы сказали: «${transcript}»</div>
              <p>Собеседник ожидал: <strong>${correctOpt.text}</strong>. Попробуйте еще раз или выберите вариант кликом!</p>
            </div>
          `;
        }
      },
      (error) => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span class="mic-icon">🎙️</span> Ответить голосом`;
        if (feedbackEl) {
          feedbackEl.innerHTML = `<div class="feedback-box feedback-error"><p>🎙️ ${error}</p></div>`;
        }
      },
      () => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span class="mic-icon">🎙️</span> Ответить голосом`;
      }
    );
  }

  handleStaticReply(optIdx, btn, fromMic = false) {
    const step = this.getCurrentStep();
    const chosen = this.currentOptions[optIdx];
    const feedbackEl = this.container.querySelector("#scenario-feedback");

    if (chosen.correct) {
      this.isAnswering = true;
      sound.playSuccess();
      state.addXP(fromMic ? 40 : 30);

      btn.classList.add("reply-correct");
      const indicator = btn.querySelector(".opt-indicator");
      if (indicator) indicator.innerHTML = "✓";

      this.container.querySelectorAll(".reply-opt-btn").forEach((b) => {
        if (b !== btn) b.classList.add("reply-disabled");
      });

      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-success">
          <div class="feedback-title">🎯 Точный ответ! Собеседник понял вас с полуслова:</div>
          <p>«${chosen.text}»</p>
        </div>
      `;

      if (this.echoUserReply) {
        speech.speak(chosen.text, 0.95, () => {
          setTimeout(() => this.advanceStaticDialogue(step, chosen), 300);
        });
      } else {
        setTimeout(() => this.advanceStaticDialogue(step, chosen), 450);
      }
    } else {
      sound.playError();
      state.registerError();
      btn.classList.add("reply-wrong");
      const indicator = btn.querySelector(".opt-indicator");
      if (indicator) indicator.innerHTML = "✕";

      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-error">
          <div class="feedback-title">Собеседник почувствовал ошибку в грамматике!</div>
          <p>💡 Подсказка: ${step.hint}</p>
        </div>
      `;
    }
  }

  advanceStaticDialogue(step, chosen) {
    this.staticHistory.push({ sender: "npc", text: step.npcSay });
    this.staticHistory.push({ sender: "user", text: chosen.text });
    this.stepIndex += 1;
    this.render();
    this.speakCurrentNpc();
  }

  // ==========================================
  // 2. ЖИВОЙ ИНТЕРАКТИВНЫЙ AI-РЕЖИМ (LM STUDIO)
  // ==========================================

  renderAIContent() {
    const currentPersona = AI_PERSONAS[this.aiPersonaIndex];

    return `
      <div class="ai-roleplay-wrapper">
        <!-- ВЕРХНЯЯ ПАНЕЛЬ ПЕРСОНАЖЕЙ И СТАТУСА LLM -->
        <div class="ai-top-bar">
          <div class="ai-persona-picker">
            ${AI_PERSONAS.map(
              (p, idx) => `
              <button class="ai-persona-btn ${idx === this.aiPersonaIndex ? "active" : ""}" data-persona-idx="${idx}">
                <span class="p-avatar">${p.avatar}</span>
                <span class="p-name">${p.name}</span>
              </button>
            `
            ).join("")}
          </div>

          <div class="ai-meta-controls">
            <!-- ТУМБЛЕРЫ БЫСТРОГО ДОСТУПА: СЛОВАРЬ И НАСТАВНИК -->
            <button class="btn-toggle-pill ${dictionary.enabled ? "pill-active" : ""}" id="btn-toggle-dict" title="Подсвечивать перевод слов при наведении курсора">
              🔤 Словарь: ${dictionary.enabled ? "ВКЛ" : "ВЫКЛ"}
            </button>
            <button class="btn-toggle-pill ${llmClient.coachEnabled ? "pill-active" : ""}" id="btn-toggle-coach" title="Кликните для смены режима строгости (🟢 Мягкий B1 / 🟡 Баланс / 🔴 Строгий)">
              🎓 ${llmClient.coachEnabled ? llmClient.getCoachModeInfo().label : "Наставник: ВЫКЛ"}
            </button>

            <button class="llm-status-pill" id="llm-status-badge" title="Статус подключения к LM Studio">
              <span class="dot"></span> Подключение...
            </button>
            <button class="btn-icon-subtle" id="btn-open-settings" title="Настройки подключения (порт, модель, CORS)">
              ⚙️ Настройки
            </button>
            <button class="btn-icon-subtle" id="btn-restart-ai" title="Начать диалог с начала">
              🔄 Сброс
            </button>
          </div>
        </div>

        <!-- КАРТОЧКА ПЕРСОНАЖА -->
        <div class="ai-persona-hero">
          <div class="hero-avatar">${currentPersona.avatar}</div>
          <div class="hero-info">
            <div class="hero-title">${currentPersona.name}</div>
            <div class="hero-role">${currentPersona.role}</div>
          </div>
          <div class="hero-engine-tags">
            <div class="hero-engine-badge" title="Модель для ведения диалога">
              <span class="tag-role">💬 Собеседник:</span>
              <span class="tag-val">${llmClient.selectedModel || "hy-mt1.5-1.8b"}</span>
            </div>
            <div class="hero-engine-badge" title="Выделенная модель для мягкого разбора речи">
              <span class="tag-role">🎓 Наставник:</span>
              <span class="tag-val">${llmClient.coachModel || "gemma-3-4b-it-qat"}</span>
            </div>
          </div>
        </div>

        <!-- ЕСЛИ ОФЛАЙН: ИНФОРМАЦИОННЫЙ БАННЕР -->
        ${
          this.aiConnection.checked && !this.aiConnection.ok
            ? `
          <div class="ai-offline-banner">
            <div class="banner-title">⚠️ LM Studio не отвечает (${llmClient.endpoint})</div>
            <p>Чтобы запустить живой диалог:</p>
            <ol>
              <li>Откройте <strong>LM Studio</strong> на вашем компьютере.</li>
              <li>Перейдите во вкладку <strong>Local Server</strong> (значок <code>&lt;-&gt;</code> в левой панели).</li>
              <li>Выберите и загрузите любую модель (например, <em>hy-mt1.5-1.8b</em>, <em>Qwen 2.5</em> или <em>Llama 3.2</em>).</li>
              <li>Нажмите зелёную кнопку <strong>«Start Server»</strong> (порт <code>1234</code>).</li>
              <li><strong>ВАЖНО:</strong> Включите тумблер <strong>«Enable CORS»</strong> в настройках сервера LM Studio, чтобы браузер мог безопасно отправлять реплики!</li>
            </ol>
            <div class="banner-actions">
              <button class="btn btn-primary btn-sm" id="btn-recheck-connection">🔄 Проверить подключение</button>
              <button class="btn btn-secondary btn-sm" id="btn-banner-settings">⚙️ Изменить адрес / порт</button>
            </div>
          </div>
        `
            : ""
        }

        <!-- ЧАТ-ОКНО ДИАЛОГА -->
        <div class="ai-chat-box" id="ai-chat-box">
          ${this.aiMessages
            .map(
              (msg, idx) => `
            <div class="ai-chat-row ${msg.role === "assistant" ? "row-assistant" : "row-user"}">
              <div class="ai-msg-avatar">${msg.role === "assistant" ? currentPersona.avatar : "👤"}</div>
              <div class="ai-msg-content">
                <div class="ai-msg-header">
                  <span class="ai-msg-author">${msg.role === "assistant" ? currentPersona.name : "Вы"}</span>
                  <span class="ai-msg-time">${msg.time || ""}</span>
                  ${
                    msg.role === "assistant"
                      ? `
                    <button class="btn-voice-mini btn-speak-msg" data-msg-idx="${idx}" title="Озвучить реплику">🔊</button>
                  `
                      : ""
                  }
                </div>
                <div class="ai-msg-bubble">
                  ${msg.role === "assistant" ? dictionary.wrapWords(msg.text) : msg.text}
                </div>
                ${
                  msg.coachTip
                    ? `
                  <div class="ai-coach-tip-card">
                    <div class="coach-tip-header">
                      <span class="coach-icon">💡</span>
                      <strong>Совет тренера Драгункина:</strong>
                    </div>
                    <div class="coach-tip-body">${msg.coachTip}</div>
                  </div>
                `
                    : ""
                }
                ${
                  msg.review
                    ? `
                  <div class="user-coach-review">
                    <div class="coach-review-header">
                      <span class="badge-clarity">${msg.review.clarity}</span>
                      <span class="coach-tag">🎓 Наставник (${(llmClient.coachModel || "Gemma").split("-")[0].toUpperCase()})</span>
                    </div>
                    ${
                      msg.review.naturalVersion
                        ? `
                      <div class="coach-natural-phrase">💬 Как звучит ещё естественнее: <strong>«${msg.review.naturalVersion}»</strong></div>
                    `
                        : ""
                    }
                    <div class="coach-friendly-tip">💡 ${msg.review.friendlyTip}</div>
                  </div>
                `
                    : ""
                }
              </div>
            </div>
          `
            )
            .join("")}

          ${
            this.aiIsGenerating
              ? `
            <div class="ai-chat-row row-assistant row-generating">
              <div class="ai-msg-avatar">${currentPersona.avatar}</div>
              <div class="ai-msg-content">
                <div class="ai-msg-bubble generating-bubble">
                  <span class="typing-dot"></span>
                  <span class="typing-dot"></span>
                  <span class="typing-dot"></span>
                  <span class="typing-text">${currentPersona.name.split(" ")[0]} печатает ответ...</span>
                </div>
              </div>
            </div>
          `
              : ""
          }
        </div>

        <!-- ПАНЕЛЬ ВВОДА ПОЛЬЗОВАТЕЛЯ -->
        <div class="ai-input-wrapper">
          <div class="ai-input-controls">
            <button class="btn-ai-mic" id="btn-ai-mic" title="Нажмите и говорите по-английски в микрофон">
              <span class="mic-icon">🎙️</span> Говорить
            </button>
            <div class="input-field-wrap">
              <textarea
                id="ai-user-input"
                class="ai-textarea"
                rows="1"
                placeholder="Напишите ответ или нажмите «Говорить» (Enter — отправить, Shift+Enter — перенос)..."
              ></textarea>
            </div>
            <button class="btn-ai-send" id="btn-ai-send" ${this.aiIsGenerating ? "disabled" : ""} title="Отправить сообщение">
              <span>➔</span>
            </button>
          </div>
          <div class="ai-input-hint">
            💡 <em>Наводите курсор на любые незнакомые слова в ответах для перевода. А мягкий наставник аккуратно подскажет, как сказать ещё лучше!</em>
          </div>
        </div>
      </div>
    `;
  }

  bindAIEvents() {
    const chatBox = this.container.querySelector("#ai-chat-box");
    if (chatBox) {
      dictionary.bindContainer(chatBox);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Быстрый переключатель словаря
    const dictPill = this.container.querySelector("#btn-toggle-dict");
    if (dictPill) {
      dictPill.addEventListener("click", () => {
        dictionary.toggleEnabled();
        sound.playClick();
        this.render();
      });
    }

    // Быстрый переключатель режима наставника (циклическая смена строгости)
    const coachPill = this.container.querySelector("#btn-toggle-coach");
    if (coachPill) {
      coachPill.addEventListener("click", () => {
        if (!llmClient.coachEnabled) {
          llmClient.coachEnabled = true;
          llmClient.coachMode = "gentle";
        } else if (llmClient.coachMode === "gentle") {
          llmClient.coachMode = "balanced";
        } else if (llmClient.coachMode === "balanced") {
          llmClient.coachMode = "strict";
        } else {
          llmClient.coachEnabled = false;
        }
        localStorage.setItem("my_english_llm_coach", llmClient.coachEnabled ? "true" : "false");
        localStorage.setItem("my_english_coach_mode", llmClient.coachMode);
        sound.playClick();
        this.render();
      });
    }

    // Смена персонажа
    this.container.querySelectorAll(".ai-persona-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.personaIdx, 10);
        if (idx === this.aiPersonaIndex) return;
        this.aiPersonaIndex = idx;
        const persona = AI_PERSONAS[idx];
        this.aiMessages = [
          {
            role: "assistant",
            text: persona.greeting,
            coachTip: null,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          }
        ];
        sound.playClick();
        this.render();
        if (llmClient.autoSpeak) {
          speech.speakAs(persona.greeting, persona.name);
        }
      });
    });

    // Озвучка любой реплики из чата
    this.container.querySelectorAll(".btn-speak-msg").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.msgIdx, 10);
        const msg = this.aiMessages[idx];
        const persona = AI_PERSONAS[this.aiPersonaIndex];
        if (msg) speech.speakAs(msg.text, persona.name);
      });
    });

    // Кнопка рестарта
    const restartBtn = this.container.querySelector("#btn-restart-ai");
    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        if (confirm("Очистить историю текущего диалога и начать разговор заново?")) {
          const persona = AI_PERSONAS[this.aiPersonaIndex];
          this.aiMessages = [
            {
              role: "assistant",
              text: persona.greeting,
              coachTip: null,
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            }
          ];
          sound.playClick();
          this.render();
          if (llmClient.autoSpeak) {
            speech.speakAs(persona.greeting, persona.name);
          }
        }
      });
    }

    // Кнопка настроек
    const settingsBtn = this.container.querySelector("#btn-open-settings");
    const statusBadge = this.container.querySelector("#llm-status-badge");
    const bannerSettingsBtn = this.container.querySelector("#btn-banner-settings");

    const openSettingsHandler = () => {
      this.aiSettingsOpen = true;
      this.render();
    };

    if (settingsBtn) settingsBtn.addEventListener("click", openSettingsHandler);
    if (statusBadge) statusBadge.addEventListener("click", openSettingsHandler);
    if (bannerSettingsBtn) bannerSettingsBtn.addEventListener("click", openSettingsHandler);

    // Кнопка перепроверки соединения из баннера
    const recheckBtn = this.container.querySelector("#btn-recheck-connection");
    if (recheckBtn) {
      recheckBtn.addEventListener("click", async () => {
        recheckBtn.innerText = "Проверка...";
        await this.checkLLMStatus();
        this.render();
      });
    }

    // Ввод текста и отправка
    const textarea = this.container.querySelector("#ai-user-input");
    const sendBtn = this.container.querySelector("#btn-ai-send");

    if (textarea) {
      textarea.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          this.handleSendAIMessage();
        }
      });

      // Авто-рост высоты textarea
      textarea.addEventListener("input", () => {
        textarea.style.height = "auto";
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
      });
    }

    if (sendBtn) {
      sendBtn.addEventListener("click", () => this.handleSendAIMessage());
    }

    // Голосовой ввод
    const micBtn = this.container.querySelector("#btn-ai-mic");
    if (micBtn) {
      micBtn.addEventListener("click", () => this.handleAIMic());
    }
  }

  handleAIMic() {
    const micBtn = this.container.querySelector("#btn-ai-mic");
    const textarea = this.container.querySelector("#ai-user-input");
    if (!micBtn || !textarea) return;

    micBtn.classList.add("mic-recording");
    micBtn.innerHTML = `<span>🔴 Слушаю...</span>`;

    speech.startListening(
      (transcript) => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span class="mic-icon">🎙️</span> Говорить`;

        // Вставляем транскрипцию в поле ввода
        textarea.value = (textarea.value ? textarea.value + " " : "") + transcript;
        textarea.focus();
        textarea.style.height = "auto";
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
        sound.playClick();
      },
      (err) => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span class="mic-icon">🎙️</span> Говорить`;
        alert(`Ошибка распознавания речи: ${err}`);
      },
      () => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span class="mic-icon">🎙️</span> Говорить`;
      }
    );
  }

  async handleSendAIMessage() {
    if (this.aiIsGenerating) return;
    const textarea = this.container.querySelector("#ai-user-input");
    if (!textarea) return;

    const userText = textarea.value.trim();
    if (!userText) return;

    textarea.value = "";
    textarea.style.height = "auto";

    const persona = AI_PERSONAS[this.aiPersonaIndex];
    const nowTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Добавляем сообщение пользователя в историю
    const userMsgObj = {
      role: "user",
      text: userText,
      time: nowTime,
      review: null
    };
    this.aiMessages.push(userMsgObj);

    this.aiIsGenerating = true;
    sound.playClick();
    this.render();

    // Запускаем фоновый доброжелательный разбор фразы наставником (не блокируя генерацию реплики собеседника)
    if (llmClient.coachEnabled) {
      const lastNpcMsg = this.aiMessages.filter((m) => m.role === "assistant").pop();
      const lastContext = lastNpcMsg ? lastNpcMsg.text : "";
      llmClient.reviewUserSpeech(userText, lastContext).then((rev) => {
        if (rev) {
          userMsgObj.review = rev;
          // Обновляем отображение, чтобы показать карточку наставника
          this.render();
        }
      });
    }

    // Формируем историю сообщений для OpenAI API
    const apiMessages = [
      { role: "system", content: persona.systemPrompt }
    ];

    // Берем последние 8 сообщений контекста диалога
    const recentHistory = this.aiMessages.slice(-8);
    for (const m of recentHistory) {
      apiMessages.push({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.text
      });
    }

    try {
      const response = await llmClient.sendMessage(apiMessages);
      this.aiIsGenerating = false;

      this.aiMessages.push({
        role: "assistant",
        text: response.text,
        coachTip: response.coachTip,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      });

      state.addXP(30);
      sound.playSuccess();
      this.render();

      // Озвучиваем реплику голосом персонажа (без технического совета)
      if (llmClient.autoSpeak) {
        speech.speakAs(response.text, persona.name);
      }
    } catch (err) {
      this.aiIsGenerating = false;
      sound.playError();
      alert(`Ошибка обращения к LM Studio: ${err.message}`);
      this.render();
    }
  }

  // ==========================================
  // 3. ОКНО НАСТРОЕК LM STUDIO
  // ==========================================

  renderSettingsModal() {
    return `
      <div class="modal-backdrop" id="modal-settings-backdrop">
        <div class="modal-card llm-settings-card">
          <div class="modal-header">
            <h3>⚙️ Настройки подключения к LM Studio</h3>
            <button class="btn-close-modal" id="btn-close-settings">×</button>
          </div>

          <div class="modal-body">
            <div class="form-group">
              <label for="cfg-endpoint">Адрес локального API (Endpoint URL):</label>
              <input
                type="text"
                id="cfg-endpoint"
                class="form-input"
                value="${llmClient.endpoint}"
                placeholder="http://127.0.0.1:1234"
              >
              <small class="form-hint">LM Studio: <code>http://127.0.0.1:1234</code>. Модель: <code>hy-mt1.5-1.8b</code></small>
            </div>

            <div class="form-row-actions">
              <button class="btn btn-secondary btn-sm" id="btn-modal-test-conn">
                🔍 Проверить подключение и список моделей
              </button>
              <span id="modal-conn-result" class="conn-test-label"></span>
            </div>

            <div class="form-group">
              <label for="cfg-model">💬 Модель собеседника (Диалог):</label>
              <select id="cfg-model" class="form-input">
                ${
                  llmClient.availableModels.length > 0
                    ? llmClient.availableModels
                        .map(
                          (m) => `
                    <option value="${m}" ${m === llmClient.selectedModel ? "selected" : ""}>${m}</option>
                  `
                        )
                        .join("")
                    : `
                  <option value="${llmClient.selectedModel || ""}">
                    ${llmClient.selectedModel || "hy-mt1.5-1.8b"}
                  </option>
                `
                }
              </select>
              <small class="form-hint">Отвечает за реплики персонажей (Marcus, Elena, Alex и др.).</small>
            </div>

            <div class="form-group">
              <label for="cfg-coach-model">🎓 Модель наставника (Коуч речи):</label>
              <select id="cfg-coach-model" class="form-input">
                ${
                  llmClient.availableModels.length > 0
                    ? llmClient.availableModels
                        .map(
                          (m) => `
                    <option value="${m}" ${m === llmClient.coachModel ? "selected" : ""}>${m}</option>
                  `
                        )
                        .join("")
                    : `
                  <option value="${llmClient.coachModel || ""}">
                    ${llmClient.coachModel || "gemma-3-4b-it-qat"}
                  </option>
                `
                }
              </select>
              <small class="form-hint">Вторая параллельная модель, которая деликатно подсказывает, как улучшить фразу.</small>
            </div>

            <div class="form-group">
              <label for="cfg-temp">Температура креативности (${llmClient.temperature}):</label>
              <input
                type="range"
                id="cfg-temp"
                min="0.2"
                max="1.2"
                step="0.05"
                value="${llmClient.temperature}"
                class="form-range"
              >
              <div class="range-labels">
                <span>0.2 (Строго по фактам)</span>
                <span>0.7 (Баланс B1)</span>
                <span>1.2 (Креативно)</span>
              </div>
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" id="cfg-autospeak" ${llmClient.autoSpeak ? "checked" : ""}>
                <span>Автоматически озвучивать реплики персонажей голосом</span>
              </label>
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" id="cfg-coach" ${llmClient.coachEnabled ? "checked" : ""}>
                <span>🎓 Включить AI-наставника (разбор и поддержка)</span>
              </label>
            </div>

            <div class="form-group" style="margin-left: 20px;">
              <label for="cfg-coach-mode">🎯 Стиль работы наставника:</label>
              <select id="cfg-coach-mode" class="form-input">
                <option value="gentle" ${llmClient.coachMode === "gentle" ? "selected" : ""}>
                  🟢 Мягкий B1 (исправляет только грубые ошибки, сохраняя ваши слова)
                </option>
                <option value="balanced" ${llmClient.coachMode === "balanced" ? "selected" : ""}>
                  🟡 Баланс B1+ (подсказывает естественные разговорные связки B1)
                </option>
                <option value="strict" ${llmClient.coachMode === "strict" ? "selected" : ""}>
                  🔴 Строгий B2 (детальная шлифовка профессиональной речи и идиом)
                </option>
              </select>
              <small class="form-hint">В режиме «Мягкий B1» наставник не придирается к мелочам, бережёт вашу мотивацию и даёт пояснения строго на русском языке.</small>
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" id="cfg-dict" ${dictionary.enabled ? "checked" : ""}>
                <span>🔤 Словарь: переводить незнакомые слова при наведении курсора</span>
              </label>
            </div>

            <div class="llm-guide-box">
              <div class="guide-title">📌 Как включить CORS в LM Studio:</div>
              <p>1. Откройте LM Studio ➔ вкладка <strong>Local Server</strong> (значок <code>&lt;-&gt;</code>).</p>
              <p>2. В правой панели найдите блок <strong>«CORS»</strong> и поставьте галочку <strong>«Enable CORS»</strong>.</p>
              <p>3. Нажмите <strong>«Start Server»</strong>. Теперь веб-браузер сможет напрямую вести живой диалог!</p>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" id="btn-cancel-settings">Отмена</button>
            <button class="btn btn-primary" id="btn-save-settings">Сохранить настройки</button>
          </div>
        </div>
      </div>
    `;
  }

  bindSettingsEvents() {
    const backdrop = this.container.querySelector("#modal-settings-backdrop");
    const closeBtn = this.container.querySelector("#btn-close-settings");
    const cancelBtn = this.container.querySelector("#btn-cancel-settings");
    const saveBtn = this.container.querySelector("#btn-save-settings");
    const testBtn = this.container.querySelector("#btn-modal-test-conn");
    const testResult = this.container.querySelector("#modal-conn-result");
    const tempInput = this.container.querySelector("#cfg-temp");
    const tempLabel = this.container.querySelector("label[for='cfg-temp']");

    const closeHandler = () => {
      this.aiSettingsOpen = false;
      this.render();
    };

    if (closeBtn) closeBtn.addEventListener("click", closeHandler);
    if (cancelBtn) cancelBtn.addEventListener("click", closeHandler);
    if (backdrop) {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) closeHandler();
      });
    }

    if (tempInput && tempLabel) {
      tempInput.addEventListener("input", (e) => {
        tempLabel.innerText = `Температура креативности (${e.target.value}):`;
      });
    }

    if (testBtn) {
      testBtn.addEventListener("click", async () => {
        const endpointInput = this.container.querySelector("#cfg-endpoint");
        const ep = endpointInput ? endpointInput.value.trim() : llmClient.endpoint;
        testBtn.innerText = "⏳ Проверка...";
        testResult.innerText = "";

        const tempClient = new (llmClient.constructor)();
        tempClient.endpoint = ep;
        const res = await tempClient.checkConnection();

        testBtn.innerText = "🔍 Проверить подключение";
        if (res.ok) {
          testResult.className = "conn-test-label text-success";
          testResult.innerText = `✓ Успешно! Доступно моделей: ${res.models.length}`;

          const modelSelect = this.container.querySelector("#cfg-model");
          const coachModelSelect = this.container.querySelector("#cfg-coach-model");
          if (res.models && res.models.length > 0) {
            if (modelSelect) {
              modelSelect.innerHTML = res.models
                .map((m) => `<option value="${m}" ${m === llmClient.selectedModel ? "selected" : ""}>${m}</option>`)
                .join("");
            }
            if (coachModelSelect) {
              coachModelSelect.innerHTML = res.models
                .map((m) => `<option value="${m}" ${m === llmClient.coachModel ? "selected" : ""}>${m}</option>`)
                .join("");
            }
          }
        } else {
          testResult.className = "conn-test-label text-error";
          testResult.innerText = `✕ ${res.error}`;
        }
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        const ep = this.container.querySelector("#cfg-endpoint").value.trim();
        const model = this.container.querySelector("#cfg-model").value;
        const coachModel = this.container.querySelector("#cfg-coach-model").value;
        const temp = this.container.querySelector("#cfg-temp").value;
        const autoSpk = this.container.querySelector("#cfg-autospeak").checked;
        const coach = this.container.querySelector("#cfg-coach").checked;
        const coachModeEl = this.container.querySelector("#cfg-coach-mode");
        const coachMode = coachModeEl ? coachModeEl.value : llmClient.coachMode;
        const dict = this.container.querySelector("#cfg-dict").checked;

        llmClient.saveSettings(ep, model, coachModel, temp, autoSpk, coach, coachMode);
        dictionary.enabled = dict;
        localStorage.setItem("my_english_dict_enabled", dict ? "true" : "false");

        sound.playSuccess();
        this.aiSettingsOpen = false;
        this.render();
        this.checkLLMStatus();
      });
    }
  }
}
