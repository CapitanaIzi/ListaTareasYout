class Cuadro {
    constructor(content = '', left = '50%', top = '50%') {
        this.element = document.createElement('div');
        this.element.classList.add('cuadro');
        this.element.setAttribute('contenteditable', 'true');
        this.element.innerText = content;
        this.element.style.left = left;
        this.element.style.top = top;
        document.getElementById('mapa-conceptual').appendChild(this.element);
        this.habilitarArrastre();
    }

    habilitarArrastre() {
        let isDragging = false;
        let offsetX, offsetY;

        this.element.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.offsetX;
            offsetY = e.offsetY;
            this.element.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                this.element.style.left = (e.pageX - offsetX) + 'px';
                this.element.style.top = (e.pageY - offsetY) + 'px';
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            this.element.style.cursor = 'grab';
        });
    }
}

class Flecha {
    constructor(width = '100px', left = '50%', top = '50%', rotation = 'rotate(0deg)') {
        this.element = document.createElement('div');
        this.element.classList.add('flecha');
        this.element.style.width = width;
        this.element.style.left = left;
        this.element.style.top = top;
        this.element.style.transform = rotation;

        const controlRotacion = document.createElement('div');
        controlRotacion.classList.add('control-rotacion');
        this.element.appendChild(controlRotacion);

        const controlTamano = document.createElement('div');
        controlTamano.classList.add('control-tamano');
        this.element.appendChild(controlTamano);

        document.getElementById('mapa-conceptual').appendChild(this.element);
        this.habilitarArrastre();
        this.habilitarRotacion(controlRotacion);
        this.habilitarTamano(controlTamano);
    }

    habilitarArrastre() {
        let isDragging = false;
        let offsetX, offsetY;

        this.element.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.offsetX;
            offsetY = e.offsetY;
            this.element.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                this.element.style.left = (e.pageX - offsetX) + 'px';
                this.element.style.top = (e.pageY - offsetY) + 'px';
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            this.element.style.cursor = 'grab';
        });
    }

    habilitarRotacion(control) {
        let isRotating = false;
        let lastAngle = 0;

        control.addEventListener('mousedown', (e) => {
            isRotating = true;
            e.stopPropagation();
        });

        document.addEventListener('mousemove', (e) => {
            if (isRotating) {
                const rect = this.element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
                this.element.style.transform = `rotate(${angle}deg)`;
                lastAngle = angle;
            }
        });

        document.addEventListener('mouseup', () => {
            isRotating = false;
        });
    }

    habilitarTamano(control) {
        let isResizing = false;
        let initialMouseX = 0;
        let initialMouseY = 0;
        let initialWidth = 0;
        let initialHeight = 0;
    
        control.addEventListener('mousedown', (e) => {
            isResizing = true;
            e.stopPropagation();
            const rect = this.element.getBoundingClientRect();
            initialMouseX = e.clientX;
            initialMouseY = e.clientY;
            initialWidth = rect.width;
            initialHeight = rect.height;
        });
    
        document.addEventListener('mousemove', (e) => {
            if (isResizing) {
                const transform = window.getComputedStyle(this.element).transform;
                let angle = 0;
    
                // Obtener el ángulo de rotación si hay una transformación
                if (transform !== 'none') {
                    const values = transform.split('(')[1].split(')')[0].split(',');
                    const a = values[0];
                    const b = values[1];
                    angle = Math.atan2(b, a); // Ángulo en radianes
                }
    
                const mouseDiffX = e.clientX - initialMouseX;
                const mouseDiffY = e.clientY - initialMouseY;
    
                // Ajustar el cálculo en función de la rotación
                let deltaX = Math.cos(angle) * mouseDiffX + Math.sin(angle) * mouseDiffY;
                let deltaY = Math.sin(angle) * mouseDiffX - Math.cos(angle) * mouseDiffY;
    
                // Determinar si el ajuste se hace en el ancho o alto según la orientación
                let newWidth = initialWidth;
                let newHeight = initialHeight;
    
                if (Math.abs(angle) < Math.PI / 4 || Math.abs(angle) > (3 * Math.PI) / 4) {
                    // Flecha más horizontal
                    newWidth = initialWidth + deltaX;
                } else {
                    // Flecha más vertical
                    newWidth = initialHeight + deltaY;
                }
    
                // Asegurar que el nuevo tamaño sea coherente (evitar valores negativos)
                if (newWidth > 20) {
                    this.element.style.width = Math.abs(newWidth) + 'px';
                }
            }
        });
    
        document.addEventListener('mouseup', () => {
            isResizing = false;
        });
    }
    
    }

