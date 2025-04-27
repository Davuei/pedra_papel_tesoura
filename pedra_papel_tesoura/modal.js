const modal = document.getElementById("modal"); // modal para exibir algumas informações
const btnModal = document.getElementById("open-info-modal"); // div que serve de botão para exibir o modal
const btnClose = document.getElementById("close"); // btn para fechar o modal

// Função para abrir o modal de informações
btnModal.addEventListener("click", () => {
    modal.style.display = "flex";
})

// Evento para fechar o modal de informações clicando no botão de fechar
btnClose.addEventListener("click", () => {
    modal.style.display = "none";
})

// Evento para fechar o modal de informações clicando em qualquer lugar fora do modal
window.addEventListener("click", (e) => {
    if(e.target == modal)
        modal.style.display = "none";
})