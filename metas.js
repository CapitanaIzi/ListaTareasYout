// Espera a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Inicialización de elementos del DOM
    const btnInsertar = document.getElementById('btn-insertar');
    const menuInsertar = document.getElementById('menu-insertar');
    const btnEditar = document.getElementById('btn-editar');
    const menuEditar = document.getElementById('menu-editar');
    const btnColor = document.getElementById('btn-color');
    const menuColor = document.getElementById('menu-color');
    const eliminarBtn = document.getElementById('btn-eliminar');
    const btnGuardar = document.getElementById('btn-guardar');

    // Cargar elementos guardados al iniciar
    cargarElementos();

    // Configurar eventos
    configurarEventos(btnInsertar, menuInsertar, btnEditar, menuEditar, btnColor, menuColor, btnGuardar, eliminarBtn);
});

/**
 * Configura los eventos de los botones y menús.
 * 
 * @param {HTMLElement} btnInsertar - Botón para abrir el menú de insertar.
 * @param {HTMLElement} menuInsertar - Menú de opciones de inserción.
 * @param {HTMLElement} btnEditar - Botón para abrir el menú de editar.
 * @param {HTMLElement} menuEditar - Menú de opciones de edición.
 * @param {HTMLElement} btnColor - Botón para abrir el menú de colores.
 * @param {HTMLElement} menuColor - Menú de opciones de colores.
 * @param {HTMLElement} btnGuardar - Botón para guardar cambios.
 * @param {HTMLElement} eliminarBtn - Botón para eliminar elementos.
 */
function configurarEventos(btnInsertar, menuInsertar, btnEditar, menuEditar, btnColor, menuColor, btnGuardar, eliminarBtn) {
    // Evento para guardar cambios
    btnGuardar.addEventListener('click', () => {
        guardarEstado(); // Llama a la función para guardar el estado
        alert('Estado guardado.');
    });

    // Evento para el botón "Insertar"
    btnInsertar.addEventListener('click', () => {
        menuInsertar.style.display = menuInsertar.style.display === 'block' ? 'none' : 'block';
    });

    // Evento para el botón "Editar"
    btnEditar.addEventListener('click', () => {
        menuEditar.style.display = menuEditar.style.display === 'block' ? 'none' : 'block';
    });

    // Evento para el botón "Color"
    btnColor.addEventListener('click', () => {
        menuColor.style.display = menuColor.style.display === 'block' ? 'none' : 'block';
    });

    // Evento para eliminar elementos
    configurarEventoEliminar(eliminarBtn);

    // Eventos para crear cuadros y flechas
    document.getElementById('insertar-cuadro').addEventListener('click', crearCuadro);
    document.getElementById('insertar-flecha').addEventListener('click', crearFlecha);

    // Evento para aplicar color al cuadro activo
    configurarEventoColor();

    // Evento para seleccionar cuadro activo
    seleccionarCuadroActivo();
}

/**
 * Configura el evento para eliminar elementos cuando el mouse se mueve.
 * 
 * @param {HTMLElement} eliminarBtn - Botón para eliminar elementos.
 */
function configurarEventoEliminar(eliminarBtn) {
    document.addEventListener('mousemove', (e) => {
        const rectEliminarBtn = eliminarBtn.getBoundingClientRect();
        const elementos = document.querySelectorAll('.cuadro, .flecha');

        elementos.forEach(element => {
            const rectElemento = element.getBoundingClientRect();

            // Comprobar si el elemento está sobre el botón "Eliminar"
            if (
                rectElemento.bottom > rectEliminarBtn.top &&
                rectElemento.top < rectEliminarBtn.bottom &&
                rectElemento.right > rectEliminarBtn.left &&
                rectElemento.left < rectEliminarBtn.right
            ) {
                element.remove(); // Eliminar el elemento
                // Aquí puedes llamar a la función para guardar el estado después de eliminar
            }
        });
    });
}

/**
 * Crea un nuevo cuadro y lo establece como activo.
 */
function crearCuadro() {
    const nuevoCuadro = new Cuadro();
    cuadroActivo = nuevoCuadro.element; // Establecer el cuadro recién creado como activo
}

/**
 * Crea una nueva flecha.
 */
function crearFlecha() {
    new Flecha();
}

/**
 * Configura los eventos para aplicar colores a los cuadros activos.
 */
function configurarEventoColor() {
    document.querySelectorAll('.color-option').forEach(button => {
        button.addEventListener('click', (e) => {
            const color = e.target.getAttribute('data-color');
            if (cuadroActivo) {
                cuadroActivo.style.backgroundColor = color; // Cambiar el color de fondo del cuadro activo
            }
        });
    });
}

/**
 * Cambia el cuadro activo cuando se hace clic en él.
 */
function seleccionarCuadroActivo() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('cuadro')) {
            cuadroActivo = e.target; // Establecer el cuadro clickeado como el cuadro activo
        }
    });
    /**
* Cambia la visibilidad del placeholder según el contenido del elemento título.
* 
* @param {HTMLElement} tituloElemento - El div editable que representa el título.
* @param {HTMLElement} placeholder - El elemento span que actúa como el placeholder.
*/
    function togglePlaceholder(tituloElemento, placeholder) {
        if (tituloElemento.innerText.trim() === '') {
            placeholder.style.display = 'block'; // Mostrar si el título está vacío
        } else {
            placeholder.style.display = 'none'; // Ocultar si el título tiene contenido
        }
    }
    const tituloElemento = document.getElementById('titulo');
    const placeholder = document.getElementById('titulo-placeholder');
    togglePlaceholder(tituloElemento, placeholder);

    tituloElemento.addEventListener('blur', () => {
        togglePlaceholder(tituloElemento, placeholder); // Mostrar u ocultar el placeholder según el contenido
    });
    tituloElemento.addEventListener('input', () => {
        togglePlaceholder(tituloElemento, placeholder);
    });
}


