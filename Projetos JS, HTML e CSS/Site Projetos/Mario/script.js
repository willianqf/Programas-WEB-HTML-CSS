const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const score = document.getElementById('score');


var jump = document.getElementById('pular');
var botao = document.getElementById('botao');
var pipePosition;
var animationValue = pipe.style.animation;
var leftValue = pipe.style.left;

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
const gameOver = (pipePosition) =>
{
    mario.src = 'img/game-over.png';
    mario.style.marginLeft = '50px';
    mario.classList.remove('mario');
    mario.classList.add('gameover');
    document.removeEventListener('keydown', pular);
    jump.removeEventListener('click', jumper);
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`
    botao.removeChild(jump);
    criarButtonReiniciar();
    clearInterval(loop);
}

const criarButtonReiniciar = () =>{
    const div = document.createElement('button');
    div.id = 'reiniciar';
    div.type = 'button';
    div.className= 'btn btn-primary';
    div.style = 'width: 150px;'
    div.innerHTML = 'Reiniciar';
    div.addEventListener('click', restartGame);
    botao.appendChild(div);

}

const criarButtonPular = () =>{
    const reiniciar = document.getElementById('reiniciar');
    botao.removeChild(reiniciar);
    div = document.createElement('button');
    div.id = 'pular';
    div.type = 'button';
    div.className= 'btn btn-dark';
    div.style = 'width: 150px;'
    div.innerHTML = 'Pular';
    div.addEventListener('click', pular);
    botao.appendChild(div);
    jump = document.getElementById('pular');

}

const restartGame = () =>
{
    mario.src = 'img/mario.gif';
    mario.style.marginLeft = '50px';
    mario.classList.remove('gameover');
    mario.classList.add('mario');
    document.addEventListener('keydown', pular);
    jump.addEventListener('click', jumper);
    pipe.style.animation = animationValue;
    pipe.style.left = leftValue;
    contador = 0;
    score.innerHTML = "Score : 0";
    criarButtonPular();
    loop = setInterval(interval, 10);
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

const jumper = () =>
{
    pular();
}

const interval = () =>{
    pipePosition = pipe.offsetLeft;
    if(pipePosition > 0)
    {
        asPassou = false;
    }
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80)
    {
        /*

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`
        /*
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`
        */
        gameOver(pipePosition);
    }
    if(pipePosition < 0)
    {
        Passou();
    }
}

var loop = setInterval(interval, 10);

document.addEventListener('keydown', pular);
jump.addEventListener('click', jumper);
