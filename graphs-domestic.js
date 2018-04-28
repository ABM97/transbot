const Graph = require('node-dijkstra');

const route = new Graph();

route.addNode('Maadi', { Sayeda:14 , Tagamoa:23 , Mokattam:16});
route.addNode('Mokattam', { Maadi:16, Sayeda:11,});
route.addNode('Sayeda', { Mokattam:11, Maadi:14 , FCI:5 });
route.addNode('FCI', { Sayeda:5, Dokki:3 });
route.addNode('Dokki', { FCI:3, Zamalek:4 });
route.addNode('Zamalek', { Dokki:4 });
route.addNode('AUC', { Tagamoa:10});
route.addNode('Tagamoa', {Maadi:23, AUC:10});
console.log(route.path('AUC', 'Sayeda',{cost:true}));
