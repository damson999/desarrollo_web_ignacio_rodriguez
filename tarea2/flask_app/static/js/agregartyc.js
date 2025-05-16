function agregarTema() {
    const container = document.getElementById("tema-container");
    const grupo = container.querySelector(".tema-grupo");
    const nuevo = grupo.cloneNode(true);
    nuevo.querySelector("select").value = "";
    const input = nuevo.querySelector("input");
    input.style.display = "none";
    input.value = "";
    container.appendChild(nuevo);
}

function mostrarInputOtro(selectElem) {
    const input = selectElem.parentElement.querySelector("input");
    input.style.display = selectElem.value === "otro" ? "inline-block" : "none";
}

function agregarContacto() {
    const container = document.getElementById("contacto-container");
    const grupo = container.querySelector(".contacto-grupo");
    const nuevo = grupo.cloneNode(true);
    nuevo.querySelector("select").value = "";
    nuevo.querySelector("input").value = "";
    container.appendChild(nuevo);
}

