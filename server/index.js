const express = require('express');
const app = express();
const port = 3004;
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const pool = mysql.createPool({
    connectionLimit: 5,
    host: 'bgamk1kudjbanjcin6ne-mysql.services.clever-cloud.com',
    user: 'ultprpzstdxncutt',
    password: '34wW7eII72DhmCzBIUVu',
    database: 'bgamk1kudjbanjcin6ne'
});

app.use(express.json());
app.use(express.static('public'));
app.use('/scripts', express.static('public/scripts', { 'Content-Type': 'application/javascript' }));



/* Obtener todos los cursos */
app.get('/cursos', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from cursos', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            console.log('Los datos de la tabla cursos son: \n', rows)
        })
    })
});

/* Obtener todos los centros */
app.get('/centros', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from centros', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
});

/* Obtener todos los alumnos */
app.get('/alumnos', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from alumnos', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
});


/* Añadir un centro */
app.post('/agregarCentro', (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        const { nombre, ciudad } = req.body;
        const params = { nombre, ciudad };
        connection.query('INSERT INTO centros SET ?', params, (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send('Centro con el ID ' + rows.insertId + ' añadido.')
            } else {
                console.log(err)
            }
        })
    })
});

/* Añadir un alumno */
app.post('/agregarAlumno', (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        const { nombre, apellidos, aprobado } = req.body;
        const params = { nombre, apellidos, aprobado };
        connection.query('INSERT INTO alumnos SET ?', params, (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send('Centro con el ID ' + rows.insertId + ' añadido.')
            } else {
                console.log(err)
            }
        })
    })
});

/* Cambiar datos de un centro */
app.put('/datosCurso', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { nombre, nivel, descripcion, id } = req.body
        console.log(req.body);

        connection.query('UPDATE cursos SET nombre = ?, nivel = ?, descripcion = ? WHERE id = ?', [nombre, nivel, descripcion, id], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(`Curso con el id ${id} actualizado`);
            } else {
                console.log(err);
            }
        })
    })
});

app.listen(port, () => {
    console.log(`Servidor Node.js escuchando en puerto ${port}`);
});
