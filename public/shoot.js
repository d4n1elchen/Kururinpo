var maxShootCnt = 100;
if(isMobile) maxShootCnt = 30;

$("#high span").text("x0");

var shootBtn = $("#shoot");
shootBtn.click(function(){
  ga('send', 'event', 'Shoot', 'click');
  socket.emit('shoot', 'hi');
})

socket.on('shot', function (cnt) {
  $("#high span").text("x"+cnt);
  shoot('咕嚕靈波(●´∀`)ノ♡', maxShootCnt);
});

socket.on('first shot', function (cnt) {
  $("#high span").text("x"+cnt);
  shoot('咕嚕靈波(●´∀`)ノ♡', maxShootCnt);
});

var n = 0;
function shoot(html, maxShootCnt = 100){
  if (n < maxShootCnt) {
    let id = 'b' + getUniqeId();
    let w = $(window).width() + 50;
    let h = ($(window).height() - 50 - 100) * Math.random() + 50;
    let m = $('<span>').addClass('bullet')
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
}
setInterval(() => { n = 0; }, 2000);

function getUniqeId() {
  return (new Date().valueOf()) % 1000000;
}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}