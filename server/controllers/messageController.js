const Message = require("../model/Message");

const addMessage = async (req, res) => {
  const { from, to, message } = req.body;
  if (!(from && to && message)) {
    return res.status(400).json({ message: "Bad Request" });
  }
  try {
    const newMessage = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (newMessage) {
      return res
        .status(201)
        .json({ message: "Message added successfully", success: true });
    }
    return res
      .status(400)
      .json({ message: "Failed to added message to database", success: false });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const { from, to } = req.body;
    console.log(from, to);
    if (!(from && to)) {
      return res.status(400).json({ message: "Bad Request" });
    }

    const messages = await Message.find({
      users: { $all: [from, to] },
    }).sort({ updatedAt: 1 });

    const processedMessages = messages.map((message) => {
      const formattedDate = new Date(message.updatedAt).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }
      );
      return {
        id: message._id,
        updatedAt: formattedDate,
        isSender: message.sender.toString() === from,
        senderId: message.sender.toString(),
        message: message.message.text,
      };
    });

    return res.status(200).json(processedMessages);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

const deleteMessage = async (req, res) => {
  const { id, requester } = req.body;
  console.log(id, requester);
  if (!id || !requester) {
    return res.status(400).json({ message: "Bad Request" });
  }
  try {
    const message = await Message.findById(id);

    if (!message) {
      return res
        .status(404)
        .json({ message: "Message not found", success: false });
    }

    if (message.sender.toString() !== requester) {
      return res.status(401).json({
        message: "Unauthorized to delete the message",
        success: false,
      });
    }

    const deleteMessage = await Message.findByIdAndDelete(id);

    if (deleteMessage) {
      return res.status(200).json({
        message: "Message deleted successfully",
        success: true,
        deleteMessage: deleteMessage,
      });
    }
    return res.status(400).json({
      message: "Failed to delete message from database",
      success: false,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = { addMessage, getAllMessages, deleteMessage };
