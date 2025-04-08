//Transformamos el objeto region_comuna al formato que necesitamos
const regionesYComunas = {};
region_comuna.regiones.forEach(region => {
    const nombreRegion = region.nombre;
    const comunas = region.comunas.map(comuna => comuna.nombre);
    regionesYComunas[nombreRegion] = comunas;
});

const regionSelect = document.getElementById("region");
const comunaSelect = document.getElementById("comuna");

Object.keys(regionesYComunas).forEach(region => {
    let option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    regionSelect.appendChild(option);
});

//Actualizamos las comunas cuando se seleccione una region
regionSelect.addEventListener("change", function () {

    comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';

    //Obtenemos la region seleccionada
    let selectedRegion = regionSelect.value;

    //Rellenamos el selector de comunas si hay una region valida
    if (selectedRegion && regionesYComunas[selectedRegion]) {
        regionesYComunas[selectedRegion].forEach(comuna => {
            let option = document.createElement("option");
            option.value = comuna;
            option.textContent = comuna;
            comunaSelect.appendChild(option);
        });
    }
});