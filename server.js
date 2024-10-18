const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise'); // Asegúrate de tener mysql2 instalado
const app = express();
const port = 3000; // Cambia esto si es necesario

// Middleware
app.use(bodyParser.json()); // Para parsear el cuerpo de las peticiones como JSON

// Conexión a la base de datos
const dbConfig = {
    host: 'localhost',
    user: 'usuario',
    password: '1234',
    database: 'mi_aplicacion',
};

async function getConnection() {
    return await mysql.createConnection(dbConfig);
}

// Rutas de la API
app.get('/api/listas', async (req, res) => {
    try {
        const connection = await getConnection();
        const [listas] = await connection.query('SELECT * FROM listas');
        await connection.end();
        res.json(listas); // Aquí se envía la respuesta JSON
    } catch (error) {
        console.error('Error al obtener listas:', error);
        res.status(500).json({ error: 'Error al obtener listas' });
    }
});


app.post('/api/listas', async (req, res) => {
    const { nombre } = req.body;
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO listas (nombre) VALUES (?)', [nombre]);
    await connection.end();
    res.status(201).json({ id: result[0].insertId, nombre });
});

app.put('/api/listas/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const connection = await getConnection();
    await connection.query('UPDATE listas SET nombre = ? WHERE id = ?', [nombre, id]);
    await connection.end();
    res.sendStatus(204);
});

app.delete('/api/listas/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await getConnection();
    await connection.query('DELETE FROM listas WHERE id = ?', [id]);
    await connection.end();
    res.sendStatus(204);
});

// Rutas para tareas
app.get('/api/listas/:listaId/tareas', async (req, res) => {
    const { listaId } = req.params;
    const connection = await getConnection();
    const [tareas] = await connection.query('SELECT * FROM tareas WHERE lista_id = ?', [listaId]);
    await connection.end();
    res.json(tareas);
});

app.post('/api/listas/:listaId/tareas', async (req, res) => {
    const { listaId } = req.params;
    const { texto } = req.body;
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO tareas (texto, lista_id) VALUES (?, ?)', [texto, listaId]);
    await connection.end();
    res.status(201).json({ id: result[0].insertId, texto, lista_id: listaId });
});

app.put('/api/tareas/:id', async (req, res) => {
    const { id } = req.params;
    const { texto, completada } = req.body;
    const connection = await getConnection();
    await connection.query('UPDATE tareas SET texto = ?, completada = ? WHERE id = ?', [texto, completada, id]);
    await connection.end();
    res.sendStatus(204);
});

app.delete('/api/tareas/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await getConnection();
    await connection.query('DELETE FROM tareas WHERE id = ?', [id]);
    await connection.end();
    res.sendStatus(204);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
