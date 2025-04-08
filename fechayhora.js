//Funciones para limitar disponibilidad de fechas y horas desde el momento actual hasta el futuro

window.addEventListener('DOMContentLoaded', () => {
    const inicioInput = document.getElementById('inicio');
    const terminoInput = document.getElementById('termino');


    function toDatetimeLocal(dt) {
        const pad = (n) => n.toString().padStart(2, '0');
        return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
    }

    const now = new Date();
    const nowFormatted = toDatetimeLocal(now);
    const threeHoursLater = new Date(now.getTime() + 3 * 60 * 60 * 1000);
    const threeHoursFormatted = toDatetimeLocal(threeHoursLater);


    inicioInput.value = nowFormatted;
    inicioInput.min = nowFormatted;


    terminoInput.value = threeHoursFormatted;
    terminoInput.min = nowFormatted;


    inicioInput.addEventListener('change', () => {
        const inicioDate = new Date(inicioInput.value);
        terminoInput.min = toDatetimeLocal(new Date(inicioDate.getTime() + 1 * 60 * 1000)); 
    });


    terminoInput.addEventListener('change', () => {
        const inicioDate = new Date(inicioInput.value);
        const terminoDate = new Date(terminoInput.value);
        if (terminoInput.value && terminoDate <= inicioDate) {
            alert("La fecha de término debe ser posterior a la de inicio");
            terminoInput.value = '';
        }
    });
});

