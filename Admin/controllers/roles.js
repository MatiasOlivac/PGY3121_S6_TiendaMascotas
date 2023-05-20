require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

//http://estilow3b.com/metodos-http-post-get-put-delete/

module.exports.buscar_todo = app.get('/', (request, response) => {  
    const sql = "SELECT id_rol, nombre FROM usuario_roles";
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
    const { id_rol, nombre } = req.body;
    const sql = "UPDATE usuario_roles SET nombre = ? WHERE id_rol = ?";
    const values = [nombre, id_rol];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.send(`Rol con id ${id_rol} actualizado correctamente`);
    });
});

//metodo post roles
module.exports.agregar = app.post('/', (req, res) => {
    const { nombre } = req.body;
    const sql = "INSERT INTO usuario_roles (nombre) VALUES ( ?)";
    const values = [nombre];

    connection.query(sql, values, (error, results) => {
        if (error) throw error;
        res.status(200).send('Rol agregado exitosamente');
    });
});

module.exports.eliminar = app.delete('/', (request, response) => {
    const { id_rol } = request.body;
    const sql = "DELETE FROM usuario_roles WHERE id_rol = ?";
    connection.query(sql, id_rol, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`Rol con id ${id_rol} eliminado correctamente`);
      } else {
        response.status(404).send(`Rol con id ${id_rol} no encontrado`);
      }
    });
});