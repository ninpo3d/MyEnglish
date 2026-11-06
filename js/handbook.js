// Интерактивный справочник по правилам шпаргалки, 50 разговорным фразам, связкам B1 и тех-созвонам
// С удобными вкладками разделов, чтобы избежать бесконечной «портянки»

import { GRAMMAR_RULES } from "./data/rules.js";
import { CONVERSATIONAL_CONNECTORS } from "./data/connectors.js";
import { TECH_STANDUP_PATTERNS } from "./data/tech-phrases.js";
import { CONVERSATIONAL_50_PHRASES } from "./data/conversational-50.js";
import { sound } from "./audio.js";
import { speech } from "./speech.js";
import { state } from "./state.js";
import { flashcardsService } from "./flashcards-service.js";

export class HandbookView {
  constructor(containerEl) {
    this.container = containerEl;
    this.searchQuery = "";
    this.activeTab = "phrases50"; // 'phrases50', 'standup', 'connectors', 'rules', 'all'
  }

  init() {
    this.render();
  }

  render() {
    const q = this.searchQuery.toLowerCase();

    const filtered50 = CONVERSATIONAL_50_PHRASES.filter((p) => {
      return (
        p.phrase.toLowerCase().includes(q) ||
        p.ru.toLowerCase().includes(q) ||
        p.example.toLowerCase().includes(q) ||
        p.categoryRu.toLowerCase().includes(q) ||
        p.tip.toLowerCase().includes(q)
      );
    });

    const filteredTech = TECH_STANDUP_PATTERNS.filter((p) => {
      return (
        p.phrase.toLowerCase().includes(q) ||
        p.ru.toLowerCase().includes(q) ||
        p.example.toLowerCase().includes(q) ||
        p.categoryRu.toLowerCase().includes(q) ||
        p.tip.toLowerCase().includes(q)
      );
    });

    const filteredConnectors = CONVERSATIONAL_CONNECTORS.filter((c) => {
      return c.en.toLowerCase().includes(q) || c.ru.toLowerCase().includes(q) || c.useCase.toLowerCase().includes(q);
    });

    const filteredRules = GRAMMAR_RULES.filter((rule) => {
      return (
        rule.title.toLowerCase().includes(q) ||
        rule.shortDesc.toLowerCase().includes(q) ||
        rule.keyPoints.some((p) => p.toLowerCase().includes(q))
      );
    });

    const showPhrases50 = this.activeTab === "phrases50" || this.activeTab === "all" || (q && filtered50.length > 0);
    const showStandup = this.activeTab === "standup" || this.activeTab === "all" || (q && filteredTech.length > 0);
    const showConnectors = this.activeTab === "connectors" || this.activeTab === "all" || (q && filteredConnectors.length > 0);
    const showRules = this.activeTab === "rules" || this.activeTab === "all" || (q && filteredRules.length > 0);

    this.container.innerHTML = `
      <div class="handbook-container">
        <!-- ВЕРХНЯЯ ШАПКА СПРАВОЧНИКА -->
        <div class="handbook-header">
          <div class="handbook-header-top">
            <div class="mode-badge">📖 База знаний & Разговорный арсенал B1</div>
            <div class="search-box">
              <input 
                type="text" 
                id="handbook-search" 
                placeholder="🔍 Поиск (sounds good, running late, budget, actually...)" 
                value="${this.searchQuery}"
              />
            </div>
          </div>

          <!-- КНОПКИ ПЕРЕКЛЮЧЕНИЯ РАЗДЕЛОВ (БЕЗ ДЛИННОЙ ПОРТЯНКИ) -->
          <div class="handbook-tabs-nav">
            <button class="hb-tab-btn ${this.activeTab === "phrases50" ? "active" : ""}" data-subtab="phrases50">
              🌟 50 Золотых фраз (${CONVERSATIONAL_50_PHRASES.length})
            </button>
            <button class="hb-tab-btn ${this.activeTab === "standup" ? "active" : ""}" data-subtab="standup">
              🎙️ Созвоны & Tech Art (${TECH_STANDUP_PATTERNS.length})
            </button>
            <button class="hb-tab-btn ${this.activeTab === "connectors" ? "active" : ""}" data-subtab="connectors">
              🗣️ Связки & Fillers (${CONVERSATIONAL_CONNECTORS.length})
            </button>
            <button class="hb-tab-btn ${this.activeTab === "rules" ? "active" : ""}" data-subtab="rules">
              📐 9 Правил Парето (${GRAMMAR_RULES.length})
            </button>
            <button class="hb-tab-btn ${this.activeTab === "all" ? "active" : ""}" data-subtab="all">
              📑 Показать всё
            </button>
          </div>
        </div>

        <!-- РАЗДЕЛ 1: 50 ЗОЛОТЫХ РАЗГОВОРНЫХ ФРАЗ ДЛЯ КАЖДОГО ДНЯ -->
        ${
          showPhrases50
            ? `
        <div class="connectors-section tech-standup-section">
          <div class="tech-section-header">
            <div>
              <h2 class="section-title">🌟 50 разговорных фраз для ежедневного общения</h2>
              <p class="section-desc">Золотой запас носителей языка (по уроку English Maria): слушайте, повторяйте и сохраняйте в карточки!</p>
            </div>
            <div class="tech-patterns-count">Фраз: <strong>${filtered50.length}</strong></div>
          </div>

          <div class="tech-patterns-grid">
            ${
              filtered50.length === 0
                ? `<div class="empty-placeholder">По запросу «${this.searchQuery}» фраз не найдено</div>`
                : filtered50
                    .map((p) => {
                      const isAdded = flashcardsService.isWordAdded(p.phrase);
                      return `
              <div class="tech-pattern-card">
                <div class="tp-top">
                  <span class="tp-category-badge">${p.categoryRu}</span>
                  <div class="tp-actions">
                    <button class="btn-voice-mini btn-speak-text" data-text="${p.phrase}" title="Послушать фразу">🔊</button>
                    <button class="btn-star-50 ${isAdded ? "is-added" : ""}" data-id="${p.id}" title="${isAdded ? "Уже в карточках! Кликните, чтобы убрать" : "Добавить в интерактивные карточки"}">
                      ${isAdded ? "⭐ В карточках" : "☆ В карточки"}
                    </button>
                  </div>
                </div>

                <div class="tp-phrase-row">
                  <div class="tp-phrase">${p.phrase}</div>
                  <div class="tp-ru">${p.ru}</div>
                  <div class="tp-phonetic-sub">${p.phonetic}</div>
                </div>

                <div class="tp-tip">💡 <em>Совет:</em> ${p.tip}</div>

                <div class="tp-example-box">
                  <div class="tp-ex-en">
                    <span>«${p.example}»</span>
                    <button class="btn-voice-mini btn-speak-text" data-text="${p.example}" title="Послушать диалог целиком">🔊</button>
                  </div>
                  <div class="tp-ex-ru">«${p.exampleRu}»</div>
                </div>
              </div>
            `;
                    })
                    .join("")
            }
          </div>
        </div>
        `
            : ""
        }

        <!-- РАЗДЕЛ 2: ЛИЧНАЯ ШПАРГАЛКА ДЛЯ ТЕХНИЧЕСКИХ СОЗВОНОВ & TECH ART -->
        ${
          showStandup
            ? `
        <div class="connectors-section tech-standup-section" style="${showPhrases50 ? "margin-top: 36px" : ""}">
          <div class="tech-section-header">
            <div>
              <h2 class="section-title">🎙️ Личная шпаргалка для созвонов & Tech Art (Standup Patterns)</h2>
              <p class="section-desc">Золотые речевые шаблоны: как отвечать лиду, обосновывать архитектурные решения и обсуждать оптимизацию графики:</p>
            </div>
            <div class="tech-patterns-count">Шаблонов: <strong>${filteredTech.length}</strong></div>
          </div>

          <div class="tech-patterns-grid">
            ${
              filteredTech.length === 0
                ? `<div class="empty-placeholder">По запросу «${this.searchQuery}» шаблонов созвона не найдено</div>`
                : filteredTech
                    .map((p) => {
                      const isAdded = flashcardsService.isWordAdded(p.phrase);
                      return `
              <div class="tech-pattern-card">
                <div class="tp-top">
                  <span class="tp-category-badge">${p.categoryRu}</span>
                  <div class="tp-actions">
                    <button class="btn-voice-mini btn-speak-text" data-text="${p.phrase}" title="Послушать шаблон">🔊</button>
                    <button class="btn-star-pattern ${isAdded ? "is-added" : ""}" data-id="${p.id}" title="${isAdded ? "Уже в карточках! Кликните, чтобы убрать" : "Добавить в интерактивные карточки"}">
                      ${isAdded ? "⭐ В карточках" : "☆ В карточки"}
                    </button>
                  </div>
                </div>

                <div class="tp-phrase-row">
                  <div class="tp-phrase">${p.phrase}</div>
                  <div class="tp-ru">${p.ru}</div>
                </div>

                <div class="tp-tip">💡 <em>Драгункин:</em> ${p.tip}</div>

                <div class="tp-example-box">
                  <div class="tp-ex-en">
                    <span>«${p.example}»</span>
                    <button class="btn-voice-mini btn-speak-text" data-text="${p.example}" title="Послушать пример целиком">🔊</button>
                  </div>
                  <div class="tp-ex-ru">«${p.exampleRu}»</div>
                </div>
              </div>
            `;
                    })
                    .join("")
            }
          </div>
        </div>
        `
            : ""
        }

        <!-- РАЗДЕЛ 3: РАЗГОВОРНЫЕ МОСТИКИ И КОННЕКТОРЫ B1 -->
        ${
          showConnectors
            ? `
        <div class="connectors-section" style="margin-top: 24px">
          <h2 class="section-title">🗣️ Разговорные мостики B1 (Fillers & Connectors)</h2>
          <p class="section-desc">Слова-спасатели, которые дают 1-2 секунды подумать во время живого разговора:</p>

          <div class="connectors-grid">
            ${filteredConnectors
              .map(
                (c) => `
              <div class="connector-card">
                <div class="conn-top">
                  <span class="conn-en">${c.en}</span>
                  <button class="btn-voice-mini btn-speak-text" data-text="${c.en}" title="Послушать произношение">🔊</button>
                </div>
                <div class="conn-ru">${c.ru}</div>
                <div class="conn-use">💡 ${c.useCase}</div>
                <div class="conn-example">
                  <span class="ex-label">Пример:</span>
                  <span class="ex-body">«${c.example}»</span>
                  <button class="btn-voice-mini btn-speak-text" data-text="${c.example}" title="Послушать фразу целиком">🔊</button>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
        `
            : ""
        }

        <!-- РАЗДЕЛ 4: 9 ФУНДАМЕНТАЛЬНЫХ ПРАВИЛ -->
        ${
          showRules
            ? `
        <div class="connectors-section" style="margin-top: 24px">
          <h2 class="section-title">📐 9 Фундаментальных правил (Парето 20%)</h2>
          <p class="section-desc">Золотой скелет грамматики: формула любого утверждения, отрицания и вопроса:</p>
          <div class="rules-grid">
            ${
              filteredRules.length === 0
                ? `<div class="empty-placeholder">Ничего не найдено по запросу «${this.searchQuery}»</div>`
                : filteredRules
                    .map(
                      (rule) => `
                  <div class="rule-card" id="rule-${rule.id}">
                    <div class="rule-card-top">
                      <span class="rule-num">${rule.number}</span>
                      <h3 class="rule-title">${rule.title}</h3>
                    </div>
                    <div class="rule-desc">${rule.shortDesc}</div>

                    <div class="rule-formula-box">
                      <span class="formula-label">ФОРМУЛА:</span>
                      <code>${rule.formula}</code>
                    </div>

                    <ul class="rule-points">
                      ${rule.keyPoints.map((pt) => `<li>${pt}</li>`).join("")}
                    </ul>

                    <div class="rule-examples">
                      <div class="examples-title">Примеры живой речи:</div>
                      ${rule.examples
                        .map(
                          (ex) => `
                        <div class="example-item">
                          <span class="ex-en">${ex.en}</span>
                          <button class="btn-voice-mini btn-speak-text" data-text="${ex.en}">🔊</button>
                          <span class="ex-ru"> — ${ex.ru}</span>
                        </div>
                      `
                        )
                        .join("")}
                    </div>
                  </div>
                `
                    )
                    .join("")
            }
          </div>
        </div>
        `
            : ""
        }
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Переключение вкладок разделов
    this.container.querySelectorAll(".hb-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        sound.playClick();
        this.activeTab = btn.dataset.subtab;
        this.render();
      });
    });

    const searchInput = this.container.querySelector("#handbook-search");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        this.render();
        const input = this.container.querySelector("#handbook-search");
        if (input) {
          input.focus();
          input.setSelectionRange(input.value.length, input.value.length);
        }
      });
    }

    // Озвучка любого текста
    this.container.querySelectorAll(".btn-speak-text").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const text = btn.dataset.text;
        if (text) {
          btn.classList.add("btn-speaking");
          setTimeout(() => btn.classList.remove("btn-speaking"), 1500);
          speech.speak(text);
        }
      });
    });

    // Добавление фразы из 50 в карточки
    this.container.querySelectorAll(".btn-star-50").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const item = CONVERSATIONAL_50_PHRASES.find((p) => p.id === id);
        if (!item) return;

        const isCurrentlyAdded = flashcardsService.isWordAdded(item.phrase);
        if (isCurrentlyAdded) {
          flashcardsService.removeWord(item.phrase);
          btn.classList.remove("is-added");
          btn.innerHTML = "☆ В карточки";
          btn.title = "Добавить в интерактивные карточки";
          sound.playClick();
        } else {
          flashcardsService.addCard({
            word: item.phrase,
            translation: item.ru,
            contextEn: item.example,
            contextRu: `${item.exampleRu} (💡 ${item.tip})`,
            category: "casual",
            phoneticRu: item.phonetic
          });
          btn.classList.add("is-added");
          btn.innerHTML = "⭐ В карточках";
          btn.title = "Уже в карточках! Кликните, чтобы убрать";
          sound.playSuccess();
          state.addXP(5);
        }
      });
    });

    // Добавление паттерна в карточки со звёздочки
    this.container.querySelectorAll(".btn-star-pattern").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const pattern = TECH_STANDUP_PATTERNS.find((p) => p.id === id);
        if (!pattern) return;

        const isCurrentlyAdded = flashcardsService.isWordAdded(pattern.phrase);
        if (isCurrentlyAdded) {
          flashcardsService.removeWord(pattern.phrase);
          btn.classList.remove("is-added");
          btn.innerHTML = "☆ В карточки";
          btn.title = "Добавить в интерактивные карточки";
          sound.playClick();
        } else {
          flashcardsService.addCard({
            word: pattern.phrase,
            translation: pattern.ru,
            contextEn: pattern.example,
            contextRu: `${pattern.exampleRu} (💡 ${pattern.tip})`,
            category: "tech"
          });
          btn.classList.add("is-added");
          btn.innerHTML = "⭐ В карточках";
          btn.title = "Уже в карточках! Кликните, чтобы убрать";
          sound.playSuccess();
          state.addXP(5);
        }
      });
    });
  }
}
