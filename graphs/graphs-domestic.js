const Graph = require('node-dijkstra');

const domesticRoute = new Graph();

domesticRoute.addNode('maadi', { sayeda:14 , tagamoa:23 , mokattam:16});
domesticRoute.addNode('mokattam', { maadi:16, sayeda:11,});
domesticRoute.addNode('sayeda', { mokattam:11, maadi:14 , fci:5 });
domesticRoute.addNode('fci', { sayeda:5, dokki:3 });
domesticRoute.addNode('dokki', { fci:3, zamalek:4 });
domesticRoute.addNode('zamalek', { dokki:4 });
domesticRoute.addNode('auc', { tagamoa:10});
domesticRoute.addNode('tagamoa', {maadi:23, auc:10});
//console.log(domesticRoute.path('auc', 'ass',{cost:true}));

module.exports = {domesticRoute};
