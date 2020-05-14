const mongoose = require("mongoose");

const { Schema } = mongoose;

const room = new Schema({
  participants: [{ type: String, required: true }],
  messages: [
    {
      type: String,
      from: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  personal: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("room", room);
