const mongoose = require("mongoose");
const config = require("config");
const db = process.env.mongoURI || config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://rishu:12345@devconnector.ao3hi.mongodb.net/tambola?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("mongoDB Connected");
  } catch (err) {
    console.log(err.message);

    // We wanna exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
