require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

//http://estilow3b.com/metodos-http-post-get-put-delete/

module.exports.buscar_todo = app.get('/', (request, response) => {  
    const sql = "SELECT ID_PRODUCTOS, NOMBRE, VALOR, STOCK, IMAGEN, PROMOCIONES_ID_PROMOCIONES, ESPECIES_ID_ESPECIES FROM PRODUCTOS";
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
    const {ID_PRODUCTOS, NOMBRE, VALOR, STOCK, IMAGEN, PROMOCIONES_ID_PROMOCIONES, ESPECIES_ID_ESPECIES } = req.body;
    const sql = "UPDATE PRODUCTOS SET NOMBRE = ?, VALOR = ?, STOCK = ?, IMAGEN = ?, PROMOCIONES_ID_PROMOCIONES = ?, ESPECIES_ID_ESPECIES = ? WHERE ID_PRODUCTOS = ?";
    const values = [ NOMBRE, VALOR, STOCK, IMAGEN, PROMOCIONES_ID_PROMOCIONES, ESPECIES_ID_ESPECIES, ID_PRODUCTOS ];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.send(`PRODUCTOS con id ${ID_PRODUCTOS} actualizado correctamente`);
    });
});

//metodo post PRODUCTOS
module.exports.agregar = app.post('/', (req, res) => {
    const { NOMBRE, VALOR, STOCK, IMAGEN, PROMOCIONES_ID_PROMOCIONES, ESPECIES_ID_ESPECIES } = req.body;
    const sql = "INSERT INTO PRODUCTOS ( NOMBRE, VALOR, STOCK, IMAGEN, PROMOCIONES_ID_PROMOCIONES, ESPECIES_ID_ESPECIES) VALUES (?,?,?,?,?,?)";
    const values = [ NOMBRE, VALOR, STOCK, IMAGEN, PROMOCIONES_ID_PROMOCIONES, ESPECIES_ID_ESPECIES ];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('PRODUCTOS agregado exitosamente');
    });
});

module.exports.eliminar = app.delete('/', (request, response) => {
    const { ID_PRODUCTOS } = request.body;
    const sql = "DELETE FROM PRODUCTOS WHERE ID_PRODUCTOS = ?";
    connection.query(sql, ID_PRODUCTOS, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`PRODUCTOS con id ${ID_PRODUCTOS} eliminado correctamente`);
      } else {
        response.status(404).send(`PRODUCTOS con id ${ID_PRODUCTOS} no encontrado`);
      }
    });
});