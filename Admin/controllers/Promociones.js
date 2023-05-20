require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

//http://estilow3b.com/metodos-http-post-get-put-delete/

module.exports.buscar_todo = app.get('/', (request, response) => {  
    const sql = "SELECT ID_PROMOCIONES, NOMBRE FROM PROMOCIONES";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            response.status(200).send(results);
        } else {
            response.status(204).send('Sin resultado');
        }
    })               
});

module.exports.actualizar = app.patch('/', (req, res) => {
    const { id, nombre } = req.body;
    const sql = "UPDATE PROMOCIONES SET NOMBRE = ? WHERE ID_PROMOCIONES = ?";
    const values = [nombre];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.send(`PROMOCIONES con id ${id} actualizado correctamente`);
    });
});

//metodo post PRODUCTOS
module.exports.agregar = app.post('/', (req, res) => {
    const { nombre } = req.body;
    const sql = "INSERT INTO PROMOCIONES (NOMBRE) VALUES (?, ?)";
    const values = [nombre, 1];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('PROMOCIONES agregado exitosamente');
    });
});

module.exports.eliminar = app.put('/', (request, response) => {
    const { id } = request.body;
    const sql = "UPDATE PROMOCIONES WHERE ID_PROMOCIONES = ?";
    connection.query(sql, id, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`PROMOCIONES con id ${id} eliminado correctamente`);
      } else {
        response.status(404).send(`PROMOCIONES con id ${id} no encontrado`);
      }
    });
});