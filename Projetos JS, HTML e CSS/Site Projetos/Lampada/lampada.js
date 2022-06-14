const turnOn = document.getElementById ('turnOn');
const turnOff = document.getElementById ('turnOff');
const lamp = document.getElementById ('lamp');
Lampquebrada = false;

function isLampBroken()
{
    return lamp.src.indexOf( 'quebrada') > -1; ///INDEXOF - procura uma string dentro de uma string
}

function lampOn()
{
    if(isLampBroken() === false)
    {
        lamp.src = './img/ligada.jpg';
    }
}
function lampOff()
{
    if(isLampBroken() === false)
    {
        lamp.src = './img/desligada.jpg';
    }
}
function lampbroken()
{
    //Lampquebrada = true;
    lamp.src = './img/quebrada.jpg';

}

turnOn.addEventListener('click', lampOn);
turnOff.addEventListener('click', lampOff);
lamp.addEventListener('mouseover', lampOn);
lamp.addEventListener('mouseleave', lampOff);
lamp.addEventListener('dblclick', lampbroken);
