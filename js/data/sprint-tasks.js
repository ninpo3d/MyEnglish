// Задания для режима «Блиц-спринт / Разговорная реакция» (Speed Sprint)
// Цель: моментально среагировать без паузы на перевод в голове (до 5 секунд на раунд)

export const SPRINT_TASKS = [
  {
    id: "sp_1",
    ru: "Я согласен с тобой.",
    timeLimit: 5,
    options: [
      { text: "I agree with you.", correct: true },
      { text: "I am agree with you.", correct: false },
      { text: "I'm agree with you.", correct: false }
    ],
    ruleTip: "agree — это действие! Никаких «am»!"
  },
  {
    id: "sp_2",
    ru: "У меня вообще нет денег.",
    timeLimit: 5,
    options: [
      { text: "I have no money at all.", correct: true },
      { text: "I don't have no money.", correct: false },
      { text: "I am no money.", correct: false }
    ],
    ruleTip: "Сильное отрицание: have no + предмет."
  },
  {
    id: "sp_3",
    ru: "Ты должен уйти сейчас.",
    timeLimit: 5,
    options: [
      { text: "You must leave now.", correct: true },
      { text: "You must to leave now.", correct: false },
      { text: "You must leaves now.", correct: false }
    ],
    ruleTip: "must — камешек! Без частицы to!"
  },
  {
    id: "sp_4",
    ru: "Вчера я его не видел.",
    timeLimit: 5,
    options: [
      { text: "I didn't see him yesterday.", correct: true },
      { text: "I didn't saw him yesterday.", correct: false },
      { text: "I wasn't see him yesterday.", correct: false }
    ],
    ruleTip: "didn't забрал прошлое ➔ see в 1-й форме!"
  },
  {
    id: "sp_5",
    ru: "Я хочу, чтобы ты помог мне.",
    timeLimit: 5,
    options: [
      { text: "I want you to help me.", correct: true },
      { text: "I want that you help me.", correct: false },
      { text: "I want you help me.", correct: false }
    ],
    ruleTip: "Complex Object: want + you + TO + help."
  },
  {
    id: "sp_6",
    ru: "Куда ты пойдешь завтра?",
    timeLimit: 5,
    options: [
      { text: "Where will you go tomorrow?", correct: true },
      { text: "Where you will go tomorrow?", correct: false },
      { text: "Where do you will go tomorrow?", correct: false }
    ],
    ruleTip: "Рубильник will перескакивает перед you!"
  },
  {
    id: "sp_7",
    ru: "Это моя машина.",
    timeLimit: 5,
    options: [
      { text: "This is my car.", correct: true },
      { text: "This is my a car.", correct: false },
      { text: "This is the my car.", correct: false }
    ],
    ruleTip: "Правило вытеснения: только ОДИН определитель!"
  },
  {
    id: "sp_8",
    ru: "Ты устал?",
    timeLimit: 5,
    options: [
      { text: "Are you tired?", correct: true },
      { text: "Do you tired?", correct: false },
      { text: "Did you tired?", correct: false }
    ],
    ruleTip: "tired — это состояние (to be), а не действие!"
  },
  {
    id: "sp_9",
    ru: "Мне 30 лет.",
    timeLimit: 5,
    options: [
      { text: "I am 30 years old.", correct: true },
      { text: "I have 30 years old.", correct: false },
      { text: "To me 30 years old.", correct: false }
    ],
    ruleTip: "Возраст строится через глагол состояния to be!"
  },
  {
    id: "sp_10",
    ru: "Здесь есть аптека поблизости?",
    timeLimit: 5,
    options: [
      { text: "Is there a pharmacy near here?", correct: true },
      { text: "Are there a pharmacy near here?", correct: false },
      { text: "There is a pharmacy near here?", correct: false }
    ],
    ruleTip: "Наличие в вопросе: Is there... (ед. число)"
  }
];
