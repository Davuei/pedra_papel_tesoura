const player = document.getElementById("player-result"); // div com o campo do jogador
const computer = document.getElementById("computer-result"); // div com o campo do computador
const choices = Array.from(document.getElementsByClassName("choice")); // Array com as escolhas de gestos possíveis
const divChoices = document.getElementById("div-choices"); // div contendo as escolhas dos gestos possíveis
const msg = document.getElementById("span-title"); // span com uma mensagem
const winningStreak = document.getElementById("winning-streak"); // span que mostra a sequência de vitórias
const bestStreak = document.getElementById("best-streak"); // span que mostra a melhor sequência de vitórias

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
    else if(num == 3)
        return "✌";
    else if(num == 4)
        return "🙌";
    else
        return "👏";
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
function updateStreak(win){
    if (win){
        winningStreak.innerText++; // Atualiza a sequência de vitórias
        if(winningStreak.innerText > bestStreak.innerText){
            bestStreak.innerText = winningStreak.innerText; // Atualiza a melhor sequência de vitórias
            localStorage.setItem("bestWinningStreak", bestStreak.innerText); // Salva localmente a melhor sequência de vitórias
        }
    }else
        winningStreak.innerText = 0;
}

// Função que aplica as animações de vitória e derrota
function matchResultAnimations(result){
    setTimeout(() => {
        player.classList.remove("playing"); // Remove a animação de jogando ao campo do jogador
        computer.classList.remove("playing"); // Remove a animação de jogando ao campo do computador
        divChoices.style.visibility = "visible"; // Mostra novamente as escolhas de gestos

        if(result == "win"){
            player.classList.add("winner");
            computer.classList.add("loser");
            player.innerHTML = getEmoji(4);
            computer.innerHTML = getEmoji(5);
        }else if(result == "lose"){
            player.classList.add("loser");
            computer.classList.add("winner");
            player.innerHTML = getEmoji(5);
            computer.innerHTML = getEmoji(4);
        }else{
            //faz alguma coisa aki kk
        }
    }, 800);
}

// Função que adiciona e remove as animações das jogadas, altera a mensagem do jogo e esconde as opções de gestos durante o jogo
function playing(pc, cc){
    player.classList.add("playing"); // Adiciona a animação de jogando ao campo do jogador
    computer.classList.add("playing"); // Adiciona a animação de jogando ao campo do computador
    player.innerHTML = computer.innerHTML = "✊";

    divChoices.style.visibility = "hidden"; // Esconde as escolhas de gestos

    msg.innerHTML = ""; // Esconde a mensagem

    setTimeout(() => {
        player.innerHTML = getEmoji(pc); // Altera a imagem do campo do jogador para a sua escolha
        computer.innerHTML = getEmoji(cc); // Altera a imagem do campo do computador para a escolha dele
        let result = checkWinner(pc, cc); // Recebe quem ganhou
        if(result == "win"){
            msg.innerHTML = "VITÓRIA!!";
            updateStreak(true);
            matchResultAnimations(result);
        }else if(result == "lose"){
            msg.innerHTML = "Ops... Tente novamente!";
            updateStreak(false);
            matchResultAnimations(result);
        }else
            msg.innerHTML = "Empate!";
            matchResultAnimations(result);
    }, 1200);
}

// Função que permite a seleção do gesto do jogador
choices.forEach(c => {
    c.addEventListener("click", (e) => {
        player.classList.remove("winner", "loser");
        computer.classList.remove("winner", "loser");

        let pc = e.target.dataset.gesture; // "PlayerChoice", é a escolha do jogador
        let cc = computerChoice(); // "ComputerChoice", é a escolha do computador

        playing(pc, cc); // Chama a função da jogada 
    })
})

//Função para carregar algumas configurações iniciais do jogo
function initialConfig(){
    bestStreak.innerText = localStorage.getItem("bestWinningStreak"); // Carrega a melhor sequência de vitórias do localStorage
}

//Chama a função para carregar as configurações iniciais
initialConfig();

/*
    winning streak
    easter egg para 10 vitórias seguidas
    música (volume, mutar, trocar música)
    fundo de acordo com a música
    animações (gestos, confete)
    frases dinâmicas
*/