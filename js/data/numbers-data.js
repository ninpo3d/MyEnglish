// База и логика английских чисел для тренировки на слух и произношения (1–100)
// Включает фонетику, разбор ловушек -TEEN vs -TY и генератор любых чисел

export const NUMBER_WORDS_1_TO_20 = {
  1: { word: "one", phonetic: "[уан]" },
  2: { word: "two", phonetic: "[туу]" },
  3: { word: "three", phonetic: "[срии] — межзубный звук th" },
  4: { word: "four", phonetic: "[фоор]" },
  5: { word: "five", phonetic: "[файв]" },
  6: { word: "six", phonetic: "[сикс]" },
  7: { word: "seven", phonetic: "[сэвэн]" },
  8: { word: "eight", phonetic: "[эйт]" },
  9: { word: "nine", phonetic: "[найн]" },
  10: { word: "ten", phonetic: "[тэн]" },
  11: { word: "eleven", phonetic: "[и-ЛЭВ-эн]" },
  12: { word: "twelve", phonetic: "[туэлв] — сложный звук tw+lv" },
  13: { word: "thirteen", phonetic: "[сёр-ТИИН] — ударение на -TEEN!" },
  14: { word: "fourteen", phonetic: "[фор-ТИИН] — ударение на -TEEN!" },
  15: { word: "fifteen", phonetic: "[фиф-ТИИН] — корень fif-, ударение на -TEEN!" },
  16: { word: "sixteen", phonetic: "[сикс-ТИИН] — ударение на -TEEN!" },
  17: { word: "seventeen", phonetic: "[сэвэн-ТИИН] — ударение на -TEEN!" },
  18: { word: "eighteen", phonetic: "[эй-ТИИН] — ударение на -TEEN!" },
  19: { word: "nineteen", phonetic: "[найн-ТИИН] — ударение на -TEEN!" },
  20: { word: "twenty", phonetic: "[ТУЭН-ти]" }
};

export const TENS_WORDS = {
  20: { word: "twenty", phonetic: "[ТУЭН-ти]" },
  30: { word: "thirty", phonetic: "[СЁР-ти]" },
  40: { word: "forty", phonetic: "[ФОР-ти] — пишется БЕЗ буквы 'u'!" },
  50: { word: "fifty", phonetic: "[ФИФ-ти]" },
  60: { word: "sixty", phonetic: "[СИКС-ти]" },
  70: { word: "seventy", phonetic: "[СЭВЭН-ти]" },
  80: { word: "eighty", phonetic: "[ЭЙ-ти]" },
  90: { word: "ninety", phonetic: "[НАЙН-ти]" },
  100: { word: "one hundred", phonetic: "[уан ХАН-дрэд]" }
};

export const TEEN_TY_PAIRS = [
  {
    teenNum: 13,
    teenWord: "thirteen",
    teenPhonetic: "[сёр-ТИИН]",
    teenStress: "thir-TEEN",
    tyNum: 30,
    tyWord: "thirty",
    tyPhonetic: "[СЁР-ти]",
    tyStress: "THIR-ty",
    tip: "В 13 (thirTEEN) ударение на длинный конец -TEEN. В 30 (THIRty) ударение строго на начало THIR-, а окончание быстрое!"
  },
  {
    teenNum: 14,
    teenWord: "fourteen",
    teenPhonetic: "[фор-ТИИН]",
    teenStress: "four-TEEN",
    tyNum: 40,
    tyWord: "forty",
    tyPhonetic: "[ФОР-ти]",
    tyStress: "FOR-ty",
    tip: "В 14 (fourTEEN) акцент на -TEEN. В 40 (FORty) ударение на первый слог. Обратите внимание: forty пишется БЕЗ буквы 'u'!"
  },
  {
    teenNum: 15,
    teenWord: "fifteen",
    teenPhonetic: "[фиф-ТИИН]",
    teenStress: "fif-TEEN",
    tyNum: 50,
    tyWord: "fifty",
    tyPhonetic: "[ФИФ-ти]",
    tyStress: "FIF-ty",
    tip: "Корень fif- (не fiveteen). В 15 ударение на -TEEN, в 50 — на первый слог FIF-."
  },
  {
    teenNum: 16,
    teenWord: "sixteen",
    teenPhonetic: "[сикс-ТИИН]",
    teenStress: "six-TEEN",
    tyNum: 60,
    tyWord: "sixty",
    tyPhonetic: "[СИКС-ти]",
    tyStress: "SIX-ty",
    tip: "sixTEEN (16) — громкий звонкий -TEEN. SIXty (60) — ударение в начале, окончание короткое."
  },
  {
    teenNum: 17,
    teenWord: "seventeen",
    teenPhonetic: "[сэвэн-ТИИН]",
    teenStress: "seven-TEEN",
    tyNum: 70,
    tyWord: "seventy",
    tyPhonetic: "[СЭВЭН-ти]",
    tyStress: "SEVEN-ty",
    tip: "sevenTEEN (17) — акцент на -TEEN. SEVENty (70) — ударение строго на первый слог."
  },
  {
    teenNum: 18,
    teenWord: "eighteen",
    teenPhonetic: "[эй-ТИИН]",
    teenStress: "eigh-TEEN",
    tyNum: 80,
    tyWord: "eighty",
    tyPhonetic: "[ЭЙ-ти]",
    tyStress: "EIGH-ty",
    tip: "eighTEEN (18) vs EIGHty (80). В 18 тянем -TEEN, в 80 обрываем на коротком -ty."
  },
  {
    teenNum: 19,
    teenWord: "nineteen",
    teenPhonetic: "[найн-ТИИН]",
    teenStress: "nine-TEEN",
    tyNum: 90,
    tyWord: "ninety",
    tyPhonetic: "[НАЙН-ти]",
    tyStress: "NINE-ty",
    tip: "nineTEEN (19) — акцент на конце. NINEty (90) — акцент в начале."
  }
];

// Преобразует любое число от 1 до 100 в английский текст
export function numberToEnglish(num) {
  const n = parseInt(num, 10);
  if (isNaN(n) || n < 1 || n > 100) return "";

  if (n <= 20) {
    return NUMBER_WORDS_1_TO_20[n].word;
  }
  if (n === 100) {
    return "one hundred";
  }

  const tens = Math.floor(n / 10) * 10;
  const units = n % 10;

  if (units === 0) {
    return TENS_WORDS[tens].word;
  }

  return `${TENS_WORDS[tens].word}-${NUMBER_WORDS_1_TO_20[units].word}`;
}

// Преобразует английский текст числа (или цифру) обратно в число 1..100
export function parseSpokenNumber(input) {
  if (!input) return null;
  const raw = input.toLowerCase().replace(/[^a-z0-9 -]/g, "").trim();

  // Если пользователь уже ввёл цифрами
  const asDigit = parseInt(raw, 10);
  if (!isNaN(asDigit) && asDigit >= 1 && asDigit <= 100) {
    return asDigit;
  }

  // Сверяем со всеми числами от 1 до 100
  for (let i = 1; i <= 100; i++) {
    const en = numberToEnglish(i);
    const enNoHyphen = en.replace("-", " ");
    const rawNoHyphen = raw.replace("-", " ");
    if (rawNoHyphen === enNoHyphen || raw === en) {
      return i;
    }
  }

  return null;
}
