document.addEventListener('DOMContentLoaded', function () {
    const btnInsertar = document.getElementById('btn-insertar');
    const menuInsertar = document.getElementById('menu-insertar');
    const btnEliminar = document.getElementById('btn-eliminar');
    const mapaConceptual = document.getElementById('mapa-conceptual');

    // Función para guardar el estado de los elementos
    function guardarEstado() {
        const elementos = [];
        const cuadros = mapaConceptual.getElementsByClassName('cuadro');
        const flechas = mapaConceptual.getElementsByClassName('flecha');

        for (let cuadro of cuadros) {
            elementos.push({
                type: 'cuadro',
                content: cuadro.innerText,
                left: cuadro.style.left,
                top: cuadro.style.top,
            });
        }

        for (let flecha of flechas) {
            elementos.push({
                type: 'flecha',
                width: flecha.style.width,
                left: flecha.style.left,
                top: flecha.style.top,
                rotation: flecha.style.transform,
            });
        }

        localStorage.setItem('mapaConceptual', JSON.stringify(elementos));
    }

    // Función para cargar elementos guardados
    function cargarElementos() {
        const elementosGuardados = JSON.parse(localStorage.getItem('mapaConceptual'));
        if (elementosGuardados) {
            elementosGuardados.forEach(item => {
                if (item.type === 'cuadro') {
                    const cuadro = document.createElement('div');
                    cuadro.classList.add('cuadro');
                    cuadro.setAttribute('contenteditable', 'true');
                    cuadro.innerText = item.content;
                    cuadro.style.left = item.left;
                    cuadro.style.top = item.top;
                    mapaConceptual.appendChild(cuadro);
                    habilitarArrastre(cuadro);
                } else if (item.type === 'flecha') {
                    const flecha = document.createElement('div');
                    flecha.classList.add('flecha');
                    flecha.style.width = item.width;
                    flecha.style.left = item.left;
                    flecha.style.top = item.top;
                    flecha.style.transform = item.rotation;

                    const controlRotacion = document.createElement('div');
                    controlRotacion.classList.add('control-rotacion');
                    flecha.appendChild(controlRotacion);

                    const controlTamano = document.createElement('div');
                    controlTamano.classList.add('control-tamano');
                    flecha.appendChild(controlTamano);

                    mapaConceptual.appendChild(flecha);
                    habilitarArrastre(flecha);
                    habilitarRotacion(controlRotacion, flecha);
                    habilitarTamano(controlTamano, flecha);
                }
            });
        }
    }

    // Cargar elementos guardados al iniciar
    cargarElementos();

    // Mostrar el menú desplegable al hacer clic en Insertar
    btnInsertar.addEventListener('click', () => {
        menuInsertar.style.display = menuInsertar.style.display === 'block' ? 'none' : 'block';
    });

    // Función para crear un nuevo cuadro en el mapa conceptual
    function insertarCuadro() {
        const cuadro = document.createElement('div');
        cuadro.classList.add('cuadro');
        cuadro.setAttribute('contenteditable', 'true'); // Permitir editar el texto directamente
        cuadro.focus(); // Poner el foco en el cuadro para que aparezca el cursor

        // Posicionar el cuadro en el centro al crearlo
        cuadro.style.top = '50%';
        cuadro.style.left = '50%';
        mapaConceptual.appendChild(cuadro);

        habilitarArrastre(cuadro);
        guardarEstado();
    }

    // Modificación en la creación de la flecha para agregar un control de rotación
    function insertarFlecha() {
        const flecha = document.createElement('div');
        flecha.classList.add('flecha');

        // Posicionar la flecha en el centro al crearse
        flecha.style.left = '50%';
        flecha.style.top = '50%';

        // Agregar control de rotación
        const controlRotacion = document.createElement('div');
        controlRotacion.classList.add('control-rotacion');
        controlRotacion.style.right = '-10px'; // Colocar el control de rotación a la derecha
        flecha.appendChild(controlRotacion);

        // Agregar control de tamaño
        const controlTamano = document.createElement('div');
        controlTamano.classList.add('control-tamano');
        flecha.appendChild(controlTamano);

        mapaConceptual.appendChild(flecha);

        habilitarArrastre(flecha);
        habilitarRotacion(controlRotacion, flecha);
        habilitarTamano(controlTamano, flecha);
        guardarEstado();
    }

    // Crear cuadro al hacer clic en el botón del menú
    document.getElementById('insertar-cuadro').addEventListener('click', insertarCuadro);

    // Crear flecha al hacer clic en el botón del menú
    document.getElementById('insertar-flecha').addEventListener('click', insertarFlecha);

    // Habilitar la funcionalidad de arrastre para los cuadros y flechas
    function habilitarArrastre(elemento) {
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

                // Verificar si el cuadro o flecha está sobre el botón de eliminar
                const eliminarPos = btnEliminar.getBoundingClientRect();
                const elementoPos = elemento.getBoundingClientRect();

                // Si se mueve sobre el botón "Eliminar", elimina el elemento
                if (
                    elementoPos.top < eliminarPos.bottom &&
                    elementoPos.bottom > eliminarPos.top &&
                    elementoPos.left < eliminarPos.right &&
                    elementoPos.right > eliminarPos.left
                ) {
                    elemento.remove(); // Elimina el cuadro o flecha
                    guardarEstado(); // Guardar el estado después de eliminar
                }
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            elemento.style.cursor = 'grab';
            guardarEstado(); // Guardar el estado después de mover
        });
    }

    // Habilitar la funcionalidad de rotación para la flecha
    function habilitarRotacion(control, flecha) {
        let isRotating = false;
        let lastAngle = 0;

        control.addEventListener('mousedown', (e) => {
            isRotating = true;
            e.stopPropagation(); // Evitar que se inicie el arrastre
        });

        document.addEventListener('mousemove', (e) => {
            if (isRotating) {
                const rect = flecha.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
                const angleDiff = angle - lastAngle;

                // Suavizar el giro limitando el rango de movimiento
                if (Math.abs(angleDiff) > 1) {
                    flecha.style.transform = `rotate(${angle}deg)`;
                    lastAngle = angle;
                }
            }
        });

        document.addEventListener('mouseup', () => {
            isRotating = false;
            guardarEstado(); // Guardar el estado después de rotar
        });
    };

    // Habilitar la funcionalidad de tamaño para la flecha
    function habilitarTamano(control, flecha) {
        let isResizing = false;
        let initialMouseX = 0;
        let initialMouseY = 0;
        let initialWidth = 0;
        let initialHeight = 0;
    
        control.addEventListener('mousedown', (e) => {
            isResizing = true;
            e.stopPropagation(); // Evitar que se inicie el arrastre
            const rect = flecha.getBoundingClientRect();
            initialMouseX = e.clientX;
            initialMouseY = e.clientY;
            initialWidth = rect.width;
            initialHeight = rect.height;
        });
    
        document.addEventListener('mousemove', (e) => {
            if (isResizing) {
                // Obtener el ángulo de rotación actual de la flecha
                const transform = window.getComputedStyle(flecha).transform;
                let angle = 0;
                if (transform !== 'none') {
                    const values = transform.split('(')[1].split(')')[0].split(',');
                    const a = values[0];
                    const b = values[1];
                    angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
                }
    
                // Diferencias de movimiento del mouse
                const mouseDiffX = e.clientX - initialMouseX;
                const mouseDiffY = e.clientY - initialMouseY;
    
                // Calcular el cambio en el tamaño en función del ángulo de rotación
                const deltaX = Math.cos(angle * (Math.PI / 180)) * mouseDiffX + Math.sin(angle * (Math.PI / 180)) * mouseDiffY;
                let newWidth = initialWidth + deltaX;
    
                // Ajustar el ancho sin aumentar la altura y permitir redimensionar en cualquier ángulo
                if (newWidth > 20) { // Mantener un tamaño mínimo
                    flecha.style.width = newWidth + 'px';
                }
            }
        });
    
        document.addEventListener('mouseup', () => {
            isResizing = false;
            guardarEstado(); // Guardar el estado después de cambiar el tamaño
        });
    };
    


});

