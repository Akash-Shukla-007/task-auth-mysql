var jwt = require("jsonwebtoken");

const tokenGenerator = (email) => {
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign({ email }, secretKey);
  return token;
};
module.exports = tokenGenerator;
