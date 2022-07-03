'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => { 
    document.getElementById('modal')
    .classList.remove('active');
    document.getElementById('nome').dataset.index = 'new';
    clearFields();
}

const tempClient = {
    nome: 'Vaca Cega',
    email: 'wqeqweaa@nada.com',
    celular: '341551-5671',
    cidade: 'ItaItuiutabaperuna'
}
///CRUD - Create, Read, Update, Delete
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []; /* Se estiver vazio, retorna um array vazio */
const setLocalStorage = (db_clientes) => localStorage.setItem("db_client", JSON.stringify(db_clientes));

///CRUD - Create
const createClient = (client) =>{
    const db_clientes = readClient();
    db_clientes.push(client);
    setLocalStorage(db_clientes);
}
///////////////////////////////////////////////
///CRUD - Read
const readClient = () => getLocalStorage();

//////////////////////////////////////////////
///CRUD - Update
const updateClient = (index, client) =>{
    const db_clientes = readClient();
    db_clientes[index] = client;
    setLocalStorage(db_clientes);
}
//////////////////////////////////////////////
///CRUD - Delete
const deleteClient = (index) =>
{
    const db_clientes = readClient();
    db_clientes.splice(index, 1);
    setLocalStorage(db_clientes);
}
////////////////////////////////////////////////////////////////////////////////////////


const isValidFields = () =>
{
    return document.getElementById('form').reportValidity(); /* retorna verdadeiro ou falso se todos os required forem validados */
}

const clearFields = () =>
{
    const form = document.querySelectorAll('.modal-field');
    form.forEach(field => field.value = "");
}

const saveClient = (index) =>
{
    if(isValidFields()) /* Se os campos são válidos */
    {
        const client = {
            nome : document.getElementById('nome').value,
            email : document.getElementById('email').value,
            celular : document.getElementById('celular').value,
            cidade : document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index;
        if (index == 'new')
        {
            createClient(client);
            updateTable();
            clearFields();
            closeModal();

        }else{
            updateClient(index, client);
            updateTable();
            closeModal();
        }
    }
}

const createRow = (client, index) =>
{
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id = "${index}">editar</button>
            <button type="button" class="button red" id="${index}">excluir</button>
        </td>
    `
    document.querySelector('#tbclient>tbody').appendChild(newRow);
}

const clearTable = () =>
{
    const rows = document.querySelectorAll('#tbclient>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
}

const updateTable = () =>
{
    const db_clientes = readClient();
    clearTable();
    db_clientes.forEach(createRow);
}

const preencherCampos = (cliente, index) =>
{
    document.getElementById('nome').value = cliente.nome;
    document.getElementById('email').value = cliente.email;
    document.getElementById('celular').value = cliente.celular;
    document.getElementById('cidade').value = cliente.cidade;
    document.getElementById('nome').dataset.index = index;
}

const editarTable = (index) =>
{
    const db_clientes = readClient();
    const cliente = db_clientes[index];
    preencherCampos(cliente, index);
    openModal();
}

const excluirTable = (index) =>
{
    const db_clientes = getLocalStorage();
    db_clientes.splice(index, 1);
    setLocalStorage(db_clientes);
    updateTable();
}
const RetornarNome = (index) =>
{
    const db_clientes = getLocalStorage();
    return db_clientes[index].nome;
}
const editDelete = (evento) =>
{
    if(evento.target.type == 'button')
    {
        if(evento.target.innerHTML == 'excluir')
        {
            const response = confirm(`Deseja realmente excluir o cliente ${RetornarNome(evento.target.id)}?`)
            if(response)
            {
                excluirTable(evento.target.id);
            }

        }else if(evento.target.innerHTML == 'editar')
        {
            editarTable(evento.target.id);
        }
    }
}
///Eventos
document.getElementById('salvar')
    .addEventListener('click', saveClient)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.querySelector('#tbclient>tbody')
    .addEventListener('click', editDelete)

updateTable();
