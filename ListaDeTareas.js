class ListaDeTareas {
    constructor() {
        this.listas = [];
        this.indiceListaActual = 0;
        this.cargarListasDesdeBaseDeDatos(); // Cargar listas al inicio
    }

    async cargarListasDesdeBaseDeDatos() {
        try {
            const response = await fetch('/api/listas');
            const listasAlmacenadas = await response.json();
            this.listas = listasAlmacenadas;
            this.renderizarSelectorDeListas();
            this.renderizarTareas();
        } catch (error) {
            console.error('Error al cargar listas:', error);
        }
    }

    async agregarLista(nombreLista) {
        try {
            const response = await fetch('/api/listas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre: nombreLista }),
            });
            const nuevaLista = await response.json();
            this.listas.push(nuevaLista);
            this.renderizarSelectorDeListas();
        } catch (error) {
            console.error('Error al agregar lista:', error);
        }
    }

    async agregarTarea(textoTarea) {
        try {
            const response = await fetch(`/api/listas/${this.listas[this.indiceListaActual].id}/tareas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ texto: textoTarea }),
            });
            const nuevaTarea = await response.json();
            this.listas[this.indiceListaActual].tareas.push(nuevaTarea);
            this.renderizarTareas();
        } catch (error) {
            console.error('Error al agregar tarea:', error);
        }
    }

    async editarTarea(indice, nuevoTexto) {
        const tareaId = this.listas[this.indiceListaActual].tareas[indice].id;
        try {
            await fetch(`/api/tareas/${tareaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ texto: nuevoTexto }),
            });
            this.listas[this.indiceListaActual].tareas[indice].texto = nuevoTexto;
            this.renderizarTareas();
        } catch (error) {
            console.error('Error al editar tarea:', error);
        }
    }

    async eliminarTarea(indice) {
        const tareaId = this.listas[this.indiceListaActual].tareas[indice].id;
        try {
            await fetch(`/api/tareas/${tareaId}`, {
                method: 'DELETE',
            });
            this.listas[this.indiceListaActual].tareas.splice(indice, 1);
            this.renderizarTareas();
        } catch (error) {
            console.error('Error al eliminar tarea:', error);
        }
    }

    async guardarListasEnBaseDeDatos() {
        try {
            await fetch('/api/tareas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.listas), // Enviar la lista completa o modifica esto según tu estructura
            });
        } catch (error) {
            console.error('Error al guardar las listas en la base de datos:', error);
        }
    }




renderizarSelectorDeListas() {
    const selectorDeListas = document.getElementById("listSelector");
    selectorDeListas.innerHTML = "";
    this.listas.forEach((lista, indice) => {
        const opcion = document.createElement("option");
        opcion.value = indice;
        opcion.text = lista.nombre;
        selectorDeListas.appendChild(opcion);
    });
    selectorDeListas.value = this.indiceListaActual;
}
renderizarTareas() {
    const listaDeTareas = document.getElementById("taskList");
    listaDeTareas.innerHTML = "";

    if (!this.listas[this.indiceListaActual] || !this.listas[this.indiceListaActual].tareas) {
        return;
    }

    this.listas[this.indiceListaActual].tareas.forEach((tarea, indice) => {
        const elementoLista = this.crearItemTarea(tarea, indice);
        listaDeTareas.appendChild(elementoLista);
    });
}

// Crear un ítem de la tarea (itemLista)
crearItemTarea(tarea, indice) {
    const elementoLista = document.createElement("li");

    const checkbox = this.crearCheckbox(tarea, elementoLista);
    const textoTarea = this.crearTextoTarea(tarea);
    const botonEditar = this.crearBotonEditar(indice, tarea);
    const botonEliminar = this.crearBotonEliminar(indice);

    // Añadir elementos al itemLista
    elementoLista.appendChild(checkbox);
    elementoLista.appendChild(textoTarea);
    elementoLista.appendChild(botonEditar);
    elementoLista.appendChild(botonEliminar);

    // Aplicar la clase "completed" si la tarea está marcada
    if (tarea.completed) {
        elementoLista.classList.add("completed");
        botonEditar.disabled = true;
    }

    return elementoLista;
}

// Crear el checkbox
crearCheckbox(tarea, itemLista) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarea.completed || false;

    checkbox.addEventListener("change", () => {
        tarea.completed = checkbox.checked;
        itemLista.classList.toggle("completed", tarea.completed); // Alternar clase 'completed'
        this.guardarListasEnLocalStorage(); // Guardar cambios en localStorage
    });

    return checkbox;
}

// Crear el texto de la tarea
crearTextoTarea(tarea) {
    const textoTarea = document.createElement("span");
    textoTarea.textContent = tarea.texto;
    textoTarea.style.color = "white";
    return textoTarea;
}

// Crear el botón de edición
crearBotonEditar(indice, tarea) {
    const botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar";
    botonEditar.className = "boton-editar";

    botonEditar.onclick = () => {
        if (!tarea.completed) {
            const nuevoTexto = prompt("Editar tarea:", tarea.texto);
            if (nuevoTexto !== null) {
                this.editarTarea(indice, nuevoTexto);
            }
        }

    };

    return botonEditar;
}

// Crear el botón de eliminación
crearBotonEliminar(indice) {
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.className = "boton-eliminar";

    botonEliminar.onclick = () => {
        this.eliminarTarea(indice); // Llamar al método eliminarTarea
    };

    return botonEliminar;
}


}
