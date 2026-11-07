(() => {

/* --- js/data/rules.js --- */
// Золотые 20% английской грамматики (по методике Драгункина / Парето)
const GRAMMAR_RULES = [
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


/* --- js/data/connectors.js --- */
// Разговорные коннекторы и связки уровня B1 (Conversational Connectors & Fillers)
// Слова-спасатели, которые дают мозгу 1-2 секунды подумать и делают речь плавной

const CONVERSATIONAL_CONNECTORS = [
  {
    en: "Well...",
    ru: "Ну... / Итак...",
    useCase: "Заполнить паузу в начале мысли",
    example: "Well, I need to check my schedule first."
  },
  {
    en: "To be honest...",
    ru: "Честно говоря...",
    useCase: "Выразить искреннее личное мнение",
    example: "To be honest, I have no idea about that."
  },
  {
    en: "Actually...",
    ru: "Вообще-то... / На самом деле...",
    useCase: "Мягко поправить собеседника или уточнить",
    example: "Actually, I didn't work there yesterday."
  },
  {
    en: "As far as I know...",
    ru: "Насколько я знаю...",
    useCase: "Указать на степень своей уверенности",
    example: "As far as I know, there is a good pharmacy nearby."
  },
  {
    en: "What I mean is...",
    ru: "Я имею в виду, что...",
    useCase: "Пояснить свою мысль, если не поняли",
    example: "What I mean is, we must make a decision today."
  },
  {
    en: "It depends on...",
    ru: "Это зависит от...",
    useCase: "Указать на условия (agree vs state)",
    example: "It depends on the weather tomorrow."
  },
  {
    en: "By the way...",
    ru: "Кстати...",
    useCase: "Сменить тему или добавить важный факт",
    example: "By the way, will you come to the party?"
  },
  {
    en: "First of all...",
    ru: "Прежде всего / Во-первых...",
    useCase: "Структурировать мысль",
    example: "First of all, I want you to listen carefully."
  }
];


/* --- js/data/tech-phrases.js --- */
// Золотые речевые шаблоны для технических созвонов (Standup, Tech Art & GameDev)
// Личная шпаргалка для уверенного общения с лидами, продюсерами и разработчиками

const TECH_STANDUP_PATTERNS = [
  // ==========================================
  // 1. СТАТУС ЗАДАЧ И ОПЫТ (TASK STATUS & EXPERIENCE)
  // ==========================================
  {
    id: "sp_worked_on",
    phrase: "I worked on...",
    ru: "Я работал над…",
    category: "status",
    categoryRu: "📋 Статус задач",
    example: "Yesterday I worked on water shaders and particle optimization.",
    exampleRu: "Вчера я работал над шейдерами воды и оптимизацией частиц.",
    tip: "Предлог 'on' обязателен: 'worked ON something', а не просто 'worked something'."
  },
  {
    id: "sp_developed",
    phrase: "I developed...",
    ru: "Я разработал / создал…",
    category: "status",
    categoryRu: "📋 Статус задач",
    example: "I developed a custom post-process volume for the dark cave scene.",
    exampleRu: "Я разработал кастомный пост-процесс вольюм для сцены темной пещеры.",
    tip: "Сильный глагол действия для резюме и отчетов вместо скучного 'I made'."
  },
  {
    id: "sp_specialize",
    phrase: "I specialize in...",
    ru: "Я специализируюсь на…",
    category: "status",
    categoryRu: "📋 Статус задач",
    example: "I specialize in real-time VFX, Niagara systems, and GPU simulations.",
    exampleRu: "Я специализируюсь на риалтайм VFX, системах Niagara и симуляциях на GPU.",
    tip: "После 'in' используется существительное или глагол с окончанием -ing: 'specialize in creating'."
  },
  {
    id: "sp_focus_on",
    phrase: "I focus on...",
    ru: "Я уделяю внимание / фокусируюсь на…",
    category: "status",
    categoryRu: "📋 Статус задач",
    example: "Today I focus on reducing draw calls and optimizing texture memory.",
    exampleRu: "Сегодня я фокусируюсь на снижении вызовов отрисовки и оптимизации текстурной памяти.",
    tip: "Всегда с предлогом 'on': 'focus on performance'."
  },
  {
    id: "sp_experience_with",
    phrase: "I have experience with...",
    ru: "У меня есть опыт работы с…",
    category: "status",
    categoryRu: "📋 Статус задач",
    example: "I have experience with Unreal Engine 5, HLSL shaders, and Houdini pipelines.",
    exampleRu: "У меня есть опыт работы с Unreal Engine 5, HLSL-шейдерами и пайплайнами Houdini.",
    tip: "Конструкция с предлогом 'with' звучит максимально естественно для созвонов и собеседований."
  },
  {
    id: "sp_looking_into",
    phrase: "I'm currently looking into...",
    ru: "Я сейчас разбираюсь с / исследую…",
    category: "status",
    categoryRu: "📋 Статус задач",
    example: "I'm currently looking into the memory leak in our particle emitter.",
    exampleRu: "Я сейчас разбираюсь с утечкой памяти в нашем эмиттере частиц.",
    tip: "Идеальная фраза для стендапа, когда задача еще в процессе ресерча."
  },
  {
    id: "sp_implemented",
    phrase: "It's already implemented and tested.",
    ru: "Это уже реализовано и протестировано.",
    category: "status",
    categoryRu: "📋 Статус задач",
    example: "The new collision response is already implemented and tested on target devices.",
    exampleRu: "Новая реакция на коллизии уже реализована и протестирована на целевых девайсах.",
    tip: "Пассивный залог через 'is + 3-я форма': показывает завершенность результата."
  },
  {
    id: "sp_take_care",
    phrase: "I can take care of this ticket.",
    ru: "Я могу взять на себя эту задачу / этот тикет.",
    category: "status",
    categoryRu: "📋 Статус задач",
    example: "Don't worry about the lighting bug, I can take care of this ticket today.",
    exampleRu: "Не переживай насчет бага с освещением, я могу взять этот тикет на себя сегодня.",
    tip: "'Take care of' = позаботиться / решить проблему 'под ключ'."
  },

  // ==========================================
  // 2. ОБОСНОВАНИЕ РЕШЕНИЙ И ЦЕЛИ (RATIONALE & CHALLENGES)
  // ==========================================
  {
    id: "sp_main_goal",
    phrase: "The main goal was...",
    ru: "Основная цель была…",
    category: "rationale",
    categoryRu: "🎯 Цели и Архитектура",
    example: "The main goal was to maintain a stable 60 FPS on target hardware.",
    exampleRu: "Основная цель была удержать стабильные 60 кадров в секунду на целевом железе.",
    tip: "После 'was' обычно идет глагол с частицей to: 'was to maintain', 'was to deliver'."
  },
  {
    id: "sp_main_challenge",
    phrase: "The main challenge was...",
    ru: "Основная сложность была…",
    category: "rationale",
    categoryRu: "🎯 Цели и Архитектура",
    example: "The main challenge was heavy alpha overdraw from transparent smoke layers.",
    exampleRu: "Основная сложность заключалась в сильном альфа-овердроу от прозрачных слоев дыма.",
    tip: "Слово 'challenge' звучит гораздо профессиональнее, чем 'problem' (проблема)."
  },
  {
    id: "sp_chose_approach",
    phrase: "I chose this approach because...",
    ru: "Я выбрал этот подход, потому что…",
    category: "rationale",
    categoryRu: "🎯 Цели и Архитектура",
    example: "I chose this approach because it significantly reduces GPU memory bandwidth.",
    exampleRu: "Я выбрал этот подход, потому что он существенно снижает нагрузку на шину памяти GPU.",
    tip: "Chose — 2-я форма глагола choose (семья 'Короли окончания -N': choose-chose-chosen)."
  },
  {
    id: "sp_tradeoff",
    phrase: "There is a trade-off between quality and speed.",
    ru: "Есть компромисс между качеством и скоростью.",
    category: "rationale",
    categoryRu: "🎯 Цели и Архитектура",
    example: "There is always a trade-off between visual fidelity and real-time performance.",
    exampleRu: "Всегда есть компромисс между визуальной достоверностью и производительностью в реальном времени.",
    tip: "'Trade-off' — фундаментальный термин в IT и графике для балансировки противоположных качеств."
  },
  {
    id: "sp_tech_standpoint",
    phrase: "From a technical standpoint...",
    ru: "С технической точки зрения…",
    category: "rationale",
    categoryRu: "🎯 Цели и Архитектура",
    example: "From a technical standpoint, dynamic volumetric shadows are too expensive here.",
    exampleRu: "С технической точки зрения динамические объемные тени здесь слишком ресурсоемки.",
    tip: "Связка дипломатичного спора на созвонах с лидами или геймдизайнерами."
  },
  {
    id: "sp_art_perspective",
    phrase: "From an art perspective...",
    ru: "С точки зрения визуального стиля / арта…",
    category: "rationale",
    categoryRu: "🎯 Цели и Архитектура",
    example: "From an art perspective, the fog color should match the environment mood.",
    exampleRu: "С точки зрения арта цвет тумана должен соответствовать настроению окружения.",
    tip: "Используется для защиты художественного видения сцены перед продюсерами."
  },

  // ==========================================
  // 3. ПРОИЗВОДИТЕЛЬНОСТЬ И КОМПЬЮТЕРНАЯ ГРАФИКА (PERFORMANCE & CG)
  // ==========================================
  {
    id: "sp_depends_budget",
    phrase: "It depends on the performance budget.",
    ru: "Это зависит от бюджета производительности.",
    category: "performance",
    categoryRu: "⚡ CG & Производительность",
    example: "Whether we add dynamic weather depends on our strict 16ms frame budget.",
    exampleRu: "Добавим ли мы динамическую погоду, зависит от нашего жесткого бюджета кадра в 16 миллисекунд.",
    tip: "'Depends on' — всегда с предлогом on (никогда не from!)."
  },
  {
    id: "sp_profile_frame",
    phrase: "We need to profile the frame.",
    ru: "Нам нужно замерить / профилировать время кадра.",
    category: "performance",
    categoryRu: "⚡ CG & Производительность",
    example: "We need to profile the frame in Unreal Insights or RenderDoc to find the bottleneck.",
    exampleRu: "Нам нужно профилировать кадр в Unreal Insights или RenderDoc, чтобы найти узкое место.",
    tip: "'Profile' в IT — глагол 'замерять тайминги и нагрузку железа'."
  },
  {
    id: "sp_shader_complexity",
    phrase: "The shader complexity is too high.",
    ru: "Сложность шейдера слишком высока.",
    category: "performance",
    categoryRu: "⚡ CG & Производительность",
    example: "The shader complexity is too high in the red view mode; we need to optimize instructions.",
    exampleRu: "Сложность шейдера в красной зоне во view mode; нам нужно оптимизировать инструкции.",
    tip: "Имеется в виду количество ALU-инструкций и выборок текстур."
  },
  {
    id: "sp_bottleneck",
    phrase: "This is the main bottleneck.",
    ru: "Это главное узкое место (бутылочное горлышко).",
    category: "performance",
    categoryRu: "⚡ CG & Производительность",
    example: "Vertex shader calculations are the main bottleneck on low-end hardware.",
    exampleRu: "Расчеты в вершинном шейдере — главное узкое место на слабом железе.",
    tip: "Bottleneck — элемент, который тормозит всю систему в целом."
  },
  {
    id: "sp_bake_lighting",
    phrase: "We can bake this lighting to save performance.",
    ru: "Мы можем запечь этот свет, чтобы сэкономить ресурсы.",
    category: "performance",
    categoryRu: "⚡ CG & Производительность",
    example: "We can bake stationary lighting for background assets to free up GPU time.",
    exampleRu: "Мы можем запечь стационарное освещение для фоновых ассетов, чтобы освободить время GPU.",
    tip: "Bake — запекать предварительно рассчитанные данные в текстуры/лайтмапы."
  },
  {
    id: "sp_adjust_lods",
    phrase: "Let's adjust the mesh LODs.",
    ru: "Давайте настроим уровни детализации (LOD).",
    category: "performance",
    categoryRu: "⚡ CG & Производительность",
    example: "Let's adjust the mesh LOD distances to reduce triangle count in wide open areas.",
    exampleRu: "Давайте скорректируем дистанции переключения LOD мешей, чтобы уменьшить число треугольников на открытых локациях.",
    tip: "LOD = Level of Detail (уровень детализации 3D-модели)."
  },

  // ==========================================
  // 4. СИНХРОНИЗАЦИЯ КОМАНДЫ (TEAM SYNC & COMMUNICATION)
  // ==========================================
  {
    id: "sp_blockers",
    phrase: "Are there any blockers on your end?",
    ru: "Есть ли какие-то блокирующие проблемы с твоей стороны?",
    category: "sync",
    categoryRu: "👥 Синхронизация команды",
    example: "Are there any blockers on your end before we merge the feature branch?",
    exampleRu: "Есть ли какие-то блокеры с вашей стороны перед тем, как мы смерджим ветку фичи?",
    tip: "'On your end' = с твоей стороны (в твоей части задач)."
  },
  {
    id: "sp_sync_up",
    phrase: "Let's sync up after the standup.",
    ru: "Давай созвонимся / синхронизируемся после стендапа.",
    category: "sync",
    categoryRu: "👥 Синхронизация команды",
    example: "Let's sync up for five minutes after the standup to review the new shader parameters.",
    exampleRu: "Давай созвонимся на 5 минут после стендапа, чтобы посмотреть новые параметры шейдера.",
    tip: "'Sync up' — стандартное и дружелюбное приглашение на короткий рабочий 1-on-1 созвон."
  },
  {
    id: "sp_clarify",
    phrase: "Could you clarify what you mean by that?",
    ru: "Не мог бы ты уточнить, что ты имеешь в виду?",
    category: "sync",
    categoryRu: "👥 Синхронизация команды",
    example: "Could you clarify what you mean by simplifying the particle lifetime curve?",
    exampleRu: "Не мог бы ты уточнить, что ты имеешь в виду под упрощением кривой жизни частиц?",
    tip: "Вежливый способ переспросить на созвоне без стеснения и неловких пауз."
  },
  {
    id: "sp_agree_decision",
    phrase: "I agree with this decision.",
    ru: "Я согласен с этим решением.",
    category: "sync",
    categoryRu: "👥 Синхронизация команды",
    example: "I agree with this decision; it will save us a lot of debugging time before the demo.",
    exampleRu: "Я согласен с этим решением: это сбережет нам кучу времени на отладку перед показом демо.",
    tip: "Обрати внимание: 'I agree', а НЕ 'I am agree' (одна из самых частых ошибок рунета!)."
  }
];


/* --- js/data/conversational-50.js --- */
// 50 золотых разговорных фраз для ежедневного общения (по видеоуроку English Maria / Мария Батхан)
// Живая разговорная речь, которую используют носители каждый день

const CONVERSATIONAL_50_PHRASES = [
  // ==========================================
  // 1. БЫСТРЫЕ РЕАКЦИИ И ОТВЕТЫ (QUICK REACTIONS)
  // ==========================================
  {
    id: "m_sounds_good",
    phrase: "Sounds good!",
    ru: "Звучит отлично! / Договорились!",
    phonetic: "[саундз гууд] — одобряем идею или предложение",
    category: "reactions",
    categoryRu: "⚡ Реакции",
    example: "— Let's meet at 6 PM. — Sounds good!",
    exampleRu: "— Давай встретимся в 6 вечера. — Звучит отлично!",
    tip: "Универсальный способ выразить согласие с планом собеседника."
  },
  {
    id: "m_no_worries",
    phrase: "No worries.",
    ru: "Не парься / Не переживай / Без проблем.",
    phonetic: "[ноу УА-риз] — дружелюбный ответ на извинение или просьбу",
    category: "reactions",
    categoryRu: "⚡ Реакции",
    example: "— Sorry I spilled the tea. — No worries, I'll clean it up.",
    exampleRu: "— Прости, я пролил чай. — Не переживай, я вытру.",
    tip: "Более живая и естественная замена шаблонному 'You are welcome'."
  },
  {
    id: "m_makes_sense",
    phrase: "That makes sense.",
    ru: "Логично. / Это имеет смысл.",
    phonetic: "[зэт мэйкс сэнс] — соглашаемся с логикой собеседника",
    category: "reactions",
    categoryRu: "⚡ Реакции",
    example: "Now that you explained it, that makes sense.",
    exampleRu: "Теперь, когда ты объяснил, это имеет смысл.",
    tip: "Если нелогично: 'That doesn't make any sense' (В этом нет никакого смысла)."
  },
  {
    id: "m_good_point",
    phrase: "That's a good point.",
    ru: "Дельное замечание. / Хорошая мысль.",
    phonetic: "[зэтс э гууд пойнт] — признаем правоту аргумента",
    category: "reactions",
    categoryRu: "⚡ Реакции",
    example: "We can't go on Monday, it's closed. — Ah, that's a good point.",
    exampleRu: "Мы не можем пойти в понедельник, там закрыто. — А, дельное замечание.",
    tip: "Идеально на работе и в споре, когда собеседник подметил важный нюанс."
  },
  {
    id: "m_up_to_you",
    phrase: "It's up to you.",
    ru: "Решать тебе. / Как хочешь.",
    phonetic: "[итс ап ту ю] — отдаем выбор собеседнику",
    category: "reactions",
    categoryRu: "⚡ Реакции",
    example: "Coffee or tea? — It's up to you, I don't mind.",
    exampleRu: "Кофе или чай? — На твой выбор, мне без разницы.",
    tip: "Up to you = на твоё усмотрение."
  },
  {
    id: "m_doesnt_matter",
    phrase: "It doesn't matter.",
    ru: "Неважно. / Это не имеет значения.",
    phonetic: "[ит ДАЗ-нт МЭ-тэр] — снимаем важность вопроса",
    category: "reactions",
    categoryRu: "⚡ Реакции",
    example: "Which color do you prefer? — It doesn't matter, any is fine.",
    exampleRu: "Какой цвет ты предпочитаешь? — Неважно, любой подойдёт.",
    tip: "Matter в роли глагола = значить, иметь значение."
  },
  {
    id: "m_not_really",
    phrase: "Not really.",
    ru: "Не совсем. / Да не особо.",
    phonetic: "[нот РИ-э-ли] — мягкое 'нет' без грубости",
    category: "reactions",
    categoryRu: "⚡ Реакции",
    example: "Are you hungry? — Not really, I had lunch an hour ago.",
    exampleRu: "Ты голоден? — Не особо, я пообедал час назад.",
    tip: "Звучит в разы деликатнее, чем резкое 'No'."
  },
  {
    id: "m_absolutely",
    phrase: "Absolutely!",
    ru: "Безусловно! / 100%! / Конечно!",
    phonetic: "[ЭБ-сэ-лют-ли] — уверенное безоговорочное согласие",
    category: "reactions",
    categoryRu: "⚡ Реакции",
    example: "Do you agree with this plan? — Absolutely!",
    exampleRu: "Ты согласен с этим планом? — Безусловно!",
    tip: "Энергичная замена обычному 'Yes'."
  },
  {
    id: "m_im_serious",
    phrase: "I'm serious.",
    ru: "Я серьёзно. / Без шуток.",
    phonetic: "[айм СИ-ри-эс] — подтверждаем серьезность слов",
    category: "reactions",
    categoryRu: "⚡ Реакции",
    example: "I'm going to run a marathon. I'm serious!",
    exampleRu: "Я собираюсь пробежать марафон. Я серьёзно!",
    tip: "Если спрашиваете вы: 'Are you serious?' (Ты серьёзно?)."
  },
  {
    id: "m_no_idea",
    phrase: "I have no idea.",
    ru: "Понятия не имею. / Без понятия.",
    phonetic: "[ай хэв ноу ай-ДИ-э] — дословно: у меня нет идеи",
    category: "reactions",
    categoryRu: "⚡ Реакции",
    example: "Where are my car keys? — I have no idea.",
    exampleRu: "Где ключи от машины? — Понятия не имею.",
    tip: "Звучит живее, чем простое 'I don't know'."
  },
  {
    id: "m_hope_so",
    phrase: "I hope so.",
    ru: "Надеюсь на это. / Надеюсь, что да.",
    phonetic: "[ай хоуп соу] — надежда на положительный исход",
    category: "reactions",
    categoryRu: "⚡ Реакции",
    example: "Will the weather be nice tomorrow? — I hope so.",
    exampleRu: "Будет завтра хорошая погода? — Надеюсь, что да.",
    tip: "Если надеетесь, что НЕ произойдет: 'I hope not' (Надеюсь, что нет)."
  },
  {
    id: "m_hope_not",
    phrase: "I hope not.",
    ru: "Надеюсь, что нет.",
    phonetic: "[ай хоуп нот] — надеемся на отсутствие проблемы",
    category: "reactions",
    categoryRu: "⚡ Реакции",
    example: "Is it going to rain all weekend? — I hope not.",
    exampleRu: "Будет дождь все выходные? — Надеюсь, что нет.",
    tip: "Ни в коем случае не говорите 'I hope no' — только 'not'!"
  },
  {
    id: "m_fingers_crossed",
    phrase: "Fingers crossed!",
    ru: "Держу кулачки! / Скрестим пальцы!",
    phonetic: "[ФИН-гэрз крост] — пожелание удачи",
    category: "reactions",
    categoryRu: "⚡ Реакции",
    example: "I have a job interview today. — Good luck, fingers crossed!",
    exampleRu: "У меня сегодня собеседование. — Удачи, держу кулачки!",
    tip: "Дословно: 'пальцы скрещены' (жест на удачу)."
  },
  {
    id: "m_thats_interesting",
    phrase: "That's interesting.",
    ru: "Это интересно.",
    phonetic: "[зэтс ИН-трэс-тинг] — ударение на первый слог, 3 слога!",
    category: "reactions",
    categoryRu: "⚡ Реакции",
    example: "They use AI to generate game levels. — That's interesting.",
    exampleRu: "Они используют ИИ для генерации уровней. — Это интересно.",
    tip: "Не 'ин-те-рес-тинг', а коротко: 'ИН-трэс-тинг'."
  },
  {
    id: "m_thats_crazy",
    phrase: "That's crazy!",
    ru: "С ума сойти! / Обалдеть! / Это безумие!",
    phonetic: "[зэтс КРЭЙ-зи] — яркая эмоциональная реакция",
    category: "reactions",
    categoryRu: "⚡ Реакции",
    example: "He bought a GPU for three thousand dollars! — That's crazy!",
    exampleRu: "Он купил видеокарту за 3000 долларов! — С ума сойти!",
    tip: "Используется и в положительном, и в шокированном ключе."
  },
  {
    id: "m_are_you_kidding",
    phrase: "Are you kidding me?",
    ru: "Ты прикалываешься? / Ты шутишь?",
    phonetic: "[ар ю КИ-динг ми] — удивление или недоверие",
    category: "reactions",
    categoryRu: "⚡ Реакции",
    example: "The server crashed again! — Are you kidding me?",
    exampleRu: "Сервер снова упал! — Ты прикалываешься?",
    tip: "Kid = ребенок; вести себя по-детски, подшучивать."
  },

  // ==========================================
  // 2. В ПУТИ, ВРЕМЯ И СКОРОСТЬ (TIME & TRAVEL)
  // ==========================================
  {
    id: "m_running_late",
    phrase: "I'm running late.",
    ru: "Я опаздываю (в процессе спешки).",
    phonetic: "[айм РА-нинг лэйт] — дословно: бегу поздно",
    category: "time",
    categoryRu: "⏱️ Время и Путь",
    example: "Sorry, traffic is terrible, I'm running late.",
    exampleRu: "Прости, ужасные пробки, я опаздываю.",
    tip: "Звучит лучше, чем 'I am late' (шанс прийти вовремя еще есть)."
  },
  {
    id: "m_on_my_way",
    phrase: "I'm on my way.",
    ru: "Уже еду. / Я в пути.",
    phonetic: "[айм он май уэй] — я уже двигаюсь к тебе",
    category: "time",
    categoryRu: "⏱️ Время и Путь",
    example: "Where are you? — I'm on my way, be there in 10 minutes.",
    exampleRu: "Ты где? — Уже еду, буду через 10 минут.",
    tip: "Классическое сообщение в чат, когда вы выехали."
  },
  {
    id: "m_take_your_time",
    phrase: "Take your time.",
    ru: "Не торопись. / Столько времени, сколько нужно.",
    phonetic: "[тэйк ёр тайм] — возьми своё время",
    category: "time",
    categoryRu: "⏱️ Время и Путь",
    example: "I need to read this document. — Sure, take your time.",
    exampleRu: "Мне нужно прочесть этот документ. — Конечно, не торопись.",
    tip: "Очень вежливый способ успокоить человека, который суетится."
  },
  {
    id: "m_wait_a_second",
    phrase: "Wait a second.",
    ru: "Подожди секундочку / минуточку.",
    phonetic: "[уэйт э СЭ-кэнд] — пауза на несколько мгновений",
    category: "time",
    categoryRu: "⏱️ Время и Путь",
    example: "Wait a second, let me check my notes.",
    exampleRu: "Подожди секундочку, дай сверюсь с заметками.",
    tip: "Вариант: 'Wait a minute, please'."
  },
  {
    id: "m_asap",
    phrase: "As soon as possible.",
    ru: "Как можно скорее (ASAP).",
    phonetic: "[эз суун эз ПО-сэ-бл] — максимальная срочность",
    category: "time",
    categoryRu: "⏱️ Время и Путь",
    example: "Please send me the texture files as soon as possible.",
    exampleRu: "Пожалуйста, пришли мне текстуры как можно скорее.",
    tip: "Аббревиатура ASAP читается как [эй-сэп]."
  },
  {
    id: "m_whats_the_time",
    phrase: "What's the time?",
    ru: "Который час? / Сколько времени?",
    phonetic: "[уотс зэ тайм] — стандартный вопрос о времени",
    category: "time",
    categoryRu: "⏱️ Время и Путь",
    example: "Excuse me, what's the time? — It's quarter past three.",
    exampleRu: "Извините, который час? — Четверть четвёртого.",
    tip: "Синоним: 'What time is it?'."
  },
  {
    id: "m_right_back",
    phrase: "I'll be right back.",
    ru: "Я сейчас вернусь. / Я на минутку.",
    phonetic: "[айл би райт бэк] — отлучаюсь ненадолго",
    category: "time",
    categoryRu: "⏱️ Время и Путь",
    example: "I need a glass of water, I'll be right back.",
    exampleRu: "Мне нужен стакан воды, я сейчас вернусь.",
    tip: "В чатах часто сокращают до 'BRB' (be right back)."
  },

  // ==========================================
  // 3. ЖИВОЙ ДИАЛОГ И ОБЩЕНИЕ (CONVERSATION & CLARIFICATION)
  // ==========================================
  {
    id: "m_let_me_think",
    phrase: "Let me think.",
    ru: "Дай подумать. / Позволь мне подумать.",
    phonetic: "[лэт ми синк] — легальный способ взять паузу",
    category: "dialog",
    categoryRu: "💬 Диалог и Связки",
    example: "Which restaurant should we pick? — Let me think...",
    exampleRu: "Какой ресторан выберем? — Дай подумать...",
    tip: "После 'let' частица 'to' сгорает: 'let me think', не 'let me to think'."
  },
  {
    id: "m_didnt_catch",
    phrase: "I didn't catch that.",
    ru: "Я не расслышал(а). / Не уловил мысль.",
    phonetic: "[ай ДИД-нт кэтч зэт] — дословно: не поймал это",
    category: "dialog",
    categoryRu: "💬 Диалог и Связки",
    example: "Sorry, the connection dropped, I didn't catch that.",
    exampleRu: "Прости, связь прервалась, я не расслышал.",
    tip: "Catch = поймать мяч или уловить сказанное на слух."
  },
  {
    id: "m_repeat_that",
    phrase: "Can you repeat that?",
    ru: "Можете повторить это?",
    phonetic: "[кэн ю ри-ПИИТ зэт] — вежливая просьба сказать еще раз",
    category: "dialog",
    categoryRu: "💬 Диалог и Связки",
    example: "Can you repeat that slowly, please?",
    exampleRu: "Вы не могли бы повторить это медленно, пожалуйста?",
    tip: "Repeat = повторять (в отличие от репетиции rehearsal)."
  },
  {
    id: "m_what_do_you_mean",
    phrase: "What do you mean?",
    ru: "Что ты имеешь в виду?",
    phonetic: "[уот ду ю миин] — уточнение смысла",
    category: "dialog",
    categoryRu: "💬 Диалог и Связки",
    example: "This shader is broken. — What do you mean by broken?",
    exampleRu: "Этот шейдер сломан. — Что ты имеешь в виду под 'сломан'?",
    tip: "Mean = значить / иметь в виду."
  },
  {
    id: "m_could_you_help",
    phrase: "Could you help me, please?",
    ru: "Вы не могли бы мне помочь, пожалуйста?",
    phonetic: "[куд ю хэлп ми плииз] — буква «l» в could немая!",
    category: "dialog",
    categoryRu: "💬 Диалог и Связки",
    example: "Excuse me, could you help me find this street, please?",
    exampleRu: "Извините, не могли бы вы помочь мне найти эту улицу?",
    tip: "'Could' звучит гораздо вежливее и мягче, чем 'Can'."
  },
  {
    id: "m_whats_going_on",
    phrase: "What's going on?",
    ru: "В чём дело? / Что происходит?",
    phonetic: "[уотс ГОУ-инг он] — вопрос о текущей ситуации",
    category: "dialog",
    categoryRu: "💬 Диалог и Связки",
    example: "Everyone is running! What's going on?",
    exampleRu: "Все бегут! Что происходит?",
    tip: "Часто используется как неформальное приветствие: 'Hey, what's going on?'"
  },
  {
    id: "m_long_time_no_see",
    phrase: "Long time no see!",
    ru: "Давно не виделись! / Сколько лет, сколько зим!",
    phonetic: "[лонг тайм ноу сии] — теплая встреча знакомого",
    category: "dialog",
    categoryRu: "💬 Диалог и Связки",
    example: "Alex! Long time no see, how have you been?",
    exampleRu: "Алекс! Давно не виделись, как твои дела?",
    tip: "Культовая разговорная идиома английского языка."
  },
  {
    id: "m_changed_my_mind",
    phrase: "I changed my mind.",
    ru: "Я передумал(а).",
    phonetic: "[ай чэйнджд май майнд] — изменил свое решение",
    category: "dialog",
    categoryRu: "💬 Диалог и Связки",
    example: "I wanted tea, but I changed my mind, coffee please.",
    exampleRu: "Я хотел чай, но передумал, кофе, пожалуйста.",
    tip: "Mind = ум / мысли. Сменил ход мыслей = передумал."
  },
  {
    id: "m_used_to_it",
    phrase: "I'm used to it.",
    ru: "Я к этому привык(ла).",
    phonetic: "[айм ЮУСТ ту ит] — звук «т» на конце used",
    category: "dialog",
    categoryRu: "💬 Диалог и Связки",
    example: "Working late hours is hard. — I'm used to it.",
    exampleRu: "Работать допоздна тяжело. — Я уже привык к этому.",
    tip: "To be used to something = иметь привычку к чему-то."
  },
  {
    id: "m_lets_get_started",
    phrase: "Let's get started.",
    ru: "Давайте начнём. / Поехали.",
    phonetic: "[лэтс гэт СТАР-тид] — бодрый старт любого процесса",
    category: "dialog",
    categoryRu: "💬 Диалог и Связки",
    example: "Everyone is here, so let's get started.",
    exampleRu: "Все в сборе, так что давайте начнём.",
    tip: "Let's = let us (позвольте нам начать)."
  },

  // ==========================================
  // 4. ГОРОД, МАГАЗИН И САМОЧУВСТВИЕ (SHOPPING & HEALTH)
  // ==========================================
  {
    id: "m_just_looking",
    phrase: "I'm just looking.",
    ru: "Я просто смотрю (в магазине).",
    phonetic: "[айм джаст ЛУ-кинг] — мягкий ответ продавцу-консультанту",
    category: "places",
    categoryRu: "🛒 Город и Магазины",
    example: "Can I help you? — No thanks, I'm just looking.",
    exampleRu: "Вам помочь? — Нет, спасибо, я просто смотрю.",
    tip: "Спасает от навязчивых вопросов в любом зарубежном магазине."
  },
  {
    id: "m_how_much_cost",
    phrase: "How much does it cost?",
    ru: "Сколько это стоит? / Почём это?",
    phonetic: "[хау мач даз ит кост] — вопрос цены с глаголом cost",
    category: "places",
    categoryRu: "🛒 Город и Магазины",
    example: "Excuse me, how much does this jacket cost?",
    exampleRu: "Извините, сколько стоит эта куртка?",
    tip: "Синоним: 'How much is it?' (Сколько это?)."
  },
  {
    id: "m_try_it_on",
    phrase: "Can I try it on?",
    ru: "Можно примерить?",
    phonetic: "[кэн ай трай ит он] — примерка одежды или обуви",
    category: "places",
    categoryRu: "🛒 Город и Магазины",
    example: "I like this shirt. Can I try it on?",
    exampleRu: "Мне нравится эта рубашка. Можно её примерить?",
    tip: "Фразовый глагол 'try on' = примерить на себя."
  },
  {
    id: "m_ill_take_it",
    phrase: "I'll take it.",
    ru: "Я беру это. / Покупаю.",
    phonetic: "[айл тэйк ит] — решение о покупке",
    category: "places",
    categoryRu: "🛒 Город и Магазины",
    example: "The shoes fit perfectly, I'll take it.",
    exampleRu: "Туфли сидят идеально, я беру их.",
    tip: "I'll = I will (будущее время, спонтанное решение)."
  },
  {
    id: "m_looking_for",
    phrase: "I'm looking for...",
    ru: "Я ищу...",
    phonetic: "[айм ЛУ-кинг фор] — фразовый глагол поиска",
    category: "places",
    categoryRu: "🛒 Город и Магазины",
    example: "I'm looking for the museum entrance.",
    exampleRu: "Я ищу вход в музей.",
    tip: "Look = смотреть, а look FOR = искать."
  },
  {
    id: "m_restroom",
    phrase: "Where is the restroom?",
    ru: "Где туалет?",
    phonetic: "[уэр из зэ РЭСТ-руум] — вежливое «комната отдыха»",
    category: "places",
    categoryRu: "🛒 Город и Магазины",
    example: "Excuse me, where is the restroom?",
    exampleRu: "Простите, где находится туалет?",
    tip: "В США чаще говорят 'restroom', в Великобритании — 'toilet' или 'washroom'."
  },
  {
    id: "m_dont_feel_well",
    phrase: "I don't feel well.",
    ru: "Я плохо себя чувствую.",
    phonetic: "[ай доунт фиил уэл] — без слова 'myself'!",
    category: "places",
    categoryRu: "🛒 Город и Магазины",
    example: "I have a headache, I don't feel well.",
    exampleRu: "У меня болит голова, я плохо себя чувствую.",
    tip: "Ни в коем случае не добавляйте 'myself' — англичане так не говорят!"
  },
  {
    id: "m_call_doctor",
    phrase: "Call the doctor.",
    ru: "Вызовите врача. / Позвоните доктору.",
    phonetic: "[кол зэ ДОК-тэр] — срочная просьба о помощи",
    category: "places",
    categoryRu: "🛒 Город и Магазины",
    example: "It's an emergency, please call the doctor!",
    exampleRu: "Это экстренный случай, вызовите врача, пожалуйста!",
    tip: "Call = и звать вслух, и звонить по телефону."
  },
  {
    id: "m_need_rest",
    phrase: "I need some rest.",
    ru: "Мне нужно отдохнуть.",
    phonetic: "[ай ниид сам рэст] — потребность в отдыхе",
    category: "places",
    categoryRu: "🛒 Город и Магазины",
    example: "I walked all day, I need some rest.",
    exampleRu: "Я гулял весь день, мне нужно отдохнуть.",
    tip: "Rest = отдых (неисчисляемое существительное с 'some')."
  },
  {
    id: "m_allergic_to",
    phrase: "I'm allergic to...",
    ru: "У меня аллергия на...",
    phonetic: "[айм э-ЛЁР-джик ту] — предлог всегда 'to'!",
    category: "places",
    categoryRu: "🛒 Город и Магазины",
    example: "I'm allergic to nuts and cucumbers.",
    exampleRu: "У меня аллергия на орехи и огурцы.",
    tip: "Всегда с предлогом 'to': 'allergic to fish'."
  },

  // ==========================================
  // 5. УСПОКОЕНИЕ И ЗАВЕРШЕНИЕ (COMFORT & WRAP-UP)
  // ==========================================
  {
    id: "m_is_everything_ok",
    phrase: "Is everything okay?",
    ru: "Всё в порядке?",
    phonetic: "[из ЭВ-ри-синг оу-кэй] — заботливый вопрос собеседнику",
    category: "wrapup",
    categoryRu: "🛡️ Спокойствие и Финал",
    example: "You look worried, is everything okay?",
    exampleRu: "Ты выглядишь обеспокоенным, всё в порядке?",
    tip: "Любимейшая фраза носителей языка для проверки состояния друга."
  },
  {
    id: "m_dont_worry_about",
    phrase: "Don't worry about it.",
    ru: "Не переживай об этом.",
    phonetic: "[доунт УА-ри э-БАУТ ит] — снимаем тревогу",
    category: "wrapup",
    categoryRu: "🛡️ Спокойствие и Финал",
    example: "I forgot the book. — Don't worry about it, bring it tomorrow.",
    exampleRu: "Я забыл книгу. — Не переживай об этом, принесёшь завтра.",
    tip: "Worry ABOUT = переживать о чём-то конкретном."
  },
  {
    id: "m_not_big_deal",
    phrase: "It's not a big deal.",
    ru: "Ничего страшного. / Пустяки. / Не велика беда.",
    phonetic: "[итс нот э биг диил] — дословно: это не большая сделка",
    category: "wrapup",
    categoryRu: "🛡️ Спокойствие и Финал",
    example: "I'm five minutes late. — It's not a big deal, relax.",
    exampleRu: "Я опоздал на 5 минут. — Ничего страшного, расслабься.",
    tip: "Deal = сделка. Not a big deal = мелочь, не стоит внимания."
  },
  {
    id: "m_thats_enough",
    phrase: "That's enough.",
    ru: "Достаточно. / Хватит.",
    phonetic: "[зэтс и-НАФ] — окончание звучит глухо как «ф»",
    category: "wrapup",
    categoryRu: "🛡️ Спокойствие и Финал",
    example: "Sugar in your tea? — That's enough, thanks.",
    exampleRu: "Сахар в чай? — Достаточно, спасибо.",
    tip: "Enough пишется с -gh, но читается как чистый звук [ф]."
  },
  {
    id: "m_enough_for_today",
    phrase: "That's enough for today.",
    ru: "На сегодня хватит. / На сегодня закончили.",
    phonetic: "[зэтс и-НАФ фор тэ-ДЭЙ] — финальная фраза урока или рабочего дня",
    category: "wrapup",
    categoryRu: "🛡️ Спокойствие и Финал",
    example: "We solved three major bugs. That's enough for today!",
    exampleRu: "Мы закрыли 3 серьезных бага. На сегодня хватит!",
    tip: "Классический итог продуктивной работы."
  },
  {
    id: "m_im_not_sure",
    phrase: "I'm not sure.",
    ru: "Я не уверен(а).",
    phonetic: "[айм нот шуур] — мягкое выражение сомнения",
    category: "wrapup",
    categoryRu: "🛡️ Спокойствие и Финал",
    example: "Is the shop open on Sunday? — I'm not sure.",
    exampleRu: "Магазин открыт в воскресенье? — Я не уверен.",
    tip: "Sure = уверенный. Звучит с мягким [ш]."
  },
  {
    id: "m_i_dont_know",
    phrase: "I don't know.",
    ru: "Я не знаю.",
    phonetic: "[ай доунт ноу] — буква «k» немая!",
    category: "wrapup",
    categoryRu: "🛡️ Спокойствие и Финал",
    example: "Where did he go? — I don't know.",
    exampleRu: "Куда он ушёл? — Я не знаю.",
    tip: "В беглой речи часто звучит как слитно: [ай дун-ноу]."
  }
];


/* --- js/data/builder-tasks.js --- */
// Задания для режима «Конструктор предложений» (Sentence Assembler)
// Игрок собирает предложение из блоков с учетом жесткого порядка слов и правил Драгункина.

const BUILDER_TASKS = [
  {
    id: "build_1",
    theme: "Поиск Хозяина (Безличные фразы)",
    ru: "Здесь сейчас очень холодно.",
    hint: "В английском нет фразы без Хозяина! Для погоды и условий используй «It is».",
    ruleId: "skeleton",
    tokens: ["It", "is", "very", "cold", "here", "now", "Is", "Cold", "There"],
    solution: ["It", "is", "very", "cold", "here", "now"],
    structure: ["[Хозяин: It]", "[Состояние: is]", "[Признак: very cold]", "[Где: here]", "[Когда: now]"]
  },
  {
    id: "build_2",
    theme: "Модальные Камешки",
    ru: "Ты должен сделать эту работу прямо сейчас.",
    hint: "«Must» — камешек! После него глагол берется из словаря БЕЗ частицы «to».",
    ruleId: "pebbles",
    tokens: ["You", "must", "do", "this", "work", "right", "now", "to", "musts", "does"],
    solution: ["You", "must", "do", "this", "work", "right", "now"],
    structure: ["[Хозяин]", "[Камешек: must]", "[Глагол: do]", "[Объект: this work]", "[Время: right now]"]
  },
  {
    id: "build_3",
    theme: "Мостик TO между глаголами",
    ru: "Я хочу заказать большую пиццу.",
    hint: "Два обычных глагола (want и order) соединяются обязательным мостиком «to».",
    ruleId: "pebbles",
    tokens: ["I", "want", "to", "order", "a", "big", "pizza", "ordering", "the", "an"],
    solution: ["I", "want", "to", "order", "a", "big", "pizza"],
    structure: ["[Хозяин: I]", "[Глагол 1: want]", "[Мостик: to]", "[Глагол 2: order]", "[Одежда + Объект: a big pizza]"]
  },
  {
    id: "build_4",
    theme: "Фильтр «Действие vs Состояние»",
    ru: "Ты согласен с моим планом?",
    hint: "Слово «agree» — это глагол действия! Помощник для вопроса в Present Simple — «Do» (НЕ Are!).",
    ruleId: "action_vs_state",
    tokens: ["Do", "you", "agree", "with", "my", "plan", "Are", "agrees", "is"],
    solution: ["Do", "you", "agree", "with", "my", "plan"],
    structure: ["[Рубильник действия: Do]", "[Хозяин: you]", "[Глагол: agree]", "[Дополнение: with my plan]"]
  },
  {
    id: "build_5",
    theme: "Разговорный бутерброд Complex Object",
    ru: "Я хочу, чтобы ты позвонил мне завтра.",
    hint: "Формула: Хочу + ТЕБЯ + TO + позвонить + мне.",
    ruleId: "complex_object",
    tokens: ["I", "want", "you", "to", "call", "me", "tomorrow", "that", "will", "calling"],
    solution: ["I", "want", "you", "to", "call", "me", "tomorrow"],
    structure: ["[Кто: I]", "[want]", "[Кого: you]", "[Мостик: to]", "[Действие: call]", "[Кому: me]", "[Когда: tomorrow]"]
  },
  {
    id: "build_6",
    theme: "Сильное отрицание have no",
    ru: "У нас вообще нет свободного времени.",
    hint: "Используй формулу Драгункина: have no + предмет + усилитель «at all» в конце.",
    ruleId: "strong_negation",
    tokens: ["We", "have", "no", "free", "time", "at", "all", "don't", "any", "not"],
    solution: ["We", "have", "no", "free", "time", "at", "all"],
    structure: ["[Хозяин: We]", "[have no]", "[Предмет: free time]", "[Усилитель: at all]"]
  },
  {
    id: "build_7",
    theme: "Рубильник вопросов + Наращивание влево",
    ru: "Куда ты пошел вчера вечером?",
    hint: "Where + [РУБИЛЬНИК did] + you + [глагол в 1 форме: go] + yesterday evening?",
    ruleId: "switches",
    tokens: ["Where", "did", "you", "go", "yesterday", "evening", "went", "do", "were"],
    solution: ["Where", "did", "you", "go", "yesterday", "evening"],
    structure: ["[Вопрос: Where]", "[Рубильник: did]", "[Хозяин: you]", "[1 форма: go]", "[Когда: yesterday evening]"]
  },
  {
    id: "build_8",
    theme: "Одежда существительных + There is",
    ru: "Здесь поблизости есть хорошая аптека?",
    hint: "Вопрос о наличии: рубильник «Is» перепрыгивает перед «there»!",
    ruleId: "clothes",
    tokens: ["Is", "there", "a", "good", "pharmacy", "near", "here", "Are", "the", "have"],
    solution: ["Is", "there", "a", "good", "pharmacy", "near", "here"],
    structure: ["[Рубильник: Is]", "[there]", "[Одежда: a]", "[Что: good pharmacy]", "[Где: near here]"]
  },
  {
    id: "build_9",
    theme: "Режим «в эфире» (Present Continuous)",
    ru: "Я сейчас смотрю интересный фильм.",
    hint: "Прямо сейчас = to be + глагол с окончанием -ing.",
    ruleId: "four_tenses",
    tokens: ["I", "am", "watching", "an", "interesting", "movie", "now", "watch", "a", "is"],
    solution: ["I", "am", "watching", "an", "interesting", "movie", "now"],
    structure: ["[Хозяин: I]", "[am]", "[в эфире: watching]", "[Одежда: an]", "[Что: interesting movie]", "[Когда: now]"]
  },
  {
    id: "build_10",
    theme: "Complex Object с местоимением третьего лица",
    ru: "Мы хотим, чтобы он остался дома.",
    hint: "«Он» в роли дополнения («Кого?») превращается в «him» + мостик «to».",
    ruleId: "complex_object",
    tokens: ["We", "want", "him", "to", "stay", "at", "home", "he", "that", "stays"],
    solution: ["We", "want", "him", "to", "stay", "at", "home"],
    structure: ["[Кто: We]", "[want]", "[Кого: him]", "[Мостик: to]", "[Действие: stay]", "[Где: at home]"]
  }
];


/* --- js/data/bug-hunter-tasks.js --- */
// База заданий для режима «Охотник за багами» (Bug Hunter)
// Механика: даётся предложение. Нужно кликнуть по ошибочному или лишнему слову,
// либо нажать «Ошибок нет». Все задания выверены так, чтобы клик приходился именно
// на ошибочный/лишний элемент, без двусмысленности.

const BUG_HUNTER_TASKS = [
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


/* --- js/data/switchboard-tasks.js --- */
// Задания для режима «Трансформер предложений (Рубильники и Времена)»

const SWITCHBOARD_TASKS = [
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


/* --- js/data/listening-tasks.js --- */
// База заданий для режима «Аудио-диктант / Понимание на слух» (Listening Mode)
// Игрок слушает озвучку (без текста перед глазами) и собирает фразу из кирпичиков,
// тренируя ухо различать артикли, окончания, редукции gonna/wanna/didn't.

const LISTENING_TASKS = [
  {
    id: "list_1",
    en: "I would like to order a cup of black coffee.",
    ru: "Я бы хотел заказать чашку черного кофе.",
    hint: "Обрати внимание на вежливую связку: would like TO order.",
    audioFocus: "Слитная редукция «would like to» звучит почти как «would like-ta».",
    tokens: ["I", "would", "like", "to", "order", "a", "cup", "of", "black", "coffee", "the", "an", "ordering"]
  },
  {
    id: "list_2",
    en: "It is very cold outside today.",
    ru: "На улице сегодня очень холодно.",
    hint: "Погода = безличный Хозяин It is.",
    audioFocus: "Связка «It is» в беглой речи звучит как «It's».",
    tokens: ["It", "is", "very", "cold", "outside", "today", "There", "Is", "was"]
  },
  {
    id: "list_3",
    en: "Where did you go yesterday evening?",
    ru: "Куда ты пошел вчера вечером?",
    hint: "Рубильник did вынесен вперед, глагол go в 1-й форме.",
    audioFocus: "«Where did you» на слух часто сливается в «Where d'you» или «Where-ja».",
    tokens: ["Where", "did", "you", "go", "yesterday", "evening", "went", "do", "were"]
  },
  {
    id: "list_4",
    en: "I have no time to talk right now.",
    ru: "У меня совсем нет времени говорить прямо сейчас.",
    hint: "Сильное отрицание: have no + предмет + мостик to + talk.",
    audioFocus: "Четкое отрицание «have no time» вместо громоздкого «don't have any time».",
    tokens: ["I", "have", "no", "time", "to", "talk", "right", "now", "don't", "any", "not"]
  },
  {
    id: "list_5",
    en: "She wants him to call her tomorrow.",
    ru: "Она хочет, чтобы он позвонил ей завтра.",
    hint: "Разговорный бутерброд: wants + him + to + call.",
    audioFocus: "Связка «wants him to» звучит мягко, без русского «that he will».",
    tokens: ["She", "wants", "him", "to", "call", "her", "tomorrow", "he", "that", "calls"]
  },
  {
    id: "list_6",
    en: "Is there Wi-Fi in this hotel room?",
    ru: "В этом гостиничном номере есть Wi-Fi?",
    hint: "Вопрос о наличии: рубильник Is перепрыгнул перед there.",
    audioFocus: "«Is there» произносится с мягким межзубным звуком «th».",
    tokens: ["Is", "there", "Wi-Fi", "in", "this", "hotel", "room", "Are", "have", "has"]
  },
  {
    id: "list_7",
    en: "I didn't see him at the meeting.",
    ru: "Я не видел его на собрании.",
    hint: "didn't забрал прошлое, глагол see в 1-й форме.",
    audioFocus: "«didn't see» произносится быстро, буква t часто редуцируется: «did'n see».",
    tokens: ["I", "didn't", "see", "him", "at", "the", "meeting", "saw", "wasn't", "don't"]
  },
  {
    id: "list_8",
    en: "We are gonna discuss this problem tomorrow.",
    ru: "Мы собираемся обсудить эту проблему завтра.",
    hint: "Разговорное будущее: be gonna + глагол.",
    audioFocus: "«gonna» — это беглое разговорное сокращение от «going to».",
    tokens: ["We", "are", "gonna", "discuss", "this", "problem", "tomorrow", "will", "going", "to"]
  }
];


/* --- js/data/sprint-tasks.js --- */
// Задания для режима «Блиц-спринт / Разговорная реакция» (Speed Sprint)
// Цель: моментально среагировать без паузы на перевод в голове (до 5 секунд на раунд)

const SPRINT_TASKS = [
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


/* --- js/data/scenarios-tasks.js --- */
// Ролевые жизненные сценарии для уровня B1 (Roleplay Scenarios)
// Включает геймдев-созвоны (VFX / Tech Art), студийную жизнь и бытовые ситуации

const ROLEPLAY_SCENARIOS = [
  // --- СПЕЦИАЛИЗАЦИЯ: TECH ARTIST & VFX ARTIST ---
  {
    id: "sc_vfx_opt",
    title: "🎮 VFX: Оптимизация фреймрейта",
    character: "Lead Programmer (Mark)",
    description: "Обсуждение просадки FPS, овердро, эмиттеров и текстур.",
    steps: [
      {
        npcSay: "Hey! During the boss fight, the explosion drops the frame rate from 60 to 25 FPS on consoles. Have you had a chance to profile the shader complexity?",
        npcRu: "Привет! Во время боя с боссом взрыв роняет фреймрейт с 60 до 25 FPS на консолях. Удалось профилировать сложность шейдера?",
        userTaskRu: "Скажите: «Да, я исследовал это вчера. У нас слишком сильный overdraw из-за количества партиклей».",
        hint: "Past Simple (I investigated it yesterday) + have too much overdraw.",
        expectedPhrase: "Yes, I investigated it yesterday. We have too much overdraw because of the particle count.",
        options: [
          { text: "Yes, I investigated it yesterday. We have too much overdraw because of the particle count.", correct: true },
          { text: "Yes, I am investigate yesterday. We are overdraw.", correct: false },
          { text: "Yes, I did investigated it. There has too much overdraw.", correct: false }
        ]
      },
      {
        npcSay: "That makes total sense. Can we reduce the max particle count, or should we switch to mesh particles?",
        npcRu: "Это логично. Можем ли мы уменьшить максимальное число частиц, или нам стоит переключиться на меш-партикли?",
        userTaskRu: "Скажите: «Я согласен с тобой. Я могу оптимизировать эмиттеры прямо сейчас».",
        hint: "I agree (действие!) + камешек can (без to): I can optimize the emitters right now.",
        expectedPhrase: "I agree with you. I can optimize the emitters right now.",
        options: [
          { text: "I agree with you. I can optimize the emitters right now.", correct: true },
          { text: "I am agree with you. I can to optimize emitters.", correct: false },
          { text: "I agree you. I will can optimize right now.", correct: false }
        ]
      },
      {
        npcSay: "Great! Also, does the flipbook texture use 4K resolution? Can we downscale it to 2K without visual loss?",
        npcRu: "Отлично! И ещё, текстура флипбука в 4К? Можем даунскейлить её до 2К без визуальных потерь?",
        userTaskRu: "Скажите: «Честно говоря, текстура уже 2К. Нам нужно оптимизировать именно шейдер».",
        hint: "Разговорный мостик To be honest... + need TO optimize.",
        expectedPhrase: "To be honest, the texture is already 2K. We need to optimize the shader instructions.",
        options: [
          { text: "To be honest, the texture is already 2K. We need to optimize the shader instructions.", correct: true },
          { text: "To be honest, texture already 2K. We need optimize shader.", correct: false },
          { text: "Honestly, the texture has 2K. We must to optimize instructions.", correct: false }
        ]
      }
    ]
  },
  {
    id: "sc_vfx_review",
    title: "🔮 VFX: Ревью эффекта с Арт-директором",
    character: "Art Director (Elena)",
    description: "Обсуждение тайминга, диссипации, кривых затухания и emissive шейдера.",
    steps: [
      {
        npcSay: "I really like the energy in this teleport effect, but the distortion feels too aggressive and distracting. What do you think?",
        npcRu: "Мне очень нравится энергия этого эффекта телепорта, но дисторшн ощущается слишком агрессивным и отвлекает. Что думаешь?",
        userTaskRu: "Скажите: «Я согласен, искажение слишком сильное. Я хочу сделать кривую затухания более плавной».",
        hint: "I agree + to be + want TO make: I want to make the dissipation curve smoother.",
        expectedPhrase: "I agree, the distortion is too strong. I want to make the dissipation curve smoother.",
        options: [
          { text: "I agree, the distortion is too strong. I want to make the dissipation curve smoother.", correct: true },
          { text: "I am agree, distortion too strong. I want make dissipation curve.", correct: false },
          { text: "I agree, distortion has strong. I want that dissipation will be smooth.", correct: false }
        ]
      },
      {
        npcSay: "Awesome. And what about the color palette? The core looks a bit washed out against the dark environment.",
        npcRu: "Супер. А что по цветовой палитре? Ядро выглядит блёклым на фоне тёмного окружения.",
        userTaskRu: "Скажите: «Я бы хотел настроить emissive интенсивность завтра утром».",
        hint: "Вежливое намерение: would like TO adjust...",
        expectedPhrase: "I would like to adjust the emissive intensity tomorrow morning.",
        options: [
          { text: "I would like to adjust the emissive intensity tomorrow morning.", correct: true },
          { text: "I would adjust emissive intensity tomorrow morning.", correct: false },
          { text: "I will like to adjust emissive tomorrow.", correct: false }
        ]
      },
      {
        npcSay: "Sounds like a plan! Will you be able to push the new build before our client sync on Friday?",
        npcRu: "Договорились! Сможешь запушить новый билд до нашего синхрона с клиентом в пятницу?",
        userTaskRu: "Скажите: «Да, без проблем! Я хочу, чтобы команда протестировала его в четверг».",
        hint: "Complex Object: I want the team TO test it on Thursday.",
        expectedPhrase: "Yes, no problem! I want the team to test it on Thursday.",
        options: [
          { text: "Yes, no problem! I want the team to test it on Thursday.", correct: true },
          { text: "Yes, no problem! I want that team tests it on Thursday.", correct: false },
          { text: "Yes! I want team test it on Thursday.", correct: false }
        ]
      }
    ]
  },
  {
    id: "sc_techart_pipeline",
    title: "⚙️ Tech Art: Интеграция в движок и LOD'ы",
    character: "Tech Lead (Alex)",
    description: "Настройка коллизий, генерация LOD'ов и проверка памяти в движке.",
    steps: [
      {
        npcSay: "Hi! We are preparing the release candidate build. Did you set up the LODs and collision presets for the new assets?",
        npcRu: "Привет! Мы готовим релизный билд. Ты настроил LOD'ы и пресеты коллизий для новых ассетов?",
        userTaskRu: "Скажите: «Вчера я настроил коллизии, но у меня вообще не было времени на LOD'ы».",
        hint: "Past Simple (I set up) + сильное отрицание had no time at all.",
        expectedPhrase: "Yesterday I set up the collisions, but I had no time for the LODs at all.",
        options: [
          { text: "Yesterday I set up the collisions, but I had no time for the LODs at all.", correct: true },
          { text: "Yesterday I did set up collisions, but I didn't have no time for LODs.", correct: false },
          { text: "Yesterday I was set up collisions, but I had no any time.", correct: false }
        ]
      },
      {
        npcSay: "Understood. The mesh density is quite high. Can you finish the automatic LOD generation today?",
        npcRu: "Понял. Плотность полигонов довольно высокая. Ты сможешь закончить автоматическую генерацию LOD'ов сегодня?",
        userTaskRu: "Скажите: «Да, я должен закончить это сегодня до пяти вечера».",
        hint: "Камешек must без частицы to: I must finish this today before 5 PM.",
        expectedPhrase: "Yes, I must finish this today before 5 PM.",
        options: [
          { text: "Yes, I must finish this today before 5 PM.", correct: true },
          { text: "Yes, I must to finish this today before 5 PM.", correct: false },
          { text: "Yes, I will must finish this today.", correct: false }
        ]
      },
      {
        npcSay: "Perfect! Make sure to run the performance benchmark in the engine afterwards.",
        npcRu: "Отлично! Обязательно запусти бенчмарк производительности в движке после этого.",
        userTaskRu: "Скажите: «Конечно. Я позвоню тебе, когда билд будет готов».",
        hint: "Будущее время will + call + to be: I will call you when the build is ready.",
        expectedPhrase: "Sure. I will call you when the build is ready.",
        options: [
          { text: "Sure. I will call you when the build is ready.", correct: true },
          { text: "Sure. When the build is ready, will I call you?", correct: false },
          { text: "Sure. I call you when build will be ready.", correct: false }
        ]
      }
    ]
  },
  {
    id: "sc_cinematics",
    title: "🎬 VFX: Синематики и разрушения",
    character: "Cinematic Director (Christopher)",
    description: "Симуляция разрушения моста, кэширование геометрии и дым.",
    steps: [
      {
        npcSay: "Good morning! The destruction simulation of the bridge looks massive, but the secondary dust debris disappears too quickly. Can we extend its lifetime?",
        npcRu: "Доброе утро! Симуляция разрушения моста выглядит мощно, но вторичная пыль и обломки исчезают слишком быстро. Мы можем продлить время их жизни?",
        userTaskRu: "Скажите: «Да, я могу настроить время жизни частиц и добавить больше турбулентности».",
        hint: "Камешек can + мостик to add: I can adjust the particle lifetime and add more turbulence.",
        expectedPhrase: "Yes, I can adjust the particle lifetime and add more turbulence.",
        options: [
          { text: "Yes, I can adjust the particle lifetime and add more turbulence.", correct: true },
          { text: "Yes, I can to adjust particle life and adding turbulence.", correct: false },
          { text: "Yes, I will can adjust particle time.", correct: false }
        ]
      },
      {
        npcSay: "Great! And what about the Alembic cache size? It was taking almost 15 gigabytes on disk.",
        npcRu: "Отлично! А что по размеру алембик кэша? Он занимал почти 15 гигабайт на диске.",
        userTaskRu: "Скажите: «Вчера я оптимизировал геометрию, и теперь кэш весит всего три гигабайта».",
        hint: "Past Simple: Yesterday I optimized the geometry, and now it takes only three gigabytes.",
        expectedPhrase: "Yesterday I optimized the geometry, and now it takes only three gigabytes.",
        options: [
          { text: "Yesterday I optimized the geometry, and now it takes only three gigabytes.", correct: true },
          { text: "Yesterday I did optimized geometry, now it is take 3GB.", correct: false },
          { text: "Yesterday I was optimize geometry, and it have 3GB.", correct: false }
        ]
      },
      {
        npcSay: "Fantastic work! I want you to render the final sequence overnight so we can review it tomorrow morning.",
        npcRu: "Фантастическая работа! Я хочу, чтобы ты поставил финальный рендер на ночь, чтобы мы посмотрели утром.",
        userTaskRu: "Скажите: «Договорились! Я запущу рендер перед уходом домой».",
        hint: "I will start the render before leaving home / before I leave.",
        expectedPhrase: "Deal! I will start the render before I leave for home.",
        options: [
          { text: "Deal! I will start the render before I leave for home.", correct: true },
          { text: "Deal! I will to start render before leave.", correct: false },
          { text: "Deal! I am start render when leave home.", correct: false }
        ]
      }
    ]
  },
  {
    id: "sc_material_graph",
    title: "🕹️ Tech Art: Шейдер воды и HLSL",
    character: "Senior Tech Artist (Marcus)",
    description: "Разбор нод шейдера воды, вертексная анимация волн и кастомный код.",
    steps: [
      {
        npcSay: "Hey! I looked at your water material graph. The Gerstner wave function looks realistic, but the instruction count is slightly over our budget.",
        npcRu: "Привет! Посмотрел твой граф материала воды. Функция волн Герстнера выглядит реалистично, но число инструкций чуть выше нашего лимита.",
        userTaskRu: "Скажите: «Честно говоря, я использовал кастомную ноду HLSL, чтобы ускорить вычисления».",
        hint: "To be honest, I used a custom HLSL node to speed up the calculations.",
        expectedPhrase: "To be honest, I used a custom HLSL node to speed up the calculations.",
        options: [
          { text: "To be honest, I used a custom HLSL node to speed up the calculations.", correct: true },
          { text: "To be honest, I am use custom HLSL node for speed up.", correct: false },
          { text: "Honestly, I did used custom node to speeding up.", correct: false }
        ]
      },
      {
        npcSay: "Ah, that explains the clean math! Does it support distance-based tessellation or vertex displacement?",
        npcRu: "А, это объясняет чистую математику! Он поддерживает тесселяцию по дистанции или вертексное смещение?",
        userTaskRu: "Скажите: «Да, он использует вертексное смещение, но отключает его на расстоянии».",
        hint: "Present Simple (he/she/it ➔ V-s): It uses vertex displacement, but disables it at a distance.",
        expectedPhrase: "Yes, it uses vertex displacement, but disables it at a distance.",
        options: [
          { text: "Yes, it uses vertex displacement, but disables it at a distance.", correct: true },
          { text: "Yes, it use vertex displacement, but disable it at distance.", correct: false },
          { text: "Yes, it is use displacement, but it disable distance.", correct: false }
        ]
      },
      {
        npcSay: "Impressive! Can you document the material parameters for the environment team today?",
        npcRu: "Впечатляет! Ты можешь задокументировать параметры материала для команды левел-дизайна сегодня?",
        userTaskRu: "Скажите: «Конечно! Я хочу, чтобы они протестировали этот шейдер на тестовой карте».",
        hint: "Complex Object: I want them TO test this shader on the test map.",
        expectedPhrase: "Sure! I want them to test this shader on the test map.",
        options: [
          { text: "Sure! I want them to test this shader on the test map.", correct: true },
          { text: "Sure! I want that they will test this shader.", correct: false },
          { text: "Sure! I want them test this shader now.", correct: false }
        ]
      }
    ]
  },
  {
    id: "sc_coffee_break",
    title: "☕ Беседа на кухне студии",
    character: "Concept Artist (Chloe)",
    description: "Непринуждённый разговор у кофемашины о дедлайнах, хобби и выходных.",
    steps: [
      {
        npcSay: "Phew, finally a coffee break! The sprint deadline was so stressful this week. Are you feeling tired too?",
        npcRu: "Уф, наконец-то кофе-брейк! Дедлайн спринта на этой неделе был таким напряженным. Ты тоже чувствуешь себя уставшим?",
        userTaskRu: "Скажите: «Да, я очень устал, но мы проделали отличную работу».",
        hint: "Состояние: Yes, I am very tired, but we did a great job.",
        expectedPhrase: "Yes, I am very tired, but we did a great job.",
        options: [
          { text: "Yes, I am very tired, but we did a great job.", correct: true },
          { text: "Yes, I do tired, but we did great job.", correct: false },
          { text: "Yes, I have very tired, but we made great work.", correct: false }
        ]
      },
      {
        npcSay: "Totally! By the way, are you gonna attend the studio board game night this Friday?",
        npcRu: "Полностью согласна! Кстати, ты собираешься на пятничный вечер настолок в студии?",
        userTaskRu: "Скажите: «Вообще-то, я собираюсь поехать за город на эти выходные».",
        hint: "Мостик Actually... + намерение I am gonna go out of town this weekend.",
        expectedPhrase: "Actually, I am gonna go out of town this weekend.",
        options: [
          { text: "Actually, I am gonna go out of town this weekend.", correct: true },
          { text: "Actually, I will to go out of town on weekend.", correct: false },
          { text: "In fact, I am go out of town this weekend.", correct: false }
        ]
      },
      {
        npcSay: "That sounds so relaxing! Where are you going?",
        npcRu: "Звучит здорово! Куда ты едешь?",
        userTaskRu: "Скажите: «Я еду в горы. Я хочу отдохнуть от экранов и компьютеров».",
        hint: "I am going to the mountains. I want TO take a break from screens.",
        expectedPhrase: "I am going to the mountains. I want to take a break from screens.",
        options: [
          { text: "I am going to the mountains. I want to take a break from screens.", correct: true },
          { text: "I go to mountains. I want take break from screens.", correct: false },
          { text: "I am go to mountains. I want that I rest from screens.", correct: false }
        ]
      }
    ]
  },
  {
    id: "sc_qa_triage",
    title: "🎮 Геймдев: Багрепорт с QA-лидом",
    character: "QA Lead (Sam)",
    description: "Разбор бага с исчезающими частицами на низких настройках графики.",
    steps: [
      {
        npcSay: "Hey! We found a critical visual bug on low-end machines. The fire particles completely disappear when the camera gets too close.",
        npcRu: "Привет! Мы нашли критический визуальный баг на слабых машинах. Огненные частицы полностью исчезают, когда камера приближается слишком близко.",
        userTaskRu: "Скажите: «Это странно. Вы тестировали это в последнем билде?»",
        hint: "Вопрос в Past Simple: That is strange. Did you test this in the latest build?",
        expectedPhrase: "That is strange. Did you test this in the latest build?",
        options: [
          { text: "That is strange. Did you test this in the latest build?", correct: true },
          { text: "That is strange. Were you test this in latest build?", correct: false },
          { text: "Strange. Did you tested this in the build?", correct: false }
        ]
      },
      {
        npcSay: "Yes, we reproduced it five minutes ago on the latest build. It seems related to the camera near-clipping plane.",
        npcRu: "Да, мы воспроизвели это пять минут назад на последнем билде. Похоже, это связано с near-clipping плоскостью камеры.",
        userTaskRu: "Скажите: «Понял. Я проверю настройки камеры в шейдере прямо сейчас».",
        hint: "I see. I will check the camera settings in the shader right now.",
        expectedPhrase: "I see. I will check the camera settings in the shader right now.",
        options: [
          { text: "I see. I will check the camera settings in the shader right now.", correct: true },
          { text: "I understand. I check camera settings in shader right now.", correct: false },
          { text: "I see. I will to check camera settings.", correct: false }
        ]
      },
      {
        npcSay: "Thanks a lot! Can you ping me on Slack as soon as the hotfix is ready?",
        npcRu: "Большое спасибо! Пинганёшь меня в Слаке, как только хотфикс будет готов?",
        userTaskRu: "Скажите: «Конечно. У нас не будет никаких проблем с этим багом к полудню».",
        hint: "We will have no problems with this bug by noon (сильное отрицание будущего).",
        expectedPhrase: "Sure. We will have no problems with this bug by noon.",
        options: [
          { text: "Sure. We will have no problems with this bug by noon.", correct: true },
          { text: "Sure. We will don't have problems with this bug.", correct: false },
          { text: "Sure. We have no any problems by noon.", correct: false }
        ]
      }
    ]
  },
  {
    id: "sc_conf_taxi",
    title: "🚕 Такси на конференцию (GDC)",
    character: "Таксист (Robert)",
    description: "Поездка в выставочный центр, пробки и оплата поездки.",
    steps: [
      {
        npcSay: "Good morning! Where are we heading today?",
        npcRu: "Доброе утро! Куда держим путь сегодня?",
        userTaskRu: "Скажите: «В Moscone Center, пожалуйста. Мне нужно успеть туда до девяти утра».",
        hint: "To Moscone Center, please. I need to be there before 9 AM.",
        expectedPhrase: "To Moscone Center, please. I need to be there before 9 AM.",
        options: [
          { text: "To Moscone Center, please. I need to be there before 9 AM.", correct: true },
          { text: "To Moscone Center, please. I need be there before 9 AM.", correct: false },
          { text: "Moscone Center please. Must to be there at 9 AM.", correct: false }
        ]
      },
      {
        npcSay: "There is some heavy traffic on 4th Street, but I can take the highway. Is that okay with you?",
        npcRu: "На 4-й улице сильная пробка, но я могу поехать по хайвею. Вам подходит?",
        userTaskRu: "Скажите: «Да, отлично. Сколько времени это займет?»",
        hint: "Вопрос о времени: How much time will it take?",
        expectedPhrase: "Yes, perfect. How much time will it take?",
        options: [
          { text: "Yes, perfect. How much time will it take?", correct: true },
          { text: "Yes, perfect. How many time it will take?", correct: false },
          { text: "Yes, good. How long will it takes?", correct: false }
        ]
      },
      {
        npcSay: "About 15 minutes! Here we are, right in front of the main entrance. That will be 22 dollars.",
        npcRu: "Около 15 минут! Вот мы и на месте, прямо перед главным входом. С вас 22 доллара.",
        userTaskRu: "Скажите: «Вот 25 долларов. Сдачу можете оставить себе. Хорошего дня!»",
        hint: "Here is 25 dollars. You can keep the change. Have a nice day!",
        expectedPhrase: "Here is 25 dollars. You can keep the change. Have a nice day!",
        options: [
          { text: "Here is 25 dollars. You can keep the change. Have a nice day!", correct: true },
          { text: "Here is 25 dollars. You can to keep change. Have nice day!", correct: false },
          { text: "Take 25 dollars. Keep the change to you. Have good day!", correct: false }
        ]
      }
    ]
  },

  // --- БЫТОВЫЕ И ПУТЕШЕСТВЕННЫЕ СЦЕНАРИИ ---
  {
    id: "sc_cafe",
    title: "☕ В кофейне",
    character: "Бариста (Alex)",
    description: "Вежливый заказ кофе, выбор молока и безналичная оплата.",
    steps: [
      {
        npcSay: "Hi there! Welcome to Central Roast. What can I get for you today?",
        npcRu: "Привет! Добро пожаловать. Что я могу вам приготовить?",
        userTaskRu: "Скажите вежливо: «Я бы хотел заказать большой капучино».",
        hint: "Используйте устойчивую формулу вежливости: would like to...",
        expectedPhrase: "I would like to order a large cappuccino.",
        options: [
          { text: "I would like to order a large cappuccino.", correct: true },
          { text: "I want a large cappuccino right now.", correct: false },
          { text: "I would order a large cappuccino to you.", correct: false }
        ]
      },
      {
        npcSay: "Sure thing! Do you want whole milk or oat milk?",
        npcRu: "Без проблем! Вы хотите цельное молоко или овсяное?",
        userTaskRu: "Скажите: «Овсяное молоко, пожалуйста. Сколько это стоит?»",
        hint: "Вопрос о цене: How much does it cost?",
        expectedPhrase: "Oat milk, please. How much does it cost?",
        options: [
          { text: "Oat milk, please. How much does it cost?", correct: true },
          { text: "Oat milk, please. How much is cost?", correct: false },
          { text: "Oat milk, please. How many money cost?", correct: false }
        ]
      },
      {
        npcSay: "That will be 4 dollars and 50 cents. Cash or card?",
        npcRu: "С вас 4 доллара 50 центов. Наличные или карта?",
        userTaskRu: "Скажите: «У меня нет наличных вообще. Могу я оплатить картой?»",
        hint: "Сильное отрицание предметов have no cash at all + камешек can/could.",
        expectedPhrase: "I have no cash at all. Can I pay by card?",
        options: [
          { text: "I have no cash at all. Can I pay by card?", correct: true },
          { text: "I am not cash. Do I can pay by card?", correct: false },
          { text: "I have no cash. Can I to pay by card?", correct: false }
        ]
      }
    ]
  },
  {
    id: "sc_hotel",
    title: "🏨 В отеле",
    character: "Портье (Emily)",
    description: "Решение бытовой проблемы при заселении с использованием there is/are.",
    steps: [
      {
        npcSay: "Good evening, sir. How can I help you today?",
        npcRu: "Добрый вечер, сэр. Чем могу помочь?",
        userTaskRu: "Скажите: «В моем номере вообще нет полотенец».",
        hint: "Конструкция местонахождения There are no towels in my room at all.",
        expectedPhrase: "There are no towels in my room at all.",
        options: [
          { text: "There are no towels in my room at all.", correct: true },
          { text: "There is no towels in my room.", correct: false },
          { text: "In my room no have towels at all.", correct: false }
        ]
      },
      {
        npcSay: "Oh, I am very sorry about that! I will call the housekeeping immediately.",
        npcRu: "Ой, мне очень жаль! Я немедленно позвоню горничной.",
        userTaskRu: "Скажите: «И ещё: здесь поблизости есть аптека?»",
        hint: "Вопрос о наличии: Is there a pharmacy near here?",
        expectedPhrase: "And also: is there a pharmacy near here?",
        options: [
          { text: "And also: is there a pharmacy near here?", correct: true },
          { text: "And also: are there a pharmacy near here?", correct: false },
          { text: "And also: there is a pharmacy near here?", correct: false }
        ]
      },
      {
        npcSay: "Yes, there is one just across the street. It works until 10 PM.",
        npcRu: "Да, есть одна прямо через дорогу. Она работает до 22:00.",
        userTaskRu: "Скажите: «Большое спасибо. Я хочу, чтобы они принесли полотенца как можно скорее».",
        hint: "Complex Object: I want them to bring...",
        expectedPhrase: "Thank you very much. I want them to bring towels as soon as possible.",
        options: [
          { text: "Thank you very much. I want them to bring towels as soon as possible.", correct: true },
          { text: "Thank you. I want that they will bring towels.", correct: false },
          { text: "Thank you. I want them bring towels now.", correct: false }
        ]
      }
    ]
  },
  {
    id: "sc_airport",
    title: "✈️ В аэропорту",
    character: "Сотрудник стойки (James)",
    description: "Регистрация на рейс, багаж и посадочный талон.",
    steps: [
      {
        npcSay: "Good morning! Can I see your passport and booking reference, please?",
        npcRu: "Доброе утро! Могу я взглянуть на ваш паспорт и бронь билета?",
        userTaskRu: "Скажите: «Вот, пожалуйста. Могу я взять место у окна?»",
        hint: "«Here you are» (вот, пожалуйста) + вежливый камешек could I have...",
        expectedPhrase: "Here you are. Could I have a window seat, please?",
        options: [
          { text: "Here you are. Could I have a window seat, please?", correct: true },
          { text: "Here you are. Do I can have window place?", correct: false },
          { text: "Take it. I will to sit near window.", correct: false }
        ]
      },
      {
        npcSay: "Yes, seat 14A is available. Are you checking any bags today?",
        npcRu: "Да, место 14А свободно. Вы сдаёте багаж сегодня?",
        userTaskRu: "Скажите: «У меня только одно место ручной клади».",
        hint: "«I have only one piece of carry-on bag.» (только один определитель).",
        expectedPhrase: "I have only one piece of carry-on bag.",
        options: [
          { text: "I have only one piece of carry-on bag.", correct: true },
          { text: "I am only one hand bag.", correct: false },
          { text: "I have no any luggage, only bag.", correct: false }
        ]
      },
      {
        npcSay: "Perfect. Here is your boarding pass. Gate B7. Boarding starts at 11:30.",
        npcRu: "Отлично. Вот ваш посадочный. Выход В7. Посадка начинается в 11:30.",
        userTaskRu: "Спросите: «Куда мне нужно идти на паспортный контроль?»",
        hint: "Where + should I go (камешек) или Where do I go?",
        expectedPhrase: "Where should I go for passport control?",
        options: [
          { text: "Where should I go for passport control?", correct: true },
          { text: "Where I should go for control?", correct: false },
          { text: "Where do I should to go?", correct: false }
        ]
      }
    ]
  },
  {
    id: "sc_restaurant",
    title: "🍽️ В ресторане",
    character: "Официант (Marco)",
    description: "Уточнение состава блюда, заказ счёта и раздельная оплата.",
    steps: [
      {
        npcSay: "Good evening! Are you ready to order, or do you need a few more minutes?",
        npcRu: "Добрый вечер! Вы готовы сделать заказ или нужно еще пару минут?",
        userTaskRu: "Скажите: «Честно говоря, нам нужно ещё пять минут».",
        hint: "Используйте разговорный мостик To be honest... + we need.",
        expectedPhrase: "To be honest, we need five more minutes.",
        options: [
          { text: "To be honest, we need five more minutes.", correct: true },
          { text: "Honestly, we are need five minutes.", correct: false },
          { text: "We have five minutes to wait you.", correct: false }
        ]
      },
      {
        npcSay: "Take your time! Let me know when you are ready.",
        npcRu: "Не спешите! Дайте знать, когда будете готовы.",
        userTaskRu: "Скажите: «Мы готовы. Есть ли в этом блюде орехи? У меня аллергия».",
        hint: "Вопрос о наличии: Are there any nuts in this dish? I have an allergy.",
        expectedPhrase: "We are ready. Are there any nuts in this dish? I am allergic.",
        options: [
          { text: "We are ready. Are there any nuts in this dish? I am allergic.", correct: true },
          { text: "We ready. Is there nuts? I have allergic.", correct: false },
          { text: "We are ready. Do this dish have nuts?", correct: false }
        ]
      },
      {
        npcSay: "No nuts at all, it is completely safe for you. Anything else?",
        npcRu: "Никаких орехов вообще, это абсолютно безопасно для вас. Что-нибудь ещё?",
        userTaskRu: "Скажите: «Можно нам счёт, пожалуйста? Мы хотим разделить его».",
        hint: "Could we have the bill, please? We want to split it.",
        expectedPhrase: "Could we have the bill, please? We want to split it.",
        options: [
          { text: "Could we have the bill, please? We want to split it.", correct: true },
          { text: "Give bill please. We want split it.", correct: false },
          { text: "Can we to have bill? We will split.", correct: false }
        ]
      }
    ]
  },
  {
    id: "sc_pharmacy",
    title: "🏥 В аптеке",
    character: "Фармацевт (Dr. Watson)",
    description: "Описание симптомов, просьба о совете и режим приёма лекарств.",
    steps: [
      {
        npcSay: "Good morning. What seems to be the problem today?",
        npcRu: "Доброе утро. Что вас беспокоит сегодня?",
        userTaskRu: "Скажите: «У меня ужасно болит голова и мне холодно».",
        hint: "I have a terrible headache and I am cold (самочувствие от первого лица).",
        expectedPhrase: "I have a terrible headache and I am cold.",
        options: [
          { text: "I have a terrible headache and I am cold.", correct: true },
          { text: "My head is pain and to me is cold.", correct: false },
          { text: "I have terrible headache and I have cold.", correct: false }
        ]
      },
      {
        npcSay: "Do you have a fever or sore throat?",
        npcRu: "Есть ли у вас температура или боль в горле?",
        userTaskRu: "Скажите: «У меня вообще нет температуры, но горло болит».",
        hint: "I have no fever at all, but my throat hurts.",
        expectedPhrase: "I have no fever at all, but my throat hurts.",
        options: [
          { text: "I have no fever at all, but my throat hurts.", correct: true },
          { text: "I am not fever at all, but throat is hurt.", correct: false },
          { text: "I don't have no fever, but throat hurts.", correct: false }
        ]
      },
      {
        npcSay: "I recommend these painkiller tablets and a throat spray. Take one tablet every 8 hours.",
        npcRu: "Я рекомендую эти таблетки и спрей для горла. Принимайте по одной таблетке каждые 8 часов.",
        userTaskRu: "Спросите: «Должен ли я принимать это после еды?»",
        hint: "Рубильник камешка Should: Should I take this after meals?",
        expectedPhrase: "Should I take this after meals?",
        options: [
          { text: "Should I take this after meals?", correct: true },
          { text: "Do I must to take this after meals?", correct: false },
          { text: "Must I to take this after food?", correct: false }
        ]
      }
    ]
  }
];


/* --- js/data/flashcards-data.js --- */
// Начальная база интерактивных карточек уровня B1
// Включает как бытовой/повседневный английский, так и специальную лексику Tech Art & GameDev
// С понятными русскими фонетическими подсказками Драгункина (где ударение, немые буквы)


const PHRASES_50_CARDS = (typeof CONVERSATIONAL_50_PHRASES !== "undefined" ? CONVERSATIONAL_50_PHRASES : []).map((p) => ({
  id: "card_" + p.id,
  word: p.phrase,
  translation: p.ru,
  phoneticRu: p.phonetic,
  contextEn: p.example,
  contextRu: `${p.exampleRu} (💡 ${p.tip})`,
  category: "casual",
  score: 0
}));

const INITIAL_FLASHCARDS = [
  ...PHRASES_50_CARDS,
  // ==========================================
  // 1. БЫТОВОЙ И ПОВСЕДНЕВНЫЙ АНГЛИЙСКИЙ (CASUAL B1)
  // ==========================================
  {
    id: "card_receipt",
    word: "receipt",
    translation: "чек (в магазине или кафе)",
    phoneticRu: "[ри-СИИТ] — буква «p» немая, не читается вообще!",
    contextEn: "Could I please get a receipt for my coffee?",
    contextRu: "Можно мне, пожалуйста, чек за кофе?",
    category: "casual",
    score: 0
  },
  {
    id: "card_recommend",
    word: "recommend",
    translation: "рекомендовать / советовать",
    phoneticRu: "[рэ-ка-МЭНД] — ударение на третий слог «МЭНД»",
    contextEn: "What dish would you recommend here?",
    contextRu: "Какое блюдо вы бы посоветовали здесь?",
    category: "casual",
    score: 0
  },
  {
    id: "card_instead",
    word: "instead",
    translation: "вместо этого",
    phoneticRu: "[ин-СТЭД] — ударение на «СТЭД», часто ставится в конец фразы",
    contextEn: "We don't have tea, would you like coffee instead?",
    contextRu: "У нас нет чая, не хотите ли кофе вместо него?",
    category: "casual",
    score: 0
  },
  {
    id: "card_comfortable",
    word: "comfortable",
    translation: "удобный / комфортный",
    phoneticRu: "[КАМФ-трэ-бл] — сокращается до 3 слогов, не «комфортабл»!",
    contextEn: "This chair is really comfortable for long work.",
    contextRu: "Это кресло действительно удобное для долгой работы.",
    category: "casual",
    score: 0
  },
  {
    id: "card_delicious",
    word: "delicious",
    translation: "очень вкусный",
    phoneticRu: "[ди-ЛИ-шэс] — ударение на «ЛИ», мягкое окончание «шэс»",
    contextEn: "Thank you, lunch was absolutely delicious!",
    contextRu: "Спасибо, обед был безумно вкусным!",
    category: "casual",
    score: 0
  },
  {
    id: "card_neighborhood",
    word: "neighborhood",
    translation: "район / окрестности",
    phoneticRu: "[НЭЙ-бэр-худ] — ударение на первый слог «НЭЙ»",
    contextEn: "It is a quiet and safe neighborhood.",
    contextRu: "Это тихий и безопасный район.",
    category: "casual",
    score: 0
  },
  {
    id: "card_urgent",
    word: "urgent",
    translation: "срочный / неотложный",
    phoneticRu: "[ЁР-джент] — звук «ё» глубокий, ударение на первый слог",
    contextEn: "I have an urgent message from our manager.",
    contextRu: "У меня срочное сообщение от нашего менеджера.",
    category: "casual",
    score: 0
  },
  {
    id: "card_actually",
    word: "actually",
    translation: "на самом деле / вообще-то (разговорный мостик)",
    phoneticRu: "[ЭК-чу-э-ли] — спасательное слово B1 в начале ответа",
    contextEn: "Actually, I have already finished that task.",
    contextRu: "Вообще-то, я уже закончил эту задачу.",
    category: "casual",
    score: 0
  },
  {
    id: "card_honest",
    word: "honestly",
    translation: "честно говоря",
    phoneticRu: "[О-нэст-ли] — первая буква «h» немая, звук начинается с «О»",
    contextEn: "Honestly, I think we need more time for this.",
    contextRu: "Честно говоря, я думаю, нам нужно больше времени на это.",
    category: "casual",
    score: 0
  },

  // ==========================================
  // 2. TECH ART & GAMEDEV (РАБОТА В СТУДИИ)
  // ==========================================
  {
    id: "card_overdraw",
    word: "overdraw",
    translation: "овердроу (многократное перекрытие прозрачных пикселей)",
    phoneticRu: "[О-вэр-дро] — ударение на «О», «draw» тянется как длинное «о»",
    contextEn: "Heavy smoke particles cause serious alpha overdraw on GPU.",
    contextRu: "Густые частицы дыма вызывают сильный альфа-овердроу на видеокарте.",
    category: "tech",
    score: 0
  },
  {
    id: "card_budget",
    word: "budget",
    translation: "бюджет / лимит ресурсов (памяти, миллисекунд кадра)",
    phoneticRu: "[БА-джит] — буква «d» почти не слышна, мягкое «джит»",
    contextEn: "We need to stay within our 16ms frame budget.",
    contextRu: "Нам нужно укладываться в наш бюджет кадра в 16 миллисекунд.",
    category: "tech",
    score: 0
  },
  {
    id: "card_performance",
    word: "performance",
    translation: "производительность / быстродействие",
    phoneticRu: "[пёр-ФО-мэнс] — ударение на «ФО», «r» не рычим!",
    contextEn: "This custom shader saves great performance on consoles.",
    contextRu: "Этот кастомный шейдер отлично экономит производительность на консолях.",
    category: "tech",
    score: 0
  },
  {
    id: "card_optimization",
    word: "optimization",
    translation: "оптимизация",
    phoneticRu: "[оп-ти-май-ЗЕЙ-шн] — главное ударение падает на «ЗЕЙ»",
    contextEn: "Optimization of textures is our primary milestone goal.",
    contextRu: "Оптимизация текстур — главная цель нашего майлстоуна.",
    category: "tech",
    score: 0
  },
  {
    id: "card_pipeline",
    word: "pipeline",
    translation: "пайплайн (процесс передачи ассетов)",
    phoneticRu: "[ПАЙП-лайн] — два чётких слога",
    contextEn: "Our Houdini to Unreal pipeline works completely automated.",
    contextRu: "Наш пайплайн из Houdini в Unreal работает полностью автоматически.",
    category: "tech",
    score: 0
  },
  {
    id: "card_stutter",
    word: "stutter",
    translation: "микрофриз / подёргивание кадра",
    phoneticRu: "[СТА-тэр] — короткое твёрдое «ста»",
    contextEn: "Texture streaming causes noticeable stutter during gameplay.",
    contextRu: "Подгрузка текстур вызывает заметный микрофриз во время игры.",
    category: "tech",
    score: 0
  },
  {
    id: "card_latency",
    word: "latency",
    translation: "задержка ввода / лаг отклика",
    phoneticRu: "[ЛЭЙ-тэн-си] — ударение на первый слог «ЛЭЙ»",
    contextEn: "We reduced input latency down to 20 milliseconds.",
    contextRu: "Мы уменьшили задержку ввода до 20 миллисекунд.",
    category: "tech",
    score: 0
  },
  {
    id: "card_emitter",
    word: "emitter",
    translation: "эмиттер (источник частиц в Niagara)",
    phoneticRu: "[и-МИ-тэр] — ударение на средний слог «МИ»",
    contextEn: "Disable this secondary emitter when the camera is far away.",
    contextRu: "Отключайте этот дополнительный эмиттер, когда камера далеко.",
    category: "tech",
    score: 0
  },

  // --- РЕЧЕВЫЕ ШАБЛОНЫ ДЛЯ ТЕХНИЧЕСКИХ СОЗВОНОВ ---
  {
    id: "card_worked_on",
    word: "I worked on...",
    translation: "Я работал над…",
    phoneticRu: "[ай уёркт он] — предлог «on» обязателен!",
    contextEn: "Yesterday I worked on water shaders and particle optimization.",
    contextRu: "Вчера я работал над шейдерами воды и оптимизацией частиц.",
    category: "tech",
    score: 0
  },
  {
    id: "card_developed",
    word: "I developed...",
    translation: "Я разработал / создал…",
    phoneticRu: "[ай ди-ВЕ-лэпт] — ударение на второй слог «ВЕ», окончание глухое «т»",
    contextEn: "I developed a custom post-process volume for the dark cave scene.",
    contextRu: "Я разработал кастомный пост-процесс вольюм для темной сцены.",
    category: "tech",
    score: 0
  },
  {
    id: "card_specialize",
    word: "I specialize in...",
    translation: "Я специализируюсь на…",
    phoneticRu: "[ай СПЕ-шэ-лайз ин] — после «in» существительное или -ing",
    contextEn: "I specialize in real-time VFX, Niagara, and GPU simulations.",
    contextRu: "Я специализируюсь на риалтайм VFX, Niagara и симуляциях на GPU.",
    category: "tech",
    score: 0
  },
  {
    id: "card_focus_on",
    word: "I focus on...",
    translation: "Я уделяю внимание / фокусируюсь на…",
    phoneticRu: "[ай ФОУ-кэс он] — всегда предлог «on»",
    contextEn: "Today I focus on reducing draw calls and optimizing texture memory.",
    contextRu: "Сегодня я фокусируюсь на снижении draw calls и оптимизации памяти.",
    category: "tech",
    score: 0
  },
  {
    id: "card_experience_with",
    word: "I have experience with...",
    translation: "У меня есть опыт работы с…",
    phoneticRu: "[ай хэв ик-СПИ-ри-энс уиз] — предлог «with» звучит максимально естественно",
    contextEn: "I have experience with Unreal Engine 5, HLSL shaders, and Houdini.",
    contextRu: "У меня есть опыт работы с Unreal Engine 5, HLSL-шейдерами и Houdini.",
    category: "tech",
    score: 0
  },
  {
    id: "card_main_goal",
    word: "The main goal was...",
    translation: "Основная цель была…",
    phoneticRu: "[зэ мэйн гоул уоз] — далее глагол с частицей to: «was to maintain»",
    contextEn: "The main goal was to maintain a stable 60 FPS on target hardware.",
    contextRu: "Основная цель была удержать стабильные 60 FPS на целевом железе.",
    category: "tech",
    score: 0
  },
  {
    id: "card_main_challenge",
    word: "The main challenge was...",
    translation: "Основная сложность была…",
    phoneticRu: "[зэ мэйн ЧЭ-линдж уоз] — «challenge» звучит профессиональнее «problem»",
    contextEn: "The main challenge was heavy alpha overdraw from transparent smoke layers.",
    contextRu: "Основная сложность заключалась в сильном овердроу от прозрачного дыма.",
    category: "tech",
    score: 0
  },
  {
    id: "card_chose_approach",
    word: "I chose this approach because...",
    translation: "Я выбрал этот подход, потому что…",
    phoneticRu: "[ай чоуз зис эп-РОУЧ би-КОЗ] — «chose» — 2-я форма глагола choose",
    contextEn: "I chose this approach because it significantly reduces GPU bandwidth.",
    contextRu: "Я выбрал этот подход, потому что он снижает нагрузку на шину GPU.",
    category: "tech",
    score: 0
  },
  {
    id: "card_depends_budget",
    word: "It depends on the performance budget.",
    translation: "Это зависит от бюджета производительности.",
    phoneticRu: "[ит ди-ПЕНДЗ он зэ пёр-ФО-мэнс БА-джит] — «depends on», не «from»!",
    contextEn: "Whether we add more volumetric lights depends on the performance budget.",
    contextRu: "Добавим ли мы больше света, зависит от бюджета производительности.",
    category: "tech",
    score: 0
  },
  {
    id: "card_tradeoff",
    word: "There is a trade-off between quality and speed.",
    translation: "Есть компромисс между качеством и скоростью.",
    phoneticRu: "[зэр из э ТРЭЙД-офф бит-УИН КУО-лэ-ти энд спиид]",
    contextEn: "There is always a trade-off between visual quality and render speed.",
    contextRu: "Всегда есть компромисс между качеством картинки и скоростью рендера.",
    category: "tech",
    score: 0
  },
  {
    id: "card_bottleneck",
    word: "bottleneck",
    translation: "узкое место / бутылочное горлышко",
    phoneticRu: "[БОТЛ-нэк] — то, что тормозит всю систему кадра",
    contextEn: "Vertex shader calculations are the main bottleneck here.",
    contextRu: "Расчеты вершинного шейдера — главное узкое место здесь.",
    category: "tech",
    score: 0
  },
  {
    id: "card_bake_lighting",
    word: "bake lighting",
    translation: "запекать свет (в лайтмапы/текстуры)",
    phoneticRu: "[бэйк ЛАЙ-тинг] — освобождает ресурсы видеокарты в рантайме",
    contextEn: "We can bake stationary lighting for background assets to save GPU time.",
    contextRu: "Мы можем запечь свет для фоновых ассетов, чтобы сберечь время GPU.",
    category: "tech",
    score: 0
  },
  {
    id: "card_blockers",
    word: "Are there any blockers on your end?",
    translation: "Есть ли блокирующие проблемы с твоей стороны?",
    phoneticRu: "[ар зэр Э-ни БЛО-кэрз он ёр энд] — классический вопрос стендапа",
    contextEn: "Are there any blockers on your end before we push this build?",
    contextRu: "Есть ли какие-то блокеры с вашей стороны перед отправкой билда?",
    category: "tech",
    score: 0
  },
  {
    id: "card_sync_up",
    word: "sync up",
    translation: "созвониться / быстро сверить статус",
    phoneticRu: "[синк ап] — короткий созвон 1-на-1 после стендапа",
    contextEn: "Let's sync up for five minutes after the standup to review the shaders.",
    contextRu: "Давай созвонимся на 5 минут после стендапа, чтобы посмотреть шейдеры.",
    category: "tech",
    score: 0
  },

  // ==========================================
  // 3. ПОЕЗДКИ, ГОРОД И АЭРОПОРТ (TRAVEL B1)
  // ==========================================
  {
    id: "card_departure",
    word: "departure",
    translation: "отправление / вылет самолёта",
    phoneticRu: "[ди-ПАР-чэр] — ударение на второй слог «ПАР»",
    contextEn: "Our departure is scheduled for gate number 12.",
    contextRu: "Наш вылет запланирован из гейта номер 12.",
    category: "travel",
    score: 0
  },
  {
    id: "card_luggage",
    word: "luggage",
    translation: "багаж (чемоданы)",
    phoneticRu: "[ЛА-гидж] — ударение на «ЛА», неисчисляемое слово",
    contextEn: "Where can I drop off my checked luggage?",
    contextRu: "Где я могу сдать свой зарегистрированный багаж?",
    category: "travel",
    score: 0
  },
  {
    id: "card_prescription",
    word: "prescription",
    translation: "рецепт врача (на лекарство в аптеке)",
    phoneticRu: "[при-СКРИП-шн] — ударение на «СКРИП»",
    contextEn: "Do I need a prescription to buy this medicine?",
    contextRu: "Нужен ли мне рецепт врача, чтобы купить это лекарство?",
    category: "travel",
    score: 0
  },
  {
    id: "card_reservation",
    word: "reservation",
    translation: "бронирование (столика или отеля)",
    phoneticRu: "[рэ-зэр-ВЭЙ-шн] — главное ударение на «ВЭЙ»",
    contextEn: "I have a hotel reservation under the name Alex.",
    contextRu: "У меня бронь отеля на имя Алекс.",
    category: "travel",
    score: 0
  }
];


/* --- js/data/verbs-data.js --- */
// База данных неправильных глаголов по методике Александра Драгункина
// Разделена на 5 ритмических семейств вместо бессмысленного алфавитного порядка

const DRAGUNKIN_VERB_FAMILIES = [
  {
    id: "family_zero",
    title: "1. Железобетонные (Халява)",
    subtitle: "Все 3 формы одинаковые — V1 = V2 = V3",
    icon: "💎",
    ruleDescription: "Эти глаголы вообще не меняются ни на одну букву! Выучили одно слово — знаете все 3 формы для любого времени.",
    verbs: [
      {
        v1: "cut", v2: "cut", v3: "cut",
        ru: "резать / обрезать",
        phonetic: "[кат — кат — кат]",
        example: "We cut the particle lifetime to save GPU memory.",
        tip: "Одинаково пишется и звучит во всех временах."
      },
      {
        v1: "cost", v2: "cost", v3: "cost",
        ru: "стоить / обходиться",
        phonetic: "[кост — кост — кост]",
        example: "This heavy shader cost us 5 extra milliseconds.",
        tip: "Никаких 'costed' — всегда строго 'cost'."
      },
      {
        v1: "put", v2: "put", v3: "put",
        ru: "класть / помещать",
        phonetic: "[пут — пут — пут]",
        example: "I put the new texture into the asset folder.",
        tip: "Не путать с правильными глаголами, окончание -ed не добавляется."
      },
      {
        v1: "let", v2: "let", v3: "let",
        ru: "позволять / давать делать",
        phonetic: "[лэт — лэт — лэт]",
        example: "This setting lets the engine render faster.",
        tip: "После 'let' частица 'to' сгорает: 'let me check', а не 'let me to check'."
      },
      {
        v1: "set", v2: "set", v3: "set",
        ru: "устанавливать / настраивать",
        phonetic: "[сэт — сэт — сэт]",
        example: "We set the maximum FPS limit to 60.",
        tip: "Универсальный технический глагол для настроек."
      },
      {
        v1: "hit", v2: "hit", v3: "hit",
        ru: "ударять / попадать / достигать",
        phonetic: "[хит — хит — хит]",
        example: "We hit our target milestone deadline on time.",
        tip: "Hit target = достичь цели."
      },
      {
        v1: "hurt", v2: "hurt", v3: "hurt",
        ru: "причинять вред / болеть",
        phonetic: "[хёрт — хёрт — хёрт]",
        example: "Too many draw calls hurt our frame rate.",
        tip: "В переносном смысле: вредить производительности."
      },
      {
        v1: "shut", v2: "shut", v3: "shut",
        ru: "закрывать / выключать",
        phonetic: "[шат — шат — шат]",
        example: "They shut down the test server for maintenance.",
        tip: "Shut down = аварийно закрыть / отключить."
      },
      {
        v1: "read", v2: "read", v3: "read",
        ru: "читать",
        phonetic: "[рид — рэд — рэд]",
        example: "I read the documentation about Niagara modules.",
        tip: "Хитрый глагол: пишется 1 в 1, но в прошедшем звучит как цвет red [рэд]!"
      },
      {
        v1: "quit", v2: "quit", v3: "quit",
        ru: "выходить / бросать",
        phonetic: "[куит — куит — куит]",
        example: "The application quit unexpectedly without errors.",
        tip: "Часто встречается в интерфейсах и геймдеве."
      }
    ]
  },

  {
    id: "family_twins",
    title: "2. Семья «Близнецы»",
    subtitle: "2-я и 3-я формы абсолютно одинаковые (V2 = V3)",
    icon: "👥",
    ruleDescription: "Самая большая группа в английском (60% всех глаголов). Выучил одну форму — автоматически знаешь обе (и прошедшее вчера, и причастие сделано).",
    verbs: [
      {
        v1: "build", v2: "built", v3: "built",
        ru: "строить / собирать билд",
        phonetic: "[билд — билт — билт]",
        example: "We built a new shader for dynamic water effects.",
        tip: "Звонкая 'd' в конце глухо переходит в 't'."
      },
      {
        v1: "send", v2: "sent", v3: "sent",
        ru: "отправлять / слать",
        phonetic: "[сэнд — сэнт — сэнт]",
        example: "I sent you the optimized scene file.",
        tip: "Та же закономерность: звонкая 'd' меняется на 't'."
      },
      {
        v1: "spend", v2: "spent", v3: "spent",
        ru: "тратить (время или ресурсы)",
        phonetic: "[спэнд — спэнт — спэнт]",
        example: "We spent two days debugging this memory leak.",
        tip: "Тратить ресурсы или время: spend time / spend memory."
      },
      {
        v1: "make", v2: "made", v3: "made",
        ru: "делать / создавать",
        phonetic: "[мэйк — мэйд — мэйд]",
        example: "Alex made a brilliant particle effect for combat.",
        tip: "Глагол-труженик №1 в английском языке."
      },
      {
        v1: "buy", v2: "bought", v3: "bought",
        ru: "покупать",
        phonetic: "[бай — бот — бот]",
        example: "The studio bought new licensed Houdini plugins.",
        tip: "Все глаголы на -ought звучат как простое русское [БОТ]."
      },
      {
        v1: "bring", v2: "brought", v3: "brought",
        ru: "приносить / приводить к",
        phonetic: "[бринг — брот — брот]",
        example: "This optimization brought our FPS back to 60.",
        tip: "Рифмуется с bought: [бринг — брот — брот]."
      },
      {
        v1: "think", v2: "thought", v3: "thought",
        ru: "думать / считать",
        phonetic: "[синк — сот — сот]",
        example: "I thought this texture was compressed already.",
        tip: "Та же рифма -ought: [синк — сот — сот]."
      },
      {
        v1: "feel", v2: "felt", v3: "felt",
        ru: "чувствовать",
        phonetic: "[фиил — фэлт — фэлт]",
        example: "The gameplay felt much smoother after the patch.",
        tip: "Долгий [ии] схлопывается в короткий [э]."
      },
      {
        v1: "keep", v2: "kept", v3: "kept",
        ru: "хранить / удерживать",
        phonetic: "[киип — кэпт — кэпт]",
        example: "We kept all particle counts under budget.",
        tip: "Keep in mind = иметь в виду."
      },
      {
        v1: "leave", v2: "left", v3: "left",
        ru: "покидать / оставлять",
        phonetic: "[лиив — лэфт — лэфт]",
        example: "He left a comment in the Perforce changelist.",
        tip: "Left — это и 'левый', и 'ушёл/оставил'."
      },
      {
        v1: "find", v2: "found", v3: "found",
        ru: "находить",
        phonetic: "[файнд — фаунд — фаунд]",
        example: "We found the exact node causing the crash.",
        tip: "Дифтонг [ай] переходит в [ау]."
      },
      {
        v1: "get", v2: "got", v3: "got",
        ru: "получать / становиться",
        phonetic: "[гэт — гот — гот]",
        example: "I got your message about the milestone.",
        tip: "Самый многогранный разговорный глагол."
      },
      {
        v1: "tell", v2: "told", v3: "told",
        ru: "рассказывать / сообщать",
        phonetic: "[тэл — тоулд — тоулд]",
        example: "Marcus told us about the new LOD requirements.",
        tip: "Tell кому-то напрямую: 'he told me', без предлога to!"
      },
      {
        v1: "pay", v2: "paid", v3: "paid",
        ru: "платить / окупаться",
        phonetic: "[пэй — пэйд — пэйд]",
        example: "All our optimization efforts paid off completely.",
        tip: "Pay off = окупиться / принести плоды."
      }
    ]
  },

  {
    id: "family_sing",
    title: "3. Музыкальные качели (I — A — U)",
    subtitle: "Гласная перекатывается: [ i ] ➔ [ æ ] ➔ [ ʌ ]",
    icon: "🎵",
    ruleDescription: "Глаголы звучат как музыкальная гамма: узкий звук [и] в настоящем ➔ широкий [э] в прошедшем вчера ➔ глубокий [а] в завершённом результате.",
    verbs: [
      {
        v1: "begin", v2: "began", v3: "begun",
        ru: "начинать(ся)",
        phonetic: "[бигин — бигэн — биган]",
        example: "The sync meeting began ten minutes ago.",
        tip: "Начинаю сейчас: begin. Начал вчера: began. Уже начато: begun."
      },
      {
        v1: "sing", v2: "sang", v3: "sung",
        ru: "петь",
        phonetic: "[синг — сэнг — санг]",
        example: "Classical pattern: sing - sang - sung.",
        tip: "Эталонное правило качелей I - A - U."
      },
      {
        v1: "drink", v2: "drank", v3: "drunk",
        ru: "пить",
        phonetic: "[дринк — дррэнк — дранк]",
        example: "I drank two cups of coffee before standup.",
        tip: "Та же самая звуковая дорожка: i - a - u."
      },
      {
        v1: "swim", v2: "swam", v3: "swum",
        ru: "плавать",
        phonetic: "[свим — свэм — свам]",
        example: "We swam in the pool during the vacation.",
        tip: "Качели: [свим — свэм — свам]."
      },
      {
        v1: "run", v2: "ran", v3: "run",
        ru: "бежать / запускать процесс",
        phonetic: "[ран — рэн — ран]",
        example: "We ran the automated performance benchmarks.",
        tip: "Вариация качелей: 1-я и 3-я формы совпадают (run - ran - run)."
      }
    ]
  },

  {
    id: "family_en",
    title: "4. Короли с суффиксом «-N»",
    subtitle: "3-я форма обязательно заканчивается на букву «n» / «en»",
    icon: "👑",
    ruleDescription: "Если третья форма оканчивается на букву -n (known, seen, taken, written) — перед вами это царственное семейство.",
    verbs: [
      {
        v1: "know", v2: "knew", v3: "known",
        ru: "знать",
        phonetic: "[ноу — нью — ноун]",
        example: "I have known this VFX technique for years.",
        tip: "Первая буква 'k' немая! [ноу — нью — ноун]."
      },
      {
        v1: "see", v2: "saw", v3: "seen",
        ru: "видеть",
        phonetic: "[сии — со — сиин]",
        example: "I saw the new level lighting yesterday.",
        tip: "Have you seen = ты видел(а)?"
      },
      {
        v1: "take", v2: "took", v3: "taken",
        ru: "брать / занимать время",
        phonetic: "[тэйк — тук — тэйкэн]",
        example: "Compiling shaders took about five minutes.",
        tip: "Took time = заняло время."
      },
      {
        v1: "give", v2: "gave", v3: "given",
        ru: "давать",
        phonetic: "[гив — гэйв — гивэн]",
        example: "Elena gave us very helpful feedback on shaders.",
        tip: "Даю сейчас: give. Дал вчера: gave. Отдано: given."
      },
      {
        v1: "write", v2: "wrote", v3: "written",
        ru: "писать / кодить",
        phonetic: "[райт — роут — ритэн]",
        example: "I wrote a custom HLSL function for Niagara.",
        tip: "Буква 'w' немая! В 3-й форме удваивается 'tt': written [ритэн]."
      },
      {
        v1: "speak", v2: "spoke", v3: "spoken",
        ru: "говорить / выступать",
        phonetic: "[спик — споук — споукэн]",
        example: "We spoke about particle optimization on call.",
        tip: "Английский разговорный: spoken English."
      },
      {
        v1: "break", v2: "broke", v3: "broken",
        ru: "ломать(ся)",
        phonetic: "[брэйк — броук — броукэн]",
        example: "The latest commit broke the engine build.",
        tip: "It is broken = это сломано."
      },
      {
        v1: "choose", v2: "chose", v3: "chosen",
        ru: "выбирать",
        phonetic: "[чууз — чоуз — чоузэн]",
        example: "We chose the lightweight shader model.",
        tip: "Долгий [уу] переходит в [оу]: chose - chosen."
      }
    ]
  },

  {
    id: "family_rebels",
    title: "5. Одиночки-бунтари",
    subtitle: "Всего 3 уникальных глагола на весь язык!",
    icon: "⚡",
    ruleDescription: "Не поддаются общим законам, но встречаются в каждом втором предложении. Их всего три, поэтому запоминаются мгновенно.",
    verbs: [
      {
        v1: "go", v2: "went", v3: "gone",
        ru: "идти / ехать / отправляться",
        phonetic: "[гоу — вэнт — гон]",
        example: "Everything went smoothly during the demo.",
        tip: "В прошедшем полностью меняет корень на 'went'! Никаких 'didn't went', помните: 'didn't GO'!"
      },
      {
        v1: "be", v2: "was / were", v3: "been",
        ru: "быть / являться",
        phonetic: "[бии — воз/вёёр — биин]",
        example: "I was at the standup meeting this morning.",
        tip: "Единственный глагол в языке, у которого в прошедшем две формы: was (для одного) и were (для многих)."
      },
      {
        v1: "do", v2: "did", v3: "done",
        ru: "делать / выполнять",
        phonetic: "[дуу — дид — дан]",
        example: "Well done! The task is completely done.",
        tip: "Главный вспомогательный глагол Драгункина: did забирает прошедшее время на себя."
      }
    ]
  }
];


/* --- js/data/quiz-tasks.js --- */
// Задания для режима «Экспресс-Тест / Quiz»
// Варианты ответов перемешиваются кодом QuizMode автоматически!

const QUIZ_TASKS = [
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


/* --- js/audio.js --- */
// Звуковой синтезатор Web Audio API (работает без внешних mp3 файлов)

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  // Щелчок тумблера / кнопки
  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  // Щелчок тяжелого рубильника (переключение порядка слов)
  playSwitch() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'square';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.setValueAtTime(90, now + 0.03);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  }

  // Правильный ответ (приятный восходящий перелив)
  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + idx * 0.06;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.12);
    });
  }

  // Ошибка (мягкий нисходящий баззер)
  playError() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.linearRampToValueAtTime(80, now + 0.22);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  // Алиасы для совместимости
  playCorrect() {
    this.playSuccess();
  }

  playWrong() {
    this.playError();
  }
}

const sound = new SoundEngine();


/* --- js/speech.js --- */
// Голосовой движок с поддержкой богатой палитры естественных голосов (Microsoft Edge Natural & Chrome)
// Назначает разные индивидуальные голоса разным персонажам диалогов

class SpeechEngine {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.recognition = null;
    this.allVoices = [];
    this.maleVoices = [];
    this.femaleVoices = [];
    this.defaultVoice = null;
    this.isListening = false;
    this.audioStream = null;

    this.initVoices();
    this.initRecognition();
  }

  initVoices() {
    if (!this.synth) return;

    const categorizeVoices = () => {
      this.allVoices = this.synth.getVoices().filter((v) => v.lang.startsWith("en"));
      if (this.allVoices.length === 0) return;

      // Приоритет естественным голосам Edge (Online Natural) и Google
      const naturalVoices = this.allVoices.filter(
        (v) => v.name.includes("Natural") || v.name.includes("Online") || v.name.includes("Google")
      );
      const voicePool = naturalVoices.length > 0 ? naturalVoices : this.allVoices;

      // Женские голоса
      this.femaleVoices = voicePool.filter(
        (v) =>
          v.name.includes("Jenny") ||
          v.name.includes("Aria") ||
          v.name.includes("Sonia") ||
          v.name.includes("Zira") ||
          v.name.includes("Female") ||
          v.name.includes("Steffi")
      );

      // Мужские голоса
      this.maleVoices = voicePool.filter(
        (v) =>
          v.name.includes("Guy") ||
          v.name.includes("Ryan") ||
          v.name.includes("Christopher") ||
          v.name.includes("David") ||
          v.name.includes("George") ||
          v.name.includes("Male") ||
          v.name.includes("Mark")
      );

      // Дефолтный нейтральный голос
      this.defaultVoice =
        this.maleVoices.find((v) => v.name.includes("Guy")) ||
        this.femaleVoices.find((v) => v.name.includes("Jenny")) ||
        this.allVoices[0] ||
        null;
    };

    categorizeVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = categorizeVoices;
    }
  }

  // Подбор индивидуального голоса под персонажа
  getVoiceForCharacter(characterName = "") {
    const nameLower = characterName.toLowerCase();

    // Женские персонажи
    const isFemale =
      nameLower.includes("elena") ||
      nameLower.includes("sarah") ||
      nameLower.includes("emily") ||
      nameLower.includes("chloe") ||
      nameLower.includes("jenny") ||
      nameLower.includes("anna");

    if (isFemale && this.femaleVoices.length > 0) {
      // Ищем Jenny или Aria
      return (
        this.femaleVoices.find((v) => v.name.includes("Jenny")) ||
        this.femaleVoices.find((v) => v.name.includes("Aria")) ||
        this.femaleVoices[0]
      );
    }

    // Мужские персонажи с разной окраской
    if (this.maleVoices.length > 0) {
      if (nameLower.includes("mark") || nameLower.includes("director") || nameLower.includes("marcus")) {
        // Серьёзный глубокий голос для тимлида / режиссера
        return (
          this.maleVoices.find((v) => v.name.includes("Guy")) ||
          this.maleVoices.find((v) => v.name.includes("Christopher")) ||
          this.maleVoices[0]
        );
      } else if (nameLower.includes("alex") || nameLower.includes("david") || nameLower.includes("sam")) {
        return (
          this.maleVoices.find((v) => v.name.includes("Ryan")) ||
          this.maleVoices.find((v) => v.name.includes("George")) ||
          this.maleVoices[0]
        );
      }
      return this.maleVoices[0];
    }

    return this.defaultVoice;
  }

  // Озвучивание реплики от лица конкретного персонажа
  speakAs(text, characterName = "", rate = 0.95, onEnd = null) {
    const voice = this.getVoiceForCharacter(characterName);
    this.speakWithVoice(text, voice, rate, onEnd);
  }

  // Базовое воспроизведение
  speak(text, rate = 0.95, onEnd = null) {
    this.speakWithVoice(text, this.defaultVoice, rate, onEnd);
  }

  speakSlow(text, onEnd = null) {
    this.speakWithVoice(text, this.defaultVoice, 0.72, onEnd);
  }

  speakWithVoice(text, chosenVoice, rate = 0.95, onEnd = null) {
    if (!this.synth) return;
    try {
      if (this.synth.speaking || this.synth.pending) {
        this.synth.cancel();
      }
      if (this.synth.paused) {
        this.synth.resume();
      }

      let actualRate = 0.95;
      let actualPitch = 1.0;
      if (typeof rate === "number" && !isNaN(rate)) {
        actualRate = rate;
      } else if (typeof rate === "object" && rate !== null) {
        if (typeof rate.rate === "number") actualRate = rate.rate;
        if (typeof rate.pitch === "number") actualPitch = rate.pitch;
      }

      const cleanText = (text || "").replace(/[*_#~]/g, "").trim();
      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "en-US";
      utterance.rate = actualRate;
      utterance.pitch = actualPitch;

      // Обеспечиваем выбор английского голоса
      let voiceToUse = chosenVoice || this.defaultVoice;
      if (!voiceToUse && this.synth.getVoices) {
        const enVoices = this.synth.getVoices().filter((v) => v.lang.startsWith("en"));
        if (enVoices.length > 0) voiceToUse = enVoices[0];
      }
      if (voiceToUse) {
        utterance.voice = voiceToUse;
      }

      if (onEnd) {
        utterance.onend = onEnd;
        utterance.onerror = onEnd;
      }

      this.synth.speak(utterance);
    } catch (err) {
      console.warn("Speech synthesis error:", err);
    }
  }

  getSpeechRecognitionClass() {
    return window.SpeechRecognition || window.webkitSpeechRecognition || null;
  }

  initRecognition() {
    const SpeechRecognition = this.getSpeechRecognitionClass();
    if (!SpeechRecognition) {
      console.warn("Web Speech Recognition API не поддерживается в этом браузере.");
      return;
    }
  }

  createRecognition() {
    const SpeechRecognition = this.getSpeechRecognitionClass();
    if (!SpeechRecognition) return null;

    const rec = new SpeechRecognition();
    rec.lang = "en-US";
    rec.continuous = false;
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    return rec;
  }

  async ensureMicPermission() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // ВАЖНО: На Android микрофон блокируется, если удерживать MediaStream!
        // Освобождаем микрофон сразу после получения разрешения:
        stream.getTracks().forEach((track) => track.stop());
        return true;
      } catch (e) {
        console.warn("getUserMedia permission error:", e);
        return false;
      }
    }
    return true;
  }

  async startListening(onResult, onError = null, onEnd = null) {
    const SpeechRecognition = this.getSpeechRecognitionClass();
    if (!SpeechRecognition) {
      if (onError) onError("Распознавание речи не поддерживается браузером. Используйте Chrome или Edge.");
      return;
    }

    if (this.isListening) {
      this.stopListening();
      return;
    }

    const permitted = await this.ensureMicPermission();
    if (!permitted) {
      if (onError) onError("Нет доступа к микрофону. Разрешите доступ в настройках браузера.");
      return;
    }

    const rec = this.createRecognition();
    if (!rec) {
      if (onError) onError("Не удалось инициализировать систему распознавания речи.");
      return;
    }

    this.recognition = rec;
    this.isListening = true;

    let finalTranscript = "";
    let lastInterim = "";
    let hasDeliveredResult = false;

    rec.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const res = event.results[i];
        if (res.isFinal) {
          finalTranscript += res[0].transcript;
        } else {
          interim += res[0].transcript;
        }
      }
      if (interim) {
        lastInterim = interim;
      }

      const text = (finalTranscript || lastInterim).trim();
      if (finalTranscript.trim() && !hasDeliveredResult) {
        hasDeliveredResult = true;
        this.isListening = false;
        try {
          rec.stop();
        } catch (e) {}
        if (onResult) onResult(text);
      }
    };

    rec.onerror = (err) => {
      this.isListening = false;
      let errorMsg = "Ошибка микрофона";
      const code = err.error || "";

      if (code === "no-speech") {
        errorMsg = "Речь не обнаружена. Попробуйте сказать громче и ближе к микрофону.";
      } else if (code === "not-allowed" || code === "service-not-allowed") {
        errorMsg = "Доступ к микрофону запрещен. Разрешите микрофон в настройках.";
      } else if (code === "network") {
        errorMsg = "Ошибка сети сервиса распознавания. Если вы оффлайн, скачайте английский языковой пакет в настройках телефона (Настройки -> Язык и ввод -> Голосовой ввод Google -> Офлайн-распознавание).";
      } else if (code === "audio-capture") {
        errorMsg = "Микрофон занят другим приложением или недоступен.";
      } else if (code) {
        errorMsg = `Ошибка распознавания (${code})`;
      }

      if (onError) onError(errorMsg);
    };

    rec.onend = () => {
      this.isListening = false;
      const finalText = (finalTranscript || lastInterim).trim();
      if (!hasDeliveredResult && finalText) {
        hasDeliveredResult = true;
        if (onResult) onResult(finalText);
      }
      if (onEnd) onEnd();
    };

    try {
      rec.start();
    } catch (e) {
      this.isListening = false;
      if (onError) onError(e.message || "Не удалось запустить микрофон.");
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {}
      this.isListening = false;
    }
  }
}

const speech = new SpeechEngine();


/* --- js/state.js --- */
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

const state = new AppState();


/* --- js/llm-client.js --- */
// Клиент для подключения к локальным LLM (LM Studio, Ollama, LocalAI, vLLM)
// Использует стандартный OpenAI-совместимый REST API (/v1/chat/completions и /v1/models)

const AI_PERSONAS = [
  {
    id: "marcus_lead",
    name: "Marcus (Lead Tech Artist)",
    role: "Lead Technical Artist в игровой AAA-студии",
    avatar: "👨‍💻",
    voiceName: "Guy",
    systemPrompt: `You are Marcus, a senior Lead Technical Artist at a modern game studio.
You are talking to a colleague (a Technical Artist) who is practicing their English at a B1 level.
Topic: Unreal Engine / Niagara particle systems, GPU performance, shaders, draw calls, LODs, and project deadlines.

CONVERSATION RULES:
1. Speak in natural, friendly, professional conversational English.
2. Keep your replies concise: 1 to 3 sentences maximum! Never write long monologues.
3. Always ask a relevant follow-up question or make a comment that invites the user to reply.
4. Stay in character at all times.

GRAMMAR COACH RULE (Golden 20% Dragunkin):
If the user made a grammar error (e.g. "I am agree", "must to", "didn't went", "I have no any", missing "it" in "is cold", "depend from"):
At the very end of your response, on a new line, add:
[COACH_TIP: Friendly correction in Russian, e.g. «Помните: agree — глагол, говорим "I agree", а не "I am agree"»]
If there are no mistakes, do NOT add [COACH_TIP].`,
    greeting: "Hey! Glad you made it to the sync. We need to check the Niagara particle budget for the new level before the milestone. How are the frame timings looking on your end?"
  },
  {
    id: "elena_vfx",
    name: "Elena (Senior VFX Artist)",
    role: "Старший VFX-артист, обсуждение визуала и шейдеров",
    avatar: "👩‍🎨",
    voiceName: "Jenny",
    systemPrompt: `You are Elena, a Senior VFX Artist collaborating on dynamic environment effects and magic spells.
You are chatting with your Tech Art colleague practicing English at B1 level.
Topic: Visual feedback, particle colors, texture compression, material blending, overdraw issues, and artistic feel.

CONVERSATION RULES:
1. Speak in friendly, enthusiastic, creative English.
2. Keep answers short: 1 to 3 sentences max.
3. Always end with a question or conversational hook.

GRAMMAR COACH RULE:
If the user made a grammar error, append at the end:
[COACH_TIP: Краткая подсказка по-русски, как сказать правильно]
If no error, do not add [COACH_TIP].`,
    greeting: "Hi there! I just pushed the new explosion effect to Perforce. The visual intensity looks epic, but I'm worried about alpha overdraw in dense combat. What do you think?"
  },
  {
    id: "sarah_interview",
    name: "Sarah (Tech Art Interviewer)",
    role: "Арт-директор на собеседовании (Technical Artist Role)",
    avatar: "💼",
    voiceName: "Aria",
    systemPrompt: `You are Sarah, an Art Director conducting a friendly job interview for a Technical Artist / VFX position.
The candidate is practicing professional English at B1 level.
Topics: Houdini pipelines, Unreal Engine, Python scripting, problem-solving, teamwork, past challenges.

CONVERSATION RULES:
1. Be polite, encouraging, and professional.
2. Ask one clear interview question at a time (1-2 sentences).
3. React warmly to their answer before asking the next question.

GRAMMAR COACH RULE:
If the candidate made a grammar mistake, append at the end:
[COACH_TIP: Подсказка по-русски: как сказать эту фразу на собеседовании грамотнее]
If no error, do not add [COACH_TIP].`,
    greeting: "Hello and welcome! Thank you for joining our interview today. To start off, could you briefly introduce yourself and tell me about your background in Technical Art?"
  },
  {
    id: "alex_colleague",
    name: "Alex (Kitchen Coffee Chat)",
    role: "Коллега по студии, непринуждённый разговор за кофе",
    avatar: "☕",
    voiceName: "Ryan",
    systemPrompt: `You are Alex, a friendly 3D artist at the office kitchen having morning coffee.
You are chatting with the user in casual English (B1 level).
Topic: Weekend plans, favorite video games, gym, movies, lunch plans, funny work stories.

CONVERSATION RULES:
1. Casual, warm, colloquial conversational English.
2. 1 to 2 sentences max. Keep it like real chatting.
3. Always ask a casual question back.

GRAMMAR COACH RULE:
If the user made a grammar error, append at the end:
[COACH_TIP: Подсказка по-русски]
If no error, do not add [COACH_TIP].`,
    greeting: "Morning! Just grabbing another espresso before the standup. Did you get a chance to play that new game over the weekend, or did you take some rest?"
  },
  {
    id: "custom_topic",
    name: "Свободная тема (Custom Topic)",
    role: "Универсальный собеседник B1 на любую тему",
    avatar: "🌐",
    voiceName: "Christopher",
    systemPrompt: `You are a supportive, knowledgeable English conversation partner helping the user practice B1 English.
Keep replies brief (1-3 sentences) and conversational.
Always end with a hook or question.

GRAMMAR COACH RULE:
If the user made a grammar error, append at the end:
[COACH_TIP: Подсказка по-русски]
If no error, do not add [COACH_TIP].`,
    greeting: "Hello! I am ready to talk about any topic you like — game development, hobbies, travel, or anything else. What would you like to discuss today?"
  }
];

class LocalLLMClient {
  constructor() {
    const savedEp = localStorage.getItem("my_english_llm_endpoint");
    this.endpoint = savedEp ? this.normalizeEndpoint(savedEp) : "http://127.0.0.1:1234/v1";
    this.selectedModel = localStorage.getItem("my_english_llm_model") || "hy-mt1.5-1.8b";
    this.coachModel = localStorage.getItem("my_english_llm_coach_model") || "gemma-3-4b-it-qat";
    this.coachMode = localStorage.getItem("my_english_coach_mode") || "gentle"; // "gentle" | "balanced" | "strict"
    this.temperature = parseFloat(localStorage.getItem("my_english_llm_temp") || "0.7");
    this.autoSpeak = localStorage.getItem("my_english_llm_autospeak") !== "false";
    this.coachEnabled = localStorage.getItem("my_english_llm_coach") !== "false";
    this.availableModels = [];
    this.isConnected = false;
  }

  getCoachModeInfo() {
    switch (this.coachMode) {
      case "gentle":
        return { id: "gentle", label: "🟢 Мягкий B1", title: "Не цепляется к мелочам, исправляет только грубые ошибки" };
      case "balanced":
        return { id: "balanced", label: "🟡 Баланс B1+", title: "Помогает звучать естественно на разговорном B1" };
      case "strict":
        return { id: "strict", label: "🔴 Продвинутый B2", title: "Детальная шлифовка и идиомы для уровня B2" };
      default:
        return { id: "gentle", label: "🟢 Мягкий B1", title: "Не цепляется к мелочам, исправляет только грубые ошибки" };
    }
  }

  cycleCoachMode() {
    const modes = ["gentle", "balanced", "strict"];
    const curIdx = modes.indexOf(this.coachMode);
    this.coachMode = modes[(curIdx + 1) % modes.length];
    localStorage.setItem("my_english_coach_mode", this.coachMode);
    return this.getCoachModeInfo();
  }

  normalizeEndpoint(ep) {
    let clean = (ep || "http://127.0.0.1:1234").trim().replace(/\/+$/, "");
    if (!clean.endsWith("/v1")) {
      clean += "/v1";
    }
    return clean;
  }

  saveSettings(endpoint, model, coachModel, temperature, autoSpeak, coachEnabled = true, coachMode = "gentle") {
    this.endpoint = this.normalizeEndpoint(endpoint);
    this.selectedModel = model || "hy-mt1.5-1.8b";
    this.coachModel = coachModel || "gemma-3-4b-it-qat";
    this.coachMode = coachMode || "gentle";
    this.temperature = parseFloat(temperature) || 0.7;
    this.autoSpeak = !!autoSpeak;
    this.coachEnabled = !!coachEnabled;

    localStorage.setItem("my_english_llm_endpoint", this.endpoint);
    localStorage.setItem("my_english_llm_model", this.selectedModel);
    localStorage.setItem("my_english_llm_coach_model", this.coachModel);
    localStorage.setItem("my_english_coach_mode", this.coachMode);
    localStorage.setItem("my_english_llm_temp", this.temperature.toString());
    localStorage.setItem("my_english_llm_autospeak", this.autoSpeak ? "true" : "false");
    localStorage.setItem("my_english_llm_coach", this.coachEnabled ? "true" : "false");
  }

  // Проверка соединения и получение списка загруженных моделей
  async checkConnection() {
    const url = `${this.endpoint}/models`;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      this.availableModels = (data.data || []).map((m) => m.id);
      this.isConnected = true;

      // Если модель не выбрана, берем первую доступную
      if (!this.selectedModel && this.availableModels.length > 0) {
        this.selectedModel = this.availableModels[0];
        localStorage.setItem("my_english_llm_model", this.selectedModel);
      }

      return {
        ok: true,
        models: this.availableModels,
        currentModel: this.selectedModel || "hy-mt1.5-1.8b",
        coachModel: this.coachModel || "gemma-3-4b-it-qat"
      };
    } catch (err) {
      this.isConnected = false;
      let errorMsg = err.message || "Connection failed";

      if (err.name === "AbortError") {
        errorMsg = "Таймаут соединения (сервер не ответил за 4 сек).";
      } else if (errorMsg.includes("Failed to fetch") || errorMsg.includes("NetworkError")) {
        errorMsg = "Сервер недоступен. Проверьте: запущен ли LM Studio и включен ли тумблер CORS в Local Server!";
      }

      return {
        ok: false,
        error: errorMsg,
        endpoint: this.endpoint
      };
    }
  }

  // Отправка сообщений в чат
  async sendMessage(messages, onChunk = null) {
    const url = `${this.endpoint}/chat/completions`;
    const modelToUse = this.selectedModel || (this.availableModels[0] || "local-model");

    const payload = {
      model: modelToUse,
      messages: messages,
      temperature: this.temperature,
      max_tokens: 300,
      stream: false
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000); // 45с для небольших локальных моделей

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Ошибка LM Studio (HTTP ${res.status}): ${errText || res.statusText}`);
      }

      const data = await res.json();
      const rawContent = data.choices && data.choices[0] && data.choices[0].message
        ? data.choices[0].message.content
        : "";

      return this.parseResponse(rawContent);
    } catch (err) {
      if (err.name === "AbortError") {
        throw new Error("Модель слишком долго отвечает (таймаут 45с). Попробуйте меньшую квантованную модель или снизьте контекст.");
      }
      throw err;
    }
  }

  // Разделение ответа персонажа и грамматического совета Драгункина
  parseResponse(rawText) {
    let cleanText = rawText.trim();
    let coachTip = null;

    // Ищем паттерны: [COACH_TIP: ...] или [DRAGUNKIN_TIP: ...] или [TIP: ...]
    const tipRegex = /\[(?:COACH_TIP|DRAGUNKIN_TIP|TIP|СОВЕТ):\s*([\s\S]*?)\]/i;
    const match = cleanText.match(tipRegex);

    if (match) {
      coachTip = match[1].trim();
      cleanText = cleanText.replace(match[0], "").trim();
    }

    return {
      text: cleanText,
      coachTip: coachTip,
      raw: rawText
    };
  }

  // Быстрый мгновенный анализ по правилам Драгункина (работает даже офлайн)
  checkHeuristicMistakes(userText) {
    const textLower = userText.toLowerCase().trim();
    const findings = [];

    if (/\b(i am agree|i'm agree|i am not agree)\b/i.test(textLower)) {
      findings.push({
        type: "rule",
        issue: "«I am agree»",
        fix: "I agree / I don't agree",
        tip: "В английском «agree» — это глагол действия, а не прилагательное! Поэтому говорим «I agree» без глагола «am»."
      });
    }

    if (/\b(must to|can to|should to|could to|may to)\b/i.test(textLower)) {
      findings.push({
        type: "rule",
        issue: "«must to / can to»",
        fix: "must do / can do",
        tip: "После модальных глаголов (must, can, should) частица «to» сгорает: «I must check», а не «must to check»."
      });
    }

    if (/\b(didn't|did not)\s+(went|saw|took|did|came|found|made|had)\b/i.test(textLower)) {
      findings.push({
        type: "rule",
        issue: "Двойное прошедшее время («didn't went»)",
        fix: "didn't go / didn't see",
        tip: "Вспомогательный «didn't» уже забрал всё прошедшее время на себя! Основной глагол возвращается в начальную форму."
      });
    }

    if (/\b(have no any|has no any)\b/i.test(textLower)) {
      findings.push({
        type: "rule",
        issue: "«have no any»",
        fix: "I don't have any / I have no",
        tip: "В английском строго одно отрицание: либо «I have NO tickets», либо «I DON'T have ANY tickets»."
      });
    }

    if (/\b(depend from|depends from)\b/i.test(textLower)) {
      findings.push({
        type: "rule",
        issue: "«depend from»",
        fix: "depends ON",
        tip: "В английском зависит «НА» чем-то, поэтому всегда используем предлог «on»: «It depends on the budget»."
      });
    }

    if (/\b(i feel myself)\b/i.test(textLower)) {
      findings.push({
        type: "style",
        issue: "«I feel myself»",
        fix: "I feel good / I feel tired",
        tip: "Калька с русского! «I feel myself» в английском звучит двусмысленно (физически трогать себя). Говорите просто «I feel great»."
      });
    }

    return findings;
  }

  // Мягкий доброжелательный разбор фразы пользователя (AI-наставник)
  async reviewUserSpeech(userSpeech, context = "") {
    if (!this.coachEnabled) return null;

    // Сначала проверяем моментальные эвристики Драгункина
    const quickIssues = this.checkHeuristicMistakes(userSpeech);

    // Если нет связи с LM Studio, но сработала эвристика — возвращаем её
    if (!this.isConnected && quickIssues.length > 0) {
      const issue = quickIssues[0];
      return {
        clarity: "Собеседник понял суть",
        naturalVersion: userSpeech.replace(new RegExp(issue.issue, "gi"), issue.fix),
        friendlyTip: issue.tip,
        source: "Правила Драгункина"
      };
    }

    // Запрашиваем мягкий совет у выделенной модели-наставника (Gemma 3 4B)
    const coachModelToUse = this.coachModel || "gemma-3-4b-it-qat";

    let modeGuidance = "";
    if (this.coachMode === "gentle") {
      modeGuidance = `
РЕЖИМ: 🟢 МЯГКИЙ B1 (МАКСИМАЛЬНО ДЕЛИКАТНЫЙ, ДЛЯ НАЧИНАЮЩИХ).
- Твоя цель: НЕ ПРИДИРАТЬСЯ к мелочам! Если смысл фразы понятен — признай: "Понятно на 100%!".
- Исправляй ТОЛЬКО явные ошибки и неестественные разрывы (например: «its save» -> «it saves», «they add» -> «they added», объединение рубленых предложений связкой «and» или «because»).
- В строке NATURAL запиши ГОТОВЫЙ улучшенный вариант на уровне B1 со всеми исправлениями (без сложного C1 академизма).
- Если во фразе пользователя вообще нет ошибок и улучшать нечего — напиши в NATURAL: NONE.`;
    } else if (this.coachMode === "strict") {
      modeGuidance = `
РЕЖИМ: 🔴 СТРОГИЙ B2 (ШЛИФОВКА И ИДИОМАТИЧНОСТЬ).
- Обрати внимание на профессиональную терминологию и естественные идиомы уровня B2.
- В строке NATURAL запиши естественную версию B2, в TIP — нюансы стилистики.`;
    } else {
      modeGuidance = `
РЕЖИМ: 🟡 БАЛАНС B1+ (РАЗГОВОРНЫЙ СТИЛЬ).
- Помоги звучать связно на уверенном уровне B1, используя базовые разговорные связки (and, but, because, so).
- В строке NATURAL запиши готовый связный вариант уровня B1.`;
    }

    const coachPrompt = `Ты — русскоязычный персональный наставник по английскому языку для уровня B1.
Твоя задача — помочь ученику общаться на понятном РАЗГОВОРНОМ АНГЛИЙСКОМ УРОВНЯ B1 без сложного книжного занудства.

ПОЛЬЗОВАТЕЛЬ СКАЗАЛ: "${userSpeech}"
КОНТЕКСТ ДИАЛОГА: "${context}"

${modeGuidance}

ПРАВИЛО ДЛЯ СТРОКИ «NATURAL»:
1. В строке NATURAL ты ОБЯЗАН выдать САМУ ГОТОВУЮ ИСПРАВЛЕННУЮ ФРАЗУ на английском языке!
2. Если ты в пояснении (TIP) рекомендуешь добавить связку ("and", "because"), исправить время ("they added") или вставить пропущенное ("is like") — ВСЕ ЭТИ ИСПРАВЛЕНИЯ ТЫ ОБЯЗАН СРАЗУ ВНЕДРИТЬ В СТРОКУ NATURAL!
3. Запрещено копировать в NATURAL сырую фразу пользователя без исправлений, если ты предлагаешь улучшение!
4. Если фраза пользователя уже идеальна и улучшать ничего не нужно, напиши строго: NATURAL: NONE
5. В строке TIP пиши СТРОГО НА РУССКОМ ЯЗЫКЕ (1-2 коротких дружелюбных предложения).

ПРИМЕР:
Пользователь: "It's a dual gun. its style like a wild west"
Твой ответ:
CLARITY: Понятно на 100%!
NATURAL: It's a dual gun, and its style is like the Wild West.
TIP: Добавили связку «and» и глагол «is» (style is like), чтобы фраза звучала плавно и грамматически чисто.

ФОРМАТ ОТВЕТА (ровно 3 строки):
CLARITY: [Понятно на 100%! / Смысл понятен / Требует уточнения]
NATURAL: [Готовая исправленная фраза на английском с внедренными улучшениями, либо NONE]
TIP: [Краткое дружелюбное пояснение на русском языке]`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15с макс для коуча

      const res = await fetch(`${this.endpoint}/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: coachModelToUse,
          messages: [{ role: "user", content: coachPrompt }],
          temperature: 0.2,
          max_tokens: 180
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const content = data.choices && data.choices[0] && data.choices[0].message
          ? data.choices[0].message.content
          : "";

        const clarityMatch = content.match(/CLARITY:\s*(.*)/i);
        const naturalMatch = content.match(/NATURAL:\s*(.*)/i);
        const tipMatch = content.match(/TIP:\s*([\s\S]*)/i);

        if (clarityMatch || tipMatch || naturalMatch) {
          let natural = naturalMatch ? naturalMatch[1].trim() : null;
          if (natural) {
            natural = natural.replace(/^["'«]+|["'»]+$/g, "").replace(/\s*You could say.*$/i, "").trim();

            // Проверяем: если модель вернула NONE или буквально повторила фразу пользователя (без исправлений)
            const cleanUser = userSpeech.toLowerCase().replace(/[^a-z0-9]/g, "");
            const cleanNat = natural.toLowerCase().replace(/[^a-z0-9]/g, "");
            if (natural.toUpperCase() === "NONE" || cleanUser === cleanNat) {
              natural = null; // Фраза уже верна — не показываем дублирующую плашку!
            }
          }

          let tip = tipMatch ? tipMatch[1].trim() : "Отличный ответ, продолжайте общение!";
          tip = tip.replace(/\b(CLARITY|NATURAL|TIP):\s*/gi, "").replace(/^["'«]+|["'»]+$/g, "").trim();

          return {
            clarity: clarityMatch ? clarityMatch[1].trim().replace(/^["']|["']$/g, "") : "Понятно на 100%!",
            naturalVersion: natural,
            friendlyTip: tip,
            source: "AI-Наставник"
          };
        }
      }
    } catch (e) {
      // Игнорируем ошибку коуча, чтобы не прерывать основной диалог
    }

    // Резервный возврат эвристики, если нейросеть занята
    if (quickIssues.length > 0) {
      const issue = quickIssues[0];
      return {
        clarity: "Смысл понятен",
        naturalVersion: userSpeech.replace(new RegExp(issue.issue, "gi"), issue.fix),
        friendlyTip: issue.tip,
        source: "Правила Драгункина"
      };
    }

    return null;
  }
}

const llmClient = new LocalLLMClient();


/* --- js/flashcards-service.js --- */
// Сервис управления карточками слов, интервальным повторением и анализом произношения


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

const flashcardsService = new FlashcardsService();


/* --- js/dictionary.js --- */
// Модуль интерактивного словаря с мгновенным переводом слов по наведению / клику
// Содержит локальный кеш частых B1 и Tech Art / VFX терминов + онлайн-перевод через MyMemory API
// Имеет компактный полупрозрачный дизайн, который никогда не перекрывает текст строки



const BUILTIN_VOCABULARY = {
  // Базовые местоимения и связки (фундамент B1)
  "your": "ваш / твой",
  "you": "вы / ты",
  "my": "мой / моя",
  "me": "мне / меня",
  "he": "он",
  "him": "его / ему",
  "his": "его",
  "she": "она",
  "her": "её / ей",
  "we": "мы",
  "us": "нам / нас",
  "our": "наш / наша",
  "they": "они",
  "them": "их / им",
  "their": "их",
  "it": "это / оно / он",
  "its": "его / её (для систем/вещей)",
  "this": "этот / эта / это",
  "that": "тот / та / то",
  "these": "эти",
  "those": "те",
  "and": "и / а",
  "but": "но / а",
  "because": "потому что",
  "so": "так что / поэтому",
  "or": "или",
  "with": "с / вместе с",
  "without": "без",
  "for": "для / ради",
  "about": "о / про",
  "from": "из / от",
  "to": "к / в / чтобы",
  "in": "в / внутри",
  "on": "на",
  "at": "в / около",
  "like": "как / похожий / нравиться",
  "have": "иметь / есть",
  "has": "имеет",
  "had": "имел",
  "can": "могу / умею",
  "could": "мог / мог бы",
  "will": "будет / буду",
  "would": "бы (хотел бы)",
  "should": "следует / стоит",
  "must": "должен / обязан",
  "is": "является / есть",
  "are": "являются / есть",
  "am": "являюсь / есть",
  "was": "был / была",
  "were": "были",
  "be": "быть",
  "been": "был (причастие)",
  "there": "там / туда",
  "here": "здесь / сюда",
  "where": "где / куда",
  "when": "когда",
  "why": "почему",
  "how": "как",
  "what": "что / какой",
  "which": "какой / который",
  "who": "кто",
  "all": "все / всё",
  "some": "несколько / некоторые",
  "any": "любой / какой-либо",
  "best": "лучший / лучше всего",
  "better": "лучше",
  "good": "хороший / хорошо",
  "well": "хорошо / итак",
  "new": "новый",
  "old": "старый",
  "first": "первый",
  "last": "последний",
  "next": "следующий",
  "game": "игра",
  "games": "игры",
  "playstyle": "стиль игры",
  "style": "стиль",
  "gun": "оружие / пистолет",
  "guns": "оружие / пушки",
  "dual": "двойной / парный",
  "wild": "дикий",
  "west": "запад (Wild West = Дикий Запад)",
  "additions": "дополнения / новинки",
  "addition": "дополнение",
  "builds": "сборки / билды",
  "build": "сборка / билд",
  "cyberpunk": "киберпанк",
  "worldbuilding": "построение мира / лор",
  "immersive": "захватывающий / глубокий",
  "storytelling": "повествование / сюжет",
  "thrilling": "захватывающий / волнующий",
  "experience": "опыт / впечатление",
  "sounds": "звучит",
  "sound": "звук / звучать",
  "known": "известен",
  "know": "знать",
  "tried": "пробовал / пытался",
  "try": "пробовать / пытаться",

  // Частые разговорные слова B1
  "made": "добрался / сделал (made it = успел/добрался)",
  "make": "делать / создавать",
  "makes": "делает",
  "making": "создание / делая",
  "glad": "рад / приятно",
  "sync": "созвон / синхронизация команды",
  "level": "уровень локации",
  "levels": "уровни",
  "need": "нужно / требуется",
  "needs": "требуется",
  "looking": "выглядит / смотрится",
  "look": "смотреть / выглядеть",
  "looks": "выглядит",
  "end": "сторона (on your end = с твоей стороны)",
  "before": "до / перед",
  "after": "после",
  "great": "отлично / великолепно",
  "good": "хорошо",
  "ready": "готов",
  "sure": "уверен / конечно",
  "work": "работать / работа",
  "working": "работает / работая",
  "worked": "работало",
  "works": "работает",
  "check": "проверить",
  "checking": "проверяю",
  "checked": "проверил",
  "think": "думать / считать",
  "thought": "подумал / мысль",
  "agree": "согласен",
  "understand": "понимать",
  "understood": "понял",
  "mean": "иметь в виду / значить",
  "fix": "исправить / починить",
  "fixed": "исправил",
  "run": "запустить / работать",
  "running": "работает / запущен",
  "test": "тест / проверять",
  "tested": "проверен",
  "testing": "тестирование",
  "update": "обновить / обновление",
  "updated": "обновил",
  "change": "изменить / изменение",
  "changed": "изменил",
  "start": "начать",
  "started": "начал",
  "finish": "закончить",
  "finished": "закончил",

  // GameDev & Tech Art & VFX термины
  "budget": "бюджет / лимит ресурсов (памяти, времени кадра)",
  "budgets": "бюджеты",
  "performance": "производительность / быстродействие",
  "particle": "частица (эффекта)",
  "particles": "частицы",
  "shader": "шейдер (программа визуализации)",
  "shaders": "шейдеры",
  "overdraw": "овердроу (многократное перекрытие прозрачных пикселей)",
  "timing": "тайминг / время кадра",
  "timings": "тайминги кадров (миллисекунды)",
  "frame": "кадр",
  "frames": "кадры",
  "milestone": "контрольная точка / дедлайн этапа",
  "standup": "стендап (короткий утренний созвон)",
  "explosion": "взрыв",
  "intensity": "интенсивность / яркость",
  "dense": "плотный / густой",
  "combat": "бой / сражение",
  "pipeline": "пайплайн (процесс разработки/передачи ассетов)",
  "asset": "ассет (ресурс игры, модель, текстура)",
  "assets": "ассеты",
  "texture": "текстура",
  "textures": "текстуры",
  "compression": "сжатие",
  "blending": "смешивание (цветов/слоев)",
  "latency": "задержка / лаг",
  "stutter": "микрофриз / подёргивание",
  "stuttering": "подёргивания экрана",
  "draw": "рисовать / вызов",
  "calls": "вызовы отрисовки (draw calls)",
  "call": "вызов",
  "optimize": "оптимизировать",
  "optimized": "оптимизированный",
  "optimization": "оптимизация",
  "reduce": "уменьшить / сократить",
  "memory": "память (GPU/RAM)",
  "resolution": "разрешение (экрана/текстур)",
  "smoke": "дым",
  "sparks": "искры",
  "spark": "искра",
  "fire": "огонь / пламя",
  "magic": "магия",
  "spell": "заклинание",
  "spells": "заклинания",
  "collision": "коллизия / столкновение",
  "physics": "физика",
  "lighting": "освещение",
  "shadows": "тени",
  "mesh": "полигональная сетка / 3D-модель",
  "meshes": "сетки / меши",
  "emitter": "эмиттер (источник частиц)",
  "emitters": "эмиттеры",
  "rate": "частота / скорость",
  "spawn": "порождать / создавать",
  "lifetime": "время жизни",
  "velocity": "скорость (векторная)",
  "alpha": "прозрачность (альфа-канал)",
  "material": "материал",
  "materials": "материалы",
  "instance": "инстанс (экземпляр)",
  "instances": "инстансы",
  "developed": "разработал / создал",
  "specialize": "специализироваться",
  "specializes": "специализируется",
  "specializing": "специализируясь",
  "approach": "подход / метод решения",
  "approaches": "подходы",
  "challenge": "профессиональная сложность / вызов",
  "challenges": "сложности",
  "tradeoff": "компромисс между взаимоисключающими параметрами",
  "trade-off": "компромисс (качество vs скорость)",
  "fidelity": "достоверность / реалистичность визуала",
  "bandwidth": "пропускная способность шины памяти",
  "profile": "профилировать / замерять тайминги кадра",
  "profiling": "профилирование / замер нагрузки железа",
  "bottleneck": "узкое место (бутылочное горлышко)",
  "bottlenecks": "узкие места",
  "bake": "запекать (свет/текстуры)",
  "baking": "запекание",
  "baked": "запечённый",
  "blocker": "блокирующая проблема (блокер)",
  "blockers": "блокеры",
  "clarify": "уточнить / прояснить",
  "clarifying": "уточняя",
  "standpoint": "точка зрения / ракурс",
  "perspective": "перспектива / художественная точка зрения",
  "perforce": "Perforce (система контроля версий в геймдеве)",
  "commit": "коммит (отправка изменений)",
  "push": "отправить изменения",
  "pull": "скачать изменения",
  "branch": "ветка разработки",
  "merge": "слияние веток",
  "issue": "проблема / баг",
  "issues": "проблемы",
  "delay": "задержка",
  "deadline": "крайний срок",
  "estimate": "оценка времени",
  "feedback": "обратная связь / отзыв",
  "review": "проверка / ревью",
  "approve": "одобрить / утвердить",
  "approved": "одобрено",
  "reject": "отклонить",
  "schedule": "график / расписание",
  "priority": "приоритет",
  "urgent": "срочно",
  "colleague": "коллега",
  "interview": "собеседование",
  "experience": "опыт",
  "background": "бэкграунд / опыт работы",
  "candidate": "кандидат",
  "skills": "навыки",
  "skill": "навык",
  "workflow": "рабочий процесс",
  "challenge": "трудная задача / вызов",
  "solution": "решение",
  "solve": "решать проблему",
  "improve": "улучшать",
  "worried": "обеспокоен",
  "epic": "эпично / круто",
  "casual": "неформальный / повседневный",
  "welcome": "добро пожаловать",
  "introduce": "представиться",
  "discuss": "обсудить",
  "discussion": "обсуждение",
  "actually": "на самом деле / вообще-то",
  "honestly": "честно говоря",
  "suppose": "полагаю / думаю",
  "meanwhile": "тем временем",
  "instead": "вместо этого",
  "however": "однако / тем не менее",
  "therefore": "поэтому / следовательно",
  "definitely": "определённо / точно",
  "probably": "вероятно / скорее всего",
  "perhaps": "возможно / пожалуй"
};

class DictionaryService {
  constructor() {
    this.enabled = localStorage.getItem("my_english_dict_enabled") !== "false";
    this.cache = {};

    // Загружаем сохранённый кеш из localStorage
    try {
      const saved = localStorage.getItem("my_english_dict_cache");
      if (saved) {
        this.cache = JSON.parse(saved);
      }
    } catch (e) {
      this.cache = {};
    }

    this.tooltipEl = null;
    this.activeWordSpan = null;
    this.hideTimeout = null;
    this.initTooltipDOM();
  }

  toggleEnabled() {
    this.enabled = !this.enabled;
    localStorage.setItem("my_english_dict_enabled", this.enabled ? "true" : "false");
    return this.enabled;
  }

  initTooltipDOM() {
    if (document.getElementById("dict-floating-tooltip")) {
      this.tooltipEl = document.getElementById("dict-floating-tooltip");
      return;
    }

    const tip = document.createElement("div");
    tip.id = "dict-floating-tooltip";
    tip.className = "dict-compact-pill";
    tip.style.display = "none";
    tip.innerHTML = `
      <span class="pill-en" id="tip-en-word">...</span>
      <span class="pill-arrow">➔</span>
      <span class="pill-ru" id="tip-ru-trans">...</span>
      <button class="pill-speak-btn" id="tip-speak-btn" title="Произнести слово">🔊</button>
      <button class="pill-star-btn" id="tip-star-btn" title="Добавить в карточки для повторения">⭐</button>
    `;

    document.body.appendChild(tip);
    this.tooltipEl = tip;

    // Звук слова
    tip.querySelector("#tip-speak-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      const word = tip.querySelector("#tip-en-word").innerText;
      this.speakWord(word);
    });

    // Сохранение слова в карточки
    tip.querySelector("#tip-star-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      const word = tip.querySelector("#tip-en-word").innerText;
      const trans = tip.querySelector("#tip-ru-trans").innerText;
      let context = "";
      if (this.activeWordSpan) {
        const bubble = this.activeWordSpan.closest(".ai-msg-bubble, .bubble-text, .chat-bubble");
        if (bubble) context = bubble.innerText.trim();
      }
      flashcardsService.addWord(word, trans, context, "", "casual");
      const starBtn = tip.querySelector("#tip-star-btn");
      starBtn.classList.add("star-saved");
      starBtn.innerText = "✓";
      sound.playSuccess();
      setTimeout(() => {
        starBtn.innerText = "⭐";
        starBtn.classList.remove("star-saved");
      }, 1500);
    });
  }

  speakWord(word) {
    if (window.speechSynthesis && word) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(word);
      u.lang = "en-US";
      u.rate = 0.92;
      window.speechSynthesis.speak(u);
    }
  }

  // Оборачивает английские слова в HTML-строке в интерактивные спаны
  wrapWords(text) {
    if (!text) return "";

    return text.replace(/\b([a-zA-Z]{2,})\b/g, (match) => {
      return `<span class="dict-word" data-word="${match}" title="Кликните, чтобы услышать произношение">${match}</span>`;
    });
  }

  // Подключение обработчиков наведения к контейнеру с сообщениями
  bindContainer(container) {
    if (!container) return;

    container.addEventListener("mouseenter", (e) => {
      if (!this.enabled) return;
      const target = e.target.closest(".dict-word");
      if (target) {
        this.showTooltip(target);
      }
    }, true);

    container.addEventListener("mouseleave", (e) => {
      const target = e.target.closest(".dict-word");
      if (target) {
        this.scheduleHide();
      }
    }, true);

    // Клик по слову сразу озвучивает его и обновляет подсказку
    container.addEventListener("click", (e) => {
      const target = e.target.closest(".dict-word");
      if (target) {
        const rawWord = target.dataset.word || target.innerText;
        this.speakWord(rawWord);
        this.showTooltip(target, true);
      }
    });
  }

  async getTranslation(rawWord) {
    const word = rawWord.toLowerCase().trim();

    // 1. Проверяем встроенный локальный словарь (0 мс, офлайн)
    if (BUILTIN_VOCABULARY[word]) {
      return BUILTIN_VOCABULARY[word];
    }

    // Проверяем формы слов (множественное число или -ing / -ed / -s)
    if (word.endsWith("s") && BUILTIN_VOCABULARY[word.slice(0, -1)]) {
      return BUILTIN_VOCABULARY[word.slice(0, -1)];
    }
    if (word.endsWith("ed") && BUILTIN_VOCABULARY[word.slice(0, -2)]) {
      return BUILTIN_VOCABULARY[word.slice(0, -2)];
    }
    if (word.endsWith("ing") && BUILTIN_VOCABULARY[word.slice(0, -3)]) {
      return BUILTIN_VOCABULARY[word.slice(0, -3)];
    }

    // 2. Проверяем сохраненный кеш
    if (this.cache[word]) {
      return this.cache[word];
    }

    // 3. Онлайн-запрос к бесплатному публичному API переводов MyMemory
    if (navigator.onLine) {
      try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|ru`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (data && data.responseData && data.responseData.translatedText) {
            const trans = data.responseData.translatedText.toLowerCase();
            this.cache[word] = trans;
            try {
              localStorage.setItem("my_english_dict_cache", JSON.stringify(this.cache));
            } catch (err) {}
            return trans;
          }
        }
      } catch (err) {}
    }

    return "кликните для озвучки";
  }

  async showTooltip(targetEl, immediate = false) {
    if (!this.tooltipEl || !this.enabled) return;

    if (this.hideTimeout) clearTimeout(this.hideTimeout);

    const rawWord = targetEl.dataset.word || targetEl.innerText;
    this.activeWordSpan = targetEl;

    const enWordEl = this.tooltipEl.querySelector("#tip-en-word");
    const ruTransEl = this.tooltipEl.querySelector("#tip-ru-trans");

    enWordEl.innerText = rawWord;
    ruTransEl.innerText = "...";
    this.tooltipEl.style.display = "flex";

    // Позиционируем плашку над словом с гарантированным зазором
    this.positionTooltip(targetEl);

    const translation = await this.getTranslation(rawWord);

    // Если курсор уже перешёл на другое слово — не перезаписываем
    if (this.activeWordSpan !== targetEl) return;

    ruTransEl.innerText = translation;
    this.positionTooltip(targetEl);
  }

  positionTooltip(targetEl) {
    if (!this.tooltipEl || !targetEl) return;

    const rect = targetEl.getBoundingClientRect();
    const tipWidth = this.tooltipEl.offsetWidth || 180;
    const tipHeight = this.tooltipEl.offsetHeight || 34;
    const gap = 8; // Гарантированный зазор, чтобы НЕ перекрывать текст строки

    // Центрируем плашку относительно конкретного слова
    let left = rect.left + window.scrollX + rect.width / 2 - tipWidth / 2;

    // Проверяем: есть ли свободное место СВЕРХУ от слова
    let isAbove = true;
    let top = rect.top + window.scrollY - tipHeight - gap;

    // Если до верхнего края окна меньше 12px, переносим плашку СНИЗУ под слово
    if (rect.top - tipHeight - gap < 12) {
      isAbove = false;
      top = rect.bottom + window.scrollY + gap;
    }

    // Защита от выхода за экран по горизонтали
    const screenMargin = 12;
    if (left < screenMargin) left = screenMargin;
    if (left + tipWidth > window.innerWidth - screenMargin) {
      left = window.innerWidth - tipWidth - screenMargin;
    }

    this.tooltipEl.classList.toggle("pill-placed-above", isAbove);
    this.tooltipEl.classList.toggle("pill-placed-below", !isAbove);
    this.tooltipEl.style.left = `${Math.round(left)}px`;
    this.tooltipEl.style.top = `${Math.round(top)}px`;
  }

  scheduleHide() {
    if (this.hideTimeout) clearTimeout(this.hideTimeout);
    this.hideTimeout = setTimeout(() => {
      if (this.tooltipEl) {
        this.tooltipEl.style.display = "none";
      }
      this.activeWordSpan = null;
    }, 200);
  }
}

const dictionary = new DictionaryService();


/* --- js/modes/builder.js --- */
// Логика режима «Конструктор предложений» (Sentence Assembler)




class BuilderMode {
  constructor(containerEl) {
    this.container = containerEl;
    this.currentIndex = 0;
    this.selectedTokens = [];
    this.bankTokens = [];
  }

  init() {
    this.loadTask(this.currentIndex || 0);
  }

  getCurrentTask() {
    return BUILDER_TASKS[this.currentIndex];
  }

  loadTask(index) {
    this.currentIndex = (index + BUILDER_TASKS.length) % BUILDER_TASKS.length;
    const task = this.getCurrentTask();
    this.selectedTokens = [];
    // Перемешиваем кирпичики для банка
    this.bankTokens = [...task.tokens].sort(() => Math.random() - 0.5);
    this.render();
  }

  render() {
    const task = this.getCurrentTask();
    if (!task) return;

    if (this.bankTokens.length === 0 && this.selectedTokens.length === 0) {
      this.bankTokens = [...task.tokens].sort(() => Math.random() - 0.5);
    }

    this.container.innerHTML = `
      <div class="mode-header">
        <div class="mode-badge">🧩 Конструктор речи</div>
        <div class="task-counter">Задание ${this.currentIndex + 1} из ${BUILDER_TASKS.length}</div>
      </div>

      <div class="task-card">
        <div class="theme-label">${task.theme}</div>
        <h2 class="target-phrase">«${task.ru}»</h2>
        <div class="hint-box">
          <span class="hint-icon">💡</span>
          <span class="hint-text">${task.hint}</span>
        </div>

        <div class="builder-slots-area">
          <div class="slots-label">Собранное предложение (порядок слов фиксирован):</div>
          <div class="assembled-line" id="assembled-line"></div>
        </div>

        <div class="token-bank-area">
          <div class="bank-label">Банк доступных кирпичиков:</div>
          <div class="token-bank" id="token-bank"></div>
        </div>

        <div class="feedback-area" id="builder-feedback"></div>

        <div class="action-buttons">
          <button class="btn btn-mic" id="btn-builder-mic" title="Назовите предложение вслух">🎙️ Сказать вслух</button>
          <button class="btn btn-secondary" id="btn-builder-reset">Сбросить</button>
          <button class="btn btn-primary" id="btn-builder-check">Проверить скелет</button>
          <button class="btn btn-next hidden" id="btn-builder-next">Следующее задание ➔</button>
        </div>
      </div>
    `;

    // Привязываем статические события один раз на карточку
    const micBtn = this.container.querySelector("#btn-builder-mic");
    if (micBtn) {
      micBtn.addEventListener("click", () => this.handleMicInput());
    }

    const resetBtn = this.container.querySelector("#btn-builder-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        sound.playClick();
        this.loadTask(this.currentIndex);
      });
    }

    const checkBtn = this.container.querySelector("#btn-builder-check");
    if (checkBtn) {
      checkBtn.addEventListener("click", () => this.checkSolution());
    }

    const nextBtn = this.container.querySelector("#btn-builder-next");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        sound.playClick();
        this.loadTask(this.currentIndex + 1);
      });
    }

    // Отрисовываем кирпичики без перерисовки всей карточки
    this.updateChips();
  }

  handleMicInput() {
    const micBtn = this.container.querySelector("#btn-builder-mic");
    const feedbackEl = this.container.querySelector("#builder-feedback");
    const task = this.getCurrentTask();

    micBtn.classList.add("mic-recording");
    micBtn.innerHTML = `<span>🔴 Слушаю...</span>`;

    speech.startListening(
      (transcript) => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span>🎙️ Сказать вслух</span>`;

        const words = transcript.replace(/[.,?!]/g, "").split(/\s+/).filter(Boolean);
        // Сверяем распознанные слова с банком
        this.selectedTokens = [];
        this.bankTokens = [...task.tokens];

        words.forEach((w) => {
          const bankIdx = this.bankTokens.findIndex(
            (t) => t.toLowerCase() === w.toLowerCase()
          );
          if (bankIdx !== -1) {
            const token = this.bankTokens.splice(bankIdx, 1)[0];
            this.selectedTokens.push(token);
          }
        });

        this.updateChips();
        this.checkSolution();
      },
      (error) => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span>🎙️ Сказать вслух</span>`;
        if (feedbackEl) {
          feedbackEl.innerHTML = `<div class="feedback-box feedback-error"><p>🎙️ ${error}</p></div>`;
        }
      },
      () => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span>🎙️ Сказать вслух</span>`;
      }
    );
  }

  // Обновляет ТОЛЬКО область кирпичиков без перерисовки карточки и без мигания экрана
  updateChips() {
    const assembledEl = this.container.querySelector("#assembled-line");
    const bankEl = this.container.querySelector("#token-bank");
    if (!assembledEl || !bankEl) return;

    // 1. Собранная строка
    if (this.selectedTokens.length === 0) {
      assembledEl.innerHTML = `<div class="empty-placeholder">Нажимай на слова внизу, чтобы собрать скелет фразы...</div>`;
    } else {
      assembledEl.innerHTML = this.selectedTokens
        .map(
          (token, idx) => `
        <button class="word-chip chip-assembled" data-idx="${idx}" title="Кликни, чтобы вернуть в банк">
          ${token}
          <span class="remove-x">✕</span>
        </button>
      `
        )
        .join("");

      // Клик по собранному кирпичику -> вернуть в банк
      assembledEl.querySelectorAll(".chip-assembled").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.dataset.idx, 10);
          const token = this.selectedTokens.splice(idx, 1)[0];
          this.bankTokens.push(token);
          sound.playClick();
          this.clearFeedback();
          this.updateChips();
        });
      });
    }

    // 2. Банк кирпичиков
    bankEl.innerHTML = this.bankTokens
      .map(
        (token, idx) => `
      <button class="word-chip chip-bank" data-bank-idx="${idx}">
        ${token}
      </button>
    `
      )
      .join("");

    // Клик по кирпичику в банке -> добавить в собранное
    bankEl.querySelectorAll(".chip-bank").forEach((btn) => {
      btn.addEventListener("click", () => {
        const bankIdx = parseInt(btn.dataset.bankIdx, 10);
        const token = this.bankTokens.splice(bankIdx, 1)[0];
        this.selectedTokens.push(token);

        // Озвучиваем выбранный кирпичик
        speech.speak(token, 1.0);
        sound.playClick();

        this.clearFeedback();
        this.updateChips();
      });
    });
  }

  clearFeedback() {
    const feedbackEl = this.container.querySelector("#builder-feedback");
    if (feedbackEl) feedbackEl.innerHTML = "";
    const checkBtn = this.container.querySelector("#btn-builder-check");
    const nextBtn = this.container.querySelector("#btn-builder-next");
    if (checkBtn) checkBtn.classList.remove("hidden");
    if (nextBtn) nextBtn.classList.add("hidden");
  }

  checkSolution() {
    const task = this.getCurrentTask();
    const feedbackEl = this.container.querySelector("#builder-feedback");
    const checkBtn = this.container.querySelector("#btn-builder-check");
    const nextBtn = this.container.querySelector("#btn-builder-next");
    const assembledEl = this.container.querySelector("#assembled-line");

    const isMatch =
      this.selectedTokens.length === task.solution.length &&
      this.selectedTokens.every((val, idx) => val === task.solution[idx]);

    if (isMatch) {
      sound.playSuccess();
      state.addXP(25);
      state.markSolved("builder", task.id);

      // Подсвечиваем все кирпичики изумрудно-зеленым успехом
      if (assembledEl) {
        assembledEl.querySelectorAll(".chip-assembled").forEach((chip) => {
          chip.classList.add("chip-step-correct");
        });
      }

      // Произносим собранную английскую фразу вслух
      const fullSentence = task.solution.join(" ");
      speech.speak(fullSentence);

      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-success">
          <div class="feedback-title">🎯 Идеально! Порядок слов и связи соблюдены:</div>
          <div class="solution-display">
            <span>${fullSentence}</span>
            <button class="btn-voice-mini" id="btn-replay-solution" title="Послушать еще раз">🔊</button>
          </div>
          <div class="structure-breakdown">
            ${task.structure.map((part) => `<span class="structure-badge">${part}</span>`).join(" ")}
          </div>
        </div>
      `;

      const replayBtn = feedbackEl.querySelector("#btn-replay-solution");
      if (replayBtn) {
        replayBtn.addEventListener("click", () => speech.speak(fullSentence));
      }

      if (checkBtn) checkBtn.classList.add("hidden");
      if (nextBtn) nextBtn.classList.remove("hidden");
    } else {
      sound.playError();
      state.registerError();

      // Подсвечиваем верные слова зеленым, а ошибочные красным зачёркиванием!
      if (assembledEl) {
        const chips = assembledEl.querySelectorAll(".chip-assembled");
        chips.forEach((chip, idx) => {
          if (idx < task.solution.length && this.selectedTokens[idx] === task.solution[idx]) {
            chip.classList.add("chip-step-correct");
          } else {
            chip.classList.add("chip-wrong-order");
          }
        });
      }

      let advice = "Порядок слов или выбор элементов не совпадает.";
      if (this.selectedTokens.length < task.solution.length) {
        advice = "Предложение не закончено! Не хватает ключевых звеньев цепи.";
      }

      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-error">
          <div class="feedback-title">⚠️ Скелет предложения сломан!</div>
          <p>${advice}</p>
          <div class="error-hint">Неправильные элементы подсвечены <strong>красным</strong>. Обрати внимание на подсказку: <em>${task.hint}</em></div>
        </div>
      `;
    }
  }
}


/* --- js/modes/bug-hunter.js --- */
// Логика режима «Охотник за багами» (Bug Hunter)




class BugHunterMode {
  constructor(containerEl) {
    this.container = containerEl;
    this.currentIndex = 0;
    this.filterLevel = "all";
    this.answered = false;
  }

  init() {
    this.loadTask(0);
  }

  getFilteredTasks() {
    if (this.filterLevel === "all") return BUG_HUNTER_TASKS;
    return BUG_HUNTER_TASKS.filter((t) => t.level === this.filterLevel);
  }

  getCurrentTask() {
    const list = this.getFilteredTasks();
    return list[this.currentIndex % list.length];
  }

  loadTask(index) {
    const list = this.getFilteredTasks();
    this.currentIndex = (index + list.length) % list.length;
    this.answered = false;
    this.render();
  }

  render() {
    const task = this.getCurrentTask();
    const list = this.getFilteredTasks();
    if (!task) return;

    // Разбиваем предложение на слова
    const words = task.sentence.split(" ");

    this.container.innerHTML = `
      <div class="mode-header">
        <div class="mode-badge">🕵️ Охотник за багами</div>
        <div class="filter-controls">
          <button class="filter-btn ${this.filterLevel === "all" ? "active" : ""}" data-level="all">Все (${BUG_HUNTER_TASKS.length})</button>
          <button class="filter-btn ${this.filterLevel === "beginner" ? "active" : ""}" data-level="beginner">Новичок</button>
          <button class="filter-btn ${this.filterLevel === "intermediate" ? "active" : ""}" data-level="intermediate">Средний</button>
          <button class="filter-btn ${this.filterLevel === "tricky" ? "active" : ""}" data-level="tricky">Хитрые ловушки</button>
        </div>
        <div class="task-counter">${this.currentIndex + 1} из ${list.length}</div>
      </div>

      <div class="task-card">
        <div class="hunter-instruction">
          Найди и <strong>кликни по лишнему или ошибочному элементу</strong> в предложении:
        </div>

        <div class="sentence-interactive-box" id="sentence-box">
          ${words
            .map(
              (w, idx) => `
            <button class="interactive-word" data-word-idx="${idx}">${w}</button>
          `
            )
            .join(" ")}
        </div>

        <div class="feedback-area" id="hunter-feedback"></div>

        <div class="action-buttons">
          <button class="btn btn-secondary" id="btn-no-error" ${this.answered ? "disabled" : ""}>Здесь нет ошибки</button>
          <button class="btn btn-next ${this.answered ? "" : "hidden"}" id="btn-hunter-next">Следующая фраза ➔</button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Фильтры уровня сложности
    const filterBtns = this.container.querySelectorAll(".filter-btn");
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.filterLevel = btn.dataset.level;
        sound.playClick();
        this.loadTask(0);
      });
    });

    // Клик по слову
    const wordBtns = this.container.querySelectorAll(".interactive-word");
    wordBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (this.answered) return;
        const clickedIdx = parseInt(btn.dataset.wordIdx, 10);
        this.handleWordClick(clickedIdx, btn);
      });
    });

    // Кнопка "Ошибок нет"
    const noErrorBtn = this.container.querySelector("#btn-no-error");
    if (noErrorBtn) {
      noErrorBtn.addEventListener("click", () => {
        if (this.answered) return;
        this.handleNoErrorClick();
      });
    }

    // Кнопка "Далее"
    const nextBtn = this.container.querySelector("#btn-hunter-next");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        sound.playClick();
        this.loadTask(this.currentIndex + 1);
      });
    }
  }

  handleWordClick(clickedIdx, wordElement) {
    const task = this.getCurrentTask();
    const feedbackEl = this.container.querySelector("#hunter-feedback");
    const nextBtn = this.container.querySelector("#btn-hunter-next");

    if (task.hasError && clickedIdx === task.errorWordIndex) {
      // Верно нашли ошибку!
      this.answered = true;
      wordElement.classList.add("word-error-found");

      // Красивая визуальная трансформация слова
      const originalText = wordElement.innerText;
      if (task.correctWord) {
        wordElement.innerHTML = `<span class="struck-text">${originalText}</span> ➔ <span class="fixed-text">${task.correctWord}</span>`;
      } else {
        wordElement.innerHTML = `<span class="struck-text">${originalText}</span> <span class="deleted-tag">✕ лишнее</span>`;
      }

      sound.playSuccess();
      state.addXP(20);
      state.markSolved("bugHunter", task.id);

      // Озвучиваем исправленное правильное предложение
      speech.speak(task.correctSentence);

      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-success">
          <div class="feedback-title">🎯 Точно в цель! Баг нейтрализован:</div>
          <div class="correct-sentence-box">
            <span>Правильно: <strong>${task.correctSentence}</strong></span>
            <button class="btn-voice-mini" id="btn-replay-hunter-fix">🔊</button>
          </div>
          <p class="rule-expl">${task.explanation}</p>
        </div>
      `;

      const replayBtn = feedbackEl.querySelector("#btn-replay-hunter-fix");
      if (replayBtn) {
        replayBtn.addEventListener("click", () => speech.speak(task.correctSentence));
      }

      if (nextBtn) nextBtn.classList.remove("hidden");
    } else {
      // Промах
      sound.playError();
      state.registerError();
      wordElement.classList.add("word-wrong-guess");
      setTimeout(() => wordElement.classList.remove("word-wrong-guess"), 600);

      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-error">
          <div class="feedback-title">Мимо!</div>
          <p>Слово «${wordElement.innerText}» стоит на своем месте и не содержит ошибки. Попробуй другое слово!</p>
        </div>
      `;
    }
  }

  handleNoErrorClick() {
    const task = this.getCurrentTask();
    const feedbackEl = this.container.querySelector("#hunter-feedback");
    const nextBtn = this.container.querySelector("#btn-hunter-next");

    if (!task.hasError) {
      this.answered = true;
      sound.playSuccess();
      state.addXP(20);
      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-success">
          <div class="feedback-title">🎯 Абсолютно верно! Фраза безупречна.</div>
        </div>
      `;
      if (nextBtn) nextBtn.classList.remove("hidden");
    } else {
      sound.playError();
      state.registerError();
      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-error">
          <div class="feedback-title">Ошибка здесь есть!</div>
          <p>Внимательно проверь связки глаголов, модальники или определители.</p>
        </div>
      `;
    }
  }
}


/* --- js/modes/switchboard.js --- */
// Переработанный режим «Трансформер предложений (Рубильники и Времена)»




class SwitchboardMode {
  constructor(containerEl) {
    this.container = containerEl;
    this.currentIndex = 0;
    this.switches = {
      tense: "present_simple",
      mode: "affirmative",
      qWord: "none"
    };
  }

  init() {
    this.loadTask(0);
  }

  getCurrentTask() {
    return SWITCHBOARD_TASKS[this.currentIndex];
  }

  loadTask(index) {
    this.currentIndex = (index + SWITCHBOARD_TASKS.length) % SWITCHBOARD_TASKS.length;
    // Сброс переключателей в начальное положение
    this.switches = {
      tense: "present_simple",
      mode: "affirmative",
      qWord: "none"
    };
    this.render();
  }

  computeStructure(task) {
    const s = task.baseSubject;
    const v = task.baseVerb;
    const obj = task.baseObject ? task.baseObject : "";
    const mod = task.baseModifier ? task.baseModifier : "";
    const rest = `${obj} ${mod}`.trim();

    let prefix = null;
    let switchWord = null;
    let subject = s;
    let actionWord = v;
    let note = "";

    // 1. Вопросительное слово (Наращивание влево)
    if (this.switches.mode === "question" && this.switches.qWord !== "none") {
      prefix = this.switches.qWord.charAt(0).toUpperCase() + this.switches.qWord.slice(1);
    }

    // 2. Логика по временам
    if (this.switches.tense === "future") {
      if (this.switches.mode === "affirmative") {
        actionWord = `will ${v}`;
        note = "Прямой порядок: Хозяин ➔ will + V1";
      } else if (this.switches.mode === "negation") {
        actionWord = `won't ${v}`;
        note = "Отрицание: Хозяин ➔ won't + V1";
      } else if (this.switches.mode === "question") {
        switchWord = prefix ? "will" : "Will";
        subject = s.toLowerCase();
        note = "⚡ РУБИЛЬНИК WILL ПЕРЕПРЫГНУЛ ПЕРЕД ХОЗЯИНОМ!";
      }
    } else if (this.switches.tense === "past") {
      const pastV = v === "buy" ? "bought" : v === "go" ? "went" : v === "call" ? "called" : v + "ed";

      if (this.switches.mode === "affirmative") {
        actionWord = pastV;
        note = "Прошедший факт: 2-я форма глагола (V2)";
      } else if (this.switches.mode === "negation") {
        actionWord = `didn't ${v}`;
        note = "didn't забирает прошлое на себя ➔ глагол в 1-й форме!";
      } else if (this.switches.mode === "question") {
        switchWord = prefix ? "did" : "Did";
        subject = s.toLowerCase();
        actionWord = v; // 1-я форма
        note = "⚡ РУБИЛЬНИК DID ВПЕРЕДИ! Глагол вернулся в 1-ю форму";
      }
    } else if (this.switches.tense === "continuous") {
      const be = s === "He" || s === "She" || s === "It" ? "is" : s === "I" ? "am" : "are";
      const beCap = be.charAt(0).toUpperCase() + be.slice(1);
      const ing = v === "live" ? "living" : v + "ing";

      if (this.switches.mode === "affirmative") {
        actionWord = `${be} ${ing}`;
        note = "Режим «в эфире»: to be + глагол с окончанием -ing";
      } else if (this.switches.mode === "negation") {
        actionWord = `${be} not ${ing}`;
        note = "Отрицание в эфире: to be + not + -ing";
      } else if (this.switches.mode === "question") {
        switchWord = prefix ? be : beCap;
        subject = s.toLowerCase();
        actionWord = ing;
        note = "⚡ РУБИЛЬНИК TO BE ВЫНЕСЕН ВПЕРЕД перед Хозяином!";
      }
    } else {
      // PRESENT SIMPLE
      const isThird = s === "He" || s === "She" || s === "It";
      const doDoes = isThird ? "does" : "do";
      const doDoesCap = isThird ? "Does" : "Do";

      if (this.switches.mode === "affirmative") {
        const sEnding = isThird ? (v === "live" ? "lives" : v === "go" ? "goes" : v + "s") : v;
        actionWord = sEnding;
        note = isThird ? "3-е лицо (he/she): к глаголу липнет окончание -s" : "Обычный регулярный факт";
      } else if (this.switches.mode === "negation") {
        const helper = isThird ? "doesn't" : "don't";
        actionWord = `${helper} ${v}`;
        note = "Отрицатель забирает окончание -s себе!";
      } else if (this.switches.mode === "question") {
        switchWord = prefix ? doDoes : doDoesCap;
        subject = s.toLowerCase();
        actionWord = v;
        note = "⚡ РУБИЛЬНИК ВОПРОСА ВПЕРЕДИ перед Хозяином!";
      }
    }

    let fullSentence = "";
    if (this.switches.mode === "question") {
      const parts = [prefix, switchWord, subject, actionWord, rest].filter(Boolean);
      fullSentence = parts.join(" ").trim() + "?";
    } else {
      const parts = [subject, actionWord, rest].filter(Boolean);
      fullSentence = parts.join(" ").trim() + ".";
    }

    return { prefix, switchWord, subject, actionWord, rest, note, fullSentence };
  }

  render() {
    const task = this.getCurrentTask();
    if (!task) return;

    const struct = this.computeStructure(task);

    this.container.innerHTML = `
      <div class="mode-header">
        <div class="mode-badge">⚡ Трансформер речи (Рубильники)</div>
        <div class="task-counter">Задача ${this.currentIndex + 1} из ${SWITCHBOARD_TASKS.length}</div>
      </div>

      <div class="task-card transformer-card">
        <!-- ЦЕЛЬ ЗАДАНИЯ -->
        <div class="transformer-mission">
          <div class="mission-top">
            <span class="mission-label">ЦЕЛЬ ЗАДАНИЯ:</span>
            <span class="mission-task">${task.targetDesc}</span>
          </div>
          <div class="mission-ru">${task.ruTarget}</div>
        </div>

        <!-- ТАБЛО СТРУКТУРЫ ПРЕДЛОЖЕНИЯ -->
        <div class="live-transformer-stage">
          <div class="stage-top-bar">
            <span class="stage-label">РЕЗУЛЬТАТ РАБОТЫ РУБИЛЬНИКОВ:</span>
            <button class="btn-voice-mini" id="btn-speak-stage" title="Послушать фразу">🔊 Слушать</button>
          </div>
          
          <div class="sentence-blocks-row">
            ${struct.prefix ? `<div class="s-block block-qword"><span class="block-tag">⬅ НАРАЩИВАНИЕ</span>${struct.prefix}</div>` : ""}
            ${struct.switchWord ? `<div class="s-block block-switch"><span class="block-tag">⚡ РУБИЛЬНИК</span>${struct.switchWord}</div>` : ""}
            <div class="s-block block-subject"><span class="block-tag">👑 ХОЗЯИН</span>${struct.subject}</div>
            <div class="s-block block-verb"><span class="block-tag">⚙️ ДЕЙСТВИЕ</span>${struct.actionWord}</div>
            ${struct.rest ? `<div class="s-block block-rest">${struct.rest}</div>` : ""}
            <div class="s-block block-punct">${this.switches.mode === "question" ? "?" : "."}</div>
          </div>

          <div class="structure-note-line">
            <span class="note-icon">💡</span>
            <span class="note-text">${struct.note}</span>
          </div>
        </div>

        <!-- ПАНЕЛЬ УПРАВЛЕНИЯ РУБИЛЬНИКАМИ -->
        <div class="controls-panel">
          <!-- 1. ФОРМА РЕЧИ -->
          <div class="ctrl-section">
            <div class="ctrl-label">1. РУБИЛЬНИК ФОРМЫ (ПЕРЕКЛЮЧАТЕЛЬ ПОРЯДКА СЛОВ):</div>
            <div class="ctrl-buttons-row">
              <button class="t-btn ${this.switches.mode === "affirmative" ? "t-active" : ""}" data-switch="mode" data-val="affirmative">
                <span class="t-icon">💬</span> Утверждение
              </button>
              <button class="t-btn t-btn-question ${this.switches.mode === "question" ? "t-active" : ""}" data-switch="mode" data-val="question">
                <span class="t-icon">❓</span> ВОПРОС (рубильник вперед!)
              </button>
              <button class="t-btn ${this.switches.mode === "negation" ? "t-active" : ""}" data-switch="mode" data-val="negation">
                <span class="t-icon">🚫</span> Отрицание
              </button>
            </div>
          </div>

          <!-- 2. ВРЕМЕНА -->
          <div class="ctrl-section">
            <div class="ctrl-label">2. РУБИЛЬНИК ВРЕМЕНИ (4 БАЗОВЫХ ВРЕМЕНИ ИЗ ШПАРГАЛКИ):</div>
            <div class="ctrl-buttons-row">
              <button class="t-btn ${this.switches.tense === "present_simple" ? "t-active" : ""}" data-switch="tense" data-val="present_simple">
                <span class="t-icon">⚡</span> Факт (Simple)
              </button>
              <button class="t-btn ${this.switches.tense === "continuous" ? "t-active" : ""}" data-switch="tense" data-val="continuous">
                <span class="t-icon">📡</span> В эфире (-ing)
              </button>
              <button class="t-btn ${this.switches.tense === "past" ? "t-active" : ""}" data-switch="tense" data-val="past">
                <span class="t-icon">⏳</span> Прошлое (Past)
              </button>
              <button class="t-btn ${this.switches.tense === "future" ? "t-active" : ""}" data-switch="tense" data-val="future">
                <span class="t-icon">🚀</span> Будущее (will)
              </button>
            </div>
          </div>

          <!-- 3. ВОПРОСИТЕЛЬНЫЕ СЛОВА -->
          <div class="ctrl-section ${this.switches.mode === "question" ? "" : "ctrl-dimmed"}">
            <div class="ctrl-label">3. НАРАЩИВАНИЕ ВЛЕВО (ВОПРОСИТЕЛЬНОЕ СЛОВО):</div>
            <div class="ctrl-buttons-row">
              <button class="t-btn ${this.switches.qWord === "none" ? "t-active" : ""}" data-switch="qWord" data-val="none">
                Без вопроса
              </button>
              <button class="t-btn ${this.switches.qWord === "where" ? "t-active" : ""}" data-switch="qWord" data-val="where">
                Where (Где/Куда)
              </button>
              <button class="t-btn ${this.switches.qWord === "why" ? "t-active" : ""}" data-switch="qWord" data-val="why">
                Why (Почему)
              </button>
              <button class="t-btn ${this.switches.qWord === "when" ? "t-active" : ""}" data-switch="qWord" data-val="when">
                When (Когда)
              </button>
            </div>
          </div>
        </div>

        <div class="feedback-area" id="switch-feedback"></div>

        <div class="action-buttons">
          <button class="btn btn-primary" id="btn-check-switches">Зафиксировать рубильники</button>
          <button class="btn btn-next hidden" id="btn-next-switches">Следующая цель ➔</button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const btns = this.container.querySelectorAll(".t-btn");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const sw = btn.dataset.switch;
        const val = btn.dataset.val;
        this.switches[sw] = val;
        sound.playSwitch();
        this.render();
      });
    });

    const speakStageBtn = this.container.querySelector("#btn-speak-stage");
    if (speakStageBtn) {
      speakStageBtn.addEventListener("click", () => {
        const task = this.getCurrentTask();
        const struct = this.computeStructure(task);
        speech.speak(struct.fullSentence);
      });
    }

    const checkBtn = this.container.querySelector("#btn-check-switches");
    if (checkBtn) {
      checkBtn.addEventListener("click", () => this.checkSwitches());
    }

    const nextBtn = this.container.querySelector("#btn-next-switches");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        sound.playClick();
        this.loadTask(this.currentIndex + 1);
      });
    }
  }

  checkSwitches() {
    const task = this.getCurrentTask();
    const feedbackEl = this.container.querySelector("#switch-feedback");
    const speakStageBtn = this.container.querySelector("#btn-speak-stage");
    if (speakStageBtn) {
      speakStageBtn.addEventListener("click", () => {
        const task = this.getCurrentTask();
        const struct = this.computeStructure(task);
        speech.speak(struct.fullSentence);
      });
    }

    const checkBtn = this.container.querySelector("#btn-check-switches");
    const nextBtn = this.container.querySelector("#btn-next-switches");

    const expected = task.correctSwitches;
    const isTenseCorrect = this.switches.tense === expected.tense;
    const isModeCorrect = this.switches.mode === expected.mode;
    const isQWordCorrect = this.switches.qWord === expected.qWord;

    if (isTenseCorrect && isModeCorrect && isQWordCorrect) {
      sound.playSuccess();
      state.addXP(25);
      state.markSolved("switchboard", task.id);

      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-success">
          <div class="feedback-title">⚡ Блестяще! Цепь замкнута правильно:</div>
          <div class="correct-sentence-box">${task.targetSentence}</div>
          <p class="rule-expl">${task.explanation}</p>
        </div>
      `;

      if (checkBtn) checkBtn.classList.add("hidden");
      if (nextBtn) nextBtn.classList.remove("hidden");
    } else {
      sound.playError();
      state.registerError();

      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-error">
          <div class="feedback-title">Цепь пока не замкнулась!</div>
          <p>Внимательно сверься с целью: <strong>${task.ruTarget}</strong> (${task.targetDesc}).</p>
        </div>
      `;
    }
  }
}


/* --- js/modes/listening.js --- */
// Режим «Аудио-диктант / Понимание на слух» (Listening Mode)
// С мгновенной зеленой подсветкой правильно собранных слов и аудио-откликом





class ListeningMode {
  constructor(containerEl) {
    this.container = containerEl;
    this.currentIndex = 0;
    this.selectedTokens = [];
    this.bankTokens = [];
    this.showRu = false;
    this.isCompleted = false;
  }

  init() {
    this.loadTask(0);
  }

  getCurrentTask() {
    return LISTENING_TASKS[this.currentIndex];
  }

  loadTask(index) {
    this.currentIndex = (index + LISTENING_TASKS.length) % LISTENING_TASKS.length;
    const task = this.getCurrentTask();
    this.selectedTokens = [];
    this.showRu = false;
    this.isCompleted = false;
    this.bankTokens = [...task.tokens].sort(() => Math.random() - 0.5);
    this.render();

    // Автоматически озвучиваем фразу целиком при открытии карточки
    setTimeout(() => {
      speech.speak(task.en);
    }, 400);
  }

  render() {
    const task = this.getCurrentTask();
    if (!task) return;

    this.container.innerHTML = `
      <div class="mode-header">
        <div class="mode-badge">🎧 Аудио-диктант (На слух)</div>
        <div class="task-counter">Фраза ${this.currentIndex + 1} из ${LISTENING_TASKS.length}</div>
      </div>

      <div class="task-card listening-card">
        <div class="listening-control-box">
          <div class="audio-buttons-row">
            <button class="btn-audio-play" id="btn-play-normal" title="Слушать на обычной скорости">
              <span class="audio-icon">🔊</span> Слушать фразу
            </button>
            <button class="btn-audio-slow" id="btn-play-slow" title="Слушать замедленно (0.7x)">
              <span class="audio-icon">🐢</span> Медленно
            </button>
            <button class="btn-audio-mic" id="btn-mic-dictate" title="Надиктовать фразу в микрофон">
              <span class="audio-icon">🎙️</span> Сказать вслух
            </button>
          </div>

          <div class="ru-spoiler-box">
            ${
              this.showRu
                ? `<div class="ru-revealed">«${task.ru}»</div>`
                : `<button class="btn-link" id="btn-show-ru">👁️ Показать русский перевод (подсказка)</button>`
            }
          </div>
        </div>

        <div class="builder-slots-area">
          <div class="slots-header-row">
            <span class="slots-label">То, что ты услышал (собери по порядку):</span>
            <span class="slots-status-badge" id="list-status-badge"></span>
          </div>
          <div class="assembled-line" id="assembled-line"></div>
        </div>

        <div class="token-bank-area">
          <div class="bank-label">Банк доступных кирпичиков:</div>
          <div class="token-bank" id="token-bank"></div>
        </div>

        <div class="feedback-area" id="listening-feedback"></div>

        <div class="action-buttons">
          <button class="btn btn-secondary" id="btn-list-reset">Сбросить</button>
          <button class="btn btn-primary" id="btn-list-check">Проверить</button>
          <button class="btn btn-next hidden" id="btn-list-next">Следующая фраза ➔</button>
        </div>
      </div>
    `;

    this.bindEvents();
    this.updateChips();
  }

  bindEvents() {
    const task = this.getCurrentTask();

    // Озвучка
    const playNorm = this.container.querySelector("#btn-play-normal");
    if (playNorm) {
      playNorm.addEventListener("click", () => {
        sound.playClick();
        speech.speak(task.en);
      });
    }

    const playSlow = this.container.querySelector("#btn-play-slow");
    if (playSlow) {
      playSlow.addEventListener("click", () => {
        sound.playClick();
        speech.speakSlow(task.en);
      });
    }

    // Микрофон
    const micBtn = this.container.querySelector("#btn-mic-dictate");
    if (micBtn) {
      micBtn.addEventListener("click", () => this.handleMicClick());
    }

    // Спойлер перевода
    const showRuBtn = this.container.querySelector("#btn-show-ru");
    if (showRuBtn) {
      showRuBtn.addEventListener("click", () => {
        this.showRu = true;
        this.render();
      });
    }

    // Кнопка сброса
    const resetBtn = this.container.querySelector("#btn-list-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        sound.playClick();
        this.loadTask(this.currentIndex);
      });
    }

    // Проверка
    const checkBtn = this.container.querySelector("#btn-list-check");
    if (checkBtn) {
      checkBtn.addEventListener("click", () => this.checkSolution());
    }

    // Следующее задание
    const nextBtn = this.container.querySelector("#btn-list-next");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        sound.playClick();
        this.loadTask(this.currentIndex + 1);
      });
    }
  }

  handleMicClick() {
    const micBtn = this.container.querySelector("#btn-mic-dictate");
    const feedbackEl = this.container.querySelector("#listening-feedback");

    micBtn.classList.add("mic-recording");
    micBtn.innerHTML = `<span>🔴 Говорите...</span>`;

    speech.startListening(
      (transcript) => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span>🎙️</span> Сказать вслух`;
        this.evaluateTranscript(transcript);
      },
      (error) => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span>🎙️</span> Сказать вслух`;
        feedbackEl.innerHTML = `<div class="feedback-box feedback-error"><p>🎙️ ${error}</p></div>`;
      },
      () => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span>🎙️</span> Сказать вслух`;
      }
    );
  }

  evaluateTranscript(transcript) {
    const task = this.getCurrentTask();
    const cleanRecognized = transcript.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
    const cleanExpected = task.en.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();

    if (cleanRecognized === cleanExpected) {
      this.handleCompleteSuccess(task, true);
    } else {
      sound.playError();
      const feedbackEl = this.container.querySelector("#listening-feedback");
      if (feedbackEl) {
        feedbackEl.innerHTML = `
          <div class="feedback-box feedback-error">
            <div class="feedback-title">🎙️ Вы сказали: «${transcript}»</div>
            <p>Близко, но не совсем совпало. Попробуйте еще раз или соберите кирпичиками!</p>
          </div>
        `;
      }
    }
  }

  updateChips() {
    const assembledEl = this.container.querySelector("#assembled-line");
    const bankEl = this.container.querySelector("#token-bank");
    const statusBadge = this.container.querySelector("#list-status-badge");
    const task = this.getCurrentTask();
    if (!assembledEl || !bankEl || !task) return;

    const expectedTokens = task.en.replace(/[.,?!]/g, "").split(" ");

    // 1. Отрисовка собранных слов с мгновенной подсветкой
    if (this.selectedTokens.length === 0) {
      assembledEl.innerHTML = `<div class="empty-placeholder">Слушай аудио и кликай по кирпичикам...</div>`;
      if (statusBadge) statusBadge.innerHTML = "";
    } else {
      let correctCount = 0;
      let hasError = false;

      assembledEl.innerHTML = this.selectedTokens
        .map((token, idx) => {
          const isExpected =
            idx < expectedTokens.length &&
            token.toLowerCase() === expectedTokens[idx].toLowerCase();

          if (isExpected && !hasError) {
            correctCount++;
            return `
              <button class="word-chip chip-assembled chip-step-correct" data-idx="${idx}" title="Правильно услышано!">
                <span class="chip-check-icon">✓</span> ${token} <span class="remove-x">✕</span>
              </button>
            `;
          } else {
            hasError = true;
            return `
              <button class="word-chip chip-assembled chip-wrong-order" data-idx="${idx}" title="Не то слово или нарушен порядок">
                ${token} <span class="remove-x">✕</span>
              </button>
            `;
          }
        })
        .join("");

      // Обновляем статусную полосу реакции
      if (statusBadge) {
        if (!hasError) {
          statusBadge.innerHTML = `<span class="badge-status-progress">🟢 Верно: ${correctCount} из ${expectedTokens.length}</span>`;
        } else {
          statusBadge.innerHTML = `<span class="badge-status-error">🔴 Ошибка на слух! Кликни ✕ чтобы убрать</span>`;
        }
      }

      // Клик по слову в собранной строке -> возврат в банк
      assembledEl.querySelectorAll(".chip-assembled").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (this.isCompleted) return;
          const idx = parseInt(btn.dataset.idx, 10);
          const token = this.selectedTokens.splice(idx, 1)[0];
          this.bankTokens.push(token);
          sound.playClick();
          this.updateChips();
        });
      });

      // Авто-проверка при полной правильной сборке!
      if (!hasError && correctCount === expectedTokens.length && !this.isCompleted) {
        this.handleCompleteSuccess(task, false);
      }
    }

    // 2. Отрисовка банка кирпичиков
    bankEl.innerHTML = this.bankTokens
      .map(
        (token, idx) => `
      <button class="word-chip chip-bank" data-bank-idx="${idx}">
        ${token}
      </button>
    `
      )
      .join("");

    bankEl.querySelectorAll(".chip-bank").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (this.isCompleted) return;
        const bankIdx = parseInt(btn.dataset.bankIdx, 10);
        const token = this.bankTokens.splice(bankIdx, 1)[0];
        this.selectedTokens.push(token);

        // Озвучиваем выбранное слово диктором вслух!
        speech.speak(token, 1.0);
        sound.playClick();

        this.updateChips();
      });
    });
  }

  handleCompleteSuccess(task, fromMic = false) {
    this.isCompleted = true;
    sound.playSuccess();
    state.addXP(fromMic ? 35 : 25);
    state.markSolved("listening", task.id);

    // Озвучиваем победную фразу целиком
    speech.speak(task.en);

    const feedbackEl = this.container.querySelector("#listening-feedback");
    const checkBtn = this.container.querySelector("#btn-list-check");
    const nextBtn = this.container.querySelector("#btn-list-next");
    const statusBadge = this.container.querySelector("#list-status-badge");

    if (statusBadge) {
      statusBadge.innerHTML = `<span class="badge-status-complete">✨ Вся фраза собрана идеально!</span>`;
    }

    if (feedbackEl) {
      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-success">
          <div class="feedback-title">🎯 ${fromMic ? "Фантастика! Распознано 100%:" : "Блестяще! Вы услышали каждое слово:"}</div>
          <div class="solution-display">
            <span>${task.en}</span>
            <button class="btn-voice-mini" id="btn-replay-list-win">🔊</button>
          </div>
          <div class="ru-revealed">«${task.ru}»</div>
          <div class="audio-tip">🎧 <strong>Нюанс слитной речи:</strong> ${task.audioFocus}</div>
        </div>
      `;

      const replayBtn = feedbackEl.querySelector("#btn-replay-list-win");
      if (replayBtn) {
        replayBtn.addEventListener("click", () => speech.speak(task.en));
      }
    }

    if (checkBtn) checkBtn.classList.add("hidden");
    if (nextBtn) nextBtn.classList.remove("hidden");
  }

  checkSolution() {
    const task = this.getCurrentTask();
    const expectedTokens = task.en.replace(/[.,?!]/g, "").split(" ");
    const isMatch =
      this.selectedTokens.length === expectedTokens.length &&
      this.selectedTokens.every((val, idx) => val.toLowerCase() === expectedTokens[idx].toLowerCase());

    if (isMatch) {
      this.handleCompleteSuccess(task, false);
    } else {
      sound.playError();
      state.registerError();
      const feedbackEl = this.container.querySelector("#listening-feedback");
      if (feedbackEl) {
        feedbackEl.innerHTML = `
          <div class="feedback-box feedback-error">
            <div class="feedback-title">Есть неточность на слух!</div>
            <p>Неверные слова подсвечены красным. Послушай еще раз (кнопка 🔊 или 🐢) и исправь!</p>
          </div>
        `;
      }
    }
  }
}


/* --- js/modes/sprint.js --- */
// Режим «Блиц-спринт / Разговорная реакция» (Speed Sprint)




class SprintMode {
  constructor(containerEl) {
    this.container = containerEl;
    this.currentIndex = 0;
    this.timer = null;
    this.timeLeft = 5;
    this.totalTime = 5;
    this.isAnswered = false;
    this.combo = 0;
    this.score = 0;
  }

  init() {
    this.currentIndex = 0;
    this.combo = 0;
    this.score = 0;
    this.loadQuestion(0);
  }

  getCurrentTask() {
    return SPRINT_TASKS[this.currentIndex % SPRINT_TASKS.length];
  }

  loadQuestion(index) {
    this.clearTimer();
    this.currentIndex = index;
    const task = this.getCurrentTask();
    this.timeLeft = task.timeLimit || 5;
    this.totalTime = this.timeLeft;
    this.isAnswered = false;

    // Перемешиваем варианты
    this.shuffledOptions = [...task.options]
      .map((opt) => ({ ...opt }))
      .sort(() => Math.random() - 0.5);

    this.render();
    this.startTimer();
  }

  startTimer() {
    const timerBar = this.container.querySelector("#sprint-timer-bar");
    const timerText = this.container.querySelector("#sprint-timer-sec");

    this.timer = setInterval(() => {
      this.timeLeft -= 0.1;
      if (timerText) timerText.innerText = Math.max(0, this.timeLeft).toFixed(1) + "s";
      if (timerBar) {
        const pct = Math.max(0, (this.timeLeft / this.totalTime) * 100);
        timerBar.style.width = `${pct}%`;
        if (pct < 30) {
          timerBar.style.backgroundColor = "#ef4444";
        } else if (pct < 60) {
          timerBar.style.backgroundColor = "#f59e0b";
        }
      }

      if (this.timeLeft <= 0) {
        this.clearTimer();
        this.handleTimeout();
      }
    }, 100);
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  render() {
    const task = this.getCurrentTask();
    if (!task) return;

    this.container.innerHTML = `
      <div class="mode-header">
        <div class="mode-badge">⚡ Блиц-спринт (Убей переводчика в голове)</div>
        <div class="sprint-header-stats">
          <span class="sprint-combo">🔥 Комбо: x${this.combo}</span>
          <span class="task-counter">Раунд ${this.currentIndex + 1} из ${SPRINT_TASKS.length}</span>
        </div>
      </div>

      <div class="task-card sprint-card">
        <div class="sprint-timer-track">
          <div class="sprint-timer-bar" id="sprint-timer-bar" style="width: 100%"></div>
        </div>
        <div class="sprint-timer-badge" id="sprint-timer-sec">${this.timeLeft.toFixed(1)}s</div>

        <div class="sprint-prompt">
          <span class="sprint-label">ПЕРЕВЕДИ МГНОВЕННО БЕЗ ПАУЗЫ:</span>
          <h2 class="sprint-phrase">«${task.ru}»</h2>
        </div>

        <div class="sprint-options-grid" id="sprint-options">
          ${this.shuffledOptions
            .map(
              (opt, idx) => `
            <button class="sprint-opt-btn" data-idx="${idx}">
              <span class="opt-key">${idx + 1}</span>
              <span class="opt-val">${opt.text}</span>
            </button>
          `
            )
            .join("")}
        </div>

        <div class="feedback-area" id="sprint-feedback"></div>

        <div class="action-buttons">
          <button class="btn btn-next hidden" id="btn-sprint-next">Следующий раунд ➔</button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const btns = this.container.querySelectorAll(".sprint-opt-btn");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (this.isAnswered) return;
        const idx = parseInt(btn.dataset.idx, 10);
        this.selectOption(idx, btn);
      });
    });

    const nextBtn = this.container.querySelector("#btn-sprint-next");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        sound.playClick();
        this.loadQuestion(this.currentIndex + 1);
      });
    }

    // Поддержка горячих клавиш 1, 2, 3 для молниеносного ответа с клавиатуры
    this.keyHandler = (e) => {
      if (this.isAnswered) return;
      if (["1", "2", "3"].includes(e.key)) {
        const num = parseInt(e.key, 10) - 1;
        const btn = btns[num];
        if (btn) this.selectOption(num, btn);
      }
    };
    window.addEventListener("keydown", this.keyHandler, { once: true });
  }

  selectOption(idx, buttonEl) {
    this.clearTimer();
    this.isAnswered = true;
    const task = this.getCurrentTask();
    const chosen = this.shuffledOptions[idx];
    const feedbackEl = this.container.querySelector("#sprint-feedback");
    const nextBtn = this.container.querySelector("#btn-sprint-next");

    if (chosen.correct) {
      this.combo += 1;
      this.score += 10 * this.combo;
      sound.playSuccess();
      state.addXP(15 + this.combo * 2);
      buttonEl.classList.add("sprint-correct");

      // Озвучиваем правильный ответ
      speech.speak(chosen.text);

      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-success">
          <div class="feedback-title">⚡ Молниеносно! Комбо x${this.combo}</div>
          <p>💡 <em>${task.ruleTip}</em></p>
        </div>
      `;

      // При высоком темпе автоматически переключаем через 1.2 секунды
      setTimeout(() => {
        if (this.currentIndex + 1 < SPRINT_TASKS.length) {
          this.loadQuestion(this.currentIndex + 1);
        } else {
          if (nextBtn) nextBtn.classList.remove("hidden");
        }
      }, 1200);
    } else {
      this.combo = 0;
      sound.playError();
      state.registerError();
      buttonEl.classList.add("sprint-wrong");

      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-error">
          <div class="feedback-title">Стоп! Ошибка сбила комбо.</div>
          <p>💡 Подсказка: ${task.ruleTip}</p>
        </div>
      `;

      if (nextBtn) nextBtn.classList.remove("hidden");
    }
  }

  handleTimeout() {
    this.isAnswered = true;
    this.combo = 0;
    sound.playError();
    state.registerError();
    const task = this.getCurrentTask();
    const feedbackEl = this.container.querySelector("#sprint-feedback");
    const nextBtn = this.container.querySelector("#btn-sprint-next");

    feedbackEl.innerHTML = `
      <div class="feedback-box feedback-error">
        <div class="feedback-title">⏰ Время вышло! Внутренний переводчик победил.</div>
        <p>💡 Подсказка: ${task.ruleTip}</p>
      </div>
    `;

    if (nextBtn) nextBtn.classList.remove("hidden");
  }
}


/* --- js/modes/scenarios.js --- */
// Режим «Ролевые диалоги B1» (Roleplay Scenarios & Live AI Partner)
// 1. Сюжетные сценарии (13 готовых тренажеров)
// 2. Живой AI-собеседник (LM Studio)
// 3. Интерактивный перевод слов по наведению / клику (Dictionary)
// 4. Мягкий доброжелательный AI-наставник речи (Coach Review)







class ScenariosMode {
  constructor(containerEl) {
    this.container = containerEl;

    // Режим подвкладки: "static" (готовые сценарии) или "ai" (живой LM Studio)
    this.activeSubView = localStorage.getItem("my_english_scenarios_subview") || "static";

    // Состояние готовых сценариев
    this.scenarioIndex = 0;
    this.stepIndex = 0;
    this.staticHistory = [];
    this.isAnswering = false;
    this.currentOptions = [];
    this.lastRenderedStepKey = null;
    const savedEcho = localStorage.getItem("my_english_echo_reply");
    this.echoUserReply = savedEcho !== null ? savedEcho === "true" : false;

    // Состояние живого AI-диалога
    this.aiPersonaIndex = 0;
    this.aiMessages = [];
    this.aiIsGenerating = false;
    this.aiSettingsOpen = false;
    this.aiConnection = { checked: false, ok: false, error: null, model: "" };
  }

  init() {
    if (this.activeSubView === "ai") {
      this.initAIMode();
    } else {
      this.initStaticMode();
    }
  }

  initStaticMode() {
    this.scenarioIndex = 0;
    this.stepIndex = 0;
    this.staticHistory = [];
    this.isAnswering = false;
    this.lastRenderedStepKey = null;
    this.render();
    this.speakCurrentNpc();
  }

  async initAIMode() {
    const persona = AI_PERSONAS[this.aiPersonaIndex];
    if (this.aiMessages.length === 0) {
      this.aiMessages = [
        {
          role: "assistant",
          text: persona.greeting,
          coachTip: null,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ];
    }
    this.render();

    // Автоматическая проверка связи с локальным сервером LM Studio
    this.checkLLMStatus();

    // Озвучиваем приветствие если автоозвучка включена
    if (llmClient.autoSpeak && this.aiMessages.length === 1) {
      setTimeout(() => {
        speech.speakAs(persona.greeting, persona.name);
      }, 400);
    }
  }

  async checkLLMStatus() {
    const res = await llmClient.checkConnection();
    this.aiConnection = {
      checked: true,
      ok: res.ok,
      error: res.error || null,
      model: res.currentModel || ""
    };
    this.updateStatusBadge();
  }

  updateStatusBadge() {
    const badge = this.container.querySelector("#llm-status-badge");
    if (!badge) return;

    if (!this.aiConnection.checked) {
      badge.className = "llm-status-pill status-checking";
      badge.innerHTML = `<span class="dot"></span> Подключение...`;
    } else if (this.aiConnection.ok) {
      badge.className = "llm-status-pill status-online";
      badge.title = `LM Studio активен (${llmClient.endpoint})`;
      const shortCoach = (llmClient.coachModel || "Gemma").split("-")[0];
      badge.innerHTML = `<span class="dot"></span> 2x AI: <strong>${this.aiConnection.model}</strong> + <strong>${shortCoach}</strong>`;
    } else {
      badge.className = "llm-status-pill status-offline";
      badge.title = this.aiConnection.error || "Не подключен";
      badge.innerHTML = `<span class="dot"></span> LM Studio: Офлайн (клик для настройки)`;
    }
  }

  switchSubView(view) {
    this.activeSubView = view;
    localStorage.setItem("my_english_scenarios_subview", view);
    sound.playClick();
    this.init();
  }

  render() {
    this.container.innerHTML = `
      <!-- ВЕРХНИЙ ПЕРЕКЛЮЧАТЕЛЬ ПОДРЕЖИМОВ -->
      <div class="scenarios-main-nav">
        <button class="sc-main-tab-btn ${this.activeSubView === "static" ? "active" : ""}" id="btn-tab-static">
          <span>📚</span> Сюжетные сценарии (${ROLEPLAY_SCENARIOS.length})
        </button>
        <button class="sc-main-tab-btn ${this.activeSubView === "ai" ? "active" : ""}" id="btn-tab-ai">
          <span>🤖</span> Живой AI-собеседник (LM Studio)
          <span class="ai-spark-tag">LIVE</span>
        </button>
      </div>

      <div id="subview-container">
        ${this.activeSubView === "ai" ? this.renderAIContent() : this.renderStaticContent()}
      </div>

      ${this.aiSettingsOpen ? this.renderSettingsModal() : ""}
    `;

    this.bindCommonEvents();
    if (this.activeSubView === "ai") {
      this.bindAIEvents();
      if (this.aiSettingsOpen) {
        this.bindSettingsEvents();
      }
      this.updateStatusBadge();
    } else {
      this.bindStaticEvents();
    }
  }

  bindCommonEvents() {
    const btnStatic = this.container.querySelector("#btn-tab-static");
    const btnAI = this.container.querySelector("#btn-tab-ai");

    if (btnStatic) btnStatic.addEventListener("click", () => this.switchSubView("static"));
    if (btnAI) btnAI.addEventListener("click", () => this.switchSubView("ai"));
  }

  // ==========================================
  // 1. СТАТИЧЕСКИЕ ГОТОВЫЕ СЦЕНАРИИ
  // ==========================================

  getCurrentScenario() {
    return ROLEPLAY_SCENARIOS[this.scenarioIndex];
  }

  getCurrentStep() {
    const sc = this.getCurrentScenario();
    return sc ? sc.steps[this.stepIndex] : null;
  }

  speakCurrentNpc() {
    const sc = this.getCurrentScenario();
    const step = this.getCurrentStep();
    if (sc && step) {
      setTimeout(() => {
        speech.speakAs(step.npcSay, sc.character);
      }, 350);
    }
  }

  renderStaticContent() {
    const sc = this.getCurrentScenario();
    const step = this.getCurrentStep();
    if (!sc) return "";

    this.isAnswering = false;

    // Перемешиваем варианты ответов при каждом новом шаге
    const stepKey = `${this.scenarioIndex}_${this.stepIndex}`;
    if (step && this.lastRenderedStepKey !== stepKey) {
      this.lastRenderedStepKey = stepKey;
      this.currentOptions = step.options
        .map((opt) => ({ ...opt }))
        .sort(() => Math.random() - 0.5);
    }

    return `
      <div class="mode-header">
        <div class="mode-badge">🎭 Ролевой диалог B1</div>
        <div class="scenario-selector">
          ${ROLEPLAY_SCENARIOS.map(
            (s, idx) => `
            <button class="sc-tab-btn ${idx === this.scenarioIndex ? "sc-tab-active" : ""}" data-sc-idx="${idx}">
              ${s.title}
            </button>
          `
          ).join("")}
        </div>
      </div>

      <div class="task-card scenario-card">
        <div class="scenario-info-bar">
          <div class="sc-char-badge">👤 Собеседник: <strong>${sc.character}</strong></div>
          <div class="sc-desc">${sc.description}</div>
          <div class="sc-info-controls">
            <span class="sc-progress">Реплика ${this.stepIndex + 1} из ${sc.steps.length}</span>
            <label class="echo-toggle-wrap" title="Показывать перевод слов при наведении курсора">
              <input type="checkbox" id="chk-static-dict" ${dictionary.enabled ? "checked" : ""}>
              <span class="echo-label-text">🔤 Словарь</span>
            </label>
            <label class="echo-toggle-wrap" title="Если включено, робот будет зачитывать вслух ваш ответ">
              <input type="checkbox" id="chk-echo-reply" ${this.echoUserReply ? "checked" : ""}>
              <span class="echo-label-text">🔊 Дублировать ответ</span>
            </label>
          </div>
        </div>

        <!-- ДИАЛОГОВЫЙ ЧАТ -->
        <div class="chat-dialog-box" id="chat-box">
          ${this.staticHistory
            .map(
              (msg) => `
            <div class="chat-bubble ${msg.sender === "npc" ? "bubble-npc" : "bubble-user"}">
              <div class="bubble-sender">${msg.sender === "npc" ? sc.character : "Вы"}</div>
              <div class="bubble-text">${msg.sender === "npc" ? dictionary.wrapWords(msg.text) : msg.text}</div>
            </div>
          `
            )
            .join("")}

          <!-- ТЕКУЩАЯ РЕПЛИКА СОБЕСЕДНИКА -->
          ${
            step
              ? `
            <div class="chat-bubble bubble-npc bubble-current">
              <div class="bubble-sender">${sc.character} <button class="btn-voice-mini" id="btn-replay-npc" title="Послушать голос персонажа">🔊</button></div>
              <div class="bubble-text">«${dictionary.wrapWords(step.npcSay)}»</div>
              <div class="bubble-ru">(${step.npcRu})</div>
            </div>
          `
              : ""
          }
        </div>

        ${
          step
            ? `
          <div class="user-reply-area">
            <div class="user-mission-box">
              <div class="mission-top-row">
                <span class="mission-tag">ВАША РЕПЛИКА:</span>
                <button class="btn-sc-mic" id="btn-sc-mic" title="Сказать фразу в микрофон">
                  <span class="mic-icon">🎙️</span> Ответить голосом
                </button>
              </div>
              <div class="mission-ru-text">${step.userTaskRu}</div>
              <div class="mission-hint">💡 <em>${step.hint}</em></div>
            </div>

            <div class="reply-options-list" id="reply-options-list">
              ${this.currentOptions
                .map(
                  (opt, idx) => `
                <button class="reply-opt-btn" data-opt-idx="${idx}">
                  <span class="opt-indicator"></span>
                  <span class="opt-body">${opt.text}</span>
                </button>
              `
                )
                .join("")}
            </div>
          </div>
        `
            : `
          <div class="scenario-completed-box">
            <div class="completed-badge">🎉 ДИАЛОГ УСПЕШНО ЗАВЕРШЁН!</div>
            <p>Вы уверенно провели разговор по всем правилам грамматики B1.</p>
            <button class="btn btn-primary" id="btn-next-scenario">Перейти к следующему диалогу ➔</button>
          </div>
        `
        }

        <div class="feedback-area" id="scenario-feedback"></div>
      </div>
    `;
  }

  bindStaticEvents() {
    const sc = this.getCurrentScenario();

    // Подключаем словарь наведения к окну чата
    const chatBox = this.container.querySelector("#chat-box");
    if (chatBox) {
      dictionary.bindContainer(chatBox);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    this.container.querySelectorAll(".sc-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.scenarioIndex = parseInt(btn.dataset.scIdx, 10);
        this.stepIndex = 0;
        this.staticHistory = [];
        this.lastRenderedStepKey = null;
        sound.playClick();
        this.render();
        this.speakCurrentNpc();
      });
    });

    const replayBtn = this.container.querySelector("#btn-replay-npc");
    if (replayBtn) {
      replayBtn.addEventListener("click", () => {
        const step = this.getCurrentStep();
        if (step && sc) speech.speakAs(step.npcSay, sc.character);
      });
    }

    const dictCheckbox = this.container.querySelector("#chk-static-dict");
    if (dictCheckbox) {
      dictCheckbox.addEventListener("change", (e) => {
        dictionary.enabled = e.target.checked;
        localStorage.setItem("my_english_dict_enabled", dictionary.enabled ? "true" : "false");
        sound.playClick();
      });
    }

    const echoCheckbox = this.container.querySelector("#chk-echo-reply");
    if (echoCheckbox) {
      echoCheckbox.addEventListener("change", (e) => {
        this.echoUserReply = e.target.checked;
        localStorage.setItem("my_english_echo_reply", this.echoUserReply ? "true" : "false");
        sound.playClick();
      });
    }

    const micBtn = this.container.querySelector("#btn-sc-mic");
    if (micBtn) {
      micBtn.addEventListener("click", () => this.handleStaticMicReply());
    }

    this.container.querySelectorAll(".reply-opt-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (this.isAnswering) return;
        const idx = parseInt(btn.dataset.optIdx, 10);
        this.handleStaticReply(idx, btn);
      });
    });

    const nextScBtn = this.container.querySelector("#btn-next-scenario");
    if (nextScBtn) {
      nextScBtn.addEventListener("click", () => {
        this.scenarioIndex = (this.scenarioIndex + 1) % ROLEPLAY_SCENARIOS.length;
        this.stepIndex = 0;
        this.staticHistory = [];
        this.lastRenderedStepKey = null;
        sound.playClick();
        this.render();
        this.speakCurrentNpc();
      });
    }
  }

  handleStaticMicReply() {
    const micBtn = this.container.querySelector("#btn-sc-mic");
    const feedbackEl = this.container.querySelector("#scenario-feedback");
    const step = this.getCurrentStep();
    if (!step) return;

    micBtn.classList.add("mic-recording");
    micBtn.innerHTML = `<span>🔴 Слушаю вас...</span>`;

    speech.startListening(
      (transcript) => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span class="mic-icon">🎙️</span> Ответить голосом`;

        const cleanSaid = transcript.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
        const correctOptIdx = this.currentOptions.findIndex((o) => o.correct);
        const correctOpt = this.currentOptions[correctOptIdx];
        const cleanExpected = correctOpt.text.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();

        const btn = this.container.querySelector(`.reply-opt-btn[data-opt-idx="${correctOptIdx}"]`);

        if (cleanSaid === cleanExpected || cleanSaid.includes(cleanExpected.slice(0, 15))) {
          if (btn) this.handleStaticReply(correctOptIdx, btn, true);
        } else {
          sound.playError();
          feedbackEl.innerHTML = `
            <div class="feedback-box feedback-error">
              <div class="feedback-title">🎙️ Вы сказали: «${transcript}»</div>
              <p>Собеседник ожидал: <strong>${correctOpt.text}</strong>. Попробуйте еще раз или выберите вариант кликом!</p>
            </div>
          `;
        }
      },
      (error) => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span class="mic-icon">🎙️</span> Ответить голосом`;
        if (feedbackEl) {
          feedbackEl.innerHTML = `<div class="feedback-box feedback-error"><p>🎙️ ${error}</p></div>`;
        }
      },
      () => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span class="mic-icon">🎙️</span> Ответить голосом`;
      }
    );
  }

  handleStaticReply(optIdx, btn, fromMic = false) {
    const step = this.getCurrentStep();
    const chosen = this.currentOptions[optIdx];
    const feedbackEl = this.container.querySelector("#scenario-feedback");

    if (chosen.correct) {
      this.isAnswering = true;
      sound.playSuccess();
      state.addXP(fromMic ? 40 : 30);

      btn.classList.add("reply-correct");
      const indicator = btn.querySelector(".opt-indicator");
      if (indicator) indicator.innerHTML = "✓";

      this.container.querySelectorAll(".reply-opt-btn").forEach((b) => {
        if (b !== btn) b.classList.add("reply-disabled");
      });

      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-success">
          <div class="feedback-title">🎯 Точный ответ! Собеседник понял вас с полуслова:</div>
          <p>«${chosen.text}»</p>
        </div>
      `;

      if (this.echoUserReply) {
        speech.speak(chosen.text, 0.95, () => {
          setTimeout(() => this.advanceStaticDialogue(step, chosen), 300);
        });
      } else {
        setTimeout(() => this.advanceStaticDialogue(step, chosen), 450);
      }
    } else {
      sound.playError();
      state.registerError();
      btn.classList.add("reply-wrong");
      const indicator = btn.querySelector(".opt-indicator");
      if (indicator) indicator.innerHTML = "✕";

      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-error">
          <div class="feedback-title">Собеседник почувствовал ошибку в грамматике!</div>
          <p>💡 Подсказка: ${step.hint}</p>
        </div>
      `;
    }
  }

  advanceStaticDialogue(step, chosen) {
    this.staticHistory.push({ sender: "npc", text: step.npcSay });
    this.staticHistory.push({ sender: "user", text: chosen.text });
    this.stepIndex += 1;
    this.render();
    this.speakCurrentNpc();
  }

  // ==========================================
  // 2. ЖИВОЙ ИНТЕРАКТИВНЫЙ AI-РЕЖИМ (LM STUDIO)
  // ==========================================

  renderAIContent() {
    const currentPersona = AI_PERSONAS[this.aiPersonaIndex];

    return `
      <div class="ai-roleplay-wrapper">
        <!-- ВЕРХНЯЯ ПАНЕЛЬ ПЕРСОНАЖЕЙ И СТАТУСА LLM -->
        <div class="ai-top-bar">
          <div class="ai-persona-picker">
            ${AI_PERSONAS.map(
              (p, idx) => `
              <button class="ai-persona-btn ${idx === this.aiPersonaIndex ? "active" : ""}" data-persona-idx="${idx}">
                <span class="p-avatar">${p.avatar}</span>
                <span class="p-name">${p.name}</span>
              </button>
            `
            ).join("")}
          </div>

          <div class="ai-meta-controls">
            <!-- ТУМБЛЕРЫ БЫСТРОГО ДОСТУПА: СЛОВАРЬ И НАСТАВНИК -->
            <button class="btn-toggle-pill ${dictionary.enabled ? "pill-active" : ""}" id="btn-toggle-dict" title="Подсвечивать перевод слов при наведении курсора">
              🔤 Словарь: ${dictionary.enabled ? "ВКЛ" : "ВЫКЛ"}
            </button>
            <button class="btn-toggle-pill ${llmClient.coachEnabled ? "pill-active" : ""}" id="btn-toggle-coach" title="Кликните для смены режима строгости (🟢 Мягкий B1 / 🟡 Баланс / 🔴 Строгий)">
              🎓 ${llmClient.coachEnabled ? llmClient.getCoachModeInfo().label : "Наставник: ВЫКЛ"}
            </button>

            <button class="llm-status-pill" id="llm-status-badge" title="Статус подключения к LM Studio">
              <span class="dot"></span> Подключение...
            </button>
            <button class="btn-icon-subtle" id="btn-open-settings" title="Настройки подключения (порт, модель, CORS)">
              ⚙️ Настройки
            </button>
            <button class="btn-icon-subtle" id="btn-restart-ai" title="Начать диалог с начала">
              🔄 Сброс
            </button>
          </div>
        </div>

        <!-- КАРТОЧКА ПЕРСОНАЖА -->
        <div class="ai-persona-hero">
          <div class="hero-avatar">${currentPersona.avatar}</div>
          <div class="hero-info">
            <div class="hero-title">${currentPersona.name}</div>
            <div class="hero-role">${currentPersona.role}</div>
          </div>
          <div class="hero-engine-tags">
            <div class="hero-engine-badge" title="Модель для ведения диалога">
              <span class="tag-role">💬 Собеседник:</span>
              <span class="tag-val">${llmClient.selectedModel || "hy-mt1.5-1.8b"}</span>
            </div>
            <div class="hero-engine-badge" title="Выделенная модель для мягкого разбора речи">
              <span class="tag-role">🎓 Наставник:</span>
              <span class="tag-val">${llmClient.coachModel || "gemma-3-4b-it-qat"}</span>
            </div>
          </div>
        </div>

        <!-- ЕСЛИ ОФЛАЙН: ИНФОРМАЦИОННЫЙ БАННЕР -->
        ${
          this.aiConnection.checked && !this.aiConnection.ok
            ? `
          <div class="ai-offline-banner">
            <div class="banner-title">⚠️ LM Studio не отвечает (${llmClient.endpoint})</div>
            <p>Чтобы запустить живой диалог:</p>
            <ol>
              <li>Откройте <strong>LM Studio</strong> на вашем компьютере.</li>
              <li>Перейдите во вкладку <strong>Local Server</strong> (значок <code>&lt;-&gt;</code> в левой панели).</li>
              <li>Выберите и загрузите любую модель (например, <em>hy-mt1.5-1.8b</em>, <em>Qwen 2.5</em> или <em>Llama 3.2</em>).</li>
              <li>Нажмите зелёную кнопку <strong>«Start Server»</strong> (порт <code>1234</code>).</li>
              <li><strong>ВАЖНО:</strong> Включите тумблер <strong>«Enable CORS»</strong> в настройках сервера LM Studio, чтобы браузер мог безопасно отправлять реплики!</li>
            </ol>
            <div class="banner-actions">
              <button class="btn btn-primary btn-sm" id="btn-recheck-connection">🔄 Проверить подключение</button>
              <button class="btn btn-secondary btn-sm" id="btn-banner-settings">⚙️ Изменить адрес / порт</button>
            </div>
          </div>
        `
            : ""
        }

        <!-- ЧАТ-ОКНО ДИАЛОГА -->
        <div class="ai-chat-box" id="ai-chat-box">
          ${this.aiMessages
            .map(
              (msg, idx) => `
            <div class="ai-chat-row ${msg.role === "assistant" ? "row-assistant" : "row-user"}">
              <div class="ai-msg-avatar">${msg.role === "assistant" ? currentPersona.avatar : "👤"}</div>
              <div class="ai-msg-content">
                <div class="ai-msg-header">
                  <span class="ai-msg-author">${msg.role === "assistant" ? currentPersona.name : "Вы"}</span>
                  <span class="ai-msg-time">${msg.time || ""}</span>
                  ${
                    msg.role === "assistant"
                      ? `
                    <button class="btn-voice-mini btn-speak-msg" data-msg-idx="${idx}" title="Озвучить реплику">🔊</button>
                  `
                      : ""
                  }
                </div>
                <div class="ai-msg-bubble">
                  ${msg.role === "assistant" ? dictionary.wrapWords(msg.text) : msg.text}
                </div>
                ${
                  msg.coachTip
                    ? `
                  <div class="ai-coach-tip-card">
                    <div class="coach-tip-header">
                      <span class="coach-icon">💡</span>
                      <strong>Совет тренера Драгункина:</strong>
                    </div>
                    <div class="coach-tip-body">${msg.coachTip}</div>
                  </div>
                `
                    : ""
                }
                ${
                  msg.review
                    ? `
                  <div class="user-coach-review">
                    <div class="coach-review-header">
                      <span class="badge-clarity">${msg.review.clarity}</span>
                      <span class="coach-tag">🎓 Наставник (${(llmClient.coachModel || "Gemma").split("-")[0].toUpperCase()})</span>
                    </div>
                    ${
                      msg.review.naturalVersion
                        ? `
                      <div class="coach-natural-phrase">💬 Как звучит ещё естественнее: <strong>«${msg.review.naturalVersion}»</strong></div>
                    `
                        : ""
                    }
                    <div class="coach-friendly-tip">💡 ${msg.review.friendlyTip}</div>
                  </div>
                `
                    : ""
                }
              </div>
            </div>
          `
            )
            .join("")}

          ${
            this.aiIsGenerating
              ? `
            <div class="ai-chat-row row-assistant row-generating">
              <div class="ai-msg-avatar">${currentPersona.avatar}</div>
              <div class="ai-msg-content">
                <div class="ai-msg-bubble generating-bubble">
                  <span class="typing-dot"></span>
                  <span class="typing-dot"></span>
                  <span class="typing-dot"></span>
                  <span class="typing-text">${currentPersona.name.split(" ")[0]} печатает ответ...</span>
                </div>
              </div>
            </div>
          `
              : ""
          }
        </div>

        <!-- ПАНЕЛЬ ВВОДА ПОЛЬЗОВАТЕЛЯ -->
        <div class="ai-input-wrapper">
          <div class="ai-input-controls">
            <button class="btn-ai-mic" id="btn-ai-mic" title="Нажмите и говорите по-английски в микрофон">
              <span class="mic-icon">🎙️</span> Говорить
            </button>
            <div class="input-field-wrap">
              <textarea
                id="ai-user-input"
                class="ai-textarea"
                rows="1"
                placeholder="Напишите ответ или нажмите «Говорить» (Enter — отправить, Shift+Enter — перенос)..."
              ></textarea>
            </div>
            <button class="btn-ai-send" id="btn-ai-send" ${this.aiIsGenerating ? "disabled" : ""} title="Отправить сообщение">
              <span>➔</span>
            </button>
          </div>
          <div class="ai-input-hint">
            💡 <em>Наводите курсор на любые незнакомые слова в ответах для перевода. А мягкий наставник аккуратно подскажет, как сказать ещё лучше!</em>
          </div>
        </div>
      </div>
    `;
  }

  bindAIEvents() {
    const chatBox = this.container.querySelector("#ai-chat-box");
    if (chatBox) {
      dictionary.bindContainer(chatBox);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Быстрый переключатель словаря
    const dictPill = this.container.querySelector("#btn-toggle-dict");
    if (dictPill) {
      dictPill.addEventListener("click", () => {
        dictionary.toggleEnabled();
        sound.playClick();
        this.render();
      });
    }

    // Быстрый переключатель режима наставника (циклическая смена строгости)
    const coachPill = this.container.querySelector("#btn-toggle-coach");
    if (coachPill) {
      coachPill.addEventListener("click", () => {
        if (!llmClient.coachEnabled) {
          llmClient.coachEnabled = true;
          llmClient.coachMode = "gentle";
        } else if (llmClient.coachMode === "gentle") {
          llmClient.coachMode = "balanced";
        } else if (llmClient.coachMode === "balanced") {
          llmClient.coachMode = "strict";
        } else {
          llmClient.coachEnabled = false;
        }
        localStorage.setItem("my_english_llm_coach", llmClient.coachEnabled ? "true" : "false");
        localStorage.setItem("my_english_coach_mode", llmClient.coachMode);
        sound.playClick();
        this.render();
      });
    }

    // Смена персонажа
    this.container.querySelectorAll(".ai-persona-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.personaIdx, 10);
        if (idx === this.aiPersonaIndex) return;
        this.aiPersonaIndex = idx;
        const persona = AI_PERSONAS[idx];
        this.aiMessages = [
          {
            role: "assistant",
            text: persona.greeting,
            coachTip: null,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          }
        ];
        sound.playClick();
        this.render();
        if (llmClient.autoSpeak) {
          speech.speakAs(persona.greeting, persona.name);
        }
      });
    });

    // Озвучка любой реплики из чата
    this.container.querySelectorAll(".btn-speak-msg").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.msgIdx, 10);
        const msg = this.aiMessages[idx];
        const persona = AI_PERSONAS[this.aiPersonaIndex];
        if (msg) speech.speakAs(msg.text, persona.name);
      });
    });

    // Кнопка рестарта
    const restartBtn = this.container.querySelector("#btn-restart-ai");
    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        if (confirm("Очистить историю текущего диалога и начать разговор заново?")) {
          const persona = AI_PERSONAS[this.aiPersonaIndex];
          this.aiMessages = [
            {
              role: "assistant",
              text: persona.greeting,
              coachTip: null,
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            }
          ];
          sound.playClick();
          this.render();
          if (llmClient.autoSpeak) {
            speech.speakAs(persona.greeting, persona.name);
          }
        }
      });
    }

    // Кнопка настроек
    const settingsBtn = this.container.querySelector("#btn-open-settings");
    const statusBadge = this.container.querySelector("#llm-status-badge");
    const bannerSettingsBtn = this.container.querySelector("#btn-banner-settings");

    const openSettingsHandler = () => {
      this.aiSettingsOpen = true;
      this.render();
    };

    if (settingsBtn) settingsBtn.addEventListener("click", openSettingsHandler);
    if (statusBadge) statusBadge.addEventListener("click", openSettingsHandler);
    if (bannerSettingsBtn) bannerSettingsBtn.addEventListener("click", openSettingsHandler);

    // Кнопка перепроверки соединения из баннера
    const recheckBtn = this.container.querySelector("#btn-recheck-connection");
    if (recheckBtn) {
      recheckBtn.addEventListener("click", async () => {
        recheckBtn.innerText = "Проверка...";
        await this.checkLLMStatus();
        this.render();
      });
    }

    // Ввод текста и отправка
    const textarea = this.container.querySelector("#ai-user-input");
    const sendBtn = this.container.querySelector("#btn-ai-send");

    if (textarea) {
      textarea.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          this.handleSendAIMessage();
        }
      });

      // Авто-рост высоты textarea
      textarea.addEventListener("input", () => {
        textarea.style.height = "auto";
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
      });
    }

    if (sendBtn) {
      sendBtn.addEventListener("click", () => this.handleSendAIMessage());
    }

    // Голосовой ввод
    const micBtn = this.container.querySelector("#btn-ai-mic");
    if (micBtn) {
      micBtn.addEventListener("click", () => this.handleAIMic());
    }
  }

  handleAIMic() {
    const micBtn = this.container.querySelector("#btn-ai-mic");
    const textarea = this.container.querySelector("#ai-user-input");
    if (!micBtn || !textarea) return;

    micBtn.classList.add("mic-recording");
    micBtn.innerHTML = `<span>🔴 Слушаю...</span>`;

    speech.startListening(
      (transcript) => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span class="mic-icon">🎙️</span> Говорить`;

        // Вставляем транскрипцию в поле ввода
        textarea.value = (textarea.value ? textarea.value + " " : "") + transcript;
        textarea.focus();
        textarea.style.height = "auto";
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
        sound.playClick();
      },
      (err) => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span class="mic-icon">🎙️</span> Говорить`;
        alert(`Ошибка распознавания речи: ${err}`);
      },
      () => {
        micBtn.classList.remove("mic-recording");
        micBtn.innerHTML = `<span class="mic-icon">🎙️</span> Говорить`;
      }
    );
  }

  async handleSendAIMessage() {
    if (this.aiIsGenerating) return;
    const textarea = this.container.querySelector("#ai-user-input");
    if (!textarea) return;

    const userText = textarea.value.trim();
    if (!userText) return;

    textarea.value = "";
    textarea.style.height = "auto";

    const persona = AI_PERSONAS[this.aiPersonaIndex];
    const nowTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Добавляем сообщение пользователя в историю
    const userMsgObj = {
      role: "user",
      text: userText,
      time: nowTime,
      review: null
    };
    this.aiMessages.push(userMsgObj);

    this.aiIsGenerating = true;
    sound.playClick();
    this.render();

    // Запускаем фоновый доброжелательный разбор фразы наставником (не блокируя генерацию реплики собеседника)
    if (llmClient.coachEnabled) {
      const lastNpcMsg = this.aiMessages.filter((m) => m.role === "assistant").pop();
      const lastContext = lastNpcMsg ? lastNpcMsg.text : "";
      llmClient.reviewUserSpeech(userText, lastContext).then((rev) => {
        if (rev) {
          userMsgObj.review = rev;
          // Обновляем отображение, чтобы показать карточку наставника
          this.render();
        }
      });
    }

    // Формируем историю сообщений для OpenAI API
    const apiMessages = [
      { role: "system", content: persona.systemPrompt }
    ];

    // Берем последние 8 сообщений контекста диалога
    const recentHistory = this.aiMessages.slice(-8);
    for (const m of recentHistory) {
      apiMessages.push({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.text
      });
    }

    try {
      const response = await llmClient.sendMessage(apiMessages);
      this.aiIsGenerating = false;

      this.aiMessages.push({
        role: "assistant",
        text: response.text,
        coachTip: response.coachTip,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      });

      state.addXP(30);
      sound.playSuccess();
      this.render();

      // Озвучиваем реплику голосом персонажа (без технического совета)
      if (llmClient.autoSpeak) {
        speech.speakAs(response.text, persona.name);
      }
    } catch (err) {
      this.aiIsGenerating = false;
      sound.playError();
      alert(`Ошибка обращения к LM Studio: ${err.message}`);
      this.render();
    }
  }

  // ==========================================
  // 3. ОКНО НАСТРОЕК LM STUDIO
  // ==========================================

  renderSettingsModal() {
    return `
      <div class="modal-backdrop" id="modal-settings-backdrop">
        <div class="modal-card llm-settings-card">
          <div class="modal-header">
            <h3>⚙️ Настройки подключения к LM Studio</h3>
            <button class="btn-close-modal" id="btn-close-settings">×</button>
          </div>

          <div class="modal-body">
            <div class="form-group">
              <label for="cfg-endpoint">Адрес локального API (Endpoint URL):</label>
              <input
                type="text"
                id="cfg-endpoint"
                class="form-input"
                value="${llmClient.endpoint}"
                placeholder="http://127.0.0.1:1234"
              >
              <small class="form-hint">LM Studio: <code>http://127.0.0.1:1234</code>. Модель: <code>hy-mt1.5-1.8b</code></small>
            </div>

            <div class="form-row-actions">
              <button class="btn btn-secondary btn-sm" id="btn-modal-test-conn">
                🔍 Проверить подключение и список моделей
              </button>
              <span id="modal-conn-result" class="conn-test-label"></span>
            </div>

            <div class="form-group">
              <label for="cfg-model">💬 Модель собеседника (Диалог):</label>
              <select id="cfg-model" class="form-input">
                ${
                  llmClient.availableModels.length > 0
                    ? llmClient.availableModels
                        .map(
                          (m) => `
                    <option value="${m}" ${m === llmClient.selectedModel ? "selected" : ""}>${m}</option>
                  `
                        )
                        .join("")
                    : `
                  <option value="${llmClient.selectedModel || ""}">
                    ${llmClient.selectedModel || "hy-mt1.5-1.8b"}
                  </option>
                `
                }
              </select>
              <small class="form-hint">Отвечает за реплики персонажей (Marcus, Elena, Alex и др.).</small>
            </div>

            <div class="form-group">
              <label for="cfg-coach-model">🎓 Модель наставника (Коуч речи):</label>
              <select id="cfg-coach-model" class="form-input">
                ${
                  llmClient.availableModels.length > 0
                    ? llmClient.availableModels
                        .map(
                          (m) => `
                    <option value="${m}" ${m === llmClient.coachModel ? "selected" : ""}>${m}</option>
                  `
                        )
                        .join("")
                    : `
                  <option value="${llmClient.coachModel || ""}">
                    ${llmClient.coachModel || "gemma-3-4b-it-qat"}
                  </option>
                `
                }
              </select>
              <small class="form-hint">Вторая параллельная модель, которая деликатно подсказывает, как улучшить фразу.</small>
            </div>

            <div class="form-group">
              <label for="cfg-temp">Температура креативности (${llmClient.temperature}):</label>
              <input
                type="range"
                id="cfg-temp"
                min="0.2"
                max="1.2"
                step="0.05"
                value="${llmClient.temperature}"
                class="form-range"
              >
              <div class="range-labels">
                <span>0.2 (Строго по фактам)</span>
                <span>0.7 (Баланс B1)</span>
                <span>1.2 (Креативно)</span>
              </div>
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" id="cfg-autospeak" ${llmClient.autoSpeak ? "checked" : ""}>
                <span>Автоматически озвучивать реплики персонажей голосом</span>
              </label>
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" id="cfg-coach" ${llmClient.coachEnabled ? "checked" : ""}>
                <span>🎓 Включить AI-наставника (разбор и поддержка)</span>
              </label>
            </div>

            <div class="form-group" style="margin-left: 20px;">
              <label for="cfg-coach-mode">🎯 Стиль работы наставника:</label>
              <select id="cfg-coach-mode" class="form-input">
                <option value="gentle" ${llmClient.coachMode === "gentle" ? "selected" : ""}>
                  🟢 Мягкий B1 (исправляет только грубые ошибки, сохраняя ваши слова)
                </option>
                <option value="balanced" ${llmClient.coachMode === "balanced" ? "selected" : ""}>
                  🟡 Баланс B1+ (подсказывает естественные разговорные связки B1)
                </option>
                <option value="strict" ${llmClient.coachMode === "strict" ? "selected" : ""}>
                  🔴 Строгий B2 (детальная шлифовка профессиональной речи и идиом)
                </option>
              </select>
              <small class="form-hint">В режиме «Мягкий B1» наставник не придирается к мелочам, бережёт вашу мотивацию и даёт пояснения строго на русском языке.</small>
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" id="cfg-dict" ${dictionary.enabled ? "checked" : ""}>
                <span>🔤 Словарь: переводить незнакомые слова при наведении курсора</span>
              </label>
            </div>

            <div class="llm-guide-box">
              <div class="guide-title">📌 Как включить CORS в LM Studio:</div>
              <p>1. Откройте LM Studio ➔ вкладка <strong>Local Server</strong> (значок <code>&lt;-&gt;</code>).</p>
              <p>2. В правой панели найдите блок <strong>«CORS»</strong> и поставьте галочку <strong>«Enable CORS»</strong>.</p>
              <p>3. Нажмите <strong>«Start Server»</strong>. Теперь веб-браузер сможет напрямую вести живой диалог!</p>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" id="btn-cancel-settings">Отмена</button>
            <button class="btn btn-primary" id="btn-save-settings">Сохранить настройки</button>
          </div>
        </div>
      </div>
    `;
  }

  bindSettingsEvents() {
    const backdrop = this.container.querySelector("#modal-settings-backdrop");
    const closeBtn = this.container.querySelector("#btn-close-settings");
    const cancelBtn = this.container.querySelector("#btn-cancel-settings");
    const saveBtn = this.container.querySelector("#btn-save-settings");
    const testBtn = this.container.querySelector("#btn-modal-test-conn");
    const testResult = this.container.querySelector("#modal-conn-result");
    const tempInput = this.container.querySelector("#cfg-temp");
    const tempLabel = this.container.querySelector("label[for='cfg-temp']");

    const closeHandler = () => {
      this.aiSettingsOpen = false;
      this.render();
    };

    if (closeBtn) closeBtn.addEventListener("click", closeHandler);
    if (cancelBtn) cancelBtn.addEventListener("click", closeHandler);
    if (backdrop) {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) closeHandler();
      });
    }

    if (tempInput && tempLabel) {
      tempInput.addEventListener("input", (e) => {
        tempLabel.innerText = `Температура креативности (${e.target.value}):`;
      });
    }

    if (testBtn) {
      testBtn.addEventListener("click", async () => {
        const endpointInput = this.container.querySelector("#cfg-endpoint");
        const ep = endpointInput ? endpointInput.value.trim() : llmClient.endpoint;
        testBtn.innerText = "⏳ Проверка...";
        testResult.innerText = "";

        const tempClient = new (llmClient.constructor)();
        tempClient.endpoint = ep;
        const res = await tempClient.checkConnection();

        testBtn.innerText = "🔍 Проверить подключение";
        if (res.ok) {
          testResult.className = "conn-test-label text-success";
          testResult.innerText = `✓ Успешно! Доступно моделей: ${res.models.length}`;

          const modelSelect = this.container.querySelector("#cfg-model");
          const coachModelSelect = this.container.querySelector("#cfg-coach-model");
          if (res.models && res.models.length > 0) {
            if (modelSelect) {
              modelSelect.innerHTML = res.models
                .map((m) => `<option value="${m}" ${m === llmClient.selectedModel ? "selected" : ""}>${m}</option>`)
                .join("");
            }
            if (coachModelSelect) {
              coachModelSelect.innerHTML = res.models
                .map((m) => `<option value="${m}" ${m === llmClient.coachModel ? "selected" : ""}>${m}</option>`)
                .join("");
            }
          }
        } else {
          testResult.className = "conn-test-label text-error";
          testResult.innerText = `✕ ${res.error}`;
        }
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        const ep = this.container.querySelector("#cfg-endpoint").value.trim();
        const model = this.container.querySelector("#cfg-model").value;
        const coachModel = this.container.querySelector("#cfg-coach-model").value;
        const temp = this.container.querySelector("#cfg-temp").value;
        const autoSpk = this.container.querySelector("#cfg-autospeak").checked;
        const coach = this.container.querySelector("#cfg-coach").checked;
        const coachModeEl = this.container.querySelector("#cfg-coach-mode");
        const coachMode = coachModeEl ? coachModeEl.value : llmClient.coachMode;
        const dict = this.container.querySelector("#cfg-dict").checked;

        llmClient.saveSettings(ep, model, coachModel, temp, autoSpk, coach, coachMode);
        dictionary.enabled = dict;
        localStorage.setItem("my_english_dict_enabled", dict ? "true" : "false");

        sound.playSuccess();
        this.aiSettingsOpen = false;
        this.render();
        this.checkLLMStatus();
      });
    }
  }
}


/* --- js/modes/flashcards.js --- */
// Режим «🎴 Интерактивные 3D-карточки B1» (Flashcards & Pronunciation Heatmap)
// С интервальным повторением (Leitner), анализом произношения через микрофон и категориями





class FlashcardsMode {
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
    this.currentIndex = 0;
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


/* --- js/modes/verbs.js --- */
// Режим «⚡ Неправильные глаголы по Драгункину» (5 золотых семейств)
// Без тупой зубрежки по алфавиту — ритмические трио, озвучка и экспресс-тренажер






class VerbsMode {
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


/* --- js/modes/quiz.js --- */
// Логика режима «Экспресс-Тест / Quiz»



class QuizMode {
  constructor(containerEl) {
    this.container = containerEl;
    this.currentIndex = 0;
    this.selectedOptionIndex = null;
    this.answered = false;
    this.currentOptions = [];
  }

  init() {
    this.loadQuestion(0);
  }

  getCurrentQuestion() {
    return QUIZ_TASKS[this.currentIndex];
  }

  loadQuestion(index) {
    this.currentIndex = (index + QUIZ_TASKS.length) % QUIZ_TASKS.length;
    this.selectedOptionIndex = null;
    this.answered = false;

    // Перемешиваем варианты ответов случайным образом при каждой загрузке вопроса
    const q = this.getCurrentQuestion();
    if (q && q.options) {
      this.currentOptions = q.options
        .map((opt) => ({ ...opt }))
        .sort(() => Math.random() - 0.5);
    }

    this.render();
  }

  render() {
    const q = this.getCurrentQuestion();
    if (!q) return;

    if (!this.currentOptions || this.currentOptions.length === 0) {
      this.currentOptions = q.options
        .map((opt) => ({ ...opt }))
        .sort(() => Math.random() - 0.5);
    }

    this.container.innerHTML = `
      <div class="mode-header">
        <div class="mode-badge">📝 Экспресс-тест Парето</div>
        <div class="task-counter">Вопрос ${this.currentIndex + 1} из ${QUIZ_TASKS.length}</div>
      </div>

      <div class="task-card">
        <h2 class="quiz-question-title">${q.question}</h2>

        <div class="quiz-options-grid" id="quiz-options">
          ${this.currentOptions
            .map(
              (opt, idx) => `
            <button class="quiz-option-card ${
              this.answered
                ? opt.correct
                  ? "opt-correct"
                  : idx === this.selectedOptionIndex
                  ? "opt-wrong"
                  : "opt-disabled"
                : ""
            }" data-opt-idx="${idx}" ${this.answered ? "disabled" : ""}>
              <div class="opt-letter">${String.fromCharCode(65 + idx)}</div>
              <div class="opt-text">${opt.text}</div>
            </button>
          `
            )
            .join("")}
        </div>

        <div class="feedback-area" id="quiz-feedback"></div>

        <div class="action-buttons">
          <button class="btn btn-next ${this.answered ? "" : "hidden"}" id="btn-quiz-next">
            ${this.currentIndex + 1 === QUIZ_TASKS.length ? "Начать сначала ➔" : "Следующий вопрос ➔"}
          </button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const optionBtns = this.container.querySelectorAll(".quiz-option-card");
    optionBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (this.answered) return;
        const optIdx = parseInt(btn.dataset.optIdx, 10);
        this.selectOption(optIdx);
      });
    });

    const nextBtn = this.container.querySelector("#btn-quiz-next");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        sound.playClick();
        this.loadQuestion(this.currentIndex + 1);
      });
    }
  }

  selectOption(optIdx) {
    this.answered = true;
    this.selectedOptionIndex = optIdx;
    const q = this.getCurrentQuestion();
    const chosen = this.currentOptions[optIdx];
    const feedbackEl = this.container.querySelector("#quiz-feedback");
    const nextBtn = this.container.querySelector("#btn-quiz-next");

    if (chosen.correct) {
      sound.playSuccess();
      state.addXP(20);
      state.markSolved("quiz", q.id);

      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-success">
          <div class="feedback-title">🎯 Абсолютно верно!</div>
          <p class="rule-expl">${q.explanation}</p>
        </div>
      `;
    } else {
      sound.playError();
      state.registerError();

      feedbackEl.innerHTML = `
        <div class="feedback-box feedback-error">
          <div class="feedback-title">❌ Неверно!</div>
          <p class="rule-expl">${q.explanation}</p>
        </div>
      `;
    }

    if (nextBtn) nextBtn.classList.remove("hidden");
    this.render(); // Обновим вид кнопок (зеленый правильный / красный ошибочный)
  }
}


/* --- js/handbook.js --- */
// Интерактивный справочник по правилам шпаргалки, 50 разговорным фразам, связкам B1 и тех-созвонам
// С удобными вкладками разделов, чтобы избежать бесконечной «портянки»









class HandbookView {
  constructor(containerEl) {
    this.container = containerEl;
    this.searchQuery = "";
    this.activeTab = "phrases50"; // 'phrases50', 'standup', 'connectors', 'rules', 'all'
  }

  init() {
    this.render();
  }

  render() {
    const q = this.searchQuery.toLowerCase();

    const filtered50 = CONVERSATIONAL_50_PHRASES.filter((p) => {
      return (
        p.phrase.toLowerCase().includes(q) ||
        p.ru.toLowerCase().includes(q) ||
        p.example.toLowerCase().includes(q) ||
        p.categoryRu.toLowerCase().includes(q) ||
        p.tip.toLowerCase().includes(q)
      );
    });

    const filteredTech = TECH_STANDUP_PATTERNS.filter((p) => {
      return (
        p.phrase.toLowerCase().includes(q) ||
        p.ru.toLowerCase().includes(q) ||
        p.example.toLowerCase().includes(q) ||
        p.categoryRu.toLowerCase().includes(q) ||
        p.tip.toLowerCase().includes(q)
      );
    });

    const filteredConnectors = CONVERSATIONAL_CONNECTORS.filter((c) => {
      return c.en.toLowerCase().includes(q) || c.ru.toLowerCase().includes(q) || c.useCase.toLowerCase().includes(q);
    });

    const filteredRules = GRAMMAR_RULES.filter((rule) => {
      return (
        rule.title.toLowerCase().includes(q) ||
        rule.shortDesc.toLowerCase().includes(q) ||
        rule.keyPoints.some((p) => p.toLowerCase().includes(q))
      );
    });

    const showPhrases50 = this.activeTab === "phrases50" || this.activeTab === "all" || (q && filtered50.length > 0);
    const showStandup = this.activeTab === "standup" || this.activeTab === "all" || (q && filteredTech.length > 0);
    const showConnectors = this.activeTab === "connectors" || this.activeTab === "all" || (q && filteredConnectors.length > 0);
    const showRules = this.activeTab === "rules" || this.activeTab === "all" || (q && filteredRules.length > 0);

    this.container.innerHTML = `
      <div class="handbook-container">
        <!-- ВЕРХНЯЯ ШАПКА СПРАВОЧНИКА -->
        <div class="handbook-header">
          <div class="handbook-header-top">
            <div class="mode-badge">📖 База знаний & Разговорный арсенал B1</div>
            <div class="search-box">
              <input 
                type="text" 
                id="handbook-search" 
                placeholder="🔍 Поиск (sounds good, running late, budget, actually...)" 
                value="${this.searchQuery}"
              />
            </div>
          </div>

          <!-- КНОПКИ ПЕРЕКЛЮЧЕНИЯ РАЗДЕЛОВ (БЕЗ ДЛИННОЙ ПОРТЯНКИ) -->
          <div class="handbook-tabs-nav">
            <button class="hb-tab-btn ${this.activeTab === "phrases50" ? "active" : ""}" data-subtab="phrases50">
              🌟 50 Золотых фраз (${CONVERSATIONAL_50_PHRASES.length})
            </button>
            <button class="hb-tab-btn ${this.activeTab === "standup" ? "active" : ""}" data-subtab="standup">
              🎙️ Созвоны & Tech Art (${TECH_STANDUP_PATTERNS.length})
            </button>
            <button class="hb-tab-btn ${this.activeTab === "connectors" ? "active" : ""}" data-subtab="connectors">
              🗣️ Связки & Fillers (${CONVERSATIONAL_CONNECTORS.length})
            </button>
            <button class="hb-tab-btn ${this.activeTab === "rules" ? "active" : ""}" data-subtab="rules">
              📐 9 Правил Парето (${GRAMMAR_RULES.length})
            </button>
            <button class="hb-tab-btn ${this.activeTab === "all" ? "active" : ""}" data-subtab="all">
              📑 Показать всё
            </button>
          </div>
        </div>

        <!-- РАЗДЕЛ 1: 50 ЗОЛОТЫХ РАЗГОВОРНЫХ ФРАЗ ДЛЯ КАЖДОГО ДНЯ -->
        ${
          showPhrases50
            ? `
        <div class="connectors-section tech-standup-section">
          <div class="tech-section-header">
            <div>
              <h2 class="section-title">🌟 50 разговорных фраз для ежедневного общения</h2>
              <p class="section-desc">Золотой запас носителей языка (по уроку English Maria): слушайте, повторяйте и сохраняйте в карточки!</p>
            </div>
            <div class="tech-patterns-count">Фраз: <strong>${filtered50.length}</strong></div>
          </div>

          <div class="tech-patterns-grid">
            ${
              filtered50.length === 0
                ? `<div class="empty-placeholder">По запросу «${this.searchQuery}» фраз не найдено</div>`
                : filtered50
                    .map((p) => {
                      const isAdded = flashcardsService.isWordAdded(p.phrase);
                      return `
              <div class="tech-pattern-card">
                <div class="tp-top">
                  <span class="tp-category-badge">${p.categoryRu}</span>
                  <div class="tp-actions">
                    <button class="btn-voice-mini btn-speak-text" data-text="${p.phrase}" title="Послушать фразу">🔊</button>
                    <button class="btn-star-50 ${isAdded ? "is-added" : ""}" data-id="${p.id}" title="${isAdded ? "Уже в карточках! Кликните, чтобы убрать" : "Добавить в интерактивные карточки"}">
                      ${isAdded ? "⭐ В карточках" : "☆ В карточки"}
                    </button>
                  </div>
                </div>

                <div class="tp-phrase-row">
                  <div class="tp-phrase">${p.phrase}</div>
                  <div class="tp-ru">${p.ru}</div>
                  <div class="tp-phonetic-sub">${p.phonetic}</div>
                </div>

                <div class="tp-tip">💡 <em>Совет:</em> ${p.tip}</div>

                <div class="tp-example-box">
                  <div class="tp-ex-en">
                    <span>«${p.example}»</span>
                    <button class="btn-voice-mini btn-speak-text" data-text="${p.example}" title="Послушать диалог целиком">🔊</button>
                  </div>
                  <div class="tp-ex-ru">«${p.exampleRu}»</div>
                </div>
              </div>
            `;
                    })
                    .join("")
            }
          </div>
        </div>
        `
            : ""
        }

        <!-- РАЗДЕЛ 2: ЛИЧНАЯ ШПАРГАЛКА ДЛЯ ТЕХНИЧЕСКИХ СОЗВОНОВ & TECH ART -->
        ${
          showStandup
            ? `
        <div class="connectors-section tech-standup-section" style="${showPhrases50 ? "margin-top: 36px" : ""}">
          <div class="tech-section-header">
            <div>
              <h2 class="section-title">🎙️ Личная шпаргалка для созвонов & Tech Art (Standup Patterns)</h2>
              <p class="section-desc">Золотые речевые шаблоны: как отвечать лиду, обосновывать архитектурные решения и обсуждать оптимизацию графики:</p>
            </div>
            <div class="tech-patterns-count">Шаблонов: <strong>${filteredTech.length}</strong></div>
          </div>

          <div class="tech-patterns-grid">
            ${
              filteredTech.length === 0
                ? `<div class="empty-placeholder">По запросу «${this.searchQuery}» шаблонов созвона не найдено</div>`
                : filteredTech
                    .map((p) => {
                      const isAdded = flashcardsService.isWordAdded(p.phrase);
                      return `
              <div class="tech-pattern-card">
                <div class="tp-top">
                  <span class="tp-category-badge">${p.categoryRu}</span>
                  <div class="tp-actions">
                    <button class="btn-voice-mini btn-speak-text" data-text="${p.phrase}" title="Послушать шаблон">🔊</button>
                    <button class="btn-star-pattern ${isAdded ? "is-added" : ""}" data-id="${p.id}" title="${isAdded ? "Уже в карточках! Кликните, чтобы убрать" : "Добавить в интерактивные карточки"}">
                      ${isAdded ? "⭐ В карточках" : "☆ В карточки"}
                    </button>
                  </div>
                </div>

                <div class="tp-phrase-row">
                  <div class="tp-phrase">${p.phrase}</div>
                  <div class="tp-ru">${p.ru}</div>
                </div>

                <div class="tp-tip">💡 <em>Драгункин:</em> ${p.tip}</div>

                <div class="tp-example-box">
                  <div class="tp-ex-en">
                    <span>«${p.example}»</span>
                    <button class="btn-voice-mini btn-speak-text" data-text="${p.example}" title="Послушать пример целиком">🔊</button>
                  </div>
                  <div class="tp-ex-ru">«${p.exampleRu}»</div>
                </div>
              </div>
            `;
                    })
                    .join("")
            }
          </div>
        </div>
        `
            : ""
        }

        <!-- РАЗДЕЛ 3: РАЗГОВОРНЫЕ МОСТИКИ И КОННЕКТОРЫ B1 -->
        ${
          showConnectors
            ? `
        <div class="connectors-section" style="margin-top: 24px">
          <h2 class="section-title">🗣️ Разговорные мостики B1 (Fillers & Connectors)</h2>
          <p class="section-desc">Слова-спасатели, которые дают 1-2 секунды подумать во время живого разговора:</p>

          <div class="connectors-grid">
            ${filteredConnectors
              .map(
                (c) => `
              <div class="connector-card">
                <div class="conn-top">
                  <span class="conn-en">${c.en}</span>
                  <button class="btn-voice-mini btn-speak-text" data-text="${c.en}" title="Послушать произношение">🔊</button>
                </div>
                <div class="conn-ru">${c.ru}</div>
                <div class="conn-use">💡 ${c.useCase}</div>
                <div class="conn-example">
                  <span class="ex-label">Пример:</span>
                  <span class="ex-body">«${c.example}»</span>
                  <button class="btn-voice-mini btn-speak-text" data-text="${c.example}" title="Послушать фразу целиком">🔊</button>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
        `
            : ""
        }

        <!-- РАЗДЕЛ 4: 9 ФУНДАМЕНТАЛЬНЫХ ПРАВИЛ -->
        ${
          showRules
            ? `
        <div class="connectors-section" style="margin-top: 24px">
          <h2 class="section-title">📐 9 Фундаментальных правил (Парето 20%)</h2>
          <p class="section-desc">Золотой скелет грамматики: формула любого утверждения, отрицания и вопроса:</p>
          <div class="rules-grid">
            ${
              filteredRules.length === 0
                ? `<div class="empty-placeholder">Ничего не найдено по запросу «${this.searchQuery}»</div>`
                : filteredRules
                    .map(
                      (rule) => `
                  <div class="rule-card" id="rule-${rule.id}">
                    <div class="rule-card-top">
                      <span class="rule-num">${rule.number}</span>
                      <h3 class="rule-title">${rule.title}</h3>
                    </div>
                    <div class="rule-desc">${rule.shortDesc}</div>

                    <div class="rule-formula-box">
                      <span class="formula-label">ФОРМУЛА:</span>
                      <code>${rule.formula}</code>
                    </div>

                    <ul class="rule-points">
                      ${rule.keyPoints.map((pt) => `<li>${pt}</li>`).join("")}
                    </ul>

                    <div class="rule-examples">
                      <div class="examples-title">Примеры живой речи:</div>
                      ${rule.examples
                        .map(
                          (ex) => `
                        <div class="example-item">
                          <span class="ex-en">${ex.en}</span>
                          <button class="btn-voice-mini btn-speak-text" data-text="${ex.en}">🔊</button>
                          <span class="ex-ru"> — ${ex.ru}</span>
                        </div>
                      `
                        )
                        .join("")}
                    </div>
                  </div>
                `
                    )
                    .join("")
            }
          </div>
        </div>
        `
            : ""
        }
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Переключение вкладок разделов
    this.container.querySelectorAll(".hb-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        sound.playClick();
        this.activeTab = btn.dataset.subtab;
        this.render();
      });
    });

    const searchInput = this.container.querySelector("#handbook-search");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        this.render();
        const input = this.container.querySelector("#handbook-search");
        if (input) {
          input.focus();
          input.setSelectionRange(input.value.length, input.value.length);
        }
      });
    }

    // Озвучка любого текста
    this.container.querySelectorAll(".btn-speak-text").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const text = btn.dataset.text;
        if (text) {
          btn.classList.add("btn-speaking");
          setTimeout(() => btn.classList.remove("btn-speaking"), 1500);
          speech.speak(text);
        }
      });
    });

    // Добавление фразы из 50 в карточки
    this.container.querySelectorAll(".btn-star-50").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const item = CONVERSATIONAL_50_PHRASES.find((p) => p.id === id);
        if (!item) return;

        const isCurrentlyAdded = flashcardsService.isWordAdded(item.phrase);
        if (isCurrentlyAdded) {
          flashcardsService.removeWord(item.phrase);
          btn.classList.remove("is-added");
          btn.innerHTML = "☆ В карточки";
          btn.title = "Добавить в интерактивные карточки";
          sound.playClick();
        } else {
          flashcardsService.addCard({
            word: item.phrase,
            translation: item.ru,
            contextEn: item.example,
            contextRu: `${item.exampleRu} (💡 ${item.tip})`,
            category: "casual",
            phoneticRu: item.phonetic
          });
          btn.classList.add("is-added");
          btn.innerHTML = "⭐ В карточках";
          btn.title = "Уже в карточках! Кликните, чтобы убрать";
          sound.playSuccess();
          state.addXP(5);
        }
      });
    });

    // Добавление паттерна в карточки со звёздочки
    this.container.querySelectorAll(".btn-star-pattern").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const pattern = TECH_STANDUP_PATTERNS.find((p) => p.id === id);
        if (!pattern) return;

        const isCurrentlyAdded = flashcardsService.isWordAdded(pattern.phrase);
        if (isCurrentlyAdded) {
          flashcardsService.removeWord(pattern.phrase);
          btn.classList.remove("is-added");
          btn.innerHTML = "☆ В карточки";
          btn.title = "Добавить в интерактивные карточки";
          sound.playClick();
        } else {
          flashcardsService.addCard({
            word: pattern.phrase,
            translation: pattern.ru,
            contextEn: pattern.example,
            contextRu: `${pattern.exampleRu} (💡 ${pattern.tip})`,
            category: "tech"
          });
          btn.classList.add("is-added");
          btn.innerHTML = "⭐ В карточках";
          btn.title = "Уже в карточках! Кликните, чтобы убрать";
          sound.playSuccess();
          state.addXP(5);
        }
      });
    });
  }
}


/* --- js/app.js --- */
// Главный входной файл приложения (App Coordinator)












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


})();
