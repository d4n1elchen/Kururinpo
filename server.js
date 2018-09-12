var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var firebase = require("firebase");

var firebaseConfig = require("./firebase-config")
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});
var cntRef = db.collection('count').doc('count');

var port = process.env.PORT || 3000;
server.listen(port);

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var cnt = 0;
cntRef.get().then((doc) => {
  cnt = doc.data().cnt
  io.on('connection', async function (socket) {
    console.log('Client connaected, current cnt: '+cnt);
    socket.emit('first shot', cnt);
    socket.on('shoot', function (data) {
      cntRef.set({ cnt: ++cnt });
      io.sockets.emit('shot', cnt);
    });
  });
  setInterval(async () => {
    const inc = Math.floor(Math.random()*10);
    for(let i = 0; i < inc; i++) {
      cntRef.set({ cnt: ++cnt });
      io.sockets.emit('shot', cnt);
      await sleep(Math.floor(Math.random()*300));
    }
  }, 2000)
})

function sleep(ms){
  return new Promise(resolve=>{
      setTimeout(resolve, ms)
  })
}