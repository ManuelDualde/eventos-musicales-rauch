"use strict"


window.addEventListener("DOMContentLoaded", async () => {
    eventosImportantes(await getEventos());
    mostrarEventos(await getEventos());
});

const url = "https://6670a8ef0900b5f8724b4bb0.mockapi.io/api";

let btnNewBanda = document.getElementById("addEvent");
btnNewBanda.addEventListener("submit", addBanda);


//--------------- FUNCIONES -------------------

function getEventos() {

    const endpoint = "/eventos";

    return fetch(url + endpoint)
        .then((response) => {
            if (!response.ok) {
                throw new Error(manejoDeErroresHTTP(response.status));
            }
            return response.json();
        }).then((eventos) => {

            //retorno de la funcion
            return eventos;
        }).catch((error) => {
            console.error(error);
            alert(error);
            return error;
        });
}

function getEvento(id){

    const endpoint = "/eventos/"+id;

    return fetch(url + endpoint)
    .then((response) => {
        if (!response.ok) {
            throw new Error(manejoDeErroresHTTP(response.status));
        }
        return response.json();
    }).then((eventos) => {
        return eventos;
    }).catch((error) => {
        console.error(error);
        alert(error);
        return error;
    });
}


// mostrar eventos importantes en página principal


function eventosImportantes(eventos){

    if (Array.isArray(eventos)) {

        for(let i =0; i< eventos.length;i++){
        
            if(eventos[i].importante == true){
                
                document.getElementById("eventosPrincipales").innerHTML += `
                <div class="containerBandaPrincipal">
                    <h1>${eventos[i].nombre_banda}</h1>
                    <img src="${eventos[i].img}" alt="imagen banda">
                    <div class="infoBandaPrincipal">
                        <div class="container_info_banda_principal"><p>${eventos[i].fecha}</p></div>
                        
                        <div class="container_info_banda_principal"><p>${eventos[i].nombre_lugar}</p></div>
                    </div>
                    <div class="masInfo">
                        <li>
                            <ul>Lugar: ${eventos[i].nombre_lugar}</ul>
                            <ul>Hora: ${eventos[i].hora}</ul>
                            <ul>${eventos[i].descripcion}</ul>
                        </li>
                    </div>
                </div>`
            }
        }
    }

}

function mostrarEventos(eventos){

    if (Array.isArray(eventos)) {

        const tabla = document.querySelector(".datos_tabla_banda");
        tabla.innerHTML="";

        for(let l =0; l< eventos.length;l++){

            
            tabla.innerHTML+= `
            <tr>
                <td>${eventos[l].nombre_banda}</td>
                <td>${eventos[l].nombre_lugar}</td>
                <td>${eventos[l].fecha}</td>
                <td><button data-id="${eventos[l].id}" id="btnEditBanda"><img src="../img/imgDeleteEdit/edit.png" alt=""></button></td>
                <td><button data-id="${eventos[l].id}" id="btnDeleteBanda"><img src="../img/imgDeleteEdit/delete.png" alt=""></button></td>

            </tr>`;
        
        }
        eventosBotones();
    }
}

function addBanda(e) {

    e.preventDefault();

    let input_nombre_banda = document.getElementById("nuevo_nombre_banda");
    let input_nombre_lugar = document.getElementById("nuevo_nombre_lugar");
    let input_fecha = document.getElementById("nueva_fecha_evento");
    let input_hora = document.getElementById("nueva_hora_evento");
    let input_importante = document.getElementById("es_importante");
    let input_img = document.getElementById("nueva_img_banda");
    let input_descripcion = document.getElementById("nueva_descripcion_banda");

    const endpoint = "/eventos";

    let evento = {
        nombre_banda:input_nombre_banda.value,
        nombre_lugar:input_nombre_lugar.value,
        fecha: input_fecha.value, 
        hora:input_hora.value,
        importante:input_importante.checked,
        img:input_img.value,
        descripcion: input_descripcion.value
    }
    
    fetch(url + endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(evento)
    }).then(response => {
        if (!response.ok) {
            throw new Error(manejoDeErroresHTTP(response.status));
        }
        //return response.json();
    }).then( async() => {
        mostrarEventos(await getEventos());
        input_nombre_banda.value = "";
        input_nombre_lugar.value = "";
        input_fecha.value ="";
        input_hora.value ="";
        input_importante.checked = false;
        input_img.value ="";
        input_descripcion.value ="";
    }).catch(error => {
        console.error(error);
        alert(error);
    });
}


function deleteBanda(idDelete) {

    const endpoint = "/eventos/" + idDelete;


    fetch(url + endpoint, {
        method: "DELETE"
    }).then(response => {
        if (!response.ok) {
            throw new Error(manejoDeErroresHTTP(response.status));
        }
    }).then( async () => {
        mostrarEventos(await getEventos());
    }).catch(error => {
        console.error(error);
        alert(error);
    });
    
} 

function editEvento(id){

    let input_nombre_banda = document.getElementById("editar_nombre_banda");
    let input_nombre_lugar = document.getElementById("editar_nombre_lugar");
    let input_fecha = document.getElementById("editar_fecha_evento");
    let input_hora = document.getElementById("editar_hora_evento");
    let input_importante = document.getElementById("editar_importante");
    let input_img = document.getElementById("editar_img_banda");
    let input_descripcion = document.getElementById("editar_descripcion_banda");

    let evento = {
        id:id,
        nombre_banda:input_nombre_banda.value,
        nombre_lugar:input_nombre_lugar.value,
        fecha: input_fecha.value, 
        hora:input_hora.value,
        importante:input_importante.checked,
        img:input_img.value,
        descripcion: input_descripcion.value
    }

    const endpoint = "/eventos/" + evento.id;

    fetch(url + endpoint, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(evento)
    }).then( response => {
        if (!response.ok) {
            throw new Error(manejoDeErroresHTTP(response.status));
        }
    }).then( async () => {
        mostrarEventos(await getEventos());
    }).catch((error) => {
        console.error(error);
        alert(error);
    });

}

async function formularioEditar(id){

    let evento = await getEvento(id);

    if(evento.id) {
        let formEdit = document.getElementById("formulario_edit");
        formEdit.classList.remove("ocultar_formulario");
    
        let input_nombre_banda = document.getElementById("editar_nombre_banda");
        let input_nombre_lugar = document.getElementById("editar_nombre_lugar");
        let input_fecha = document.getElementById("editar_fecha_evento");
        let input_hora = document.getElementById("editar_hora_evento");
        let input_importante = document.getElementById("editar_importante");
        let input_img = document.getElementById("editar_img_banda");
        let input_descripcion = document.getElementById("editar_descripcion_banda");
    
    
        input_nombre_banda.value =evento.nombre_banda ;
        input_nombre_lugar.value = evento.nombre_lugar ;
        input_fecha.value = evento.fecha;
        input_hora.value = evento.hora;
        input_importante.checked = evento.importante;
        input_img.value = evento.img;
        input_descripcion.value = evento.descripcion ;
    
        let btnEditar= document.getElementById("btnEditar");
        btnEditar.addEventListener("submit",(e)=>{
            e.preventDefault();
            editEvento(id);
            formEdit.classList.add("ocultar_formulario");
        })
    }
    
}



function eventosBotones(){
    
    let botonesDelete = document.querySelectorAll("#btnDeleteBanda");
    let botonesEdit = document.querySelectorAll("#btnEditBanda");

    for(let i=0; i< botonesDelete.length; i++){

        botonesDelete[i].addEventListener("click", ()=> {
            let idBtn = botonesDelete[i].getAttribute("data-id");
            deleteBanda(idBtn);
        })
    }

    for(let j =0; j < botonesEdit.length; j++){

        botonesEdit[j].addEventListener("click", ()=> {

            let idBtn = botonesEdit[j].getAttribute("data-id");

            formularioEditar(idBtn);
        })
    }
}

function manejoDeErroresHTTP(estado){
    
    switch (estado){

        case 400 : return "SOLICITUD INCORRECTA";
        break;

        case 404 : return "RECURSO NO ENCONTRADO";
        break;

        case 500 : return "ERROR INTERNO DEL SERVIDOR";
        break;

        case 503 : return "SERVICIO NO DISPONIBLE";
        break;

        case 504 : return "TIME OUT";
        break;

        default: return "ERROR HTTP"

    }
}