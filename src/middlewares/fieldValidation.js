const fieldValidation = (req, res, next) => {
  const entry = req.body;
  const hasEmail = Object.keys(entry).some((key) => key === 'email');
  const emailRegEx = /\S+@\S+\.\S+/;
  const hasPassword = Object.keys(entry).some((key) => key === 'password');
  if (!hasEmail) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } if (!hasPassword) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } if (entry.password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } if (!emailRegEx.test(entry.email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  return next();
};

module.exports = fieldValidation;