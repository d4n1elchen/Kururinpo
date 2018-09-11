var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var JsonDB = require('node-json-db');
var db = new JsonDB("db", true, false);

var port = process.env.PORT || 3000;
server.listen(port);

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('first shot', db.getData("/count"));
  socket.on('shoot', function (data) {
    db.push("/count", db.getData("/count")+1);
    db.save();
    io.sockets.emit('shot', 1);
  });
});
