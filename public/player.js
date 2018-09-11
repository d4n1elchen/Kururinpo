// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
  player = new YT.Player('ytplayer', {
    videoId: 'QYGZv24nsGw',
    suggestedQuality: 'hd1080',
    playerVars: { 'autoplay': 1, 'controls': 0, 'rel': 0, 'showinfo': 0, },
    events: {
      onStateChange: (e) => {
        if (e.data === YT.PlayerState.ENDED) {
          player.playVideo(); 
        }
      }
    }
  });
}