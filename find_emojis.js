import fs from 'fs';

const content = fs.readFileSync('./src/App.tsx', 'utf8');
const lines = content.split('\n');

// Regex matching common emojis / non-ascii symbols used as emoticons
const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1FA70}-\u{1FAFF}]/gu;

lines.forEach((line, idx) => {
  if (emojiRegex.test(line)) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});
