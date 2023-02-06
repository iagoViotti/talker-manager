const { response } = require('express');
const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const contentPath = path.resolve(__dirname, 'talker.json');
  const content = await fs.readFile(contentPath, 'utf-8');
  res.status(HTTP_OK_STATUS).json(JSON.parse(content));
});