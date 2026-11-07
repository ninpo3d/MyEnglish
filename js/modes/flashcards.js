// Режим «🎴 Интерактивные 3D-карточки B1» (Flashcards & Pronunciation Heatmap)
// С интервальным повторением (Leitner), анализом произношения через микрофон и категориями

import { flashcardsService } from "../flashcards-service.js";
import { sound } from "../audio.js";
import { speech } from "../speech.js";
import { state } from "../state.js";

export class FlashcardsMode {
  constructor(containerEl) {
    this.container = containerEl;
    this.currentCategory = "all";
    this.currentIndex = 0;
    this.isFlipped = false;
    this.isRecording = false;
    this.lastHeatmap = null;
    this.cards = [];
  }

  init() {
    this.cards = flashcardsService.getCardsByCategory(this.currentCategory);
    this.currentIndex = this.cards.length ? Math.floor(Math.random() * this.cards.length) : 0;
    this.isFlipped = false;
    this.isRecording = false;
    this.lastHeatmap = null;
    this.render();
  }

  getCurrentCard() {
    if (this.cards.length === 0) return null;
    if (this.currentIndex >= this.cards.length) this.currentIndex = 0;
    return this.cards[this.currentIndex];
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
    sound.playClick();
    const cardEl = this.container.querySelector("#flashcard-3d-box");
    if (cardEl) {
      cardEl.classList.toggle("is-flipped", this.isFlipped);
    }
  }

  nextCard() {
    if (this.cards.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.cards.length;
    this.isFlipped = false;
    this.lastHeatmap = null;
    sound.playClick();
    this.render();
  }

  prevCard() {
    if (this.cards.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
    this.isFlipped = false;
    this.lastHeatmap = null;
    sound.playClick();
    this.render();
  }

  shuffleCards() {
    this.cards.sort(() => Math.random() - 0.5);
    this.currentIndex = 0;
    this.isFlipped = false;
    this.lastHeatmap = null;
    sound.playClick();
    this.render();
  }

  render() {
    const card = this.getCurrentCard();
    const allCards = flashcardsService.getAllCards();
    const masteredCount = allCards.filter((c) => (c.score || 0) >= 3).length;

    this.container.innerHTML = `
      <div class="flashcards-wrapper">
        <!-- ВЕРХНЯЯ ШАПКА РЕЖИМА И ФИЛЬТРЫ -->
        <div class="fc-header">
          <div class="fc-title-box">
            <div class="mode-badge">🎴 Карточки B1 (Active Recall)</div>
            <div class="fc-stats-badge">
              🏆 Освоено: <strong>${masteredCount}</strong> из ${allCards.length}
            </div>
          </div>

          <div class="fc-categories">
            <button class="fc-cat-btn ${this.currentCategory === "all" ? "active" : ""}" data-cat="all">
              Все слова (${allCards.length})
            </button>
            <button class="fc-cat-btn ${this.currentCategory === "casual" ? "active" : ""}" data-cat="casual">
              ☕ Бытовой B1 (${allCards.filter((c) => c.category === "casual").length})
            </button>
            <button class="fc-cat-btn ${this.currentCategory === "tech" ? "active" : ""}" data-cat="tech">
              🎬 Tech Art & VFX (${allCards.filter((c) => c.category === "tech").length})
            </button>
            <button class="fc-cat-btn ${this.currentCategory === "travel" ? "active" : ""}" data-cat="travel">
              ✈️ Поездки (${allCards.filter((c) => c.category === "travel").length})
            </button>
            <button class="fc-cat-btn ${this.currentCategory === "verbs" ? "active" : ""}" data-cat="verbs">
              ⚡ Глаголы (${allCards.filter((c) => c.category === "verbs").length})
            </button>
          </div>
        </div>

        ${
          !card
            ? `
          <div class="empty-deck-card">
            <div class="empty-icon">🎴</div>
            <h3>В этой категории пока нет слов!</h3>
            <p>Вы можете нажимать звёздочку ⭐ на незнакомых словах в диалогах, чтобы они появились здесь.</p>
            <button class="btn btn-primary" id="btn-show-all-cards">Показать все карточки</button>
          </div>
        `
            : `
          <!-- ОСНОВНАЯ ОБЛАСТЬ КАРТОЧКИ -->
          <div class="fc-deck-area">
            <div class="fc-counter-row">
              <span class="fc-counter">Карточка ${this.currentIndex + 1} из ${this.cards.length}</span>
              <div class="fc-stars-meter" title="Уровень запоминания слова">
                ${"⭐".repeat(card.score || 0)}${"☆".repeat(5 - (card.score || 0))}
              </div>
              <button class="btn-subtle-mini" id="btn-shuffle-cards" title="Перемешать колоду">🔀</button>
            </div>

            <!-- ИНТЕРАКТИВНЫЙ 3D КОНТЕЙНЕР КАРТОЧКИ -->
            <div class="flashcard-3d-scene">
              <div class="flashcard-3d-box ${this.isFlipped ? "is-flipped" : ""}" id="flashcard-3d-box">
                
                <!-- ЛИЦЕВАЯ СТОРОНА (АНГЛИЙСКИЙ ТЕКСТ + САМОПРОВЕРКА) -->
                <div class="card-face card-front">
                  <div class="card-top-tag">
                    <span class="tag-cat">${this.getCategoryLabel(card.category)}</span>
                    <span class="tag-hint">Кликните или нажмите Пробел, чтобы перевернуть</span>
                  </div>

                  <div class="card-word-title">${card.word}</div>

                  <!-- ФОНЕТИЧЕСКАЯ ПОДСКАЗКА ДРАГУНКИНА -->
                  <div class="card-phonetic-badge">
                    <span class="ph-icon">🗣️</span>
                    <span class="ph-text">${card.phoneticRu || `[${card.word}]`}</span>
                  </div>

                  <!-- ПРИМЕР С ПРОПУСКОМ СЛОВА -->
                  <div class="card-context-box">
                    <div class="ctx-label">Пример в речи:</div>
                    <div class="ctx-sentence">${this.maskWordInSentence(card.contextEn, card.word)}</div>
                  </div>

                  <!-- РЕЗУЛЬТАТ ТЕПЛОВОЙ КАРТЫ ПРОИЗНОШЕНИЯ -->
                  ${
                    this.lastHeatmap
                      ? `
                    <div class="fc-heatmap-result heat-${this.lastHeatmap.level}">
                      <div class="hm-header">
                        <span class="hm-score">Точность: ${this.lastHeatmap.accuracy}%</span>
                        <span class="hm-badge">${this.lastHeatmap.level === "green" ? "🟢 Отлично" : this.lastHeatmap.level === "yellow" ? "🟡 Почти чисто" : "🔴 Смазано"}</span>
                      </div>
                      <div class="hm-feedback">${this.lastHeatmap.feedbackRu}</div>
                    </div>
                  `
                      : ""
                  }

                  <!-- ПАНЕЛЬ ДЕЙСТВИЙ ЛИЦЕВОЙ СТОРОНЫ -->
                  <div class="card-front-actions">
                    <button class="btn-fc-audio" id="btn-fc-speak-normal" title="Озвучить нормальной скоростью">
                      🔊 Слушать
                    </button>
                    <button class="btn-fc-audio" id="btn-fc-speak-slow" title="Замедленный разбор по слогам">
                      🐢 0.7x
                    </button>
                    <button class="btn-fc-mic ${this.isRecording ? "recording" : ""}" id="btn-fc-mic" title="Проверить своё произношение в микрофон">
                      🎙️ ${this.isRecording ? "Слушаю..." : "Проверить произношение"}
                    </button>
                  </div>

                  <div class="card-flip-prompt">
                    Нажмите на карточку, чтобы сверить перевод ➔
                  </div>
                </div>

                <!-- ОБРАТНАЯ СТОРОНА (РУССКИЙ ПЕРЕВОД + САМООЦЕНКА) -->
                <div class="card-face card-back">
                  <div class="card-top-tag">
                    <span class="tag-cat">ПЕРЕВОД И РАЗБОР</span>
                    <button class="btn-voice-mini" id="btn-back-voice" title="Послушать произношение">🔊</button>
                  </div>

                  <div class="card-back-translation">${card.translation}</div>
                  <div class="card-back-word">${card.word}</div>

                  <div class="card-back-context">
                    <div class="back-en-ctx">«${card.contextEn}»</div>
                    <div class="back-ru-ctx">${card.contextRu || ""}</div>
                  </div>

                  <!-- КНОПКИ САМООЦЕНКИ -->
                  <div class="card-rating-actions">
                    <button class="btn-rate-forget" id="btn-rate-again">
                      <span>🔴</span> Ещё путаю (повторить)
                    </button>
                    <button class="btn-rate-master" id="btn-rate-good">
                      <span>🟢</span> Знаю назубок! (+15 XP)
                    </button>
                  </div>
                </div>

              </div>
            </div>

            <!-- СТРЕЛКИ НАВИГАЦИИ -->
            <div class="fc-navigation-bar">
              <button class="btn btn-secondary" id="btn-prev-card">← Предыдущее</button>
              <button class="btn btn-primary" id="btn-flip-card-action">
                ${this.isFlipped ? "Вернуть слово" : "Показать перевод"}
              </button>
              <button class="btn btn-secondary" id="btn-next-card">Следующее →</button>
            </div>
          </div>
        `
        }
      </div>
    `;

    this.bindEvents();
  }

  getCategoryLabel(cat) {
    switch (cat) {
      case "casual":
        return "☕ Бытовой B1";
      case "tech":
        return "🎬 Tech Art & VFX";
      case "travel":
        return "✈️ Поездки";
      case "verbs":
        return "⚡ Глаголы Драгункина";
      default:
        return "Разговорный B1";
    }
  }

  maskWordInSentence(sentence, word) {
    if (!sentence || !word) return "";
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    return sentence.replace(regex, `<span class="word-mask">_______</span>`);
  }

  bindEvents() {
    // Переключение категорий
    this.container.querySelectorAll(".fc-cat-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.currentCategory = btn.dataset.cat;
        sound.playClick();
        this.init();
      });
    });

    const showAllBtn = this.container.querySelector("#btn-show-all-cards");
    if (showAllBtn) {
      showAllBtn.addEventListener("click", () => {
        this.currentCategory = "all";
        sound.playClick();
        this.init();
      });
    }

    const card = this.getCurrentCard();
    if (!card) return;

    // Клик по самой карточке для переворота
    const card3dBox = this.container.querySelector("#flashcard-3d-box");
    if (card3dBox) {
      card3dBox.addEventListener("click", (e) => {
        // Игнорируем клики по кнопкам внутри карточки
        if (e.target.closest("button")) return;
        this.flipCard();
      });
    }

    // Кнопка переворота внизу
    const flipBtn = this.container.querySelector("#btn-flip-card-action");
    if (flipBtn) flipBtn.addEventListener("click", () => this.flipCard());

    // Навигация вперед / назад
    const nextBtn = this.container.querySelector("#btn-next-card");
    const prevBtn = this.container.querySelector("#btn-prev-card");
    if (nextBtn) nextBtn.addEventListener("click", () => this.nextCard());
    if (prevBtn) prevBtn.addEventListener("click", () => this.prevCard());

    // Перемешать
    const shuffleBtn = this.container.querySelector("#btn-shuffle-cards");
    if (shuffleBtn) shuffleBtn.addEventListener("click", () => this.shuffleCards());

    // Озвучка нормальная
    const speakNormBtn = this.container.querySelector("#btn-fc-speak-normal");
    if (speakNormBtn) {
      speakNormBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        speech.speak(card.word);
      });
    }

    // Озвучка замедленная 🐢
    const speakSlowBtn = this.container.querySelector("#btn-fc-speak-slow");
    if (speakSlowBtn) {
      speakSlowBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        speech.speakSlow(card.word);
      });
    }

    // Озвучка с обратной стороны
    const backVoiceBtn = this.container.querySelector("#btn-back-voice");
    if (backVoiceBtn) {
      backVoiceBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        speech.speak(card.word);
      });
    }

    // Микрофон для проверки произношения (Тепловая карта)
    const micBtn = this.container.querySelector("#btn-fc-mic");
    if (micBtn) {
      micBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.handleMicPronunciation(card);
      });
    }

    // Оценка карточки (Кнопки "Ещё путаю" / "Знаю назубок")
    const btnRateAgain = this.container.querySelector("#btn-rate-again");
    const btnRateGood = this.container.querySelector("#btn-rate-good");

    if (btnRateAgain) {
      btnRateAgain.addEventListener("click", (e) => {
        e.stopPropagation();
        flashcardsService.updateCardScore(card.id, false);
        sound.playError();
        this.nextCard();
      });
    }

    if (btnRateGood) {
      btnRateGood.addEventListener("click", (e) => {
        e.stopPropagation();
        flashcardsService.updateCardScore(card.id, true);
        sound.playSuccess();
        this.nextCard();
      });
    }
  }

  handleMicPronunciation(card) {
    if (this.isRecording) return;

    this.isRecording = true;
    sound.playClick();
    this.render();

    speech.startListening(
      (transcript) => {
        this.isRecording = false;
        const result = flashcardsService.comparePronunciation(transcript, card.word);
        this.lastHeatmap = result;

        if (result.accuracy >= 80) {
          sound.playSuccess();
          // Автопереворот при успешном произношении
          setTimeout(() => {
            this.isFlipped = true;
            this.render();
          }, 800);
        } else {
          sound.playError();
          this.render();
        }
      },
      (err) => {
        this.isRecording = false;
        alert(`Ошибка микрофона: ${err}`);
        this.render();
      },
      () => {
        this.isRecording = false;
        this.render();
      }
    );
  }
}
