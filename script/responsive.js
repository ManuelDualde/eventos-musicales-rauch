document.querySelector(".btn_menu").addEventListener("click", toggleMenu);
document.querySelector(".btn_cambiar_modo").addEventListener("click", cambiarModo)

function toggleMenu() {
    document.querySelector(".navigation").classList.toggle("menu_responsive");
}

function cambiarModo(){
    document.querySelector(".cambioModo").classList.toggle("modo_oscuro");
    console.log("esta entrando a la funcion")
}