const bcrypt = require('bcryptjs');

const hash = (plainText, saltRounds = 8) => {
  return bcrypt.hashSync(plainText, saltRounds);
};

const compare = (plainText, hashedText) => {
  return bcrypt.compareSync(plainText, hashedText);
};

module.exports = { hash, compare };
