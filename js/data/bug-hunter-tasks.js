// База заданий для режима «Охотник за багами» (Bug Hunter)
// Механика: даётся предложение. Нужно кликнуть по ошибочному или лишнему слову,
// либо нажать «Ошибок нет». Все задания выверены так, чтобы клик приходился именно
// на ошибочный/лишний элемент, без двусмысленности.

export const BUG_HUNTER_TASKS = [
  {
    id: "bh_1",
    level: "beginner",
    category: "action_vs_state",
    ruleId: "action_vs_state",
    sentence: "I am agree with your opinion.",
    hasError: true,
    errorWordIndex: 1, // "am"
    correctWord: "", // удалить "am"
    explanation: "Слово «agree» — это глагол действия (соглашаться). Место сказуемого занято, поэтому глагол состояния «am» здесь лишний! Правильно: «I agree».",
    correctSentence: "I agree with your opinion."
  },
  {
    id: "bh_2",
    level: "beginner",
    category: "pebbles",
    ruleId: "pebbles",
    sentence: "She must to finish this work today.",
    hasError: true,
    errorWordIndex: 2, // "to"
    correctWord: "", // удалить "to"
    explanation: "«Must» — это модальный «камешек». Камешки неизменяемы и не требуют после себя соединительного мостика «to». Правильно: «She must finish».",
    correctSentence: "She must finish this work today."
  },
  {
    id: "bh_3",
    level: "beginner",
    category: "clothes",
    ruleId: "clothes",
    sentence: "This is my a car.",
    hasError: true,
    errorWordIndex: 3, // "a"
    correctWord: "", // удалить "a"
    explanation: "Правило вытеснения определителей: перед существительным может быть только ОДИН элемент «одежды». Нельзя ставить «my» и «a» вместе. Правильно: «This is my car».",
    correctSentence: "This is my car."
  },
  {
    id: "bh_4",
    level: "beginner",
    category: "skeleton",
    ruleId: "skeleton",
    sentence: "There is cold outside today.",
    hasError: true,
    errorWordIndex: 0, // "There" -> "It"
    correctWord: "It",
    explanation: "Погода, температура и состояние окружающей среды («Холодно», «Темно») в роли Хозяина требуют местоимение «It», а не конструкцию наличия «There». Правильно: «It is cold outside today».",
    correctSentence: "It is cold outside today."
  },
  {
    id: "bh_4_b",
    level: "beginner",
    category: "skeleton",
    ruleId: "skeleton",
    sentence: "Me is cold in this room.",
    hasError: true,
    errorWordIndex: 0, // "Me" -> "I am"
    correctWord: "I am",
    explanation: "Русские фразы «Мне холодно», «Мне жаль», «Мне 30» в английском строятся от первого лица, где хозяином выступаете вы сами: «I am cold», а не «Me is cold».",
    correctSentence: "I am cold in this room."
  },
  {
    id: "bh_5",
    level: "beginner",
    category: "strong_negation",
    ruleId: "strong_negation",
    sentence: "Yesterday I didn't went to the gym.",
    hasError: true,
    errorWordIndex: 3, // "went" -> "go"
    correctWord: "go",
    explanation: "Помощник «didn't» уже забрал на себя все прошедшее время. Смысловой глагол возвращается в свою первую базовую словарную форму: «didn't go».",
    correctSentence: "Yesterday I didn't go to the gym."
  },
  {
    id: "bh_6",
    level: "beginner",
    category: "action_vs_state",
    ruleId: "action_vs_state",
    sentence: "Do you tired after work?",
    hasError: true,
    errorWordIndex: 0, // "Do" -> "Are"
    correctWord: "Are",
    explanation: "«Tired» (уставший) — это состояние (прилагательное), а не глагол действия. С состояниями помощник «Do» не работает, здесь нужен «to be»: «Are you tired?».",
    correctSentence: "Are you tired after work?"
  },
  {
    id: "bh_7",
    level: "intermediate",
    category: "complex_object",
    ruleId: "complex_object",
    sentence: "I want that you help me.",
    hasError: true,
    errorWordIndex: 2, // "that" - лишнее слово!
    correctWord: "",
    explanation: "Слово «that» здесь лишнее! Вместо русского придаточного «хочу, чтобы...» англичане используют прямой «бутерброд» Complex Object: want + [кого: you] + to + [действие: help]. Правильно: «I want you to help me».",
    correctSentence: "I want you to help me."
  },
  {
    id: "bh_8",
    level: "intermediate",
    category: "switches",
    ruleId: "switches",
    sentence: "Where did you went yesterday?",
    hasError: true,
    errorWordIndex: 3, // "went" -> "go"
    correctWord: "go",
    explanation: "Рубильник прошедшего времени «did» уже вынесен вперед и забрал всё прошлое на себя. Смысловой глагол обязан быть в 1-й форме: «Where did you go?».",
    correctSentence: "Where did you go yesterday?"
  },
  {
    id: "bh_9",
    level: "intermediate",
    category: "pebbles",
    ruleId: "pebbles",
    sentence: "He cans swim very fast.",
    hasError: true,
    errorWordIndex: 1, // "cans" -> "can"
    correctWord: "can",
    explanation: "Модальный камешек «can» абсолютно неизменяем! К нему никогда не прибавляются окончания -s, -ed или -ing: «He can swim».",
    correctSentence: "He can swim very fast."
  },
  {
    id: "bh_10",
    level: "intermediate",
    category: "skeleton",
    ruleId: "skeleton",
    sentence: "I have 30 years old.",
    hasError: true,
    errorWordIndex: 1, // "have" -> "am"
    correctWord: "am",
    explanation: "Возраст в английском языке выражается через состояние глагола to be («Я являюсь 30-летним»), а не через владение «have». Правильно: «I am 30 years old».",
    correctSentence: "I am 30 years old."
  },
  {
    id: "bh_11",
    level: "intermediate",
    category: "clothes",
    ruleId: "clothes",
    sentence: "I bought a very delicious apples yesterday.",
    hasError: true,
    errorWordIndex: 2, // "a"
    correctWord: "", // удалить артикль
    explanation: "Артикль «a/an» произошел от слова «один» и используется только с единственным числом! Перед множественным («apples») его ставить нельзя.",
    correctSentence: "I bought very delicious apples yesterday."
  },
  {
    id: "bh_12",
    level: "intermediate",
    category: "pebbles",
    ruleId: "pebbles",
    sentence: "I want for to drink some water.",
    hasError: true,
    errorWordIndex: 2, // "for" - лишнее слово
    correctWord: "",
    explanation: "Слово «for» здесь лишнее! Два обычных глагола соединяются одним чистым мостиком «to»: «I want to drink».",
    correctSentence: "I want to drink some water."
  },
  {
    id: "bh_13",
    level: "tricky",
    category: "complex_object",
    ruleId: "complex_object",
    sentence: "She wants he to come early.",
    hasError: true,
    errorWordIndex: 2, // "he" -> "him"
    correctWord: "him",
    explanation: "В конструкции Complex Object местоимение стоит в объектной форме («Кого?»): he -> him. «She wants HIM to come».",
    correctSentence: "She wants him to come early."
  },
  {
    id: "bh_14",
    level: "tricky",
    category: "strong_negation",
    ruleId: "strong_negation",
    sentence: "I have no any questions.",
    hasError: true,
    errorWordIndex: 2, // "any"
    correctWord: "",
    explanation: "Конструкция «have no» уже самодостаточна и категорична. Слово «any» с отрицанием «no» не ставится: либо «have no questions», либо «don't have any questions».",
    correctSentence: "I have no questions."
  },
  {
    id: "bh_15",
    level: "tricky",
    category: "irregular_verbs",
    ruleId: "irregular_verbs",
    sentence: "He costed me a lot of money.",
    hasError: true,
    errorWordIndex: 1, // "costed" -> "cost"
    correctWord: "cost",
    explanation: "Глагол «cost» относится к 1-й легкой группе неправильных глаголов, где все три формы совпадают: cost - cost - cost!",
    correctSentence: "He cost me a lot of money."
  },
  {
    id: "bh_16",
    level: "tricky",
    category: "clothes",
    ruleId: "clothes",
    sentence: "There are a big mirror in the bathroom.",
    hasError: true,
    errorWordIndex: 1, // "are" -> "is"
    correctWord: "is",
    explanation: "Зеркало («a big mirror») в единственном числе, поэтому конструкция местонахождения требует «There is», а не «There are».",
    correctSentence: "There is a big mirror in the bathroom."
  },
  {
    id: "bh_17",
    level: "tricky",
    category: "pebbles",
    ruleId: "pebbles",
    sentence: "I would like ordering a cup of tea.",
    hasError: true,
    errorWordIndex: 3, // "ordering" -> "to order"
    correctWord: "to order",
    explanation: "После устойчивой вежливой связки «would like» глагол присоединяется через мостик «to» («would like TO order»), а не через -ing.",
    correctSentence: "I would like to order a cup of tea."
  },
  {
    id: "bh_18",
    level: "beginner",
    category: "four_tenses",
    ruleId: "four_tenses",
    sentence: "I am work at the hospital right now.",
    hasError: true,
    errorWordIndex: 2, // "work" -> "working"
    correctWord: "working",
    explanation: "Режим «в эфире» (прямо сейчас) строится по формуле: to be + глагол с окончанием -ing! Правильно: «I am working right now».",
    correctSentence: "I am working at the hospital right now."
  },
  {
    id: "bh_19",
    level: "beginner",
    category: "clothes",
    ruleId: "clothes",
    sentence: "I see a very good cars on the street.",
    hasError: true,
    errorWordIndex: 2, // "a"
    correctWord: "",
    explanation: "Слово «cars» во множественном числе! Неопределенный артикль «a» произошел от «one» (один) и с множественным числом не употребляется.",
    correctSentence: "I see very good cars on the street."
  }
];
