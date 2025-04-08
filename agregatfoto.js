//Funcion para agregar las fotos con un maximo de 5
let maxfotos = 5;

function agregarFoto() {
  const contenedor = document.getElementById('foto-container');
  const cantidadactual = contenedor.querySelectorAll('input[type="file"]').length;

  if (cantidadactual >= maxfotos) {
    alert('No se pueden agregar más de 5 fotos');
    return;
  }

  const nuevoInput = document.createElement('input');
  nuevoInput.type = 'file';
  nuevoInput.name = 'fotos[]';
  nuevoInput.accept = 'image/*';
  contenedor.appendChild(document.createElement('br')); 
  contenedor.appendChild(nuevoInput);
}
