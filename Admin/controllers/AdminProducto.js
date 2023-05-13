require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

//http://estilow3b.com/metodos-http-post-get-put-delete/

module.exports.buscar_todo = app.get('/', (request, response) => {  
    const sql = "SELECT ID_PRODUCTO, NOMBRE, VALOR, STOCK, ID_ESPECIE, ID_PROMOCION, IMAGEN FROM PRODUCTOS";
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
    const { id, nombre, valor, stock, id_especie, id_promocion, imagen } = req.body;
    const sql = "UPDATE PRODUCTOS SET NOMBRE, VALOR, STOCK, ID_ESPECIE, ID_PROMOCION, IMAGEN = ? WHERE ID_PRODUCTO = ?";
    const values = [nombre, valor, stock, id_especie, id_promocion, imagen, id];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.send(`PRODUCTOS con id ${id} actualizado correctamente`);
    });
});

//metodo post PRODUCTOS
module.exports.agregar = app.post('/', (req, res) => {
    const { nombre } = req.body;
    const sql = "INSERT INTO PRODUCTOS (NOMBRE, VALOR, STOCK, ID_ESPECIE, ID_PROMOCION, IMAGEN, estado) VALUES (?, ?)";
    const values = [nombre, 1];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('PRODUCTOS agregado exitosamente');
    });
});

module.exports.eliminar = app.put('/', (request, response) => {
    const { id } = request.body;
    const sql = "UPDATE PRODUCTOS WHERE ID_PRODUCTO = ?";
    connection.query(sql, id, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`PRODUCTOS con id ${id} eliminado correctamente`);
      } else {
        response.status(404).send(`PRODUCTOS con id ${id} no encontrado`);
      }
    });
});