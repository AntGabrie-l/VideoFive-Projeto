const menuButtons = document.querySelectorAll(".menu-button");
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".overlay");

// Função para travar o body scroll
function toggleBodyScroll(preventScroll) {
    //Se a ativação do sidebar for verdadeira, atribui os valores a body tag
  if (preventScroll) {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

  } else {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }
}

// Ativa sidebar quando menu é clicado
menuButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpening = document.body.classList.contains('sidebar-hidden');
        document.body.classList.toggle("sidebar-hidden");
        
        toggleBodyScroll(isOpening);
    });
});

// Fecha sidebar ao clicar no overlay
overlay.addEventListener("click", () => {
    document.body.classList.add("sidebar-hidden");
    toggleBodyScroll(false);
});

// Previne que clicks dentro do sidebar o fechem
sidebar.addEventListener("click", (event) => {
    event.stopPropagation();
});

// Sidebar inicializa como escondido para desktops
if (window.innerWidth > 768) {
    document.body.classList.add("sidebar-hidden");
}


// Atualizão de likes e dislikes
let likeCount = 80000; 
let dislikeCount = 200;
let currentState = null; 

function updateButtons() {
  const likeBtn = document.querySelector('.gostei-botao');
  const dislikeBtn = document.querySelector('.dislike-botao');
  
  likeBtn.classList.remove('active');
  dislikeBtn.classList.remove('active');
  
  if(currentState === 'liked') {
    likeBtn.classList.add('active');
  } else if(currentState === 'disliked') {
    dislikeBtn.classList.add('active');
  }
}

function handleLike() {
  if(currentState === 'liked') {
    // Remover like
    likeCount--;
    currentState = null;
  } else {
    // Adicionar/alterar like
    likeCount += (currentState === 'disliked') ? 1 : 1;
    dislikeCount -= (currentState === 'disliked') ? 1 : 0;
    currentState = 'liked';
  }
  
  updateDisplay();
  updateButtons();
}

function handleDislike() {
  if(currentState === 'disliked') {
    // Remover dislike
    dislikeCount--;
    currentState = null;
  } else {
    // Adicionar/alterar dislike
    dislikeCount += (currentState === 'liked') ? 1 : 1;
    likeCount -= (currentState === 'liked') ? 1 : 0;
    currentState = 'disliked';
  }
  
  updateDisplay();
  updateButtons();
}

function updateDisplay() {
  document.getElementById('likeCount').textContent = 
    likeCount > 1000 ? `${Math.round(likeCount/1000)} mil` : likeCount;
  
  document.getElementById('dislikeCount').textContent = 
    dislikeCount > 1000 ? `${Math.round(dislikeCount/1000)} mil` : dislikeCount;
}

updateDisplay();
updateButtons();

// Variáveis de estado
let isSubscribed = false;
let notificationsOn = false;

// Função de inscrição
function handleSubscribe() {
  isSubscribed = !isSubscribed;
  const btn = document.querySelector('.inscricao-botao');
  const bell = document.querySelector('.sininho');
  
  if(isSubscribed) {
    btn.innerHTML = `Inscrito`;
    btn.classList.add('subscribed');
    bell.style.display = 'flex';
  } else {
    btn.innerHTML = `Inscrever-se`;
    btn.classList.remove('subscribed');
    bell.style.display = 'none';
    notificationsOn = false;
    bell.classList.remove('active');
  }
}

// Função do sino de notificações
function toggleNotifications() {
  if(!isSubscribed) return;
  
  notificationsOn = !notificationsOn;
  const bell = document.querySelector('.sininho');
  
  if(notificationsOn) {
    bell.classList.add('active');
    bell.innerHTML = `<span class="material-symbols-outlined">notifications_active</span>`;
  } else {
    bell.classList.remove('active');
    bell.innerHTML = `<span class="material-symbols-outlined">notifications</span>`;
  }
}

document.querySelector('.sininho').style.display = 'none';


