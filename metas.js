let numeroMeta = 0; // Para contar cuántas metas hay y calcular su posición
// Función para editar la meta principal
function editarMetaPrincipal() {
    let metaPrincipal = document.getElementById('metaPrincipalTexto');
    let nuevoTexto = prompt("Editar Meta Principal:", metaPrincipal.innerText);
    if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
        metaPrincipal.innerText = nuevoTexto;
    }
}

// Función para editar una meta secundaria
function editarMeta(boton) {
    let meta = boton.parentElement.querySelector('span');
    let nuevoTexto = prompt("Editar meta:", meta.innerText);
    if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
        meta.innerText = nuevoTexto;
    }
}

// Función para agregar una nueva meta
function agregarMeta() {
    const nuevaMetaInput = document.getElementById('nuevaMetaInput');
    const textoMeta = nuevaMetaInput.value.trim();

    if (textoMeta === "") {
        alert("Por favor, ingresa el nombre de la meta.");
        return;
    }

    // Crear el nuevo elemento meta
    const nuevaMeta = document.createElement('div');
    nuevaMeta.classList.add('meta');
    nuevaMeta.draggable = true; // Hacer que la nueva meta sea arrastrable

    const spanMeta = document.createElement('span');
    spanMeta.innerText = textoMeta;

    const botonEditar = document.createElement('button');
    botonEditar.innerText = "Editar";
    botonEditar.onclick = function () {
        editarMeta(botonEditar);
    };

    // Añadir el texto y el botón al nuevo div de meta
    nuevaMeta.appendChild(spanMeta);
    nuevaMeta.appendChild(botonEditar);

    // Posicionar la nueva meta en la parte inferior de la pantalla
    nuevaMeta.style.left = `${numeroMeta * 120}px`; // Espacio entre metas
    nuevaMeta.style.bottom = '10px'; // A 10px del fondo

    // Agregar la nueva meta al contenedor de sub-metas
    document.getElementById('mapa-conceptual').appendChild(nuevaMeta);

    // Habilitar la nueva meta para ser arrastrada
    habilitarArrastrar(nuevaMeta);

    // Incrementar el contador de metas
    numeroMeta++;

    // Limpiar el campo de entrada
    nuevaMetaInput.value = "";
}

    // Habilitar arrastrar y soltar para las metas
    function habilitarArrastrar(meta) {
        let isDragging = false;
        let offsetX, offsetY;

        meta.addEventListener('mousedown', function (e) {
            isDragging = true;
            offsetX = e.offsetX;
            offsetY = e.offsetY;
            meta.style.cursor = 'grabbing';
            meta.style.position = 'absolute'; // Asegura que sea posible mover la meta
        });

        document.addEventListener('mousemove', function (e) {
            if (isDragging) {
                meta.style.left = (e.pageX - offsetX) + 'px';
                meta.style.top = (e.pageY - offsetY) + 'px';
            }
        });

        document.addEventListener('mouseup', function () {
            isDragging = false;
            meta.style.cursor = 'grab';
        });
    }


    // Habilitar el arrastre para todas las metas existentes
    const metas = document.querySelectorAll('.meta');
    metas.forEach(meta => habilitarArrastrar(meta));

    // Habilitar el desplazamiento del mapa completo con el mouse
    let mapaConceptual = document.getElementById('mapa-conceptual');
    let isMapDragging = false;
    let startX, startY, scrollLeft, scrollTop;

    mapaConceptual.addEventListener('mousedown', (e) => {
        isMapDragging = true;
        mapaConceptual.style.cursor = 'grabbing';
        startX = e.pageX - mapaConceptual.offsetLeft;
        startY = e.pageY - mapaConceptual.offsetTop;
        scrollLeft = mapaConceptual.scrollLeft;
        scrollTop = mapaConceptual.scrollTop;
    });

    mapaConceptual.addEventListener('mouseup', () => {
        isMapDragging = false;
        mapaConceptual.style.cursor = 'grab';
    });

    mapaConceptual.addEventListener('mousemove', (e) => {
        if (!isMapDragging) return;
        e.preventDefault();
        const x = e.pageX - mapaConceptual.offsetLeft;
        const y = e.pageY - mapaConceptual.offsetTop;
        const walkX = (x - startX) * 2;
        const walkY = (y - startY) * 2;
        mapaConceptual.scrollLeft = scrollLeft - walkX;
        mapaConceptual.scrollTop = scrollTop - walkY;
    });
