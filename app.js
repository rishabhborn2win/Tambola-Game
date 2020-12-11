var express = require('express');
var app = express();
const { RandomPicture } = require('random-picture');

app.get('/',  async (req, res) => {
    const image =  await RandomPicture();
    res.send(`<img width=30% src="${image.url}" />`);
})




//Declaring the server
var port = 3000;
app.listen(process.env.PORT || port, () => console.log(`Server started on ${port}`));