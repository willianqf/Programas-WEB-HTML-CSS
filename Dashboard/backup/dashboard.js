let lista = document.querySelectorAll('.navigation li')
// HOVER ///
let toggle = document.querySelector('.toggle')
let navigation = document.querySelector('.navigation')
let main = document.querySelector('.main')

toggle.onclick = function()
{
    navigation.classList.toggle('active')
    main.classList.toggle('active')
}



function AtivarLink()
{
    lista.forEach((item) =>
    item.classList.remove('hovered'))
    this.classList.add('hovered')
}


lista.forEach((item) => item.addEventListener('mouseover', AtivarLink))