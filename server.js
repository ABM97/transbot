const express = require('express');
const bodyParser = require('body-parser');

var match = require('levenshtein-edit-distance');

// var locations=['maadi','fci','dokki','tagamoa','sayeda zeinab'];
// var src='moa';
// var originalSource="not defined yet";
// var min = match(src,locations[0]);
// originalSource=locations[0];
// for(var i=1;i<locations.length;i++){
//     if(match(src,locations[i])<min)
//       {
//         min=match(src,locations[i]);
//         originalSource=locations[i];
//       }
// }
// console.log(originalSource);


var app = express();

var port = process.env.PORT || 3000;

app.get('/',(req,res) => {
  var text='Hello Chatfuel';
  res.send({"messages": [
    {"text": 'Hello'},
    {"text": 'Abo sha5a'}
  ]});
});

app.use(bodyParser.json());
var src
;var dst;
var choice;
app.get('/route/:src/:dst',(req,res) => {
     src=req.params.src;
     dst=req.params.dst;
    console.log("src ",src);
    console.log("dst ",dst);
    res.status(200).send({src,dst});
    //get the originalSource and originalDestination from here
    //check if they exist in my array
    //get cost and time foreach(Uber,Local,Metro)
});
app.get('/result/:choice',(req,res) => {
  choice=req.params.choice;
  console.log("choice ",choice);
  res.status(200).send({choice});
});


app.listen(port,() => {
  console.log('Chatfuel is up on port 3000');
});
