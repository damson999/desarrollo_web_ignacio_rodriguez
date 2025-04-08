//Funcion para mostrar foto en info de actividades
function mostrarFoto(src) {
    document.getElementById("fotoGrande").src = src.replace("320x240", "800x600");
    document.getElementById("visor").style.display = "flex";
}

function cerrarFoto() {
    document.getElementById("visor").style.display = "none";
    document.getElementById("fotoGrande").src = "";
}
