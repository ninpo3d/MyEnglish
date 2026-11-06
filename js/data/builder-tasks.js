// Задания для режима «Конструктор предложений» (Sentence Assembler)
// Игрок собирает предложение из блоков с учетом жесткого порядка слов и правил Драгункина.

export const BUILDER_TASKS = [
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
