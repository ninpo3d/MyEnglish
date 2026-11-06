// Задания для режима «Экспресс-Тест / Quiz»
// Варианты ответов перемешиваются кодом QuizMode автоматически!

export const QUIZ_TASKS = [
  {
    id: "q_1",
    question: "Как правильно перевести фразу «Я согласен с тобой»?",
    options: [
      { text: "I agree with you.", correct: true },
      { text: "I am agree with you.", correct: false },
      { text: "I do agree you.", correct: false },
      { text: "I am agreed with you.", correct: false }
    ],
    ruleId: "action_vs_state",
    explanation: "«Agree» — это глагол действия (соглашаться). Место сказуемого занято, поэтому глагол состояния «am» ставить нельзя. Правильно: I agree with you."
  },
  {
    id: "q_2",
    question: "Чем принципиально отличается вопрос «When will you call me?» от фразы «when you will call me»?",
    options: [
      { text: "В прямом вопросе рубильник will перепрыгивает перед хозяином you.", correct: true },
      { text: "В прямом вопросе слово will переводится в прошедшее время.", correct: false },
      { text: "Разницы нет, оба варианта являются одинаковыми вопросами.", correct: false },
      { text: "Во втором случае используется частица to перед call.", correct: false }
    ],
    ruleId: "switches",
    explanation: "Вынос переключателя-рубильника (will) вперед дает сигнал о прямом вопросе. Порядок «you will» используется только в обычных утверждениях или придаточных предложениях."
  },
  {
    id: "q_3",
    question: "Почему в предложении «It is cold» обязательно нужно слово «It»?",
    options: [
      { text: "Потому что в английском не бывает предложений без «Хозяина» (подлежащего).", correct: true },
      { text: "Потому что «It» переводится как «погода».", correct: false },
      { text: "Потому что без «It» глагол «is» превратится в «are».", correct: false },
      { text: "Это просто исключение для зимнего времени года.", correct: false }
    ],
    ruleId: "skeleton",
    explanation: "В английском языке порядок слов жесткий, и место подлежащего не может пустовать. В безличных фразах («Холодно», «Темно») роль формального хозяина берёт на себя «It»."
  },
  {
    id: "q_4",
    question: "Нужна ли частица «to» в предложении «I must (to) finish this work»?",
    options: [
      { text: "НЕТ, потому что must — это модальный «камешек».", correct: true },
      { text: "ДА, потому что здесь два глагола подряд.", correct: false },
      { text: "ДА, если действие происходит сегодня.", correct: false },
      { text: "На усмотрение говорящего, оба варианта равнозначны.", correct: false }
    ],
    ruleId: "pebbles",
    explanation: "«Must» — неизменяемый модальный элемент («камешек»). После камешков смысловой глагол берется прямо из словаря без мостика to."
  },
  {
    id: "q_5",
    question: "Как звучит вежливая фраза «Я бы хотел купить этот дом»?",
    options: [
      { text: "I would like to buy this house.", correct: true },
      { text: "I will can buy this house.", correct: false },
      { text: "I want buy this house.", correct: false },
      { text: "I would buy to this house.", correct: false }
    ],
    ruleId: "pebbles",
    explanation: "Для вежливых просьб и желаний («хотел бы») используется устойчивая формула «would like to + глагол»."
  },
  {
    id: "q_6",
    question: "Как сказать «У меня вообще нет времени», используя сильное отрицание Драгункина?",
    options: [
      { text: "I have no time at all!", correct: true },
      { text: "I don't have no time at all!", correct: false },
      { text: "I am no have time.", correct: false },
      { text: "I didn't have no time.", correct: false }
    ],
    ruleId: "strong_negation",
    explanation: "Сильное отрицание предметов строится по схеме «have no + [предмет]», а усилитель «at all» (вообще/совсем) ставится в конец."
  },
  {
    id: "q_7",
    question: "Как сказать «Я хочу, чтобы он позвонил мне» по схеме Complex Object?",
    options: [
      { text: "I want him to call me.", correct: true },
      { text: "I want that he will call me.", correct: false },
      { text: "I want he to call me.", correct: false },
      { text: "I want him call me.", correct: false }
    ],
    ruleId: "complex_object",
    explanation: "Формула «бутерброда»: [Кто] + want + [Кого: him] + [мостик: to] + [действие: call] + me. Никаких «that he will»!"
  },
  {
    id: "q_8",
    question: "Какая ошибка допущена во фразе: «This is my a car»?",
    options: [
      { text: "Нарушено правило вытеснения определителей (нельзя два определителя подряд).", correct: true },
      { text: "Пропущено слово «very».", correct: false },
      { text: "Слово «car» должно стоять перед словом «my».", correct: false },
      { text: "Вместо «is» нужно использовать «are».", correct: false }
    ],
    ruleId: "clothes",
    explanation: "Правило «Одежды для существительного»: перед словом в ед. числе может стоять только ОДИН определитель из 20. Нельзя ставить «my» и «a» вместе. Правильно: «This is my car» или «This is a car»."
  },
  {
    id: "q_9",
    question: "Как перевести «Вчера я не ходил на работу», используя отрицатель Past Simple?",
    options: [
      { text: "Yesterday I didn't go to work.", correct: true },
      { text: "Yesterday I didn't went to work.", correct: false },
      { text: "Yesterday I not went to work.", correct: false },
      { text: "Yesterday I wasn't go to work.", correct: false }
    ],
    ruleId: "strong_negation",
    explanation: "Помощник «didn't» забирает прошедшее время на себя, поэтому смысловой глагол возвращается в 1 форму: «didn't go» (а не went!)."
  },
  {
    id: "q_10",
    question: "Какая конструкция используется, чтобы спросить: «Здесь есть Wi-Fi?»",
    options: [
      { text: "Is there Wi-Fi here?", correct: true },
      { text: "There is Wi-Fi here?", correct: false },
      { text: "Does it have Wi-Fi here?", correct: false },
      { text: "Has there Wi-Fi here?", correct: false }
    ],
    ruleId: "clothes",
    explanation: "Для наличия чего-то используется «There is / There are». В вопросе рубильник перескакивает вперед: «Is there Wi-Fi here?»."
  },
  {
    id: "q_11",
    question: "В чем разница между «I drink coffee» и «I am drinking coffee»?",
    options: [
      { text: "Первое — регулярная привычка (факт), второе — процесс «в эфире» прямо сейчас.", correct: true },
      { text: "Первое говорится утром, второе — вечером.", correct: false },
      { text: "Разницы нет, это синонимы в разговорной речи.", correct: false },
      { text: "Второе означает, что кофе невкусный.", correct: false }
    ],
    ruleId: "four_tenses",
    explanation: "Present Simple (I drink) выражает привычку или регулярный жизненный факт. Present Continuous (I am drinking) — режим «в эфире» непосредственно в момент речи."
  },
  {
    id: "q_12",
    question: "Как по-английски звучит спасательный «костыль» Драгункина, если вы забыли вторую форму глагола «went» (ушел)?",
    options: [
      { text: "I did go", correct: true },
      { text: "I was go", correct: false },
      { text: "I had go", correct: false },
      { text: "I do went", correct: false }
    ],
    ruleId: "irregular_verbs",
    explanation: "Если забыли форму прошедшего времени, связка «did + словарная форма (V1)» полностью передает смысл прошедшего факта и грамматически безупречна: «I did go» вместо «I went»."
  },
  {
    id: "q_13",
    question: "Как правильно сказать по схеме Complex Object: «Они хотят, чтобы МЫ помогли им»?",
    options: [
      { text: "They want us to help them.", correct: true },
      { text: "They want we to help them.", correct: false },
      { text: "They want that we help them.", correct: false },
      { text: "They want our to help them.", correct: false }
    ],
    ruleId: "complex_object",
    explanation: "В «бутерброде» местоимение «мы» ставится в форму «Кого?» ➔ «us» + мостик to + help. «They want US to help them»."
  },
  {
    id: "q_14",
    question: "Почему конструкция «I will can come» абсолютно недопустима в английском?",
    options: [
      { text: "Два модальных камешка (will и can) запрещено ставить подряд.", correct: true },
      { text: "Слово can не используется со словом come.", correct: false },
      { text: "Потому что can пишется только с частицей to.", correct: false },
      { text: "Она допустима в американском сленге.", correct: false }
    ],
    ruleId: "pebbles",
    explanation: "Железное свойство «камешков»: два неизменяемых модальных элемента не могут сцепляться друг с другом. Для будущего времени от can используют оборот «will be able to»."
  },
  {
    id: "q_15",
    question: "Как перевести «У нас вчера вообще не было проблем», используя сильное отрицание прошлого?",
    options: [
      { text: "We had no problems yesterday at all.", correct: true },
      { text: "We did have no any problems yesterday.", correct: false },
      { text: "We were no problems yesterday.", correct: false },
      { text: "We hadn't no problems yesterday.", correct: false }
    ],
    ruleId: "strong_negation",
    explanation: "Отрицание предметов в прошлом: had no + предмет + усилитель «at all» в конец фразы: «We had no problems yesterday at all»."
  }
];
