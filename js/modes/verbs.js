// Режим «⚡ Неправильные глаголы по Драгункину» (5 золотых семейств)
// Без тупой зубрежки по алфавиту — ритмические трио, озвучка и экспресс-тренажер

import { DRAGUNKIN_VERB_FAMILIES } from "../data/verbs-data.js";
import { sound } from "../audio.js";
import { speech } from "../speech.js";
import { state } from "../state.js";
import { flashcardsService } from "../flashcards-service.js";

export class VerbsMode {
  constructor(containerEl) {
    this.container = containerEl;
    this.currentFamilyId = "family_zero"; // или 'trainer'
    this.searchQuery = "";
    this.quizState = {
      active: false,
      currentVerb: null,
      questionType: "v2v3", // 'v2v3', 'family', 'v1'
      options: [],
      selectedAnswer: null,
      isAnswered: false,
      score: 0,
      total: 0
    };
  }

  init() {
    this.render();
  }

  getAllVerbs() {
    const list = [];
    DRAGUNKIN_VERB_FAMILIES.forEach((fam) => {
      fam.verbs.forEach((v) => {
        list.push({ ...v, familyId: fam.id, familyTitle: fam.title, familyIcon: fam.icon });
      });
    });
    return list;
  }

  getCurrentFamily() {
    return DRAGUNKIN_VERB_FAMILIES.find((f) => f.id === this.currentFamilyId) || DRAGUNKIN_VERB_FAMILIES[0];
  }

  // Ритмическая озвучка трио (например: "buy... bought... bought")
  speakTrio(v1, v2, v3) {
    if (!v1) return;
    const trioText = `${v1}... ${v2}... ${v3}`;
    
    // Пробуем через speech engine
    if (speech && typeof speech.speak === "function") {
      speech.speak(trioText, 0.88);
      return;
    }

    // Прямой надежный fallback через Web Speech API браузера
    if (window.speechSynthesis) {
      try {
        if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
          window.speechSynthesis.cancel();
        }
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
        const u = new SpeechSynthesisUtterance(trioText);
        u.lang = "en-US";
        u.rate = 0.88;
        window.speechSynthesis.speak(u);
      } catch (err) {
        console.warn("Direct speech synthesis error:", err);
      }
    }
  }

  speakExample(example) {
    if (!example) return;

    if (speech && typeof speech.speak === "function") {
      speech.speak(example, 0.95);
      return;
    }

    if (window.speechSynthesis) {
      try {
        if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
          window.speechSynthesis.cancel();
        }
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
        const u = new SpeechSynthesisUtterance(example);
        u.lang = "en-US";
        u.rate = 0.95;
        window.speechSynthesis.speak(u);
      } catch (err) {
        console.warn("Direct speech synthesis error:", err);
      }
    }
  }

  // Переключение добавления глагола в персональные карточки
  toggleFlashcard(verb, btnEl) {
    if (!verb || !verb.v1) return;

    const res = flashcardsService.toggleVerbCard(verb);

    if (res.added) {
      if (btnEl) {
        btnEl.classList.add("is-added");
        btnEl.innerHTML = "⭐ В карточках";
        btnEl.title = "Уже в карточках! Кликните, чтобы убрать";
      }
      sound.playSuccess();
      state.addXP(5);
      this.showToast(`⭐ Глагол "${verb.v1}" добавлен в твои Карточки B1 (+5 XP)!`);
    } else {
      if (btnEl) {
        btnEl.classList.remove("is-added");
        btnEl.innerHTML = "☆ В карточки";
        btnEl.title = "Добавить в интерактивные карточки";
      }
      sound.playClick();
      this.showToast(`Глагол "${verb.v1}" удалён из карточек.`);
    }
  }

  showToast(msg) {
    const existing = document.querySelector(".verb-toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = "verb-toast";
    toast.innerText = msg;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
    }, 10);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // Логика тренажера
  startNewQuizQuestion() {
    const allVerbs = this.getAllVerbs();
    const randomVerb = allVerbs[Math.floor(Math.random() * allVerbs.length)];
    const types = ["missing_v2", "missing_v3", "full_trio"];
    const chosenType = types[Math.floor(Math.random() * types.length)];

    let correctAnswer = "";
    let questionPrompt = "";
    let options = [];

    if (chosenType === "missing_v2") {
      correctAnswer = randomVerb.v2;
      questionPrompt = `Какая 2-я форма (Past Simple) у глагола: <strong class="hl-verb">${randomVerb.v1}</strong> (${randomVerb.ru})?`;
      
      const wrongSet = new Set();
      while (wrongSet.size < 3) {
        const other = allVerbs[Math.floor(Math.random() * allVerbs.length)];
        const candidate = other.v2;
        if (candidate !== correctAnswer) wrongSet.add(candidate);
      }
      options = [correctAnswer, ...Array.from(wrongSet)];
    } else if (chosenType === "missing_v3") {
      correctAnswer = randomVerb.v3;
      questionPrompt = `Какая 3-я форма (причастие) у глагола: <strong class="hl-verb">${randomVerb.v1} — ${randomVerb.v2} — ...</strong>?`;
      
      const wrongSet = new Set();
      while (wrongSet.size < 3) {
        const other = allVerbs[Math.floor(Math.random() * allVerbs.length)];
        const candidate = other.v3;
        if (candidate !== correctAnswer) wrongSet.add(candidate);
      }
      options = [correctAnswer, ...Array.from(wrongSet)];
    } else {
      correctAnswer = `${randomVerb.v1} — ${randomVerb.v2} — ${randomVerb.v3}`;
      questionPrompt = `Выберите правильное ритмическое трио для значения: <strong class="hl-verb">«${randomVerb.ru}»</strong>:`;
      
      const wrongSet = new Set();
      while (wrongSet.size < 3) {
        const other = allVerbs[Math.floor(Math.random() * allVerbs.length)];
        const candidate = `${other.v1} — ${other.v2} — ${other.v3}`;
        if (candidate !== correctAnswer) wrongSet.add(candidate);
      }
      options = [correctAnswer, ...Array.from(wrongSet)];
    }

    // Перемешиваем варианты
    options.sort(() => Math.random() - 0.5);

    this.quizState = {
      active: true,
      currentVerb: randomVerb,
      questionType: chosenType,
      questionPrompt: questionPrompt,
      correctAnswer: correctAnswer,
      options: options,
      selectedAnswer: null,
      isAnswered: false,
      score: this.quizState.score,
      total: this.quizState.total + 1
    };
  }

  handleQuizAnswer(choice) {
    if (this.quizState.isAnswered) return;

    this.quizState.isAnswered = true;
    this.quizState.selectedAnswer = choice;

    const isCorrect = choice === this.quizState.correctAnswer;
    if (isCorrect) {
      sound.playSuccess();
      state.addXP(15);
      state.incrementStreak();
      this.quizState.score++;
    } else {
      sound.playError();
      state.resetStreak();
    }

    this.render();
  }

  render() {
    const isTrainer = this.currentFamilyId === "trainer";

    if (isTrainer && (!this.quizState.active || !this.quizState.currentVerb)) {
      this.startNewQuizQuestion();
    }

    const currentFam = this.getCurrentFamily();
    const allVerbs = this.getAllVerbs();

    // Фильтр глаголов текущего списка
    let displayVerbs = currentFam ? currentFam.verbs : [];
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      displayVerbs = allVerbs.filter((v) =>
        v.v1.toLowerCase().includes(q) ||
        v.v2.toLowerCase().includes(q) ||
        v.v3.toLowerCase().includes(q) ||
        v.ru.toLowerCase().includes(q) ||
        v.phonetic.toLowerCase().includes(q)
      );
    }

    this.container.innerHTML = `
      <div class="verbs-wrapper">
        <!-- ВЕРХНЯЯ ШАПКА РЕЖИМА -->
        <div class="verbs-header">
          <div class="verbs-header-info">
            <h2>⚡ Неправильные глаголы по Драгункину</h2>
            <p class="subtitle">5 логических семейств вместо алфавитной каши. Понимаем ритм и логику языка!</p>
          </div>
          <div class="verbs-header-search">
            <input type="text" id="verb-search-input" class="verb-search-box" placeholder="🔍 Найти глагол (напр. cut, built, знать)..." value="${this.searchQuery}">
          </div>
        </div>

        <!-- НАВИГАЦИЯ ПО СЕМЕЙСТВАМ И ТРЕНАЖЁРУ -->
        <div class="verbs-family-tabs">
          ${DRAGUNKIN_VERB_FAMILIES.map(
            (fam) => `
            <button class="v-fam-tab-btn ${this.currentFamilyId === fam.id ? "active" : ""}" data-family="${fam.id}">
              <span class="fam-icon">${fam.icon}</span>
              <div class="fam-tab-meta">
                <span class="fam-tab-title">${fam.title.split(". ")[1] || fam.title}</span>
                <span class="fam-tab-count">${fam.verbs.length} гл.</span>
              </div>
            </button>
          `
          ).join("")}
          
          <button class="v-fam-tab-btn trainer-tab-btn ${isTrainer ? "active" : ""}" data-family="trainer">
            <span class="fam-icon">🎯</span>
            <div class="fam-tab-meta">
              <span class="fam-tab-title">Экспресс-тренажёр</span>
              <span class="fam-tab-count">Квиз B1</span>
            </div>
          </button>
        </div>

        <!-- ОСНОВНОЙ КОНТЕНТ (СЕМЕЙСТВО ИЛИ ТРЕНАЖЁР) -->
        <div class="verbs-main-content">
          ${
            isTrainer
              ? this.renderTrainerContent()
              : this.renderFamilyContent(currentFam, displayVerbs)
          }
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  renderFamilyContent(fam, verbs) {
    const isSearching = !!this.searchQuery.trim();

    return `
      <!-- КАРТОЧКА ПРАВИЛА СЕМЕЙСТВА -->
      ${
        !isSearching
          ? `
        <div class="fam-rule-banner">
          <div class="rule-icon">${fam.icon}</div>
          <div class="rule-body">
            <h3>${fam.title}</h3>
            <div class="rule-sub">${fam.subtitle}</div>
            <p class="rule-desc">${fam.ruleDescription}</p>
          </div>
        </div>
      `
          : `
        <div class="fam-rule-banner search-banner">
          <div class="rule-icon">🔍</div>
          <div class="rule-body">
            <h3>Результаты поиска по всем 5 семействам</h3>
            <p class="rule-desc">Найдено глаголов: <strong>${verbs.length}</strong></p>
          </div>
        </div>
      `
      }

      <!-- СПИСОК ГЛАГОЛОВ -->
      <div class="verb-cards-grid">
        ${
          verbs.length === 0
            ? `<div class="empty-verbs-msg">Глаголы не найдены. Попробуйте изменить поисковый запрос.</div>`
            : verbs
                .map((verb) => {
                  const isAdded = flashcardsService.isVerbAdded(verb.v1);
                  return `
            <div class="verb-card">
              <div class="verb-card-top">
                <div class="verb-trio-chips">
                  <span class="v-form-chip v1-chip" title="1-я форма (Infinitive / Present)">
                    <span class="form-tag">V1</span> ${verb.v1}
                  </span>
                  <span class="v-arrow">➔</span>
                  <span class="v-form-chip v2-chip" title="2-я форма (Past Simple)">
                    <span class="form-tag">V2</span> ${verb.v2}
                  </span>
                  <span class="v-arrow">➔</span>
                  <span class="v-form-chip v3-chip" title="3-я форма (Past Participle)">
                    <span class="form-tag">V3</span> ${verb.v3}
                  </span>
                </div>

                <div class="verb-actions-top">
                  <button class="verb-action-btn btn-rhythm" data-v1="${verb.v1}" data-v2="${verb.v2}" data-v3="${verb.v3}" title="Прослушать ритмическое трио (V1 ➔ V2 ➔ V3)">
                    🔊 Ритм
                  </button>
                  <button class="verb-action-btn btn-star-add ${isAdded ? "is-added" : ""}" data-v1="${verb.v1}" title="${isAdded ? "Уже в твоих карточках! Кликните, чтобы убрать" : "Добавить глагол в Карточки B1"}">
                    ${isAdded ? "⭐ В карточках" : "☆ В карточки"}
                  </button>
                </div>
              </div>

              <div class="verb-card-middle">
                <div class="verb-translation">
                  <strong>${verb.ru}</strong>
                  <span class="verb-phonetic-badge">${verb.phonetic}</span>
                </div>
                ${
                  verb.tip
                    ? `<div class="verb-dragunkin-tip">💡 <em>Драгункин:</em> ${verb.tip}</div>`
                    : ""
                }
              </div>

              <div class="verb-card-example">
                <div class="example-text">«${verb.example}»</div>
                <button class="btn-example-speak" data-example="${encodeURIComponent(verb.example)}" title="Озвучить пример предложения">
                  🔊
                </button>
              </div>
            </div>
          `;
                })
                .join("")
        }
      </div>
    `;
  }

  renderTrainerContent() {
    const q = this.quizState;
    if (!q || !q.currentVerb) return `<div class="empty-verbs-msg">Загрузка тренажера...</div>`;

    return `
      <div class="verb-trainer-box">
        <div class="trainer-top-stats">
          <div class="trainer-badge">🎯 Экспресс-тренажёр глаголов</div>
          <div class="trainer-score">Решено верно: <strong>${q.score}</strong> из ${q.total}</div>
        </div>

        <div class="trainer-question-card">
          <div class="trainer-prompt">${q.questionPrompt}</div>

          <div class="trainer-options-grid">
            ${q.options
              .map((opt) => {
                let btnClass = "btn-trainer-opt";
                if (q.isAnswered) {
                  if (opt === q.correctAnswer) {
                    btnClass += " correct-opt";
                  } else if (opt === q.selectedAnswer) {
                    btnClass += " wrong-opt";
                  } else {
                    btnClass += " muted-opt";
                  }
                }
                return `
                <button class="${btnClass}" data-opt="${opt}">
                  ${opt}
                </button>
              `;
              })
              .join("")}
          </div>

          ${
            q.isAnswered
              ? `
            <div class="trainer-feedback-card ${
              q.selectedAnswer === q.correctAnswer ? "fb-success" : "fb-error"
            }">
              <div class="fb-header">
                ${
                  q.selectedAnswer === q.correctAnswer
                    ? "🎉 Абсолютно точно! +15 XP"
                    : "⚠️ Ошибка! Запомните правильный ритм:"
                }
              </div>
              <div class="fb-details">
                <div class="fb-trio-line">
                  <strong>${q.currentVerb.v1}</strong> ➔ 
                  <strong>${q.currentVerb.v2}</strong> ➔ 
                  <strong>${q.currentVerb.v3}</strong>
                  <span class="fb-phonetic">${q.currentVerb.phonetic}</span>
                </div>
                <div class="fb-tip">💡 <em>Правило:</em> ${q.currentVerb.tip}</div>
                <div class="fb-example">«${q.currentVerb.example}»</div>
              </div>
              <div class="fb-actions">
                <button class="btn-primary" id="btn-next-quiz">Следующий вопрос ➔</button>
                <button class="btn-secondary" id="btn-quiz-rhythm">🔊 Прослушать трио</button>
              </div>
            </div>
          `
              : ""
          }
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    // Вкладки семейств
    const tabBtns = this.container.querySelectorAll(".v-fam-tab-btn");
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        sound.playClick();
        this.currentFamilyId = btn.dataset.family;
        this.searchQuery = ""; // сбрасываем поиск при переключении вкладки
        this.render();
      });
    });

    // Живой поиск
    const searchInput = this.container.querySelector("#verb-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        const currentFam = this.getCurrentFamily();
        const allVerbs = this.getAllVerbs();
        let displayVerbs = currentFam ? currentFam.verbs : [];

        if (this.searchQuery.trim()) {
          const q = this.searchQuery.trim().toLowerCase();
          displayVerbs = allVerbs.filter(
            (v) =>
              v.v1.toLowerCase().includes(q) ||
              v.v2.toLowerCase().includes(q) ||
              v.v3.toLowerCase().includes(q) ||
              v.ru.toLowerCase().includes(q) ||
              v.phonetic.toLowerCase().includes(q)
          );
        }

        const mainContent = this.container.querySelector(".verbs-main-content");
        if (mainContent && this.currentFamilyId !== "trainer") {
          mainContent.innerHTML = this.renderFamilyContent(currentFam, displayVerbs);
          this.attachCardActionListeners();
        }
      });
    }

    this.attachCardActionListeners();
  }

  attachCardActionListeners() {
    // Озвучка трио ритма (кнопка "🔊 Ритм")
    const rhythmBtns = this.container.querySelectorAll(".btn-rhythm");
    rhythmBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const { v1, v2, v3 } = btn.dataset;
        btn.classList.add("btn-speaking");
        setTimeout(() => btn.classList.remove("btn-speaking"), 1500);
        this.speakTrio(v1, v2, v3);
      });
    });

    // Переключение добавления в карточки по звёздочке
    const starBtns = this.container.querySelectorAll(".btn-star-add");
    starBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const v1 = btn.dataset.v1;
        const allVerbs = this.getAllVerbs();
        const targetVerb = allVerbs.find((v) => v.v1.toLowerCase() === (v1 || "").toLowerCase());
        if (targetVerb) {
          this.toggleFlashcard(targetVerb, btn);
        }
      });
    });

    // Озвучка примера предложения (колонка 🔊)
    const exSpeakBtns = this.container.querySelectorAll(".btn-example-speak");
    exSpeakBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const text = decodeURIComponent(btn.dataset.example);
        btn.classList.add("btn-speaking");
        setTimeout(() => btn.classList.remove("btn-speaking"), 1800);
        this.speakExample(text);
      });
    });

    // Ответы в тренажере
    const trainerOpts = this.container.querySelectorAll(".btn-trainer-opt");
    trainerOpts.forEach((btn) => {
      btn.addEventListener("click", () => {
        const chosen = btn.dataset.opt;
        this.handleQuizAnswer(chosen);
      });
    });

    // Следующий вопрос тренажера
    const nextBtn = this.container.querySelector("#btn-next-quiz");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        sound.playClick();
        this.startNewQuizQuestion();
        this.render();
      });
    }

    // Озвучка ритма из тренажера
    const quizRhythmBtn = this.container.querySelector("#btn-quiz-rhythm");
    if (quizRhythmBtn && this.quizState.currentVerb) {
      quizRhythmBtn.addEventListener("click", () => {
        const v = this.quizState.currentVerb;
        this.speakTrio(v.v1, v.v2, v.v3);
      });
    }
  }
}
