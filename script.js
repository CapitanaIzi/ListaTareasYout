const listaDeTareas = new ListaDeTareas();
const guardarTarea = async (usuarioId, titulo, descripcion) => {
    try {
      const response = await fetch('http://localhost:3000/guardar-tarea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario_id: usuarioId,
          titulo: titulo,
          descripcion: descripcion,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al guardar la tarea');
      }
  
      const data = await response.json();
      console.log(data.mensaje); // Muestra un mensaje de éxito
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  

  async function agregarTarea() {
    const entradaTarea = document.getElementById("entradaTarea");
    const textoTarea = entradaTarea.value.trim();
    if (textoTarea.length > 0) {
        // Aquí asumimos que el usuario ID es conocido y está disponible
        const usuarioId = 1; // Cambia esto a la lógica de obtención del usuario ID real
        await guardarTarea(usuarioId, textoTarea, ""); // Envía descripción como vacío si no la usas
        listaDeTareas.agregarTarea(textoTarea); // Agregar la tarea a la lista en memoria
        entradaTarea.value = "";
        listaDeTareas.renderizarTareas(); // Actualizar la interfaz
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
    listaDeTareas.cargarListasDesdeBaseDeDatos();
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