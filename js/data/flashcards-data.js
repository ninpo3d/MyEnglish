// Начальная база интерактивных карточек уровня B1
// Включает как бытовой/повседневный английский, так и специальную лексику Tech Art & GameDev
// С понятными русскими фонетическими подсказками Драгункина (где ударение, немые буквы)

import { CONVERSATIONAL_50_PHRASES } from "./conversational-50.js";

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

export const INITIAL_FLASHCARDS = [
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
