const path = require('path');
const fs = require('fs/promises');

const readDB = async () => {
  const contentPath = path.resolve(__dirname, '..', 'talker.json');
  const content = await fs.readFile(contentPath, 'utf-8');
  return JSON.parse(content);
};

module.exports = readDB;
