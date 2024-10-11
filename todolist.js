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

        this.listas[this.indiceListaActual].tareas.forEach((tarea, indice) => {
            const elementoLista = document.createElement("li");
            elementoLista.innerHTML = `
                <span>${tarea.texto}</span>
                <span>
                    <button class="boton-editar" onClick="todoList.editarTarea(${indice}, prompt('Editar tarea:', '${tarea.texto}'))">Editar</button>
                    <button class="boton-eliminar" onClick="todoList.eliminarTarea(${indice})">Eliminar</button>
                </span>
            `;
            listaDeTareas.appendChild(elementoLista);
        });
    }
}
