const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const score = document.getElementById('score');
var asJump = false;
var contador = 0;
var asPassou = false;
var asContagem = false;

const pular = () => {
    if(!asJump){
        asJump=true;
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
            asJump=false;
        }, 500);
    }
}
const gameOver = (marioPosition) =>
{
    mario.src = '/img/game-over.png';
    mario.style.marginLeft = '50px';
    mario.classList.remove('mario');
    mario.classList.add('gameover');
    document.removeEventListener('keydown', pular);
}

const Passou = () =>
{
    if(!asPassou)
    {
        asPassou = true;
        contador++;
        score.innerHTML = "Score : "+contador
    }
}


const loop = setInterval(() =>{

    const pipePosition = pipe.offsetLeft;
    if(pipePosition > 0)
    {
        asPassou = false;
    }
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80)
    {
        
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`
        /*
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`
        */
        gameOver(marioPosition);
        clearInterval(loop);
    }
    if(pipePosition < 0)
    {
        Passou();
    }

}, 10);

document.addEventListener('keydown', pular);
