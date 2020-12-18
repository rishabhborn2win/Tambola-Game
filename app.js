var express = require("express");
var app = express();
var connectDB = require("./config/db");

//Connecting database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get("/", async (req, res) => {
  res.send("<h1>Api Running</h1>");
});

//Defining routes
app.use("/game", require("./routes/game"));

//Declaring the server
var port = 5000;
app.listen(process.env.PORT || port, () =>
  console.log(`Server started on ${port}`)
);
