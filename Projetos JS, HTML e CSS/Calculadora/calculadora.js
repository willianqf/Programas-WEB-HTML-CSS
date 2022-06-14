'use strict';

console.log("Seja bem vindo ao programando WEB");

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id *= tecla]'); /// *= indica que qualquer elemento que tenha a array 'tecla'
const operadores = document.querySelectorAll('[id *= operador]');

let novoNumero = true;
let operador;
let numeroAnterior;

const atualizarDisplay = (texto) =>{
    const textoAtualizar = String(texto);
    if(novoNumero)
    {
        display.textContent = textoAtualizar.replace(',', '.');  
        novoNumero = false;
    }else{
        display.textContent += textoAtualizar.replace(',', '.');
    }
}

const inserirNumero = (evento) => {
    atualizarDisplay(evento.target.textContent);
}
numeros.forEach(
    numero => numero.addEventListener('click', inserirNumero)
);

const operacaoPendente = () => operador !== undefined;

const calcular = () =>
{
    if(operacaoPendente())
    {
        const numeroAtual = parseFloat(display.textContent.replace(',', '.'));
        novoNumero = true;
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);
    }
}

const selecionarOperador = (evento) =>
{
    if(!novoNumero)
    {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.'));
    }
}

operadores.forEach(
    operadores => operadores.addEventListener('click', selecionarOperador)
);

const ativarIgual = () =>
{
    calcular();
    operador = undefined;
}

const limparDisplay = () => display.textContent = '';
const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}

const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
}

const existedecimal = () => display.textContent.indexOf(',') != -1;
const existeValor = () => display.textContent.length > 0;

const inserirDecimal = () =>{
    if(!existedecimal())
    {
        if(existeValor())
        {
            atualizarDisplay(',');
        }
        else
        {
            atualizarDisplay('0,');
        }
    }
}

const mapaTeclado = {
    '0' : 'tecla0',
    '1' : 'tecla1',
    '2' : 'tecla2',
    '3' : 'tecla3',
    '4' : 'tecla4',
    '5' : 'tecla5',
    '6' : 'tecla6',
    '7' : 'tecla7',
    '8' : 'tecla8',
    '9' : 'tecla9'
}

const mapearTeclado = (evento) =>
{
    const tecla = evento.key;
    const teclaPermitida = () => 
    {
        return Object.keys(mapaTeclado).indexOf(tecla) != -1;
    }
    if(teclaPermitida())
    {
        document.getElementById(mapaTeclado[tecla]).click();
    }

}

document.addEventListener('keydown', mapearTeclado);

document.getElementById('igual').addEventListener('click', ativarIgual);
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);
document.getElementById('inverter').addEventListener('click', inverterSinal);
document.getElementById('decimal').addEventListener('click', inserirDecimal);

