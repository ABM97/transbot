const Graph = require('graphlib').Graph;
const PQ = require('js-priority-queue');

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

  do {
    var current = q.dequeue();
    explored.add(current.dest);
    if (isGoal(current.dest)) {
      var arr = explored.toArray();
      for (i = 0; i < arr.length; i++) {
        explored.remove(arr[i]);
      }
      q.clear();

      return current.dest;
    }
    var arr = domesticGraph.nodeEdges(current.dest);

    for (i = 0; i < arr.length; i++) {
      var child = {
        dest: '',
        pathCost: 0,
        parent: 'null'
      };
      if (current.dest === arr[i].v)
        child.dest = arr[i].w;
      else
        child.dest = arr[i].v;
      var cost = domesticGraph.edge(current.dest, child.dest);
      child.pathCost = cost + current.pathCost;

      if (!explored.contains(child.dest) && !findElement(child.dest)) {
        child.parent = current.dest;
        q.queue(child);
      } else if (findElement(child.dest) && (child.pathCost > current.pathCost)) {
        child.parent = current.dest;
        removeElement(child.dest);
        q.queue(child);
      }
    }
  } while (q.length !== 0);

}

module.exports = {
  UniformCostSearch
};
