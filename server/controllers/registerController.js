const User = require("../model/User");
const createToken = require("../utils/createToken");
const validation = require("../utils/emailValidation");
const { hashData } = require("../utils/hashData&CompareData");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // check all credentials are filled
    if (!(username && email && password)) {
      return res.status(400).json({
        success: false,
        error: "User name, email and password are required",
      });
    }

    // check the email is valid
    const isValidEmail = await validation(email);
    if (!isValidEmail) {
      return res
        .status(400)
        .json({ success: false, error: "Please enter a valid email" });
    }

    // check if username is taken
    const isUsernameTaken = await User.findOne({ username });
    if (isUsernameTaken) {
      return res.status(409).json({
        success: false,
        error:
          "Sorry, the username is already in use. Please choose a different one.",
      });
    }

    // check if email is taken
    const isEmailTaken = await User.findOne({ email });
    if (isEmailTaken) {
      return res.status(409).json({
        success: false,
        error:
          "Sorry, the email is already in use. Please choose a different one.",
      });
    }

    const hashedPassword = await hashData(password); // hash the password

    // create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // create access token
    const accessToken = await createToken({
      userId: newUser._id,
      email: newUser.email,
    });

    newUser.token = accessToken; // attach token to user

    const result = await newUser.save(); // save user
    if (result) {
      const { password, token, ...userDetail } = result._doc;
      return res.status(201).json({
        success: true,
        user: { ...userDetail },
        token,
        message: `Your account (${username}) has been successfully created.`,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Create account failed. Please try again.",
      });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error. Please try again later.",
    });
  }
};

module.exports = { register };
