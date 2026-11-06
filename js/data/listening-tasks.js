// База заданий для режима «Аудио-диктант / Понимание на слух» (Listening Mode)
// Игрок слушает озвучку (без текста перед глазами) и собирает фразу из кирпичиков,
// тренируя ухо различать артикли, окончания, редукции gonna/wanna/didn't.

export const LISTENING_TASKS = [
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
