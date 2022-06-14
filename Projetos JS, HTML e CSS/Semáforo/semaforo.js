const img = document.getElementById('img');
const buttons = document.getElementById('buttons');
let numcolor = 0;
let intervalid = null;

const traflight = ( event ) => { /// CRIA EVENTO
    stopterminal();
    turnOn[event.target.id]();
}

const changecolor = () => {
    const colors = ['red', 'yellow', 'green'];
    turnOn[colors[numcolor]]();
    numcolor = numcolor < 2 ? ++numcolor : 0;
}

const stopterminal = () => 
{
    clearInterval(intervalid);
}

const turnOn = {
    'red': () => img.src = './img/vermelho.png',
    'yellow': () => img.src = './img/amarelo.png',
    'green': () => img.src = './img/verde.png',
    'automatic': () => intervalid = setInterval(changecolor, 1000)
}

buttons.addEventListener('click', traflight);
