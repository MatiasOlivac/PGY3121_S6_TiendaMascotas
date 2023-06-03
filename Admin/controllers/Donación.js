require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

// Obtener todas las donaciones
module.exports.buscar_todo = app.patch('/', (request, response) => {
    const sql = "SELECT ID_DONACION, FECHA, MONTO, ID_USUARIO FROM DONACIONES";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            response.status(200).send(results);
        } else {
            response.status(204).send('Sin resultado');
        }
    });
});

// Actualizar una donación
module.exports.actualizar('/', (req, res) => {
    const { id, fecha, monto, id_usuario } = req.body;
    const sql = "UPDATE DONACIONES SET FECHA = ?, MONTO = ?, ID_USUARIO = ? WHERE ID_DONACION = ?";
    const values = [fecha, monto, id_usuario, id];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.send(`Donación con id ${id} actualizada correctamente`);
    });
});

// Agregar una nueva donación
module.exports.agregar = app.post('/', (req, res) => {
    const { id, fecha, monto, id_usuario } = req.body;
    const sql = "INSERT INTO DONACIONES (ID_DONACION, FECHA, MONTO, ID_USUARIO) VALUES (?, ?, ?, ?)";
    const values = [id, fecha, monto, id_usuario];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('Donación agregada exitosamente');
    });
});

// Eliminar una donación
module.exports.eliminar = app.put('/', (request, response) => {
    const { id } = request.body;
    const sql = "DELETE FROM DONACIONES WHERE ID_DONACION = ?";
    connection.query(sql, id, (error, results) => {
        if (error) throw error;
        if (results.affectedRows > 0) {
            response.status(200).send(`Donación con id ${id} eliminada correctamente`);
        } else {
            response.status(404).send(`Donación con id ${id} no encontrada`);
        }
    });
});