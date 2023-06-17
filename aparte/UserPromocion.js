$(document).ready(function() {
    getPromociones();
  
    $('#promoForm').submit(function(event) {
      event.preventDefault();
      agregarPromocion();
    });
  
    $('#tablaPromocion').on('click', '.btnEditarPromocion', function() {
      var index = $(this).closest('tr').index();
      mostrarEdicionPromocion(index);
    });
  
    $('#tablaPromocion').on('click', '.btnEliminarPromocion', function() {
      var index = $(this).closest('tr').index();
      eliminarPromocion(index);
    });
  
    $('#editarForm').submit(function(event) {
      event.preventDefault();
      guardarEdicionPromocion();
    });
  
    $('#cancelarEdicion').click(function() {
      ocultarEdicionPromocion();
    });
  });
  
  var promociones = [];
  
  function getPromociones() {
    
    promociones = [
      {
        fechaInicio: '2023-06-01',
        fechaTermino: '2023-06-30',
        descuento: 20,
        monto: 100
      },
      {
        fechaInicio: '2023-07-01',
        fechaTermino: '2023-07-31',
        descuento: 30,
        monto: 150
      }
    ];
  
    mostrarPromociones();
  }
  
  function agregarPromocion() {
    var fechaInicio = $('#fechaInicio').val();
    var descuento = $('#descuento').val();
    var monto = $('#monto').val();
  
    var promocion = {
      fechaInicio: fechaInicio,
      descuento: descuento,
      monto: monto
    };
  
    promociones.push(promocion);
  
    mostrarPromociones();
    $('#promoForm')[0].reset();
  }
  
  function eliminarPromocion(index) {
    promociones.splice(index, 1);
    mostrarPromociones();
  }
  
  function mostrarEdicionPromocion(index) {
    var promocion = promociones[index];
    $('#monto').val(promocion.monto);
  
    $('#editarSuscripcion').show();
  }
  
  function ocultarEdicionPromocion() {
    $('#editarSuscripcion').hide();
    $('#editarForm')[0].reset();
  }
  
  function guardarEdicionPromocion() {
    var nuevoMonto = $('#monto').val();
    var index = promocionEnEdicionIndex;
  
    promociones[index].monto = nuevoMonto;
  
    ocultarEdicionPromocion();
    mostrarPromociones();
  }
  
  function mostrarPromociones() {
    var tablaPromocion = $('#tablaPromocion tbody');
    tablaPromocion.empty();
  
    promociones.forEach(function(promocion, index) {
      var row = $('<tr>');
      row.append('<td>' + (index + 1) + '</td>');
      row.append('<td>' + promocion.fechaInicio + '</td>');
      row.append('<td>' + obtenerFechaTermino(promocion.fechaInicio) + '</td>');
      row.append('<td>' + promocion.descuento + '%</td>');
      row.append('<td>' + promocion.monto + '</td>');
      row.append('<td><button type="button" class="btnEditarPromocion">Editar</button></td>');
      row.append('<td><button type="button" class="btnEliminarPromocion">Eliminar</button></td>');
  
      tablaPromocion.append(row);
    });
  }
  
  function obtenerFechaTermino(fechaInicio) {
    var fecha = new Date(fechaInicio);
    fecha.setDate(fecha.getDate() + 30);
    var mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    var dia = fecha.getDate().toString().padStart(2, '0');
    var fechaTermino = fecha.getFullYear() + '-' + mes + '-' + dia;
    return fechaTermino;
  }