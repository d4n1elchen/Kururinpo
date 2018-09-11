var bits = [2, 1, 1, 2, 4, 2]
var bits2 =[2, 1, 1, 2, 3, 2]
var bits3 =[2, 1, 1, 2, 2, 2]
var hits = []
var last_click = 0;

function normalized() {
  var min = _.min(hits);
  return hits.map((h) => Math.floor(h/min+.5));
}

function judge() {
  // console.log(hits);
  // console.log(normalized());
  if(hits.length == bits.length) {
    var n_hits = normalized();
    if(_.isEqual(n_hits, bits) || _.isEqual(n_hits, bits2)) {
      prompt("Congradurations!", "CHICKEN:大爆射!!!:ATTACK");
    }
  } else if(hits.length > bits.length) {
    while(hits.length > bits.length) hits.shift();
    var n_hits = normalized();
    if(_.isEqual(n_hits, bits) || _.isEqual(n_hits, bits2)) {
      prompt("Congradurations!", "CHICKEN:大爆射!!!:ATTACK");
    }
  }
}

function push() {
  if(!(hits.length != 0 || last_click != 0)) last_click = new Date();
  else {
    var curr_click = new Date();
    hits.push(curr_click - last_click);
    judge();
    last_click = curr_click;
  }
}
