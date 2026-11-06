// Золотые 20% английской грамматики (по методике Драгункина / Парето)
export const GRAMMAR_RULES = [
  {
    id: "skeleton",
    number: "01",
    title: "Скелет предложения и «Хозяин»",
    shortDesc: "Фиксированный порядок [Кто] + [Что делает] + [Кого] + [Где] + [Когда] и обязательный субъект.",
    keyPoints: [
      "В английском нет предложений без подлежащего (Хозяина).",
      "Безличные фразы («Холодно», «Темно») требуют формального хозяина: **It is cold**, **It is late**.",
      "Если нет действия («Я дома», «Он врач»), ставим глагол состояния: **I am at home**, **He is a doctor**.",
      "Возраст и самочувствие («Мне 35», «Мне холодно») строятся от первого лица: **I am 35**, **I am cold**.",
      "Частотные наречия (always, usually, never) ставятся ПЕРЕД глаголом действия, но ПОСЛЕ to be."
    ],
    formula: "[Хозяин] ➔ [Глагол / to be] ➔ [Объект] ➔ [Место] ➔ [Время]",
    examples: [
      { en: "I always drink coffee at home in the morning.", ru: "Я всегда пью кофе дома утром." },
      { en: "It is cold outside today.", ru: "На улице сегодня холодно." },
      { en: "I am ready.", ru: "Я готов." }
    ]
  },
  {
    id: "pebbles",
    number: "02",
    title: "Модальные «Камешки» и мостик to",
    shortDesc: "Неизменяемые элементы (can, must, should, would...) и правило соединения глаголов.",
    keyPoints: [
      "Камешки НЕ меняются: никаких окончаний -s, -ed, -ing (He can, а не He cans).",
      "Камешки НЕ терпят частицы to: **I must work**, **I can swim** (НЕ I must to work).",
      "Два камешка нельзя ставить подряд (не бывает 'will can').",
      "Мостик **to** соединяет ДВА обычных глагола: **I want TO drink**, **I plan TO leave**.",
      "Перед глаголом to часто означает «чтобы»: **I eat to live** (Я ем, чтобы жить).",
      "Исключение вежливости: **would like to** (хотел бы)."
    ],
    formula: "[Камешек: can/must/should/would/may] + [V1 без to]  VS  [Обычный глагол] + TO + [V1]",
    examples: [
      { en: "I can help you right now.", ru: "Я могу помочь тебе прямо сейчас." },
      { en: "I want to help you.", ru: "Я хочу помочь тебе." },
      { en: "I would like to order coffee.", ru: "Я хотел бы заказать кофе." }
    ]
  },
  {
    id: "action_vs_state",
    number: "03",
    title: "Фильтр «Действие vs Состояние»",
    shortDesc: "to be против do/does/did: две непересекающиеся вселенные.",
    keyPoints: [
      "Действие (work, agree, know) работает с помощниками **do / does / did**.",
      "Состояние / статус / эмоция (ready, tired, sure, at home) работает только с **am / is / are / was / were**.",
      "Грубейшая ошибка: **I am agree** (agree — это глагол! Правильно: **I agree**).",
      "Грубейшая ошибка: **Do you tired?** (tired — состояние! Правильно: **Are you tired?**)."
    ],
    formula: "Действие: Do/Does/Did + V1? | Состояние: Am/Is/Are/Was/Were + Прилагательное/Место?",
    examples: [
      { en: "Do you agree with me?", ru: "Ты согласен со мной? (Действие: agree)" },
      { en: "Are you sure about this?", ru: "Ты уверен в этом? (Состояние: sure)" },
      { en: "I didn't work yesterday.", ru: "Вчера я не работал." },
      { en: "I wasn't ready yesterday.", ru: "Вчера я не был готов." }
    ]
  },
  {
    id: "four_tenses",
    number: "04",
    title: "Четыре базовых времени (80% речи)",
    shortDesc: "Present Simple, Present Continuous (в эфире), Past Simple и Future (will/gonna).",
    keyPoints: [
      "**Present Simple**: регулярный факт. Глагол как в словаре, для he/she/it добавляем **-s** (He works). Помощники: do / does.",
      "**Present Continuous**: процесс «в эфире» прямо сейчас. Формула: **am/is/are + V-ing** (I am working now).",
      "**Past Simple**: завершенный факт в прошлом. V2 или окончание **-ed**. Отрицание и вопрос через **did**.",
      "**Future Simple**: спонтанное будущее **will + V1** или разговорное запланированное **gonna** (I'm gonna leave)."
    ],
    formula: "Факт: V / V-s | В эфире: be + V-ing | Прошлое: V2 / did | Будущее: will + V1 / gonna",
    examples: [
      { en: "I work every day.", ru: "Я работаю каждый день (регулярность)." },
      { en: "I am working right now.", ru: "Я работаю прямо сейчас (в эфире)." },
      { en: "I worked / did work yesterday.", ru: "Я работал вчера." },
      { en: "I will call you tomorrow.", ru: "Я позвоню тебе завтра." }
    ]
  },
  {
    id: "strong_negation",
    number: "05",
    title: "Сильное отрицание `have no` и `didn't`",
    shortDesc: "Категоричное отсутствие предметов и единый отрицатель прошлого.",
    keyPoints: [
      "Вместо сложного don't have: **have no + [предмет]** (I have no time, He has no choice).",
      "В прошлом времени: **had no + [предмет]** (We had no problems).",
      "Усилитель в конец предложения: **at all** (I have no questions at all! — Вообще никаких вопросов!).",
      "Универсальный отрицатель прошлого для действий: **didn't** со всеми лицами (I didn't, He didn't).",
      "Поскольку did забрал прошедшее время, смысловой глагол возвращается в 1 форму: **I didn't buy** (НЕ didn't bought!)."
    ],
    formula: "Отрицание предметов: have/has/had NO + предмет [at all] | Отрицание действий: didn't + V1",
    examples: [
      { en: "I have no money at all.", ru: "У меня вообще нет денег." },
      { en: "She had no idea.", ru: "Она понятия не имела." },
      { en: "I didn't see him yesterday.", ru: "Я не видел его вчера." }
    ]
  },
  {
    id: "switches",
    number: "06",
    title: "Золотое правило вопросов (Рубильники)",
    shortDesc: "Перескок рубильника перед Хозяином и наращивание вопросительных слов влево.",
    keyPoints: [
      "Прямое утверждение: [Хозяин] + [Рубильник/Глагол] -> **You will call me.**",
      "Прямой вопрос: Рубильник ПЕРЕПРЫГИВАЕТ перед хозяином -> **Will you call me?**",
      "Придаточное предложение (союз): порядок прямой -> **When you will call me...**",
      "Наращивание влево: Вопросительные слова (Where, Why, When, What, How) просто приклеиваются в лоб вопроса, не ломая рубильник: **Where did you go?**, **Why do you work here?**"
    ],
    formula: "[Вопрос-слово] ➔ [РУБИЛЬНИК: do/did/will/am/can] ➔ [Хозяин] ➔ [Глагол V1] ?",
    examples: [
      { en: "Will you help me?", ru: "Ты поможешь мне? (Рубильник will впереди)" },
      { en: "Where did you buy this?", ru: "Где ты это купил? (Where + did + you + buy)" },
      { en: "Why are you here?", ru: "Почему ты здесь? (Why + are + you + here)" }
    ]
  },
  {
    id: "irregular_verbs",
    number: "07",
    title: "Неправильные глаголы и «костыль» did",
    shortDesc: "3 колонки, разговорный спасательный круг did+V1 и 3 легкие группы.",
    keyPoints: [
      "1 колонка: Словарная форма / Инфинитив (go, buy).",
      "2 колонка: Прошедший факт в Past Simple (went, bought).",
      "3 колонка: Пассивное определение / «Какой?» (written — написанный, done — сделанный).",
      "«Костыль» Драгункина: Забыл 2 форму? Скажи **did + 1-я форма**! Вместо I went -> **I did go**. Это абсолютно понятно и грамматично (усилительная форма).",
      "Группа 1: Совпадают все 3 (cut-cut-cut, put-put-put, cost-cost-cost).",
      "Группа 2: Совпадают 2 и 3 (buy-bought-bought, make-made-made, bring-brought-brought).",
      "Группа 3: Музыка i -> a -> u (sing-sang-sung, drink-drank-drunk, begin-began-begun)."
    ],
    formula: "Забыл форму? did + V1 (I did see, I did come)",
    examples: [
      { en: "I went home / I did go home.", ru: "Я пошел домой (точный глагол / костыль)." },
      { en: "She cut the cake.", ru: "Она порезала торт (cut-cut-cut)." },
      { en: "We drank tea.", ru: "Мы пили чай (drink-drank-drunk)." }
    ]
  },
  {
    id: "clothes",
    number: "08",
    title: "«Одежда для существительных» и there is/are",
    shortDesc: "Существительное не бывает голым. Правило одного определителя из 20.",
    keyPoints: [
      "Существительное в ед. числе обязано иметь «одежду» (определитель): **a car**, **the car**, **my car**.",
      "Правило вытеснения: Только ОДИН определитель! Нельзя говорить 'this my car' или 'my a friend'.",
      "Группы: Притяжательные (my, your, his...), Указательные (this, that, these, those), Артикли (a/an — какой-то один, the — конкретный/тот самый).",
      "Наличие чего-то где-то (когда собеседник еще не знает): **There is / There are** (There is a problem, There are two pens). Вопрос: **Is there Wi-Fi here?**"
    ],
    formula: "[ОДИН определитель: a / the / my / this] + [Существительное] | Наличие: There is (ед.ч) / There are (мн.ч)",
    examples: [
      { en: "This is my car. (НЕ This is my a car)", ru: "Это моя машина." },
      { en: "There is an apple on the table.", ru: "На столе (лежит) яблоко." },
      { en: "Is there a pharmacy near here?", ru: "Здесь поблизости есть аптека?" }
    ]
  },
  {
    id: "complex_object",
    number: "09",
    title: "Разговорный бутерброд `Complex Object`",
    shortDesc: "«Хочу кого-то сделать что-то» без сложного придаточного со словом «чтобы».",
    keyPoints: [
      "Русская мысль: «Я хочу, чтобы ты помог мне». Англичанин говорит проще: «Я хочу ТЕБЯ помочь мне».",
      "Формула: **[Хозяин] + want / would like + [Кого?] + TO + [Действие]**.",
      "Формы «Кого?»: me (меня), you (тебя/вас), him (его), her (её), us (нас), them (их).",
      "Мостик **to** перед глаголом строго обязателен: **I want him TO call me**."
    ],
    formula: "[Кто] + want / would like + [me / him / her / you / us / them] + TO + [V1]",
    examples: [
      { en: "I want you to help me.", ru: "Я хочу, чтобы ты помог мне." },
      { en: "She wants him to stay.", ru: "Она хочет, чтобы он остался." },
      { en: "We would like them to come.", ru: "Мы хотели бы, чтобы они пришли." }
    ]
  }
];
