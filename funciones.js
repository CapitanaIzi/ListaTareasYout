function guardarEstado() {
    const elementos = [];
    const cuadros = document.getElementsByClassName('cuadro');
    const flechas = document.getElementsByClassName('flecha');
    const titulo = document.getElementById('titulo').innerText; // Obtener el título editable

    // Guardar el título en el arreglo de elementos
    elementos.push({
        type: 'titulo',
        content: titulo,
    });
    
    for (let cuadro of cuadros) {
        elementos.push({
            type: 'cuadro',
            content: cuadro.innerText,
            left: cuadro.style.left,
            top: cuadro.style.top,
            backgroundColor: cuadro.style.backgroundColor  // Guardar el color de fondo
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

function cargarElementos() {
    const elementosGuardados = JSON.parse(localStorage.getItem('mapaConceptual'));
    if (elementosGuardados) {
        elementosGuardados.forEach(item => {
            if (item.type === 'titulo') {
                const tituloElemento = document.getElementById('titulo');
                tituloElemento.innerText = item.content; // Cargar el título
            } else if (item.type === 'cuadro') {
                const cuadro = new Cuadro(item.content, item.left, item.top);
                cuadro.element.style.backgroundColor = item.backgroundColor;  // Cargar el color de fondo
            } else if (item.type === 'flecha') {
                new Flecha(item.width, item.left, item.top, item.rotation);
            }
        });
    }
}



