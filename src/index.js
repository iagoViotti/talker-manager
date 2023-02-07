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
/** req 1 */
app.get('/talker', async (_req, res) => {
  const contentPath = path.resolve(__dirname, 'talker.json');
  const content = await fs.readFile(contentPath, 'utf-8');
  res.status(HTTP_OK_STATUS).json(JSON.parse(content));
  console.log(typeof content);
});

/** req 2 */
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const contentPath = path.resolve(__dirname, 'talker.json');
  const content = await fs.readFile(contentPath, 'utf-8');
  const jsonContent = JSON.parse(content);
  const response = jsonContent.find((talker) => talker.id === Number(id));
  if (!response) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(response);
});

/** req 3 */
