document.addEventListener('DOMContentLoaded', function () {
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
    // Evento para guardar cambios
    btnGuardar.addEventListener('click', () => {
        guardarEstado(); // Llama a la función para guardar el estado
        alert('Estado guardado.');
    });
    document.addEventListener('mousemove', (e) => {
        // Obtener la posición del botón "Eliminar"
        const rectEliminarBtn = eliminarBtn.getBoundingClientRect();

        // Obtener todos los elementos que pueden ser eliminados (cuadros, flechas, etc.)
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
                // Eliminar el elemento
                element.remove();
                // Guarda el estado después de eliminar
            }
        });

    });
    let cuadroActivo = null;  // Variable para almacenar el cuadro activo
    // Mostrar el menú al hacer clic en Insertar
    btnInsertar.addEventListener('click', () => {
        menuInsertar.style.display = menuInsertar.style.display === 'block' ? 'none' : 'block';
    });

    // Crear un cuadro al hacer clic en el botón de insertar
    document.getElementById('insertar-cuadro').addEventListener('click', () => {
        const nuevoCuadro = new Cuadro();
        cuadroActivo = nuevoCuadro.element;  // Establecer el cuadro recién creado como activo

    });

    // Mostrar el menú al hacer clic en Editar
    btnEditar.addEventListener('click', () => {
        menuEditar.style.display = menuEditar.style.display === 'block' ? 'none' : 'block';
    });

    // Mostrar el menú de colores al hacer clic en el botón de Color
    btnColor.addEventListener('click', () => {
        menuColor.style.display = menuColor.style.display === 'block' ? 'none' : 'block';
    });

    // Aplicar color al cuadro activo
    document.querySelectorAll('.color-option').forEach(button => {
        button.addEventListener('click', (e) => {
            const color = e.target.getAttribute('data-color');
            if (cuadroActivo) {
                cuadroActivo.style.backgroundColor = color;  // Cambiar el color de fondo del cuadro activo

            }
        });
    });

    // Cambiar el cuadro activo cuando se hace clic en él
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('cuadro')) {
            cuadroActivo = e.target;  // Establecer el cuadro clickeado como el cuadro activo
        }
    });

    // Crear una flecha al hacer clic en el botón de insertar
    document.getElementById('insertar-flecha').addEventListener('click', () => {
        new Flecha();

    });
    const tituloElemento = document.getElementById('titulo');
    const placeholder = document.getElementById('titulo-placeholder');

    tituloElemento.addEventListener('focus', () => {
        placeholder.style.display = 'none'; // Ocultar el placeholder cuando el div tiene foco
    });

    tituloElemento.addEventListener('blur', () => {
        if (tituloElemento.innerText.trim() === '') {
            placeholder.style.display = 'block'; // Mostrar el placeholder si está vacío
        }
    });

    // Inicialmente mostrar el placeholder si el div está vacío
    if (tituloElemento.innerText.trim() === '') {
        placeholder.style.display = 'block';
    } else {
        placeholder.style.display = 'none';
    }

});
