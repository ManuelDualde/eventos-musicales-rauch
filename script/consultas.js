'use strict'
let form = document.querySelector('#form');
form.addEventListener('submit', consultar);

function consultar(e){
  e.preventDefault();
  
  // se obtienen todos los datos del html
  let formData = new FormData(form);
  
  //obtengo los datos ingresados en el html segun name de cada input
  let email = formData.get('email');
  let nombre = formData.get('nombre');
  let consulta = formData.get('consulta');
  console.log(email, nombre, consulta)
    document.getElementById("mostraDatos").innerHTML=" Hola "+ nombre + " ingresaste el siguiente email : " +email+". Si es incorrecto vuelve a ingresarlo"
  obtenerCaptcha();
}

function obtenerCaptcha(){
    //pos = retorna el valor de i de mostrarCaptcha y ejecuta la funcion 
    let pos = mostrarCaptcha();
    let btnCaptcha = document.getElementById("btnCaptcha")
    btnCaptcha.addEventListener("click", () => { comprobarCaptcha(pos); });
    // como necesito el parametro "pos"  la funcion y el addevent no me lo permite, ejecuto una funcion
    // de flecha ()=> que es anonima y me permite dentro llamar una funcion donde si le puedo pasar parámetros
}

//agrego contenido html que muestre la imagen, el input para comprobar y el boton para enviar

function mostrarCaptcha(){

    document.getElementById("captcha").innerHTML = `
    <img class="imgCaptcha" id="imagenMostrada" src="" alt="">
    <input id="valorUsuario" type="text" name="valor" placeholder="Completa el captcha">
    <button id="btnCaptcha">Enviar Consulta</button>`
    let i = mostrarImagenAleatoria();
    // i = guarda el return de mostrarImagenAleatoria() y ejecuto la funcion
    return i;
    //retorno nuevamente el valor de i
}


// Función para mostrar una imagen aleatoria del arreglo
function mostrarImagenAleatoria() {
    
    let imagenes = ["../img/imgCaptcha/captcha1.jpg",
    "../img/imgCaptcha/captcha2.jpg",
    "../img/imgCaptcha/captcha3.jpg",
    "../img/imgCaptcha/captcha4.jpg",
    "../img/imgCaptcha/captcha5.jpg",
    "../img/imgCaptcha/captcha6.jpg",
    "../img/imgCaptcha/captcha7.jpg",
    "../img/imgCaptcha/captcha8.jpg",
    "../img/imgCaptcha/captcha9.jpg",
    "../img/imgCaptcha/captcha10.jpg",
    "../img/imgCaptcha/captcha11.jpg",
    "../img/imgCaptcha/captcha12.jpg",
    "../img/imgCaptcha/captcha13.jpg",
    "../img/imgCaptcha/captcha14.jpg"];

    // Obtener un número aleatorio dentro del rango de índices del arreglo
    let i = Math.floor(Math.random() * imagenes.length);

    console.log("valor random del arreglo imagenes " +i);
    
    // Obtener la URL de la imagen correspondiente al índice aleatorio
    let urlImagen = imagenes[i];
    
    document.getElementById("imagenMostrada").src = urlImagen;

    return i;
}

function comprobarCaptcha(i){


    console.log("valor que llega por parametro" + i);

    let valoresImgs =["TK58P",
    "MCSXH",
    "B4T9S",
    "9M4BP",
    "AWSKH",
    "DT6JX",
    "WB3CX",
    "N8C6H",
    "XKWDN",
    "59CTR",
    "4NV3A",
    "6AR8R",
    "DWXM5",
    "SKARD"];
    let valorUsuario = document.getElementById("valorUsuario").value;
    console.log(valoresImgs[i]);

    if(valoresImgs[i]===valorUsuario){

        // FATAAAAAAAAAA aplicar metodos para guardar datos

       document.getElementById("envioCorrecto").innerHTML="LA CONSULTA FUE REALIZADA CON EXITO, EN BREVE ENVIAREMOS UNA RESPUESTA A TU EMAIL"

    }else{
        document.getElementById("envioCorrecto").innerHTML="EL CAPTCHA ES ERRONEO, VUELVE A INTENTARLO"
        obtenerCaptcha();
    }

}

