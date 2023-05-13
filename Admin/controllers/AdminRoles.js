require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

//http://estilow3b.com/metodos-http-post-get-put-delete/

module.exports.buscar_todo = app.get('/', (request, response) => {  
    const sql = "SELECT ID_ROL, NOMBRE FROM USUARIO_ROLES";
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
    const sql = "UPDATE USUARIO_ROLES SET NOMBRE = ? WHERE ID_ROL = ?";
    const values = [nombre, id];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.send(`Rol con id ${id} actualizado correctamente`);
    });
});

//metodo post roles
module.exports.agregar = app.post('/', (req, res) => {
    const { nombre } = req.body;
    const sql = "INSERT INTO USUARIO_ROLES (NOMBRE) VALUES (?)";
    const values = [nombre, 1];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('Rol agregado exitosamente');
    });
});

module.exports.eliminar = app.put('/', (request, response) => {
    const { id } = request.body;
    const sql = "UPDATE USUARIO_ROLES SET estado = 0 WHERE ID_ROL = ?";
    connection.query(sql, id, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`Rol con id ${id} eliminado correctamente`);
      } else {
        response.status(404).send(`Rol con id ${id} no encontrado`);
      }
    });
});