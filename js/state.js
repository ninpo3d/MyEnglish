// Управление состоянием приложения, опытом (XP), уровнями и прогрессом

const STORAGE_KEY = "my_english_dragunkin_progress_v1";

class AppState {
  constructor() {
    this.data = this.loadState();
    this.listeners = [];
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Не удалось прочитать localStorage, используется начальное состояние", e);
    }

    return {
      xp: 0,
      level: 1,
      streak: 0,
      bestStreak: 0,
      solvedTasks: {
        builder: [],
        bugHunter: [],
        switchboard: [],
        quiz: []
      },
      stats: {
        totalCorrect: 0,
        totalErrors: 0
      }
    };
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.warn("Ошибка сохранения в localStorage", e);
    }
    this.notify();
  }

  addXP(amount) {
    this.data.xp += amount;
    this.data.streak += 1;
    if (this.data.streak > this.data.bestStreak) {
      this.data.bestStreak = this.data.streak;
    }
    this.data.stats.totalCorrect += 1;

    // Расчет уровня (каждые 100 XP - новый уровень)
    this.data.level = Math.floor(this.data.xp / 100) + 1;
    this.save();
  }

  registerError() {
    this.data.streak = 0;
    this.data.stats.totalErrors += 1;
    this.save();
  }

  markSolved(mode, taskId) {
    if (!this.data.solvedTasks[mode].includes(taskId)) {
      this.data.solvedTasks[mode].push(taskId);
      this.save();
    }
  }

  resetProgress() {
    localStorage.removeItem(STORAGE_KEY);
    this.data = this.loadState();
    this.notify();
  }

  subscribe(callback) {
    this.listeners.push(callback);
  }

  notify() {
    this.listeners.forEach(cb => cb(this.data));
  }
}

export const state = new AppState();
