const character = document.querySelector('.character');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 100;
let speed = 10;

function handleKeyUp(event) {
  if (event.keyCode === 32 || event.keyCode === 38) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 250) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 100) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 10;
          character.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 10;
      character.style.bottom = position + 'px';
    }
  }, 10);
}

function createSword() {
  const sword = document.createElement('div');
  let swordPosition = 1500;
  let randomTime = Math.floor(Math.random() * 1000) + 1500;
  speed += 0.8;
  console.log(speed);
  if (isGameOver) return;

  sword.classList.add('sword');
  background.appendChild(sword);
  sword.style.left = swordPosition + 'px';

  let leftTimer = setInterval(() => {
    if (swordPosition < -5) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(sword);
    } else if (swordPosition > 0 && swordPosition < 60 && position < 140) {
      // Game over
      clearInterval(leftTimer);
      gameOver();
    } else {
      swordPosition -= speed;
      sword.style.left = swordPosition + 'px';
    }
  }, 20);

  setTimeout(createSword, randomTime);
}

function gameOver() {
  isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';

      let resetLink = document.createElement('a');
      let createText = document.createTextNode("Reset");
      let thisUrl = document.URL;
      resetLink.classList.add('reset');

      resetLink.setAttribute('href', thisUrl);
      resetLink.appendChild(createText);
      document.body.appendChild(resetLink);
}

createSword();
document.addEventListener('keyup', handleKeyUp);
