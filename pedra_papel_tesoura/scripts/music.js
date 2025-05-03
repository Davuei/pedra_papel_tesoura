const currentSong = document.getElementById("audio-tag"); // Variável que gerencia a música tocada
const btnPlayer = document.getElementById("btn-player"); // Botão que pausa a música
const spanDuration = document.getElementById("song-duration"); // Span que mostra a duração da música
const spanPlayed = document.getElementById("song-played"); // Span que mostra o tempo já tocado da música
const volumeRange = document.getElementById("volume"); // Input que permite regular o volume da música
const btnLoop = document.getElementById("loop-song"); // Botão que permite colocar a música em loop
const trackRange = document.getElementById("song-track"); // Input que permite regular o tempo da música

let playingMusic = false; // Variável que gerencia o play e o pause da música

// Função que permite dar play e pause na música
btnPlayer.addEventListener("click", () => {
    if(!currentSong.paused)
        currentSong.pause();
    else
        currentSong.play();

    trackRange.max = currentSong.duration; // Atualiza o valor máximo da música, para a manipulação do tempo da música

    let durationMin = Math.floor(currentSong.duration / 60); // Encontra o tempo total, em minutos, da música tocada
    let durationSec = String(Math.floor(currentSong.duration % 60)).padStart(2, "0"); // Encontra o tempo total, em segundos, da música tocada
    spanDuration.innerText = `${durationMin}:${durationSec}`; // Atualiza a duração total da música

    changeSongInfo(); // Chama o loop para a atualização das informações da música no player
})

// Função que permite deixar a música em loop
btnLoop.addEventListener("click", () => {
    if(currentSong.loop){
        currentSong.loop = false;
        btnLoop.style.color = "red";
    }else{
        currentSong.loop = true;
        btnLoop.style.color = "black";
    }
})

// Função que permite regular o volume através do input range
volumeRange.addEventListener("input", (e) => {
    currentSong.volume = (e.target.value) * 0.01; // Multiplica-se o valor do input por 0.01 porque o volume da tag audio varia de 0 a 1
    localStorage.setItem("lastVolumeUpdate", volumeRange.value); // Salva localmente o último volume colocado pelo usuário
})

// Função que permite regular o tempo através do input range
trackRange.addEventListener("input", (e) => {
    currentSong.currentTime = e.target.value; // 
})

// Função que altera as informações da música no player (tempo atual, o momento da música)
function changeSongInfo(){
    setTimeout(() => {
        if(!currentSong.paused){
            let playedMin = Math.floor(currentSong.currentTime / 60); // Encontra o tempo já passado, em minutos, da música
            let playedSec = String(Math.floor(currentSong.currentTime % 60)).padStart(2, "0"); // Encontra o tempo já passado, em segundos, da música
            spanPlayed.innerText = `${playedMin}:${playedSec}`; // Atualiza o tempo já passado da música

            trackRange.value = currentSong.currentTime; // Atualiza o valor no input de manipulação da música

            changeSongInfo();
        }
    }, 1);
}

// Função para carregar as configurações iniciais da música
function musicInitialConfig(){
    volumeRange.value = localStorage.getItem("lastVolumeUpdate"); // Carrega para o input de volume o último volume colocado pelo usuário
    currentSong.volume = volumeRange.value * 0.01; // Atualiza o volume da música para o último volume colocado pelo usuário
}

// Chama a função para carregar as configurações iniciais da música
musicInitialConfig();