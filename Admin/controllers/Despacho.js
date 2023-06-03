require('dotenv').config();
const express = require('express');
const connection = require('../config/config');
const app = express();

//http://estilow3b.com/metodos-http-post-get-put-delete/

module.exports.buscarTodosDespachos = app.get('/', (req, res) => {
    const sql = `SELECT
                ID_DESPACHO, 
                ID_VENTA 
                FROM DESPACHOS`;
    connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.status(200).send(results);
      } else {
        res.status(204).send('Sin resultados');
      }
    });
  });


  module.exports.agregarDespacho = app.post('/', (req, res) => {
    const { FECHA_DESPACHO, FECHA_ENTREGA, ID_SEGUIMIENTO, ID_VENTA } = req.body;
    const sql = `INSERT INTO DESPACHOS 
                (FECHA_DESPACHO,
                FECHA_ENTREGA,
                ID_SEGUIMIENTO, 
                ID_VENTA) 
                VALUES (?, ?, ?, ?)`; 
    const values = [FECHA_DESPACHO, FECHA_ENTREGA, ID_SEGUIMIENTO, ID_VENTA];
  
    connection.query(sql, values, (error, results) => {
      if (error) throw error;
      res.status(200).send('Despacho agregado exitosamente');
    });
  });

  module.exports.actualizarDespacho = app.patch('/:id', (req, res) => {
    const ID_DESPACHO = req.params.id;
    const { FECHA_DESPACHO, FECHA_ENTREGA, ID_SEGUIMIENTO, ID_VENTA } = req.body;
    const sql = `UPDATE DESPACHOS SET 
                FECHA_DESPACHO= ?, 
                FECHA_ENTREGA = ?, 
                ID_SEGUIMIENTO = ?, 
                ID_VENTA = ?
                WHERE ID_DESPACHO = ?`;
    const values = [FECHA_DESPACHO, FECHA_ENTREGA, ID_SEGUIMIENTO, ID_VENTA, ID_DESPACHO];
  
    connection.query(sql, values, (error, results) => {
      if (error) throw error;
      res.send(`Despacho con ID ${ID_DESPACHO} actualizado correctamente`);
    });
  });

  

  module.exports.eliminarDespacho = app.delete('/:id', (req, res) => {
    const ID_DESPACHO = req.params.id;
    const sql = `DELETE FROM DESPACHOS
                 WHERE ID_DESPACHO = ?`;
    connection.query(sql, ID_DESPACHO, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        res.status(200).send(`Despacho con ID ${ID_DESPACHO} eliminado correctamente`);
      } else {
        res.status(404).send(`Despacho con ID ${ID_DESPACHO} no encontrado`);
      }
    });
  });
  
  module.exports.eliminar_estado_Despacho = app.put('/', (request, response) => {
    const { ID_DESPACHO } = request.body;
    const sql = `UPDATE DESPACHOS SET ESTADO = 0
                 WHERE ID_DESPACHO = ?`;
    connection.query(sql, ID_DESPACHO, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        response.status(200).send(`Despacho con ID ${ID_DESPACHO} eliminado correctamente`);
      } else {
        response.status(404).send(`Despacho con ID ${ID_DESPACHO} no encontrado`);
      }
    });
});
  
  