require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

// Obtener todas las ventas
app.get('/', (request, response) => {
    const sql = "SELECT * FROM VENTAS";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            response.status(200).send(results);
        } else {
            response.status(204).send('Sin resultado');
        }
    });
});

// Actualizar una venta
app.patch('/', (req, res) => {
    const { id, fecha, estado, hora, id_usuario } = req.body;
    const sql = "UPDATE VENTAS SET FECHA = ?, ESTADO = ?, HORA = ?, ID_USUARIO = ? WHERE ID_VENTA = ?";
    const values = [fecha, estado, hora, id_usuario, id];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.send(`Venta con id ${id} actualizada correctamente`);
    });
});

// Agregar una nueva venta
app.post('/', (req, res) => {
    const { id, fecha, estado, hora, id_usuario } = req.body;
    const sql = "INSERT INTO VENTAS (ID_VENTA, FECHA, ESTADO, HORA, ID_USUARIO) VALUES (?, ?, ?, ?, ?)";
    const values = [id, fecha, estado, hora, id_usuario];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('Venta agregada exitosamente');
    });
});

// Eliminar una venta
app.put('/', (request, response) => {
    const { id } = request.body;
    const sql = "DELETE FROM VENTAS WHERE ID_VENTA = ?";
    connection.query(sql, id, (error, results) => {
        if (error) throw error;
        if (results.affectedRows > 0) {
            response.status(200).send(`Venta con id ${id} eliminada correctamente`);
        } else {
            response.status(404).send(`Venta con id ${id} no encontrada`);
        }
    });
});