const talkValidation = async (req, res, next) => {
  const dateRegEx = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  } if (!talk.watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  } if (!dateRegEx.test(talk.watchedAt)) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });    
  }
  return next();
};

const rateValidation = async (req, res, next) => {
  const { talk } = req.body;
  if (!talk.rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  } if (talk.rate > 5 || talk.rate < 1) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  } if (!Number.isInteger(talk.rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  return next();
};

const rateEqualZero = async (req, res, next) => {
  const { talk } = req.body;
  if (talk.rate === 0) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  return next();
};

module.exports = { rateValidation, talkValidation, rateEqualZero };
