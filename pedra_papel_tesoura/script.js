let player = document.getElementById("player-result"); // div com o campo do jogador
let computer = document.getElementById("computer-result"); // div com o campo do computador
let choices = Array.from(document.getElementsByClassName("choice")); // Array com as escolhas de gestos possíveis
let divChoices = document.getElementById("div-choices"); // div contendo as escolhas dos gestos possíveis
let msg = document.getElementById("span-title"); // span com uma mensagem
let winningStreak = document.getElementById("winning-streak"); // span que mostra a sequência de vitórias
let bestStreak = document.getElementById("best-streak"); // span que mostra a melhor sequência de vitórias

// Função que gera um número aleatório para ser a jogada do computador
function computerChoice(){
    return Math.floor(Math.random() * 3 + 1);
}

// Função que retorna o emoji de acordo com o número recebido
function getEmoji(num){
    if(num == 1)
        return "✊";
    else if(num == 2)
        return "🖐";
    else
        return "✌";
}

// Função que retorna vitória, derrota ou impate, comparando as escolhas do jogador e do computador
function checkWinner(playerGesture, computerGesture){
    if(playerGesture == 1){
        if(computerGesture == 3)
            return "win";
        else if(computerGesture == 2)
            return "lose";
        else
            return "draw";
    }else if(playerGesture == 2){
        if(computerGesture == 1)
            return "win";
        else if(computerGesture == 3)
            return "lose";
        else
            return "draw";
    }else{
        if(computerGesture == 2)
            return "win";
        else if(computerGesture == 1)
            return "lose";
        else
            return "draw";
    }
}

// Função que atualiza os valores da sequência de vitórias e da melhor sequência de vitórias
function updateStreaks(win){
    if (win){
        winningStreak.innerText++;
        if(winningStreak.innerText > bestStreak.innerText)
            bestStreak.innerText = winningStreak.innerText;
    }else
        winningStreak.innerText = 0;
}

// Função que adiciona e remove as animações das jogadas, altera a mensagem do jogo e esconde as opções de gestos durante o jogo
function playing(pc, cc){
    player.classList.add("playing-player"); // Adiciona a animação de jogando ao campo do jogador
    computer.classList.add("playing-computer"); // Adiciona a animação de jogando ao campo do computador
    player.innerHTML = computer.innerHTML = "✊";
    divChoices.style.visibility = "hidden"; // Esconde as escolhas de gestos
    msg.innerHTML = ""; // Esconde a mensagem
    setTimeout(() => {
        player.classList.remove("playing-player"); // Remove a animação de jogando ao campo do jogador
        computer.classList.remove("playing-computer"); // Remove a animação de jogando ao campo do computador
        player.innerHTML = getEmoji(pc); // Altera a imagem do campo do jogador para a sua escolha
        computer.innerHTML = getEmoji(cc); // Altera a imagem do campo do computador para a escolha dele
        let result = checkWinner(pc, cc); // Recebe quem ganhou
        if(result == "win"){
            msg.innerHTML = "VITÓRIA!!";
            updateStreaks(true);
        }else if(result == "lose"){
            msg.innerHTML = "Ops... Tente novamente!";
            updateStreaks(false);
        }else
            msg.innerHTML = "Empate!";
        setTimeout(() => {
            divChoices.style.visibility = "visible"; // Mostra novamente as escolhas de gestos
        }, 1000);
    }, 900);
}

// Função que permite a seleção do gesto do jogador
choices.forEach(c => {
    c.addEventListener("click", (e) => {
        let pc = e.target.dataset.gesture; // "PlayerChoice", é a escolha do jogador
        let cc = computerChoice(); // "ComputerChoice", é a escolha do computador
        playing(pc, cc); // Chama a função da jogada
        
    })
})

/*
    winning streak
    easter egg para 10 vitórias seguidas
    música (volume, mutar, trocar música)
    fundo de acordo com a música
    animações (gestos, confete)
    frases dinâmicas
*/