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
  $("#high span").text("x"+shoot_count);
  if (!isMobile)
    shoot('咕嚕靈波(●´∀`)ノ♡');
});

socket.on('first shot', function (data) {
  shoot_count = data;
  $("#high span").text("x"+shoot_count);
  if (!isMobile)
    shoot('咕嚕靈波(●´∀`)ノ♡');
});

var n = 0;
function shoot(html){
  var id = 'b' + n;
  var w = $(window).width() + 50;
  var h = ($(window).height() - 50 - 100) * Math.random() + 50;
  var m = $('<span>').addClass('bullet')
                  .attr('id', id)
                  .html(html)
                  .css({left: w, top: h, color: getRandomColor()});
  $('body').append(m);
  setTimeout(function(){
    var nm = $('#'+id);
    var mw = nm.width() + 100;
    var mh = nm.height();
    var mt = nm.position().top;
    if ( (mt+mh) > $(window).height() ){
      nm.css('top', 'auto');
      nm.css('bottom', '55px');
    }
    nm.animate({left: -mw}, 10000, function(){
      $('#'+id).remove();
    });
  }, 500);
  n++;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}