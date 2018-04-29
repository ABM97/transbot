const Graph = require('graphlib').Graph;
const PQ = require('js-priority-queue');

//var lowest = queue.dequeue();  returns 5
//console.log(lowest);
var metroGraph = new Graph({directed: false});

metroGraph.setEdge("maadi", "sayeda", 6);
metroGraph.setEdge("maadi", "dokki", 10);
metroGraph.setEdge("maadi", "fci", 12);
metroGraph.setEdge("sayeda", "dokki", 4);
metroGraph.setEdge("sayeda", "maadi", 6);
metroGraph.setEdge("sayeda", "fci", 6);
metroGraph.setEdge("fci", "sayeda", 6);
metroGraph.setEdge("fci", "dokki", 2);
metroGraph.setEdge("fci", "maadi", 12);
metroGraph.setEdge("dokki", "fci", 2);
metroGraph.setEdge("dokki", "maadi", 10);
metroGraph.setEdge("dokki", "sayeda", 4);
//console.log(metroGraph.nodes());
var domesticGraph = new Graph({directed: false});

domesticGraph.setEdge("maadi", "sayeda", 14);
domesticGraph.setEdge("maadi", "tagamoa", 23);
domesticGraph.setEdge("maadi", "mokattam", 16);
domesticGraph.setEdge("mokattam", "maadi", 16);
domesticGraph.setEdge("mokattam", "sayeda", 11);
domesticGraph.setEdge("sayeda", "mokattam", 11);
domesticGraph.setEdge("sayeda", "maadi", 14);
domesticGraph.setEdge("sayeda", "fci", 5);
domesticGraph.setEdge("fci", "sayeda", 5);
domesticGraph.setEdge("fci", "dokki", 3);
domesticGraph.setEdge("dokki", "fci", 3);
domesticGraph.setEdge("dokki", "zamalek", 4);
domesticGraph.setEdge("zamalek", "dokki", 4);
domesticGraph.setEdge("auc", "tagamoa", 10);
domesticGraph.setEdge("tagamoa", "maadi", 23);
domesticGraph.setEdge("tagamoa", "auc", 10);
var arr = domesticGraph.nodeEdges("maadi");
var result = [];
for (i = 0; i < arr.length; i++) {
  result.push(arr[i].w);
}

var q = new PQ({
  comparator: (a, b) => {
    return a.pathCost - b.pathCost;
  }
});

var removeElement = (element) => {
  var arr = [];
  while (q.length !== 0) {
    var elm = q.dequeue();
    if (elm.dest !== element) {
      arr.push(elm);
    }

  }
  for (i = 0; i < arr.length; ++i) {
    q.queue(arr[i]);
  }
};
// q.queue({dest: 'ab', pathCost: 5, parent: 'no'});
// q.queue({dest: 'sd', pathCost: 2, parent: 'yes'});
//
// removeElement('sd');
// while (q.length !== 0) {
//   console.log(q.dequeue());
// }
var findElement = (element) => {
  var arr = [];
  var found = false;
  while (q.length !== 0) {
    var elm = q.dequeue();
    if (elm.dest === element) {
      found = true;
    }
    arr.push(elm);
  }
  for (i = 0; i < arr.length; ++i) {
    q.queue(arr[i]);
  }
  return found;
};

var HashSet = require('hashset');
var explored = new HashSet();

var isGoal = (node) => {
  var nodes = metroGraph.nodes();
  for (i = 0; i < nodes.length; ++i) {
    if (node === nodes[i])
      return true;
    }
  return false;
}


var UniformCostSearch = (source) => {
  q.queue({dest: source, pathCost: 0, parent: 'null'});
  //var found = false;
  //while frontier is not empty
  do {
    var current = q.dequeue();
    explored.add(current.dest);
    if (isGoal(current.dest)) {
      //console.log(current);
      return current.dest;
    }
    var arr = domesticGraph.nodeEdges(current.dest);
    //console.log(arr);
    for (i = 0; i < arr.length; i++) {
      //console.log(i);
      var child ={dest:'',pathCost:0,parent:'null'};
      if(current.dest===arr[i].v)
        child.dest = arr[i].w;
      else
        child.dest=arr[i].v;
      var cost = domesticGraph.edge(current.dest, child.dest);
      child.pathCost = cost + current.pathCost;
    ////  console.log(child);
      if (!explored.contains(child.dest) && !findElement(child.dest)) {
        child.parent=current.dest;
        q.queue(child);
      } else if (findElement(child.dest) && (child.pathCost > current.pathCost)) {
        child.parent = current.dest;
        removeElement(child.dest);
        q.queue(child);
      }
    }
  } while (q.length !== 0);

}

// var metroNeighbour = (node) => {
//   var arr = domesticGraph.nodeEdges(node);
//   q.queue({
//     dest: "null",
//     weight: domesticGraph.edge(node, 0)
//   });
//
//   while (q.length !== 0) {
//     metroNeighbour(q.dequeue.dest);
//     for (i = 0; i < arr.length; i++) {
//       q.queue({
//         dest: arr[i].w,
//         weight: domesticGraph.edge(node, arr[i].w)
//       });
//     }
//   }
//
// };
// metroNeighbour('maadi');
//console.log(result);

//console.log(domesticGraph.edge("maadi", "sayeda"));
module.exports={UniformCostSearch};
