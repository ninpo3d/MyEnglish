// Ролевые жизненные сценарии для уровня B1 (Roleplay Scenarios)
// Включает геймдев-созвоны (VFX / Tech Art), студийную жизнь и бытовые ситуации

export const ROLEPLAY_SCENARIOS = [
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
