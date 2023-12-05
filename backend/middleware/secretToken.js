import dotenv from "dotenv"
const jwt = require("jsonwebtoken");

dotenv.config();
export default createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};