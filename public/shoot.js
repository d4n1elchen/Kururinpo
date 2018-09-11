var shoot_count = 1;
var shootBtn = $("#shoot");

$("#high span").text("x"+shoot_count);

shootBtn.click(function(){
  ga('send', 'event', 'Shoot', 'click');
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


