CREATE DATABASE mi_aplicacion;
USE mi_aplicacion;
CREATE TABLE listas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,              
    lista_id INT,                 
    titulo VARCHAR(255),
    descripcion TEXT,
    completada BOOLEAN DEFAULT FALSE,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lista_id) REFERENCES listas(id) ON DELETE CASCADE 
);

---- ID del usuario al que pertenecen las tareas
-- Asegúrate de tener la tabla listas
CREATE TABLE mapas_conceptuales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  nombre VARCHAR(255),
  contenido TEXT, 
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);
 -- ID del usuario al que pertenece el mapa conceptual
 -- Puedes almacenar un JSON o una representación de los elementos del mapa

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_usuario VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE,
  contrasena VARCHAR(255),
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE tareas
ADD lista_id INT,
ADD CONSTRAINT fk_lista
FOREIGN KEY (lista_id) REFERENCES listas(id) ON DELETE CASCADE;


INSERT INTO tareas (usuario_id, titulo, descripcion)
VALUES (1, 'Comprar leche', 'No olvides comprar leche entera');

SELECT * FROM tareas WHERE usuario_id = 1;
