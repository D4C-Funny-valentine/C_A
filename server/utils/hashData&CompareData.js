const bcrypt = require("bcrypt");

const hashData = async (password, round = 10) => {
  try {
    const hashedData = await bcrypt.hash(password, round);
    return hashedData;
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async (password, data) => {
  try {
    const isCorrectPassword = await bcrypt.compare(password, data);
    return isCorrectPassword;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { hashData, comparePassword };
