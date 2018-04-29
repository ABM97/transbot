var locations=['maadi','fci','dokki','tagamoa','sayeda', 'mokattam', 'auc', 'zamalek'];
var match = require('levenshtein-edit-distance');

var src='';
var originalSource="not defined yet";



var getMatch = (loc) => {
  loc = loc.toLowerCase();
  var min = match(loc, locations[0]);
  originalSource = locations[0];
  for(i=1;i<locations.length;i++){
      if(match(loc, locations[i]) < min)
        {
          min = match(loc,locations[i]);
          originalSource = locations[i];
        }
  }
  return  min > 2 ?  undefined :  originalSource;

}


// console.log(getMatch('zamalk'));
module.exports = {getMatch};
