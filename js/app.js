// Главный входной файл приложения (App Coordinator)
import { state } from "./state.js";
import { sound } from "./audio.js";
import { BuilderMode } from "./modes/builder.js";
import { BugHunterMode } from "./modes/bug-hunter.js";
import { SwitchboardMode } from "./modes/switchboard.js";
import { ListeningMode } from "./modes/listening.js";
import { SprintMode } from "./modes/sprint.js";
import { ScenariosMode } from "./modes/scenarios.js";
import { FlashcardsMode } from "./modes/flashcards.js";
import { VerbsMode } from "./modes/verbs.js";
import { QuizMode } from "./modes/quiz.js";
import { HandbookView } from "./handbook.js";

class EnglishTrainerApp {
  constructor() {
    this.currentTab = "builder";
    this.modes = {};
  }

  init() {
    this.container = document.getElementById("main-content");
    this.initHeader();
    this.initTabs();
    this.initModes();
    this.switchTab("builder");
    this.checkOriginProtocol();

    state.subscribe(() => this.updateStatsHeader());
  }

  checkOriginProtocol() {
    if (window.location.protocol === "file:") {
      const banner = document.createElement("div");
      banner.className = "protocol-hint-banner";
      banner.innerHTML = `
        <span>💡 <strong>Совет для микрофона:</strong> в режиме файла браузер спрашивает разрешение при каждом клике. Чтобы микрофон запомнился навсегда — запустите <code>start.bat</code> (http://localhost:8080).</span>
        <button class="banner-close" title="Закрыть">×</button>
      `;
      document.body.insertBefore(banner, document.body.firstChild);
      banner.querySelector(".banner-close").addEventListener("click", () => banner.remove());
    }
  }

  initHeader() {
    this.updateStatsHeader();

    const soundBtn = document.getElementById("btn-toggle-sound");
    if (soundBtn) {
      soundBtn.addEventListener("click", () => {
        const enabled = sound.toggleSound();
        soundBtn.innerHTML = enabled ? "🔊 Звук: ВКЛ" : "🔇 Звук: ВЫКЛ";
        soundBtn.classList.toggle("sound-muted", !enabled);
        if (enabled) sound.playClick();
      });
    }

    const resetBtn = document.getElementById("btn-reset-stats");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (confirm("Сбросить весь накопленный опыт и прогресс тренировок?")) {
          state.resetProgress();
          sound.playClick();
        }
      });
    }
  }

  updateStatsHeader() {
    const data = state.data;
    const levelEl = document.getElementById("stat-level");
    const xpEl = document.getElementById("stat-xp");
    const streakEl = document.getElementById("stat-streak");

    if (levelEl) levelEl.innerText = `Уровень ${data.level}`;
    if (xpEl) xpEl.innerText = `${data.xp} XP`;
    if (streakEl) streakEl.innerText = `🔥 ${data.streak}`;
  }

  initTabs() {
    const tabBtns = document.querySelectorAll(".nav-tab-btn");
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetTab = btn.dataset.tab;
        sound.playClick();
        this.switchTab(targetTab);
      });
    });
  }

  initModes() {
    this.modes = {
      builder: new BuilderMode(this.container),
      hunter: new BugHunterMode(this.container),
      switchboard: new SwitchboardMode(this.container),
      listening: new ListeningMode(this.container),
      sprint: new SprintMode(this.container),
      scenarios: new ScenariosMode(this.container),
      flashcards: new FlashcardsMode(this.container),
      verbs: new VerbsMode(this.container),
      quiz: new QuizMode(this.container),
      handbook: new HandbookView(this.container)
    };
  }

  switchTab(tabId) {
    this.currentTab = tabId;

    // Обновляем визуальный активный таб
    const tabBtns = document.querySelectorAll(".nav-tab-btn");
    tabBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === tabId);
    });

    // Запускаем режим
    if (this.modes[tabId]) {
      this.modes[tabId].init();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new EnglishTrainerApp();
  app.init();
});
