const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatId: { type: String },
    sender: { type: String },
    text: { type: String },
  },
  { timestamps: true }
);

const Message = new mongoose.model("Message", messageSchema);

module.exports = Message;
