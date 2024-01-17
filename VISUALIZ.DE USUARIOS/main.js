var URI="https://randomuser.me/api/?results=20"

console.log(URI)

let contenedorDatos = document.getElementById("contenedor-datos")
let buscador = document.getElementById("buscador")
let modal= document.getElementById("modal")


 
let usuarios= []

traerDatos(URI)

function traerDatos(URI){
    fetch(URI)
     .then(response =>response.json())
     .then(data => {
      usuarios =data.results;
      pintarCards(usuarios)
    })
    .catch(error=> console.error("Error:",error.message));
  }

// pintar cards - abrir modal
function pintarCards(usuarios) {
    contenedorDatos.innerHTML = ""
    if(usuarios.length>0) {usuarios.forEach((usuario) => {
      let card = document.createElement('div');
      let boton = document.createElement("button");
      let modal = document.createElement("div");
    let modalDialog = document.createElement("div");
    let modalContent = document.createElement("div");
      card.className = "card shadow p-3 mb-5 bg-body-tertiary rounded"
      card.style.width = "16rem"
      card.style.height="28rem"
      boton.className = "btn btn-primary position-absolute bottom-0 mb-2 end-1";
      boton.type = "button";
      boton.setAttribute("data-bs-toggle", "modal");
      boton.setAttribute("data-bs-target", "#miModal");
      //boton.setAttribute("data-id", "${usuario.id.name}");
      boton.textContent = "Ver más"
     // boton.id="${usuario.id.name}"
      card.innerHTML = `<img src="${usuario.picture.large}" class="card-img-top rounded-circle") alt="foto-usuario">
      <div class="card-body">
      <h5 class="card-title text-center pb-2 pt-1">${usuario.name.first} ${usuario.name.last}</h5>
      <p class="card-text">País: ${usuario.location.country}</p>
      <p class="card-text">Edad: ${usuario.dob.age} años.</p>`
      modal.className = "modal fade";
    modal.id = "miModal";
    modal.tabIndex = "-1";
    modal.setAttribute("aria-labelledby", "exampleModalLabel");
    modal.setAttribute("aria-hidden", "true");
    modalDialog.className = "modal-dialog"
 
 modalContent.className = "modal-content"
 modalContent.innerHTML = `<img src="${usuario.picture.large}" class="rounded-circle" alt="foto-usuario">
 <h5 class="modal-title text-center pt-1 pb-1">${usuario.name.first} ${usuario.name.last}</>
 <h5 class="card-text"> Datos de Contacto:</h5>
 <p class="card-text">Residencia:${usuario.location.country}</p>
 <p class="card-text">Estado:${usuario.location.state}</p>
 <p class="card-text">Código Postal:${usuario.location.postcode}</p>
 <p class="card-text">Email:${usuario.email}</p>
 <p class="card-text">Teléfono:${usuario.cell}</p>
<button type="button" class="btn btn-primary position-absolute bottom-0 mb-2 end-1" data-bs-dismiss="modal">Cerrar</button>
</div>`
     contenedorDatos.appendChild(card)
     card.appendChild(boton)
     card.appendChild(modal)
     modal.appendChild(modalDialog)
     modalDialog.appendChild(modalContent)
 } )}
     else{
        contenedorDatos.innerHTML =`<div class="notfound"> <h2 class> Ningún Usuario coincide con la búsqueda, inténtalo nuevamente.</h2> </div>`
      }}
   


// filtrar por apellido
      function filtrarPorTexto(usuarios) {
        let palabra = buscador.value.toLowerCase()
        let usuariosFiltrados = usuarios.filter(usuario => usuario.name.last.toLowerCase().includes(palabra))

        return usuariosFiltrados }
 
      function filtroFinal() {
      let usuariosFiltrados1 = filtrarPorTexto(usuarios)
       
       pintarCards(usuariosFiltrados1)}
     
    
      buscador.addEventListener("keyup", filtroFinal)
