const Graph = require('node-dijkstra');

const metroRoute = new Graph();

metroRoute.addNode('Maadi', { Sayeda:6 , Dokki:10 ,FCI:12});
metroRoute.addNode('Sayeda', { Dokki:4, Maadi:6 , FCI:6});
metroRoute.addNode('FCI', { Dokki:2,Sayeda:6,Maadi:12 });
metroRoute.addNode('Dokki', { Maadi:10,FCI:2, Sayeda:4 });
//console.log(metroRoute.path('Maadi', 'FCI',{cost:true}));

module.exports={metroRoute};
