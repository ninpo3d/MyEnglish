// База данных неправильных глаголов по методике Александра Драгункина
// Разделена на 5 ритмических семейств вместо бессмысленного алфавитного порядка

export const DRAGUNKIN_VERB_FAMILIES = [
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
