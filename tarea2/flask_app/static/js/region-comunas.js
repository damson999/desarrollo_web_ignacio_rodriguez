// Transformamos el objeto region_comuna al formato que necesitamos
const regionesYComunas = {};
region_comuna.regiones.forEach(region => {
    const nombreRegion = region.nombre;
    const comunas = region.comunas.map(comuna => ({
        id: comuna.id,
        nombre: comuna.nombre
    }));
    regionesYComunas[nombreRegion] = comunas;
});

const regionSelect = document.getElementById("region");
const comunaSelect = document.getElementById("comuna");

// Llenar selector de regiones
Object.keys(regionesYComunas).forEach(region => {
    let option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    regionSelect.appendChild(option);
});

// Actualizamos las comunas cuando se seleccione una region
regionSelect.addEventListener("change", function () {
    comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';

    const selectedRegion = regionSelect.value;

    if (selectedRegion && regionesYComunas[selectedRegion]) {
        regionesYComunas[selectedRegion].forEach(comuna => {
            let option = document.createElement("option");
            option.value = comuna.id;               // usamos el ID como valor
            option.textContent = comuna.nombre;     // mostramos el nombre
            comunaSelect.appendChild(option);
        });
    }
});
