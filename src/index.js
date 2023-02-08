const express = require('express');
const cryptoRandomString = require('../node_modules/crypto-random-string');
const fieldValidation = require('./middlewares/fieldValidation');
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
// app.post('/talker', async (req, res) => {
//   const jsonContent = await readDb();
  
//   return res.status(HTTP_OK_STATUS).json({ message: 'talker posted' });
// });