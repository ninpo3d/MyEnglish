// Скрипт сборки bundle.js для автономной работы приложения

const fs = require('fs');
const path = require('path');

const files = [
  // Данные
  'js/data/rules.js',
  'js/data/connectors.js',
  'js/data/tech-phrases.js',
  'js/data/conversational-50.js',
  'js/data/builder-tasks.js',
  'js/data/bug-hunter-tasks.js',
  'js/data/switchboard-tasks.js',
  'js/data/listening-tasks.js',
  'js/data/numbers-data.js',
  'js/data/sprint-tasks.js',
  'js/data/scenarios-tasks.js',
  'js/data/flashcards-data.js',
  'js/data/verbs-data.js',
  'js/data/quiz-tasks.js',
  // Движки
  'js/audio.js',
  'js/speech.js',
  'js/state.js',
  'js/llm-client.js',
  'js/flashcards-service.js',
  'js/dictionary.js',
  // Режимы
  'js/modes/builder.js',
  'js/modes/bug-hunter.js',
  'js/modes/switchboard.js',
  'js/modes/listening.js',
  'js/modes/sprint.js',
  'js/modes/scenarios.js',
  'js/modes/flashcards.js',
  'js/modes/verbs.js',
  'js/modes/quiz.js',
  'js/handbook.js',
  // Главный запуск
  'js/app.js'
];

let bundleContent = '(() => {\n';

for (const relPath of files) {
  const fullPath = path.join(__dirname, relPath);
  let content = fs.readFileSync(fullPath, 'utf8');

  // Убираем import / export (включая многострочные)
  content = content.replace(/import\s+[\s\S]*?from\s+['"].*?['"];?/g, '');
  content = content.replace(/^import\s+.*?;?\s*$/gm, '');
  content = content.replace(/^export\s+(const|class|let|var|function)\s+/gm, '$1 ');
  content = content.replace(/^export\s+default\s+.*?;?\s*$/gm, '');

  bundleContent += `\n/* --- ${relPath} --- */\n` + content + '\n';
}

bundleContent += '\n})();\n';

fs.writeFileSync(path.join(__dirname, 'bundle.js'), bundleContent, 'utf8');
console.log('Сборка bundle.js успешно завершена!');
