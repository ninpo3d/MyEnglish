// 50 золотых разговорных фраз для ежедневного общения (по видеоуроку English Maria / Мария Батхан)
// Живая разговорная речь, которую используют носители каждый день

export const CONVERSATIONAL_50_PHRASES = [
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
