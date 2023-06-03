require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

//http://estilow3b.com/metodos-http-post-get-put-delete/


module.exports.buscarTodosSeguimientos = app.get('/', (req, res) => {
  const sql = `SELECT ID_SEGUIMIENTO
               FROM SEGUIMIENTOS`;
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.status(200).send(results);
    } else {
      res.status(204).send('Sin resultados');
    }
  });
});

module.exports.agregarSeguimiento = app.post('/', (req, res) => {
    const { NOMBRE } = req.body;
    const sql = `INSERT INTO SEGUIMIENTOS 
                (NOMBRE) VALUES (?)`;
    const values = [NOMBRE];
  
    connection.query(sql, values, (error, results) => {
      if (error) throw error;
      res.status(200).send('Seguimiento agregado exitosamente');
    });
  });
  
  module.exports.actualizarSeguimiento = app.patch('/:id', (req, res) => {
    const ID_SEGUIMIENTO = req.params.id;
    const { NOMBRE } = req.body;
    const sql = `UPDATE SEGUIMIENTOS SET NOMBRE = ? 
                WHERE ID_SEGUIMIENTO = ?`;
    const values = [NOMBRE, ID_SEGUIMIENTO];
  
    connection.query(sql, values, (error, results) => {
      if (error) throw error;
      res.send(`Seguimiento con ID ${ID_SEGUIMIENTO} actualizado correctamente`);
    });
  });
  
  module.exports.eliminarSeguimiento = app.delete('/:id', (req, res) => {
    const ID_SEGUIMIENTO = req.params.id;
    const sql = `DELETE FROM SEGUIMIENTOS 
                WHERE ID_SEGUIMIENTO = ?`;
    connection.query(sql, ID_SEGUIMIENTO, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        res.status(200).send(`Seguimiento con ID ${ID_SEGUIMIENTO} eliminado correctamente`);
      } else {
        res.status(404).send(`Seguimiento con ID ${ID_SEGUIMIENTO} no encontrado`);
      }
    });
  });

  module.exports.eliminar_estado_Seguimiento = app.put('/', (request, response) => {
    const { ID_SEGUIMIENTO } = request.body;
    const sql = `UPDATE SEGUIMIENTOS SET ESTADO = 0
                 WHERE ID_SEGUIMIENTO = ?`;
    connection.query(sql, ID_SEGUIMIENTO, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`Seguimiento con id ${ID_SEGUIMIENTO} eliminado correctamente`);
      } else {
        response.status(404).send(`Seguimiento con ID ${ID_SEGUIMIENTO} no encontrado`);
      }
    });
});
  