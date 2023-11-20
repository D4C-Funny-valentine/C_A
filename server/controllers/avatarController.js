const User = require("../model/User");

const setAvatarHandler = async (req, res) => {
  const userId = req.params.id;
  const image = req.body.image;

  if (!userId || !image) {
    return res.status(400).json({
      error: "Bad Request",
    });
  }
  try {
    const findUser = await User.findOne({ _id: userId });

    if (!findUser) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    if (image) {
      findUser.isAvatarImageSet = true;
      findUser.avatarImage = image;
    }

    const result = await findUser.save();

    if (result.isAvatarImageSet) {
      return res.status(201).json({
        success: true,
        image: result.avatarImage,
        message: "Your avatar set successfully",
      });
    } else {
      return res.status(500).json({
        error: "Opps! Something went wrong. Please try again",
      });
    }
  } catch (error) {
    console.log("Error in setAvatarHandler: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

module.exports = { setAvatarHandler };
