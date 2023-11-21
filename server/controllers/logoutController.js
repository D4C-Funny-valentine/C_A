const User = require("../model/User");

const logout = async (req, res) => {
  const headerToken = req.headers.Authorization || req.headers.authorization;

  if (!headerToken?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      error: "Invalid token format",
    });
  }

  const token = headerToken.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Token is not provided",
    });
  }

  try {
    const user = await User.findOneAndUpdate(
      { token: token },
      { lastToken: token },
      { new: true }
    );

    if (user) {
      return res.status(200).json({
        success: true,
        message: "Bye. We hope to see you again soon.",
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Logout account failed. Please try again.",
      });
    }
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error. Please try again later.",
    });
  }
};

module.exports = { logout };
