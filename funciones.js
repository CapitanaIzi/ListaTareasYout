function guardarEstado() {
    const elementos = [];
    const cuadros = document.getElementsByClassName('cuadro');
    const flechas = document.getElementsByClassName('flecha');

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

function cargarElementos() {
    const elementosGuardados = JSON.parse(localStorage.getItem('mapaConceptual'));
    if (elementosGuardados) {
        elementosGuardados.forEach(item => {
            if (item.type === 'cuadro') {
                new Cuadro(item.content, item.left, item.top);
            } else if (item.type === 'flecha') {
                new Flecha(item.width, item.left, item.top, item.rotation);
            }
        });
    }
}
