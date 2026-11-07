// База заданий для режима «Аудио-диктант / Понимание на слух» (Listening Mode)
// 52 фразы: от живых разговорных связок и реакций до чисел, заказа еды, отелей и созвонов.
// Тренирует ухо различать артикли, редукции (gonna/wanna/didn't) и слитную речь.

export const LISTENING_TASKS = [
  // 1. Повседневный заказ и быт
  {
    id: "list_1",
    en: "I would like to order a cup of black coffee.",
    ru: "Я бы хотел заказать чашку черного кофе.",
    hint: "Вежливая связка: would like TO order + артикль a cup of.",
    audioFocus: "Слитная редукция «would like to» звучит почти как «would like-ta».",
    tokens: ["I", "would", "like", "to", "order", "a", "cup", "of", "black", "coffee", "the", "an", "ordering", "want"]
  },
  {
    id: "list_2",
    en: "It is very cold outside today.",
    ru: "На улице сегодня очень холодно.",
    hint: "Погода = безличный Хозяин It is.",
    audioFocus: "Связка «It is» в беглой речи звучит как «It's».",
    tokens: ["It", "is", "very", "cold", "outside", "today", "There", "was", "the"]
  },
  {
    id: "list_3",
    en: "Where did you go yesterday evening?",
    ru: "Куда ты пошел вчера вечером?",
    hint: "Рубильник did вынесен вперед, глагол go в 1-й форме.",
    audioFocus: "«Where did you» на слух часто сливается в «Where d'you» или «Where-ja».",
    tokens: ["Where", "did", "you", "go", "yesterday", "evening", "went", "do", "were", "to"]
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
    tokens: ["Is", "there", "Wi-Fi", "in", "this", "hotel", "room", "Are", "have", "has", "the"]
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
  },

  // 2. Числа и цены на слух
  {
    id: "list_9",
    en: "Your room number is forty-two on the fourth floor.",
    ru: "Номер вашей комнаты — 42 на четвёртом этаже.",
    hint: "Число forty (без буквы u) и порядковое fourth.",
    audioFocus: "Чёткое ударение на первый слог: FORty (не путать с fourTEEN).",
    tokens: ["Your", "room", "number", "is", "forty-two", "on", "the", "fourth", "floor", "fourteen", "in", "at"]
  },
  {
    id: "list_10",
    en: "It costs fifteen dollars and fifty cents.",
    ru: "Это стоит пятнадцать долларов и пятьдесят центов.",
    hint: "Классическая пара-ловушка: fifTEEN (15) и FIFty (50).",
    audioFocus: "В fifTEEN ударение на длинный конец -TEEN, а в FIFty — на первый слог.",
    tokens: ["It", "costs", "fifteen", "dollars", "and", "fifty", "cents", "cost", "fifty-five", "cents"]
  },
  {
    id: "list_11",
    en: "The train leaves at seven thirteen in the morning.",
    ru: "Поезд отправляется в семь тринадцать утра.",
    hint: "Время: 7:13 (thirteen, ударение на -TEEN).",
    audioFocus: "«seven thirteen» звучит с акцентом на окончании «-TEEN» у тринадцати.",
    tokens: ["The", "train", "leaves", "at", "seven", "thirteen", "in", "the", "morning", "thirty", "on", "depart"]
  },
  {
    id: "list_12",
    en: "There are about thirty people in the office.",
    ru: "В офисе около тридцати человек.",
    hint: "Число 30: THIRty (ударение на начало).",
    audioFocus: "Глухой звук «th» в начале и быстрый звук «-ty» на конце.",
    tokens: ["There", "are", "about", "thirty", "people", "in", "the", "office", "thirteen", "is", "person"]
  },
  {
    id: "list_13",
    en: "Can you lend me eighteen dollars until Friday?",
    ru: "Можешь одолжить мне восемнадцать долларов до пятницы?",
    hint: "Число 18: eighTEEN (ударение на -teen).",
    audioFocus: "Не спутайте eighteen (18) и eighty (80).",
    tokens: ["Can", "you", "lend", "me", "eighteen", "dollars", "until", "Friday", "eighty", "borrow", "to"]
  },
  {
    id: "list_14",
    en: "I have eighty-five unread emails in my inbox.",
    ru: "У меня 85 непрочитанных писем во входящих.",
    hint: "Составное число: eighty-five (через дефис).",
    audioFocus: "Слитная связка eighty-five с ударением на EIGHty.",
    tokens: ["I", "have", "eighty-five", "unread", "emails", "in", "my", "inbox", "eighteen", "has", "of"]
  },

  // 3. Золотые разговорные реакции (Мария Батхан)
  {
    id: "list_15",
    en: "That sounds good to me.",
    ru: "Мне это подходит / Звучит отлично.",
    hint: "Естественный ответ согласия вместо шаблонного 'OK'.",
    audioFocus: "Звук s на конце «sounds» сливается с «good».",
    tokens: ["That", "sounds", "good", "to", "me", "sound", "for", "well", "it"]
  },
  {
    id: "list_16",
    en: "That makes a lot of sense.",
    ru: "Это очень логично / В этом много смысла.",
    hint: "Связка a lot of + sense.",
    audioFocus: "«makes a lot of» звучит как одно слитное слово «makes-a-lot-of».",
    tokens: ["That", "makes", "a", "lot", "of", "sense", "make", "the", "meaning", "in"]
  },
  {
    id: "list_17",
    en: "No worries at all, I will help you.",
    ru: "Вообще без проблем, я помогу тебе.",
    hint: "Разговорный эквивалент 'You are welcome'.",
    audioFocus: "Связка «at all» произносится слитным звуком [эт-оол].",
    tokens: ["No", "worries", "at", "all", "I", "will", "help", "you", "not", "problem", "am"]
  },
  {
    id: "list_18",
    en: "That is a very good point.",
    ru: "Это очень дельное замечание.",
    hint: "Признание правоты собеседника на созвоне или в беседе.",
    audioFocus: "Буква d в «good» мягко переходит в звук p слова «point».",
    tokens: ["That", "is", "a", "very", "good", "point", "the", "an", "idea"]
  },
  {
    id: "list_19",
    en: "I couldn't agree more with you.",
    ru: "Я полностью с вами согласен (не мог бы согласиться больше).",
    hint: "Высшая степень согласия: couldn't agree more.",
    audioFocus: "«couldn't agree» произносится без паузы: «couldn-ta-gree».",
    tokens: ["I", "couldn't", "agree", "more", "with", "you", "could", "to", "not", "am"]
  },
  {
    id: "list_20",
    en: "It goes without saying that we must hurry.",
    ru: "Само собой разумеется, что мы должны поторопиться.",
    hint: "Идиома: It goes without saying.",
    audioFocus: "«without saying» произносится плавно, без акцентирования предлога.",
    tokens: ["It", "goes", "without", "saying", "that", "we", "must", "hurry", "go", "say", "should"]
  },
  {
    id: "list_21",
    en: "It depends on the weather tomorrow.",
    ru: "Это зависит от завтрашней погоды.",
    hint: "Глагол depend требует предлог on (не of!).",
    audioFocus: "Связка «depends on» сливается в [ди-пэндз-он].",
    tokens: ["It", "depends", "on", "the", "weather", "tomorrow", "of", "depend", "from"]
  },
  {
    id: "list_22",
    en: "How come you are already here?",
    ru: "Как так вышло, что ты уже здесь?",
    hint: "How come = почему / как так вышло (прямой порядок слов!).",
    audioFocus: "После «How come» порядок слов утвердительный: «you are», а не «are you».",
    tokens: ["How", "come", "you", "are", "already", "here", "why", "did", "come", "were"]
  },
  {
    id: "list_23",
    en: "Never mind, it doesn't matter anymore.",
    ru: "Не бери в голову, это больше не имеет значения.",
    hint: "Never mind = забей / неважно.",
    audioFocus: "«doesn't matter» — t в doesn't проглатывается перед m.",
    tokens: ["Never", "mind", "it", "doesn't", "matter", "anymore", "don't", "is", "not"]
  },
  {
    id: "list_24",
    en: "I see your point, but let me explain.",
    ru: "Я понимаю вашу точку зрения, но позвольте объяснить.",
    hint: "Вежливое несогласие: I see your point, but...",
    audioFocus: "«let me» в беглой речи звучит как «lem-me».",
    tokens: ["I", "see", "your", "point", "but", "let", "me", "explain", "understand", "to", "my"]
  },
  {
    id: "list_25",
    en: "Let's call it a day and go home.",
    ru: "Давайте закругляться на сегодня и пойдём по домам.",
    hint: "Идиома: call it a day = закончить работу на сегодня.",
    audioFocus: "«call it a» звучит как одно слово [кол-ит-э].",
    tokens: ["Let's", "call", "it", "a", "day", "and", "go", "home", "finish", "the", "to"]
  },

  // 4. IT, созвоны и рабочие процессы
  {
    id: "list_26",
    en: "You are on mute, we cannot hear you.",
    ru: "Ты на мьюте (с выключенным микрофоном), мы тебя не слышим.",
    hint: "Устойчивое IT-выражение: on mute.",
    audioFocus: "«cannot hear» — ударение на hear.",
    tokens: ["You", "are", "on", "mute", "we", "cannot", "hear", "you", "in", "can't", "listen"]
  },
  {
    id: "list_27",
    en: "Could you please share your screen with us?",
    ru: "Не могли бы вы расшарить свой экран с нами?",
    hint: "Вежливая просьба: Could you please + глагол.",
    audioFocus: "«Could you» на слух звучит мягко: [ку-джу].",
    tokens: ["Could", "you", "please", "share", "your", "screen", "with", "us", "can", "show", "the"]
  },
  {
    id: "list_28",
    en: "I will push this bug fix to production tonight.",
    ru: "Я залью этот фикс бага на прод сегодня вечером.",
    hint: "Will + 1-я форма для спонтанного решения.",
    audioFocus: "«will push» часто сокращается в «I'll push».",
    tokens: ["I", "will", "push", "this", "bug", "fix", "to", "production", "tonight", "pushed", "the", "in"]
  },
  {
    id: "list_29",
    en: "Let's test this feature before we deploy.",
    ru: "Давайте протестируем эту фичу перед деплоем.",
    hint: "Let's + глагол без частицы to.",
    audioFocus: "«test this» — глухой t в конце test сливается с th в this.",
    tokens: ["Let's", "test", "this", "feature", "before", "we", "deploy", "to", "will", "the"]
  },
  {
    id: "list_30",
    en: "Do you have a minute to talk about the task?",
    ru: "У тебя есть минутка поговорить о задаче?",
    hint: "Разговорный вопрос о времени: have a minute to talk.",
    audioFocus: "«have a» сливается в [хэв-э].",
    tokens: ["Do", "you", "have", "a", "minute", "to", "talk", "about", "the", "task", "has", "an", "for"]
  },

  // 5. Путешествия, кафе и город
  {
    id: "list_31",
    en: "Could I have the check, please?",
    ru: "Можно мне счёт, пожалуйста?",
    hint: "The check (в США) или the bill (в Британии).",
    audioFocus: "«Could I» сливается в [куд-ай].",
    tokens: ["Could", "I", "have", "the", "check", "please", "can", "a", "bill", "give"]
  },
  {
    id: "list_32",
    en: "How do I get to the nearest subway station?",
    ru: "Как мне добраться до ближайшей станции метро?",
    hint: "get to = добраться до места.",
    audioFocus: "«How do I» звучит бегло как [хау-ду-ай].",
    tokens: ["How", "do", "I", "get", "to", "the", "nearest", "subway", "station", "go", "a", "at"]
  },
  {
    id: "list_33",
    en: "Keep the change, and thank you for your help.",
    ru: "Сдачи не надо (оставьте сдачу себе), и спасибо за помощь.",
    hint: "Идиома в такси и кафе: Keep the change.",
    audioFocus: "«Keep the change» произносится слитно и доброжелательно.",
    tokens: ["Keep", "the", "change", "and", "thank", "you", "for", "your", "help", "a", "to", "leave"]
  },
  {
    id: "list_34",
    en: "I have a reservation under the name Ivanov.",
    ru: "У меня бронь на имя Иванов.",
    hint: "under the name = на фамилию / имя.",
    audioFocus: "«have a» снова звучит как одно целое [хэв-э].",
    tokens: ["I", "have", "a", "reservation", "under", "the", "name", "Ivanov", "has", "on", "by"]
  },
  {
    id: "list_35",
    en: "What time does the breakfast start in the morning?",
    ru: "Во сколько начинается завтрак утром?",
    hint: "does + breakfast + start (глагол в 1-й форме).",
    audioFocus: "«What time does» звучит слитным ритмическим блоком.",
    tokens: ["What", "time", "does", "the", "breakfast", "start", "in", "the", "morning", "is", "starts", "at"]
  },

  // 6. Сложные грамматические структуры на слух
  {
    id: "list_36",
    en: "I have been waiting for you for forty minutes.",
    ru: "Я жду тебя уже сорок минут.",
    hint: "have been + -ing для действия, которое длится до сих пор.",
    audioFocus: "«been waiting for» звучит ритмично, слитная связка предлога for.",
    tokens: ["I", "have", "been", "waiting", "for", "you", "for", "forty", "minutes", "am", "fourteen", "waited"]
  },
  {
    id: "list_37",
    en: "You should have told me about this yesterday.",
    ru: "Тебе следовало сказать мне об этом вчера.",
    hint: "should have + 3-я форма = сожаление о прошлом.",
    audioFocus: "«should have» в беглой речи превращается в «should've» [шуд-эв].",
    tokens: ["You", "should", "have", "told", "me", "about", "this", "yesterday", "tell", "had", "must"]
  },
  {
    id: "list_38",
    en: "I used to drink green tea, but now I prefer coffee.",
    ru: "Раньше я пил зелёный чай, но теперь предпочитаю кофе.",
    hint: "used to = прошлая привычка, которой больше нет.",
    audioFocus: "«used to» произносится со звуком s: [йууст-ту].",
    tokens: ["I", "used", "to", "drink", "green", "tea", "but", "now", "I", "prefer", "coffee", "use", "the", "drank"]
  },
  {
    id: "list_39",
    en: "There is something wrong with my car.",
    ru: "С моей машиной что-то не так.",
    hint: "something wrong = что-то не в порядке.",
    audioFocus: "«There is» сокращается в быстрое «There's».",
    tokens: ["There", "is", "something", "wrong", "with", "my", "car", "has", "anything", "in"]
  },
  {
    id: "list_40",
    en: "Would you mind opening the door for me?",
    ru: "Вы не возражаете открыть дверь для меня?",
    hint: "Would you mind + глагол с окончанием -ing.",
    audioFocus: "«Would you mind» произносится очень слитно [ву-джу майнд].",
    tokens: ["Would", "you", "mind", "opening", "the", "door", "for", "me", "open", "to", "do"]
  },

  // 7. Ежедневные связки и беглая речь
  {
    id: "list_41",
    en: "To be honest, I really like this city.",
    ru: "Честно говоря, мне правда нравится этот город.",
    hint: "Вводная фраза: To be honest.",
    audioFocus: "Буква h в слове honest немая, произносится [онэст].",
    tokens: ["To", "be", "honest", "I", "really", "like", "this", "city", "am", "the", "honestly"]
  },
  {
    id: "list_42",
    en: "By the way, did you see my keys anywhere?",
    ru: "Кстати, ты нигде не видел мои ключи?",
    hint: "By the way = кстати / между прочим.",
    audioFocus: "«did you see» сливается в [ди-джу си].",
    tokens: ["By", "the", "way", "did", "you", "see", "my", "keys", "anywhere", "saw", "do", "in"]
  },
  {
    id: "list_43",
    en: "First of all, let us check the facts.",
    ru: "Прежде всего, давайте проверим факты.",
    hint: "First of all = во-первых / прежде всего.",
    audioFocus: "«First of all» произносится как единое слово [фёрст-ов-оол].",
    tokens: ["First", "of", "all", "let", "us", "check", "the", "facts", "at", "to", "firstly"]
  },
  {
    id: "list_44",
    en: "Don't get me wrong, but we have to leave.",
    ru: "Не пойми меня неправильно, но мы должны уходить.",
    hint: "Идиома: Don't get me wrong.",
    audioFocus: "«have to» в речи произносится с глухим звуком f: [хэф-ту].",
    tokens: ["Don't", "get", "me", "wrong", "but", "we", "have", "to", "leave", "must", "not", "go"]
  },
  {
    id: "list_45",
    en: "It is not a big deal at all.",
    ru: "В этом нет ничего страшного / Пустяки.",
    hint: "It's no big deal = пустяки / не беда.",
    audioFocus: "«not a big deal» произносится легко и быстро.",
    tokens: ["It", "is", "not", "a", "big", "deal", "at", "all", "no", "the", "problem"]
  },
  {
    id: "list_46",
    en: "Take your time, there is no rush.",
    ru: "Не торопись, спешки никакой нет.",
    hint: "Take your time = не спеши.",
    audioFocus: "«there is no» сливается в [дэриз ноу].",
    tokens: ["Take", "your", "time", "there", "is", "no", "rush", "not", "have", "a"]
  },
  {
    id: "list_47",
    en: "I appreciate your help very much.",
    ru: "Я очень ценю вашу помощь.",
    hint: "Вежливая благодарность выше обычного 'Thank you'.",
    audioFocus: "«appreciate» произносится мягко: [э-при-ши-эйт].",
    tokens: ["I", "appreciate", "your", "help", "very", "much", "thank", "for", "am", "you"]
  },
  {
    id: "list_48",
    en: "I have no idea what you mean.",
    ru: "Понятия не имею, что ты имеешь в виду.",
    hint: "have no idea = без понятия.",
    audioFocus: "«what you mean» сливается в [уот-чу миин].",
    tokens: ["I", "have", "no", "idea", "what", "you", "mean", "don't", "any", "that", "do"]
  },
  {
    id: "list_49",
    en: "Can you give me a hand with this box?",
    ru: "Можешь помочь мне с этой коробкой?",
    hint: "give a hand = протянуть руку помощи.",
    audioFocus: "«give me a hand» звучит как [гив-ми-э хэнд].",
    tokens: ["Can", "you", "give", "me", "a", "hand", "with", "this", "box", "help", "the", "in"]
  },
  {
    id: "list_50",
    en: "I would rather stay at home tonight.",
    ru: "Я бы лучше остался дома сегодня вечером.",
    hint: "would rather + глагол без to = предпочел бы.",
    audioFocus: "«would rather» звучит мягко, без буквы to.",
    tokens: ["I", "would", "rather", "stay", "at", "home", "tonight", "to", "prefer", "in"]
  },
  {
    id: "list_51",
    en: "Keep in touch and take care of yourself.",
    ru: "Оставайся на связи и береги себя.",
    hint: "Теплое дружеское прощание: Keep in touch.",
    audioFocus: "«take care of» сливается в [тэйк кэр ов].",
    tokens: ["Keep", "in", "touch", "and", "take", "care", "of", "yourself", "on", "you", "be"]
  },
  {
    id: "list_52",
    en: "As far as I know, the meeting is cancelled.",
    ru: "Насколько я знаю, встреча отменена.",
    hint: "Связка: As far as I know.",
    audioFocus: "«As far as» звучит быстро: [эз фар эз].",
    tokens: ["As", "far", "as", "I", "know", "the", "meeting", "is", "cancelled", "so", "was", "that"]
  }
];
