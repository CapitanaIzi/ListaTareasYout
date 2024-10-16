document.addEventListener('DOMContentLoaded', function() {
    const btnInsertar = document.getElementById('btn-insertar');
    const menuInsertar = document.getElementById('menu-insertar');
    const btnEliminar = document.getElementById('btn-eliminar');
    const mapaConceptual = document.getElementById('mapa-conceptual');

    // Mostrar el menú desplegable al hacer clic en Insertar
    btnInsertar.addEventListener('click', () => {
        menuInsertar.style.display = menuInsertar.style.display === 'block' ? 'none' : 'block';
    });

    // Función para crear un nuevo cuadro en el mapa conceptual
    const insertarCuadro = () => {
        const cuadro = document.createElement('div');
        cuadro.classList.add('cuadro');
        cuadro.setAttribute('contenteditable', 'true'); // Permitir editar el texto directamente
        cuadro.innerText = 'Escribe aquí';

        // Posicionar el cuadro en el centro al crearlo
        cuadro.style.top = '50%';
        cuadro.style.left = '50%';
        mapaConceptual.appendChild(cuadro);

        habilitarArrastre(cuadro);
    };

    // Crear cuadro al hacer clic en el botón del menú
    document.getElementById('insertar-cuadro').addEventListener('click', insertarCuadro);

    // Habilitar la funcionalidad de arrastre para los cuadros
    const habilitarArrastre = (elemento) => {
        let isDragging = false;
        let offsetX, offsetY;

        elemento.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.offsetX;
            offsetY = e.offsetY;
            elemento.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                elemento.style.left = (e.pageX - offsetX) + 'px';
                elemento.style.top = (e.pageY - offsetY) + 'px';

                // Verificar si el cuadro está sobre el botón de eliminar
                const eliminarPos = btnEliminar.getBoundingClientRect();
                const cuadroPos = elemento.getBoundingClientRect();

                // Si se mueve sobre el botón "Eliminar", elimina el cuadro
                if (
                    cuadroPos.top < eliminarPos.bottom &&
                    cuadroPos.bottom > eliminarPos.top &&
                    cuadroPos.left < eliminarPos.right &&
                    cuadroPos.right > eliminarPos.left
                ) {
                    elemento.remove(); // Elimina el cuadro
                }
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            elemento.style.cursor = 'grab';
        });
    };
});
