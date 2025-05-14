//Hacemos la funcion para agregar la actividad en el formulario
function confirmarEnvio() {
  const formulario = document.querySelector('form');

  if (!formulario.checkValidity()) {
      formulario.reportValidity();
      return;
  }

  document.getElementById('formulario-container').style.display = 'none';  
  document.getElementById('confirmacion').style.display = 'block';
}

function procesarConfirmacion(acepta) {
  if (acepta) {
      document.getElementById('confirmacion').style.display = 'none';
      document.getElementById('mensaje-final').style.display = 'block';
  } else {
      document.getElementById('confirmacion').style.display = 'none';
      document.getElementById('formulario-container').style.display = 'block';  
  }
}


