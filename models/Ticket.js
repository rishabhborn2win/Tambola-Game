const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const TicketSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  uuid: {
    type: String,
    default: uuidv4(),
  },
  ticketId: {
    type: String,
    unique: true,
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "game",
    default: null,
  },
  tickets: {
    type: Array,
  },
  createdAt: { type: Date, expires: "2m", default: Date.now },
});

module.exports = Ticket = mongoose.model("ticket", TicketSchema);
