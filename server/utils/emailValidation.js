const validator = require("email-validator");

const validation = async (email) => {
  try {
    const validEmail = await validator.validate(email);
    return validEmail;
  } catch (error) {
    console.log(error);
  }
};

module.exports = validation;
