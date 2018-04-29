const Graph = require('node-dijkstra');

const metroRoute = new Graph();

metroRoute.addNode('maadi', { sayeda:6 , dokki:10 ,fci:12});
metroRoute.addNode('sayeda', { dokki:4, maadi:6 , fci:6});
metroRoute.addNode('fci', { dokki:2,sayeda:6,maadi:12 });
metroRoute.addNode('dokki', { maadi:10,fci:2, sayeda:4 });

module.exports={metroRoute};
