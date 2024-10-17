document.addEventListener('DOMContentLoaded', function () {
    const btnInsertar = document.getElementById('btn-insertar');
    const menuInsertar = document.getElementById('menu-insertar');

    // Cargar elementos guardados al iniciar
    cargarElementos();

    // Mostrar el menú al hacer clic en Insertar
    btnInsertar.addEventListener('click', () => {
        menuInsertar.style.display = menuInsertar.style.display === 'block' ? 'none' : 'block';
    });

    // Crear un cuadro al hacer clic en el botón de insertar
    document.getElementById('insertar-cuadro').addEventListener('click', () => {
        new Cuadro();
        guardarEstado();
    });

    // Crear una flecha al hacer clic en el botón de insertar
    document.getElementById('insertar-flecha').addEventListener('click', () => {
        new Flecha();
        guardarEstado();
    });
});
