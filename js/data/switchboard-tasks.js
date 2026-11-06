// Задания для режима «Трансформер предложений (Рубильники и Времена)»

export const SWITCHBOARD_TASKS = [
  {
    id: "sw_1",
    baseSubject: "You",
    baseVerb: "call",
    baseObject: "me",
    baseModifier: "tomorrow",
    targetSentence: "Will you call me tomorrow?",
    targetDesc: "Преврати фразу в прямой вопрос в будущем времени!",
    ruTarget: "«Ты позвонишь мне завтра?»",
    correctSwitches: {
      tense: "future",
      mode: "question",
      qWord: "none"
    },
    explanation: "В будущем времени рубильник «will» физически перескакивает на 1-е место перед хозяином «you»."
  },
  {
    id: "sw_2",
    baseSubject: "You",
    baseVerb: "call",
    baseObject: "me",
    baseModifier: "tomorrow",
    targetSentence: "You won't call me tomorrow.",
    targetDesc: "Сделай отрицание в будущем времени!",
    ruTarget: "«Ты не позвонишь мне завтра.»",
    correctSwitches: {
      tense: "future",
      mode: "negation",
      qWord: "none"
    },
    explanation: "Отрицатель будущего «won't» (will not) ставится сразу после хозяина «you»."
  },
  {
    id: "sw_3",
    baseSubject: "He",
    baseVerb: "work",
    baseObject: "in this office",
    baseModifier: "every day",
    targetSentence: "Does he work in this office every day?",
    targetDesc: "Задай вопрос про регулярную работу (he / 3-е лицо)!",
    ruTarget: "«Он работает в этом офисе каждый день?»",
    correctSwitches: {
      tense: "present_simple",
      mode: "question",
      qWord: "none"
    },
    explanation: "Для третьего лица (he/she/it) в Present Simple рубильник вопроса — «Does». Он забирает окончание -s, и глагол «work» остается чистым!"
  },
  {
    id: "sw_4",
    baseSubject: "He",
    baseVerb: "work",
    baseObject: "here",
    baseModifier: "yesterday",
    targetSentence: "He didn't work here yesterday.",
    targetDesc: "Поставь отрицание в прошедшем времени!",
    ruTarget: "«Он не работал здесь вчера.»",
    correctSwitches: {
      tense: "past",
      mode: "negation",
      qWord: "none"
    },
    explanation: "Универсальный отрицатель прошлого «didn't» забирает прошедшее время на себя, глагол «work» остается в 1-й форме."
  },
  {
    id: "sw_5",
    baseSubject: "They",
    baseVerb: "live",
    baseObject: "",
    baseModifier: "",
    targetSentence: "Where do they live?",
    targetDesc: "Спроси: «ГДЕ они живут?» (нарасти «Where» влево)",
    ruTarget: "«Где они живут?»",
    correctSwitches: {
      tense: "present_simple",
      mode: "question",
      qWord: "where"
    },
    explanation: "Вопросительное слово «Where» приклеивается в лоб, а перед хозяином «they» стоит рубильник «do»."
  },
  {
    id: "sw_6",
    baseSubject: "You",
    baseVerb: "work",
    baseObject: "here",
    baseModifier: "yesterday",
    targetSentence: "Why did you work here yesterday?",
    targetDesc: "Спроси причину («Почему») в прошедшем времени!",
    ruTarget: "«Почему ты работал здесь вчера?»",
    correctSwitches: {
      tense: "past",
      mode: "question",
      qWord: "why"
    },
    explanation: "«Why» встает в самый лоб, рубильник «did» — перед «you», а глагол «work» — в базовой форме."
  },
  {
    id: "sw_7",
    baseSubject: "She",
    baseVerb: "work",
    baseObject: "",
    baseModifier: "now",
    targetSentence: "Is she working now?",
    targetDesc: "Спроси: работает ли она прямо сейчас («в эфире»)?",
    ruTarget: "«Она работает сейчас?»",
    correctSwitches: {
      tense: "continuous",
      mode: "question",
      qWord: "none"
    },
    explanation: "В режиме «в эфире» глагол to be (is) перепрыгивает в начало, а действие получает окончание -ing (working)."
  },
  {
    id: "sw_8",
    baseSubject: "She",
    baseVerb: "work",
    baseObject: "",
    baseModifier: "now",
    targetSentence: "She is not working now.",
    targetDesc: "Скажи: «Она прямо сейчас НЕ работает» (отрицание в эфире)!",
    ruTarget: "«Она не работает сейчас.»",
    correctSwitches: {
      tense: "continuous",
      mode: "negation",
      qWord: "none"
    },
    explanation: "Отрицатель в эфире ставится после to be: «is not working»."
  },
  {
    id: "sw_9",
    baseSubject: "You",
    baseVerb: "go",
    baseObject: "there",
    baseModifier: "yesterday",
    targetSentence: "When did you go there yesterday?",
    targetDesc: "Спроси «КОГДА ты ходил туда вчера?» в прошедшем времени!",
    ruTarget: "«Когда ты ходил туда вчера?»",
    correctSwitches: {
      tense: "past",
      mode: "question",
      qWord: "when"
    },
    explanation: "Слово «When» приклеивается слева, рубильник «did» перед хозяином «you», глагол — «go» (1 форма)."
  },
  {
    id: "sw_10",
    baseSubject: "He",
    baseVerb: "buy",
    baseObject: "this car",
    baseModifier: "",
    targetSentence: "Did he buy this car?",
    targetDesc: "Задай вопрос в прошедшем времени: «Он купил эту машину?»",
    ruTarget: "«Он купил эту машину?»",
    correctSwitches: {
      tense: "past",
      mode: "question",
      qWord: "none"
    },
    explanation: "Рубильник «Did» перепрыгнул в начало. Так как «Did» забрал прошлое, глагол возвращается в 1-ю форму «buy» (не bought!)."
  }
];
