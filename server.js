const express = require('express');
var {UniformCostSearch}=require('./uniformSearch');
const bodyParser = require('body-parser');
var {
  getMatch
} = require('./min-edit');
var {
  domesticRoute
} = require('./graphs/graphs-domestic');
var {
  metroRoute
} = require('./graphs/graphs-metro');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
var src;
var dst;
var choice;
app.get('/route/:src/:dst', (req, res) => {
  src = getMatch(req.params.src);
  dst = getMatch(req.params.dst);
  res.status(200).send();
});

app.get('/result/:choice', (req, res) => {
  choice = req.params.choice;
  choice = choice.split('+');
  console.log(choice[0]);
  if (choice[0] === 'Metro') {

    var result = metroRoute.path(src, dst, {cost: true});
  //  console.log(result.path);
    var cost = 'Cost is 2 Pounds';
    var stations = `Number of stations: ${result.cost}`;
    var time = `Estimated time is ${result.cost * 3} minutes`;
    var path = result.path;
    if (!path) {


        var nearestMetrotoSrc = UniformCostSearch(src);
          var nearestMetrotoDst = UniformCostSearch(dst);
        var fromSourcetoMetro = domesticRoute.path(src,nearestMetrotoSrc,{cost:true});
        var fromSourcetoMetroPath = fromSourcetoMetro.path;
        console.log(fromSourcetoMetroPath);
        var fromSourcetoMetroLength = fromSourcetoMetroPath.length;
var toMetroDist=fromSourcetoMetro.cost;
var toMetroDistance = `Distance to Metro is ${fromSourcetoMetro.cost} Kilometers`;


      for (i = 0; i < fromSourcetoMetroPath.length; i++) {
        fromSourcetoMetroPath[i] = capitalizeFirstLetter(fromSourcetoMetroPath[i]);
      }

      fromSourcetoMetroPath = fromSourcetoMetroPath.toString().replace(/,/g, ' to ');
      console.log(fromSourcetoMetroPath);
      var fromSourcetoMetroPath = "Domestic ROUTE to Metro: " + fromSourcetoMetroPath;


      var result = metroRoute.path(nearestMetrotoSrc, nearestMetrotoDst, {cost: true});

      var stations = `Number of stations: ${result.cost}`;
      var metroTime = result.cost * 3 ;
      var metroPath = result.path;

      for (i = 0; i < metroPath.length; i++) {
        metroPath[i] = capitalizeFirstLetter(metroPath[i]);
      }

      metroPath = metroPath.toString().replace(/,/g, ' to ');
      var metroResult = "Metro ROUTE: " + metroPath;


      var result = domesticRoute.path(nearestMetrotoDst, dst, {cost: true});
      var domesticDistance = `Distance is ${result.cost} Kilometers`;
      var domesticPath = result.path;
      var cost = `Total Cost of your trip is ${(domesticPath.length +fromSourcetoMetroLength) * 1.75 + 2} Pounds`;
      var time = `Estimated total time of your trip is ${(result.cost + toMetroDist)  * 1.25 + metroTime} Minutes`;
      for (i = 0; i < domesticPath.length; i++) {
        domesticPath[i] = capitalizeFirstLetter(domesticPath[i]);
      }

      domesticPath = domesticPath.toString().replace(/,/g, ' to ');
      var domesticResult = "Domestic ROUTE: " + domesticPath;

      res.json({
        "messages": [
          {
              "text":fromSourcetoMetroPath
          },
          {
            "text":toMetroDistance
          },
          {
            "text": metroResult
          }, {
            "text": stations
          }, {
            "text": domesticResult
          }, {
            "text": domesticDistance
          },{
            "text": cost
          },{
            "text":time
          }
        ]
      });

    }
    else{
    for (i = 0; i < path.length; i++) {
      path[i] = capitalizeFirstLetter(path[i]);
    }

    path = path.toString().replace(/,/g, ' to ');
    var result = "ROUTE: " + path;

    res.json({
      "messages": [
        {
          "text": result
        }, {
          "text": stations
        }, {
          "text": cost
        }, {
          "text": time
        }
      ]
    });

}

  } else if (choice[0] === 'Domestic') {

    var result = domesticRoute.path(src, dst, {cost: true});
    var distance = `Distance is ${result.cost} Kilometers`;
    var path = result.path;
    var cost = `Cost is ${path.length * 1.75} Pounds`;
    var time = `Estimated time is ${result.cost * 1.25} Minutes`;
    for (i = 0; i < path.length; i++) {
      path[i] = capitalizeFirstLetter(path[i]);
    }

    path = path.toString().replace(/,/g, ' to ');
    var result = "ROUTE: " + path;

    res.json({
      "messages": [
        {
          "text": result
        }, {
          "text": stations
        }, {
          "text": cost
        }, {
          "text": time
        }
      ]
    });

  } else if (choice[0] === 'Uber') {

    var result = domesticRoute.path(src, dst, {cost: true});
    var distance = `Distance is ${result.cost} Kilometers`;
    var path = result.path;
    var cost = `Cost is ${result.cost * 3} Pounds`;
    var time = `Estimated time is ${result.cost * 1.15.toFixed(2)} Minutes`;
    for (i = 0; i < path.length; i++) {
      path[i] = capitalizeFirstLetter(path[i]);
    }

    path = path.toString().replace(/,/g, ' to ');
    var result = "ROUTE: " + path;

    res.json({
      "messages": [
        {
          "text": result
        }, {
          "text": stations
        }, {
          "text": cost
        }, {
          "text": time
        }
      ]
    });

  }
});

app.listen(port, () => {
  console.log(`Chatfuel is up on ${port}`);
});
