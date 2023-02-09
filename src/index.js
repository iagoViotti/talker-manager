const express = require('express');
const fs = require('fs/promises');
const cryptoRandomString = require('../node_modules/crypto-random-string');
const ageValidation = require('./middlewares/ageValidation');
const authValidation = require('./middlewares/authValidation');
const fieldValidation = require('./middlewares/fieldValidation');
const nameValidation = require('./middlewares/nameValidation');
const { talkValidation, rateValidation, rateEqualZero } = require('./middlewares/talkValidation');
const readDb = require('./utils/talkerManager');

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
  const content = await readDb();
  res.status(HTTP_OK_STATUS).json(content);
});

/** req 2 */
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const jsonContent = await readDb();
  const response = jsonContent.find((talker) => talker.id === Number(id));
  if (!response) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(response);
});

/** req 3 & 4 */
app.post('/login', fieldValidation, async (req, res) => {
  res.status(HTTP_OK_STATUS).json({ token: cryptoRandomString(16) });
});

/** req 5 */
app.post('/talker',
  authValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  rateEqualZero,
  rateValidation,
  async (req, res) => {
    const jsonContent = await readDb();
    req.body.id = jsonContent.length + 1;
    jsonContent.push(req.body);
    await fs.writeFile('src/talker.json', JSON.stringify(jsonContent));
    res.status(201).json(req.body);
});

/** req 6 */
app.put('/talker/:id',
authValidation,
nameValidation,
ageValidation,
talkValidation,
rateEqualZero,
rateValidation,
async (req, res) => {
  const { id } = req.params;
  const jsonContent = await readDb();
  const newArray = jsonContent.filter((talker) => talker.id !== Number(id));
  const newTalker = req.body;
  newTalker.id = Number(id);
  newArray.push(newTalker);
  await fs.writeFile('src/talker.json', JSON.stringify(newArray));
  res.status(200).json(req.body);
});

/** req 7 */
app.delete('/talker/:id', authValidation, async (req, res) => {
  const { id } = req.params;
  const jsonContent = await readDb();
  const result = jsonContent.filter((talker) => talker.id !== Number(id));
  await fs.writeFile('src/talker.json', JSON.stringify(result));
  return res.status(204).json();
});