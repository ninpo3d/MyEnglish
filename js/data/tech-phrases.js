// Золотые речевые шаблоны для технических созвонов (Standup, Tech Art & GameDev)
// Личная шпаргалка для уверенного общения с лидами, продюсерами и разработчиками

export const TECH_STANDUP_PATTERNS = [
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
