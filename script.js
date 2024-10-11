const listaDeTareas = new ListaDeTareas();

function agregarTarea() {
    const entradaTarea = document.getElementById("entradaTarea");
    const textoTarea = entradaTarea.value.trim();
    if (textoTarea.length > 0) {
        listaDeTareas.agregarTarea(textoTarea);
        entradaTarea.value = "";
        listaDeTareas.renderizarTareas();
    }
}

function agregarLista() {
    const entradaLista = document.getElementById("entradaLista");
    const nombreLista = entradaLista.value.trim();
    if (nombreLista.length > 0) {
        listaDeTareas.agregarLista(nombreLista);
        entradaLista.value = "";
    }
}
document.addEventListener("DOMContentLoaded", () => {
    listaDeTareas.cargarListasDesdeLocalStorage();
});

document.getElementById("addButton").addEventListener("click", agregarTarea);
document.getElementById("entradaTarea").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        agregarTarea();
    }
});
document.getElementById("addListButton").addEventListener("click", agregarLista);
document.getElementById("entradaLista").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        agregarLista();
    }
});



document.getElementById("editListButton").addEventListener("click", () => {
    const selectorDeListas = document.getElementById("listSelector");
    const indiceSeleccionado = selectorDeListas.value;
    const nuevoNombre = prompt("Editar nombre de la lista:", listaDeTareas.listas[indiceSeleccionado].nombre);
    if (nuevoNombre !== null) {
        listaDeTareas.editarLista(indiceSeleccionado, nuevoNombre);
    }
});

document.getElementById("deleteListButton").addEventListener("click", () => {
    const selectorDeListas = document.getElementById("listSelector");
    const indiceSeleccionado = selectorDeListas.value;
    const confirmarEliminar = confirm("¿Estás seguro de que deseas eliminar esta lista?");
    if (confirmarEliminar) {
        listaDeTareas.eliminarLista(indiceSeleccionado);
    }
});

document.getElementById("listSelector").addEventListener("change", (event) => {
    const indiceSeleccionado = event.target.value;
    listaDeTareas.establecerListaActual(indiceSeleccionado);
});
