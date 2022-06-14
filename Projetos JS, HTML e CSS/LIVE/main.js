'use strict';

//const formatarDigito = (numero) => numero < 10 ? '0'+numero : numero;
const formatarDigito = (numero) => `0${numero}`.slice(-2)

const atualizar = (tempo) =>{
    const segundos = document.getElementById('segundos');
    const minutos = document.getElementById('minutos');
    const horas = document.getElementById('horas');
    const dias = document.getElementById('dias');

    const qntSegundos = tempo % 60;
    const qntMinutos = Math.floor((tempo % (60 * 60))/60);
    const qntHoras = Math.floor((tempo % (60 * 60 * 24))/(60*60));
    const qntdias = Math.floor(tempo / (60*60*24));

    segundos.textContent = formatarDigito(qntSegundos);
    minutos.textContent = formatarDigito(qntMinutos);
    horas.textContent = formatarDigito(qntHoras);
    dias.textContent = formatarDigito(qntdias);
}

const contagemRegressiva = (tempo) => {
    const pararContagem = () => clearInterval(id);
    const contar = () => {
        if(tempo == 0){
            pararContagem();
        }
        atualizar(tempo);
        tempo--;
    }
    const id = setInterval(contar, 1000); ///Executa um temporizados (callback, 'tempo')
} 

const tempoRestante = () => {
    const dataEvento = new Date('2022-10-27 20:00:00')
    const hoje = Date.now();
    return Math.floor((dataEvento - hoje) / 1000);
}
contagemRegressiva(tempoRestante());