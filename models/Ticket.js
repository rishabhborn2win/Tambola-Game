const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    ticketId: {
        type: String,
        unique: true
    },
    tickets: {
        type: Array
    },
    createdAt: { type: Date, expires: '24h', default: Date.now }
});

module.exports = Ticket = mongoose.model("ticket", TicketSchema);

