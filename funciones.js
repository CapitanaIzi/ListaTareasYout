function guardarEstado() {
    const elementos = [];
    const cuadros = document.getElementsByClassName('cuadro');
    const flechas = document.getElementsByClassName('flecha');
    const titulo = document.getElementById('titulo').innerText || ''; // Asegúrate de que este elemento exista y tenga texto

    // Guardar el título
    elementos.push({
        type: 'titulo',
        content: titulo,
    });

    // Guardar cuadros
    for (let cuadro of cuadros) {
        elementos.push({
            type: 'cuadro',
            content: cuadro.innerText,
            left: cuadro.style.left,
            top: cuadro.style.top,
            backgroundColor: cuadro.style.backgroundColor
        });
    }

    // Guardar flechas
    for (let flecha of flechas) {
        elementos.push({
            type: 'flecha',
            width: flecha.style.width,
            left: flecha.style.left,
            top: flecha.style.top,
            rotation: flecha.style.transform,
        });
    }

    // Guardar en localStorage
    localStorage.setItem('mapaConceptual', JSON.stringify(elementos));
    console.log('Estado guardado:', elementos); // Para verificar que se guarda correctamente
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
                cuadro.element.style.backgroundColor = item.backgroundColor;
            } else if (item.type === 'flecha') {
                new Flecha(item.width, item.left, item.top, item.rotation);
            }
        });
    }
}