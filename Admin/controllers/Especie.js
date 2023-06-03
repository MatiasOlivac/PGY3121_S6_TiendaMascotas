require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

//http://estilow3b.com/metodos-http-post-get-put-delete/

//metodo GET ESPECIES
module.exports.buscar_todo = app.get('/', (request, response) => {  
    const sql = "SELECT ID_ESPECIES, NOMBRE FROM ESPECIES";
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            response.status(200).send(results);
        } else {
            response.status(204).send('Sin resultado');
        }
    })               
});

//metodo PATCH ESPECIES
module.exports.actualizar = app.patch('/', (req, res) => {
    const { id_especie, nombre } = req.body;
    const sql = "UPDATE ESPECIES SET NOMBRE = ? WHERE ID_ESPECIES = ?";
    const values = [nombre];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.send(`ESPECIES con id ${id} actualizado correctamente`);
    });
});

//metodo post ESPECIES
module.exports.agregar = app.post('/', (req, res) => {
    const { nombre } = req.body;
    const sql = "INSERT INTO ESPECIES (NOMBRE) VALUES (?, ?)";
    const values = [nombre, 1];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('ESPECIE agregado exitosamente');
    });
});


//metodo PUT ESPECIES
module.exports.eliminar = app.put('/', (request, response) => {
    const { id } = request.body;
    const sql = "UPDATE ESPECIES WHERE ID_ESPECIES = ?";
    connection.query(sql, id, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`ESPECIES con id ${id} eliminado correctamente`);
      } else {
        response.status(404).send(`ESPECIES con id ${id} no encontrado`);
      }
    });
});