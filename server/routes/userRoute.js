const {
  addMessage,
  getAllMessages,
  deleteMessage,
} = require("../controllers/messageController");
const { getAllUser } = require("../controllers/userController");

const router = require("express").Router();

router.get("/users/:id", getAllUser);
router.post("/add-message", addMessage);
router.post("/get-messages", getAllMessages);
router.delete("/delete-message", deleteMessage);

module.exports = router;
