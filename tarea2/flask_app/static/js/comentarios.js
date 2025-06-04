document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formComentario");
    const actividadId = form.dataset.actividadId;

    //Funcion para cargar los comentarios
    function cargarComentarios() {
        fetch(`/actividad/${actividadId}/comentarios`)
            .then(response => response.json())
            .then(comentarios => {
                const lista = document.getElementById("listaComentarios");
                lista.innerHTML = "";  

                comentarios.forEach(comentario => {
                    const li = document.createElement("li");
                    li.innerHTML = `<strong>${comentario.nombre}</strong> (${comentario.fecha}):<br>${comentario.texto}`;
                    lista.appendChild(li);
                });
            })
            .catch(error => {
                console.error("Error al cargar comentarios:", error);
            });
    }

    //Cargar comentarios al cargar la pagina
    cargarComentarios();

    //Se Manejan envios del formulario
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch(`/actividad/${actividadId}/comentario`, {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            const mensajesDiv = document.getElementById("mensajes");
            mensajesDiv.innerHTML = "";

            if (data.success) {
                form.reset();
                mensajesDiv.style.color = "green";
                mensajesDiv.innerText = "Comentario agregado";               
                cargarComentarios();
            } 
            
            else if (data.errores && Array.isArray(data.errores)) {
                mensajesDiv.style.color = "red";
                const listaErrores = document.createElement("ul");
                data.errores.forEach(error => {
                    const li = document.createElement("li");
                    li.textContent = error;
                    listaErrores.appendChild(li);
                });
                mensajesDiv.appendChild(listaErrores);
            } 
            
            else {
                mensajesDiv.style.color = "red";
                mensajesDiv.innerText = "Ocurrió un error al guardar";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("mensajes").innerText = "Error en el servidor";
        });
    });
});
