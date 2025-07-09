const bgMusic = new Audio("background.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.45;

const audioInstruction = new Audio("audio_instruction.mp3");
audioInstruction.volume = 0.7;
audioInstruction.loop = true;

const eatSound = new Audio("eat.mp3");

const moveSound = new Audio("move.mp3");
moveSound.volume = 0.2;

window.addEventListener("DOMContentLoaded", () => {
  bgMusic.play().catch(() => {
    document.body.addEventListener("click", () => {
      bgMusic.play();
    }, { once: true });
  });

  // Play instruction audio, and on failure, allow user to start it on click
  audioInstruction.play().catch(() => {
    document.body.addEventListener("click", () => {
      audioInstruction.play();
    }, { once: true });
  });

  // Always stop audio_instruction.mp3 on first user interaction
  document.body.addEventListener("click", () => {
    audioInstruction.pause();
    audioInstruction.currentTime = 0;
  }, { once: true });

  createBubbles();
});

let touchStartX = 0;
      let touchStartY = 0;

      canvas1.addEventListener('touchstart', function(e) {
          const touch = e.touches[0];
          touchStartX = touch.clientX;
          touchStartY = touch.clientY;
      });

      canvas1.addEventListener('touchend', function(e) {
          const touch = e.changedTouches[0];
          const dx = touch.clientX - touchStartX;
          const dy = touch.clientY - touchStartY;

          if (Math.abs(dx) > Math.abs(dy)) {
              // Horizontal swipe
              if (dx > 30) {
                  DIRECTION = 'RIGHT';
              } else if (dx < -30) {
                  DIRECTION = 'LEFT';
              }
          } else {
              // Vertical swipe
              if (dy > 30) {
                  DIRECTION = 'DOWN';
              } else if (dy < -30) {
                  DIRECTION = 'UP';
              }
          }
      });

window.addEventListener('keydown', function(event){
    let moved = false;
    if(event.key === 'ArrowUp') { Snake.moveUp(); moved = true; }
    else if(event.key === 'ArrowDown') { Snake.moveDown(); moved = true; }
    else if(event.key === 'ArrowLeft') { Snake.moveLeft(); moved = true; }
    else if(event.key === 'ArrowRight') { Snake.moveRight(); moved = true; }

    if (moved) {
        moveSound.currentTime = 0;
        moveSound.play();
    }
});

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = GAME.width;
    canvas.height = GAME.height;
    ctx.font = '18px "Press Start 2P"';
    ctx.textBaseline = 'top';

    resetGame();
    GAME.started = false;

    canvas.addEventListener('click', () => {
        if (!GAME.started) {
            GAME.started = true;
        }
        if(GAME.gameOver){
            resetGame();
            GAME.loop = setInterval(animate, 300);
        }
    });

    function animate(){
        ctx.clearRect(0,0,canvas.width,canvas.height);

        Snake.draw(ctx);
        Food.draw(ctx);

        if (GAME.started) {
            Snake.update();

            if (Snake.ateFood) {
              eatSound.currentTime = 0;
              eatSound.play();
              Snake.ateFood = false;
            }
        }
       
        if (GAME.gameOver){
            ctx.textAlign = 'center';
            ctx.fillStyle = 'black';
            ctx.font = '40px "Press Start 2P"';
            ctx.fillText('GAME OVER!', GAME.width * 0.5, GAME.height * 0.4, GAME.width * 0.95);

            ctx.font = '18px "Press Start 2P"';
            ctx.fillText('Click her to restart!', GAME.width * 0.5, GAME.height * 0.4 + 60, GAME.width * 0.95);
            clearInterval(GAME.loop);
        }
    }

    GAME.loop = setInterval(animate, 300);
});