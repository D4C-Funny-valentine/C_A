const User = require("../model/User");

const getAllUser = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({
      error: "Id parameter is required",
    });
  }
  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const allUserExceptCurrentUser = await User.find({
      _id: { $ne: userId },
    }).select(["_id", "username", "email", "avatarImage"]);

    if (!allUserExceptCurrentUser) {
      return res.status(500).json({
        error: "Opps! Something went wrong. Please try again",
      });
    } else {
      return res
        .status(200)
        .json({ success: true, users: allUserExceptCurrentUser });
    }
  } catch (error) {
    console.log("Error in getting all user: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

module.exports = { getAllUser };
