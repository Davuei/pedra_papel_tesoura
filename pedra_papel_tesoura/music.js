const musicPlayer = document.getElementById("music-player");
const btnPlayer = document.getElementById("btn-player");

let playingMusic = false;

btnPlayer.addEventListener("click", () => {
    if(playingMusic){
        musicPlayer.pause();
        playingMusic = false;
    }
    else{
        musicPlayer.play();
        playingMusic = true;
    }
})
