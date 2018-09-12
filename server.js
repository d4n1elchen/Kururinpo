var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

var port = process.env.PORT || 3000;
server.listen(port);

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var cnt = 0;
client.query('SELECT count FROM kururinpo;').then((res) => {
  cnt = res.rows[0].count
  io.on('connection', async function (socket) {
    console.log('Client connected, current cnt: '+cnt);
    socket.emit('first shot', cnt);
    socket.on('shoot', function (data) {
      io.sockets.emit('shot', ++cnt);
    });
  });
  setInterval(async () => {
    const inc = Math.floor(Math.random()*10);
    for(let i = 0; i < inc; i++) {
      io.sockets.emit('shot', ++cnt);
      await sleep(Math.floor(Math.random()*300));
    }
  }, 2000)
  setInterval(() => {
    client.query('UPDATE kururinpo SET count=$1;', [cnt], (err, res) => {
      console.log(err ? err.stack : "UPDATE Success! Current cnt = "+cnt)
    });
  }, 10000)
})

function sleep(ms){
  return new Promise(resolve=>{
      setTimeout(resolve, ms)
  })
}