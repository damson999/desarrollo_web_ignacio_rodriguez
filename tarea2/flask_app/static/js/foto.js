function mostrarImagen(src) {
    document.getElementById("imagenAmpliada").src = src;
    document.getElementById("modal").style.display = "flex";
}

function cerrarImagen() {
    document.getElementById("modal").style.display = "none";
}
