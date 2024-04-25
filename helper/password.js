const bcryptjs = require("bcryptjs")
const saltRounds = 10



function hashing(password) {
  return bcryptjs.hashSync(password, saltRounds);
}

function compare(password, hashPassword) {
  return bcryptjs.compareSync(password, hashPassword);
}

module.exports = { hashing, compare }