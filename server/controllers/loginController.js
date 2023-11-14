const User = require("../model/User");
const createToken = require("../utils/createToken");
const validation = require("../utils/emailValidation");
const { hashData, comparePassword } = require("../utils/hashData&CompareData");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check all credentials are filled
    if (!(email && password)) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        error:
          "Invalid email or password. Please check your credentials and try again.",
      });
    }

    const isCorrectPassword = await comparePassword(password, user.password); // hash the password

    if (isCorrectPassword) {
      const accessToken = await createToken({
        userId: user._id,
        email: user.email,
      });
      user.token = accessToken; // attach token to user
    } else {
      return res.status(401).json({
        success: false,
        error:
          "Incorrect password. Please check your credentials and try again.",
      });
    }

    const result = await user.save(); // save user
    if (result) {
      const { password, token, ...userDetail } = result._doc;
      return res.status(201).json({
        success: true,
        user: { ...userDetail },
        token,
        message: `Welcome back! You have successfully logged in.`,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Login account failed. Please try again.",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error. Please try again later.",
    });
  }
};

module.exports = { login };
