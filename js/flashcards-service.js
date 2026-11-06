// Сервис управления карточками слов, интервальным повторением и анализом произношения
import { INITIAL_FLASHCARDS } from "./data/flashcards-data.js";
import { state } from "./state.js";

class FlashcardsService {
  constructor() {
    this.storageKey = "my_english_flashcards";
    this.cards = [];
    this.initCards();
  }

  initCards() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const loaded = JSON.parse(saved);
        // Добавляем новые стартовые карточки, если их еще нет в сохраненных
        const existingKeys = new Set(
          loaded.map((c) => (c.id || c.word || "").toLowerCase().trim())
        );
        let hasNew = false;
        INITIAL_FLASHCARDS.forEach((initCard) => {
          const keyId = (initCard.id || "").toLowerCase().trim();
          const keyWord = (initCard.word || "").toLowerCase().trim();
          if (!existingKeys.has(keyId) && !existingKeys.has(keyWord)) {
            loaded.push({ ...initCard });
            existingKeys.add(keyId);
            existingKeys.add(keyWord);
            hasNew = true;
          }
        });
        this.cards = loaded;
        if (hasNew) {
          this.save();
        }
      } else {
        this.cards = [...INITIAL_FLASHCARDS];
        this.save();
      }
    } catch (e) {
      this.cards = [...INITIAL_FLASHCARDS];
    }
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cards));
    } catch (e) {
      console.warn("Ошибка сохранения карточек:", e);
    }
  }

  getAllCards() {
    return this.cards;
  }

  getCardsByCategory(category = "all") {
    if (category === "all") return this.cards;
    return this.cards.filter((c) => c.category === category);
  }

  // Проверка: добавлено ли слово / фраза в карточки
  isWordAdded(word) {
    if (!word) return false;
    const target = word.trim().toLowerCase();
    return this.cards.some((c) => {
      const w = (c.word || "").toLowerCase();
      return w === target || w.startsWith(target + " ") || w.startsWith(target + "—") || w.startsWith(target + " -");
    });
  }

  // Удаление слова / фразы из карточек по слову
  removeWord(word) {
    if (!word) return false;
    const target = word.trim().toLowerCase();
    const initialLen = this.cards.length;
    this.cards = this.cards.filter((c) => {
      const w = (c.word || "").toLowerCase();
      return !(w === target || w.startsWith(target + " ") || w.startsWith(target + "—") || w.startsWith(target + " -"));
    });
    if (this.cards.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Проверка: добавлен ли глагол в карточки
  isVerbAdded(v1) {
    return this.isWordAdded(v1);
  }

  // Переключение состояния добавления глагола (вкл/выкл звёздочки)
  toggleVerbCard(verb) {
    if (!verb || !verb.v1) return { added: false };
    const target = verb.v1.trim().toLowerCase();
    const existingIdx = this.cards.findIndex((c) => {
      const w = (c.word || "").toLowerCase();
      return w === target || w.startsWith(target + " ") || w.startsWith(target + "—") || w.startsWith(target + " -");
    });

    if (existingIdx !== -1) {
      // Удаляем из карточек
      this.cards.splice(existingIdx, 1);
      this.save();
      return { added: false };
    } else {
      // Добавляем в карточки
      const newCard = {
        id: `verb_${verb.v1}_${Date.now()}`,
        word: `${verb.v1} (${verb.v1} — ${verb.v2} — ${verb.v3})`,
        translation: verb.ru,
        phoneticRu: verb.phonetic,
        contextEn: verb.example,
        contextRu: `💡 Драгункин: ${verb.tip || ""}`,
        category: "verbs",
        score: 0,
        addedAt: Date.now()
      };
      this.cards.unshift(newCard);
      this.save();
      return { added: true, card: newCard };
    }
  }

  // Добавление карточки через объект (универсальный метод)
  addCard(cardObj) {
    if (!cardObj) return null;
    const word = cardObj.word || cardObj.front || "";
    const translation = cardObj.translation || cardObj.ru || cardObj.back || "";
    const contextEn = cardObj.contextEn || cardObj.example || "";
    const contextRu = cardObj.contextRu || cardObj.hint || "";
    const category = cardObj.category || "verbs";
    const phoneticRu = cardObj.phoneticRu || cardObj.phonetic || "";
    return this.addWord(word, translation, contextEn, contextRu, category, phoneticRu);
  }

  // Добавление слова из диалога (нажатие на ⭐)
  addWord(word, translation = "", contextEn = "", contextRu = "", category = "casual", phoneticRu = "") {
    const cleanWord = word.trim();
    if (!cleanWord) return false;

    const lower = cleanWord.toLowerCase();
    const existingIdx = this.cards.findIndex((c) => c.word.toLowerCase() === lower);

    if (existingIdx !== -1) {
      // Обновляем контекст, если он новее
      if (contextEn) this.cards[existingIdx].contextEn = contextEn;
      if (contextRu) this.cards[existingIdx].contextRu = contextRu;
      if (phoneticRu) this.cards[existingIdx].phoneticRu = phoneticRu;
      this.save();
      return { card: this.cards[existingIdx], created: false };
    }

    const newCard = {
      id: `card_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      word: cleanWord,
      translation: translation || "перевод слова",
      phoneticRu: phoneticRu || `[${cleanWord.toLowerCase()}]`,
      contextEn: contextEn || `Example with ${cleanWord}`,
      contextRu: contextRu || `Пример со словом ${cleanWord}`,
      category: category || "casual",
      score: 0,
      addedAt: Date.now()
    };

    this.cards.unshift(newCard);
    this.save();
    return { card: newCard, created: true };
  }

  deleteCard(cardId) {
    this.cards = this.cards.filter((c) => c.id !== cardId);
    this.save();
  }

  // Обновление прогресса карточки (система Лейтнера)
  updateCardScore(cardId, isCorrect) {
    const card = this.cards.find((c) => c.id === cardId);
    if (!card) return;

    if (isCorrect) {
      card.score = Math.min((card.score || 0) + 1, 5);
      state.addXP(15);
    } else {
      card.score = Math.max((card.score || 0) - 1, 0);
    }

    card.lastReviewed = Date.now();
    this.save();
  }

  // Сравнение произношения пользователя с эталоном (Тепловая карта звуков)
  comparePronunciation(spokenText, targetWord) {
    const spoken = (spokenText || "").toLowerCase().replace(/[^a-z0-9]/g, "").trim();
    const target = (targetWord || "").toLowerCase().replace(/[^a-z0-9]/g, "").trim();

    if (!spoken || !target) {
      return {
        accuracy: 0,
        level: "red",
        feedbackRu: "Звук не распознан. Попробуйте сказать громче и ближе к микрофону.",
        coloredHtml: `<span class="heat-red">${targetWord}</span>`
      };
    }

    // Точное совпадение
    if (spoken === target) {
      return {
        accuracy: 100,
        level: "green",
        feedbackRu: "🎯 Безупречное произношение! Звучит на 100% чётко и естественно.",
        coloredHtml: `<span class="heat-green">${targetWord}</span>`
      };
    }

    // Проверка типичной ошибки — потерянное окончание -s, -ed, -ing
    if (target.endsWith("s") && spoken === target.slice(0, -1)) {
      return {
        accuracy: 75,
        level: "yellow",
        feedbackRu: "⚠️ Вы потеряли окончание «-s» на конце слова! Произносите его чётко.",
        coloredHtml: `<span class="heat-green">${target.slice(0, -1)}</span><span class="heat-red">s</span>`
      };
    }

    if (target.endsWith("ed") && spoken === target.slice(0, -2)) {
      return {
        accuracy: 75,
        level: "yellow",
        feedbackRu: "⚠️ Потеряно окончание прошедшего времени «-ed»!",
        coloredHtml: `<span class="heat-green">${target.slice(0, -2)}</span><span class="heat-red">ed</span>`
      };
    }

    // Вычисление расстояния Левенштейна
    const dist = this.levenshtein(spoken, target);
    const maxLen = Math.max(spoken.length, target.length);
    const similarity = Math.max(0, Math.round((1 - dist / maxLen) * 100));

    let level = "red";
    let feedbackRu = "Произношение сильно отличается. Нажмите 🐢 и послушайте по слогам!";

    if (similarity >= 85) {
      level = "green";
      feedbackRu = "🟢 Отличное произношение! Собеседник поймёт вас с первого раза.";
    } else if (similarity >= 65) {
      level = "yellow";
      feedbackRu = "🟡 Неплохо, но звук немного смазан. Попробуйте выделить ударный слог.";
    }

    // Подсветка совпадающих и несовпадающих букв
    let coloredHtml = "";
    for (let i = 0; i < target.length; i++) {
      if (i < spoken.length && spoken[i] === target[i]) {
        coloredHtml += `<span class="heat-green">${target[i]}</span>`;
      } else {
        coloredHtml += `<span class="heat-${level}">${target[i]}</span>`;
      }
    }

    return {
      accuracy: similarity,
      level: level,
      feedbackRu: feedbackRu,
      coloredHtml: coloredHtml
    };
  }

  levenshtein(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }
}

export const flashcardsService = new FlashcardsService();
