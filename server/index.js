const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'usuarios_crud'
});

// Petición CREAR
// La ruta a través de la cual se hará llamado es create
// Se crea la solicitud que tendrá una respuesta
// Para cada const es igual a lo que llegó de solicitud que tiene cuerpo y enviaron con ese nombre.
app.post('/create', (req, res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const correo = req.body.correo;
    const telefono = req.body.telefono;
    const direccion = req.body.direccion;

    db.query('INSERT INTO Usuarios(nombre, edad, correo, telefono, direccion) VALUES(?,?,?,?,?)', [nombre, edad, correo, telefono, direccion],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
});

// PETICIÓN LISTAR (READ)
app.get('/Usuarios', (req, res) => {

    db.query('SELECT * FROM Usuarios',
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
});

// PETICIÓN ACTUALIZAR (UPDATE)
app.put('/update', (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const correo = req.body.correo;
    const telefono = req.body.telefono;
    const direccion = req.body.direccion;

    db.query('UPDATE Usuarios SET nombre=?, edad=?, correo=?, telefono=?, direccion=? WHERE id=?', 
        [nombre, edad, correo, telefono, direccion, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
});

// PETICIÓN ELIMINAR (DELETE)
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM Usuarios WHERE id=?',id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
});

app.listen(3001, () => {
    console.log('Escuchando en el puerto 3001.');
})