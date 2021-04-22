const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const TicketSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  playeId: {
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
    type: Number,
  },
  tickets: {
    type: Array,
  },
});

module.exports = Ticket = mongoose.model("ticket", TicketSchema);
