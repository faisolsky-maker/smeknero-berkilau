
/* auto-relax-music.js */
let relaxAudio = new Audio("assets/relax.wav");
relaxAudio.loop = true;
relaxAudio.volume = 0.35;

function playRelaxMusic(){
  try{ relaxAudio.play(); }catch(e){}
}
function stopRelaxMusic(){
  try{ relaxAudio.pause(); relaxAudio.currentTime = 0; }catch(e){}
}

// Hook into existing mood logic
const OLD_selectMood = window.selectMood;
window.selectMood = function(m){
  OLD_selectMood(m);
  if(m===1 || m===2 || m===3){
    playRelaxMusic();
  } else {
    stopRelaxMusic();
  }
};
