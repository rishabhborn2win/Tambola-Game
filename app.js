const { forEach } = require('async');
const { time } = require('console');
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser')
var app = express();

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));   

mongoose.connect("mongodb://localhost:27017/tambola", {useNewUrlParser: true, useUnifiedTopology: true });


// Schema Setup
var numberSchema = new mongoose.Schema({
    sno: Number,
    gameid: Number,
    numbercall: Number,
    called: Boolean
})

function pick(n, min, max){
    var values = [], i = max;
    while(i >= min) values.push(i--);
    var results = [];
    var maxIndex = max;
    for(i=1; i <= n; i++){
        maxIndex--;
        var index = Math.floor(maxIndex * Math.random());
        results.push(values[index]);
        values[index] = values[maxIndex];
    }
    return results;
}



var NumberOfBoard = mongoose.model("Number", numberSchema);



app.get('/', function(req, res){
    res.render("form");
});

app.post('/game', function(req, res){
    var gameid = req.body.gameid;
    var list = pick(90,1,90);
    // console.log(list);
    var i =1;
    list.forEach(function(num){
        NumberOfBoard.create({
            sno: i,
            gameid: gameid,
            numbercall: num,
            called: false
        }, function(err, num){
            if(err){
                console.log(err);
            }else{
                // console.log("Data Created");
            }
        });
        i++;
    });
    var route = "/board/"+gameid;
    res.redirect(route);
});

app.get('/board/:gameid', function(req, res){
    var game = req.params.gameid;
    NumberOfBoard.find({gameid: game}, function(err, data){
        if(err){
           res.render("error")
        }else{
            res.render('board', {data: data});
        }
    })
   
});


app.get(('/game/join'), function(req, res){

});


app.listen(3001, function(){
    console.log("server has started");
});