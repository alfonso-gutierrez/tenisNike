const carrito=document.getElementById('carrito');
const elementos1= document.getElementById('lista-1');
const lista=document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn=document.getElementById('vaciar-carrito')
let total = 0;


cargarEventListeners();

function cargarEventListeners(){
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento)
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito)
}

function comprarElemento(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const elemento=e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento){
    const infoElemento={
        imagen:elemento.querySelector('img').src,
        titulo:elemento.querySelector('h3').textContent,
        precio:elemento.querySelector('.precio').textContent,
        id:elemento.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoElemento);
}
function insertarCarrito(elemento){
    const row=document.createElement('tr');
    row.innerHTML=`
    <td>
        <img src="${elemento.imagen}" width=100>
    </td>
    <td>
        ${elemento.titulo}
    </td>
    <td>
        ${elemento.precio}
    </td>
    <td>
        <a href="#" class="borrar" data-id="${elemento.id}">X </a>
    </td>
    `;
    lista.appendChild(row);
    const precio = parseFloat(elemento.precio.replace('$', ''));
    total += precio;
    actualizarTotal();
}

function actualizarTotal() {
    const totalElemento = document.getElementById('total-carrito');
    totalElemento.textContent = `$${total.toFixed(2)}`;
}

function eliminarElemento(e){
    e.preventDefault();
    let elemento,
    elementoId;
    if(e.target.classList.contains('borrar')){
        e.target.parentElement.parentElement.remove();
        elemento=e.target.parentElement.parentElement;
        elementoId=elemento.querySelector('a').getAttribute('data-id');
        const precioElemento = parseFloat(elemento.querySelector('td:nth-child(3)').textContent.replace('$', ''));
        total -= precioElemento;
        actualizarTotal();
    }
}
function vaciarCarrito() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    total = 0;
    actualizarTotal();
    return false;
}

