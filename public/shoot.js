var shoot_count = 1;
var shootBtn = $("#shoot");

var pos = shootBtn.position();
var x0 = pos.left + shootBtn.width()/2;
var y0 = pos.top + shootBtn.height()/2;
var g = -0.5;

var shoots = ['shoot.gif', 'bigshoot.gif', 'spinshoot.gif', 'bigspinshoot.gif'];

$(".high span").text("x"+shoot_count);

shootBtn.click(function(){
  ga('send', 'event', 'Shoot', 'click');
  var randomx = Math.floor(Math.random()*(window.innerWidth/10));
  var randomy = Math.floor(Math.random()*(window.innerHeight/15));
  // console.log(randomx+","+randomy);
  parabola([(window.innerWidth/20)-randomx, randomy]);
  socket.emit('shoot', 'hi');
  push();
})

socket.on('shot', function (data) {
  shoot_count += data;
  $(".high span").text("x"+shoot_count);
});

socket.on('first shot', function (data) {
  shoot_count = data;
  $(".high span").text("x"+shoot_count);
});

function parabola(v) {
  var random = Math.floor(Math.random()*shoots.length);
  var src = shoots[random];
  let img = $("<img>").attr('src',src).addClass('gif').css({width: '100px', height: '100px'});
  $("body").append(img);
  img.offset({top: y0-50, left: x0-50});
  setTimeout(updatePos.bind(null, 1), 23);
  function updatePos(t) {
    var x = x0 + v[0]*t;
    var y = y0 - (v[1]*t + 1/2*g*t*t);
    img.offset({top: y-50, left: x-50});
    t = t+1;
    if(img.position().top > window.innerHeight
        || img.position().top < -img.height()
        || img.position().left > window.innerWidth
        || img.position().left < -img.width())
      img.remove();
    else
      setTimeout(updatePos.bind(null, t), 23);
  }
}

