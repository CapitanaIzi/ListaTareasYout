class ListaDeTareas {
    constructor() {
        this.listas = [];
        this.indiceListaActual = 0;
    }

    agregarLista(nombreLista) {
        const nuevaLista = {
            nombre: nombreLista,
            tareas: []
        };
        this.listas.push(nuevaLista);
        this.guardarListasEnLocalStorage();
        this.renderizarSelectorDeListas();
    }

    establecerListaActual(indice) {
        this.indiceListaActual = indice;
        this.renderizarTareas();
    }

    agregarTarea(textoTarea) {
        const tarea = {
            texto: textoTarea,
        };
        this.listas[this.indiceListaActual].tareas.push(tarea);
        this.guardarListasEnLocalStorage();
        this.renderizarTareas();
    }

    editarTarea(indice, nuevoTexto) {
        this.listas[this.indiceListaActual].tareas[indice].texto = nuevoTexto;
        this.guardarListasEnLocalStorage();
        this.renderizarTareas();
    }

    eliminarTarea(indice) {
        this.listas[this.indiceListaActual].tareas.splice(indice, 1);
        this.guardarListasEnLocalStorage();
        this.renderizarTareas();
    }

    editarLista(indice, nuevoNombre) {
        if (nuevoNombre.trim() !== "") {
            this.listas[indice].nombre = nuevoNombre;
            this.guardarListasEnLocalStorage();
            this.renderizarSelectorDeListas();
        }
    }

    eliminarLista(indice) {
        this.listas.splice(indice, 1);
        this.indiceListaActual = 0; // Restablecer a la primera lista
        this.guardarListasEnLocalStorage();
        this.renderizarSelectorDeListas();
        this.renderizarTareas();
    }

    guardarListasEnLocalStorage() {
        localStorage.setItem("listas", JSON.stringify(this.listas));
    }

    cargarListasDesdeLocalStorage() {
        const listasAlmacenadas = JSON.parse(localStorage.getItem("listas"));
        if (listasAlmacenadas) {
            this.listas = listasAlmacenadas;
        } else {
            this.listas = []; 
        }
        this.renderizarSelectorDeListas();
        this.renderizarTareas();
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
            botonEditar.disabled= true;
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