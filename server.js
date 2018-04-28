const express = require('express');
const bodyParser = require('body-parser');
var {getMatch} = require('./min-edit');
var {domesticRoute} = require('./graphs/graphs-domestic');
var {metroRoute} = require('./graphs/graphs-metro');

//require('./../graphs-metro');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
var src;
var dst;
var choice;
app.get('/route/:src/:dst',(req,res) => {
     src=getMatch(req.params.src);
     dst=getMatch(req.params.dst);
    res.status(200).send();
});

app.get('/result/:choice',(req,res) => {
  choice=req.params.choice;
  choice=choice.split('+');
  if(choice[0]==='Metro'){

  } else if (choice[0]==='Domestic') {
    console.log(JSON.stringify((domesticRoute.path(src, dst,{cost:true}))));
    var x  = domesticRoute.path(src, dst,{cost:true}).cost;
    console.log(x);
    res.send({"message" : [{"cost":x}]});

  } else if (choice[0]==='Uber') {

  }
  console.log("choice ",choice);
});


app.listen(port,() => {
  console.log(`Chatfuel is up on ${port}`);
});
