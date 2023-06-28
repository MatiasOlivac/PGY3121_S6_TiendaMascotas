getVentas = () => {
    $.ajax({
      url: `${API_URL}/AdminVentas`,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        $.each(data, function (index, value) {
          // Llenar la tabla
          $("#tablaVentas").append(`<tr>
            <th scope="row">${value.ID_VENTA}</th>
            <td>${value.FECHA}</td>
            <td>${value.ESTADO}</td>
            <td>${value.HORA}</td>
            <td>${value.MONTO_TOTAL_VENTA}</td>
            <td>
            <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-success btnEditarVenta"><i class="fa-solid fa-pencil"></i></button>
              <button type="button" class="btn btn-danger btnEliminarVenta"><i class="fa-solid fa-trash"></i></button>
            </div>
          </td>
        </tr>`);
      });
    },
    error: function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener la lista de ventas. Por favor, intenta nuevamente.'
      });
    }
  });
}


//funcionalidad para agregar las ventas a la tabla
$("#btnAgregarVenta").click(function (e) {
    e.preventDefault();
  
    var ID_VENTA = $("#inputId_venta").val();
    var FECHA = $("#inputFecha").val();
    var ESTADO = $("#inputEstado").val();
    var HORA = $("#inputHora").val();
    var MONTO_TOTAL_VENTA = $("#inputMonto_total_venta").val();
  
    var ventaData = {
      ID_VENTA: ID_VENTA,
      FECHA: FECHA,
      ESTADO: ESTADO,
      HORA: HORA,
      MONTO_TOTAL_VENTA: MONTO_TOTAL_VENTA
    };
  
    $.ajax({
      url: `${API_URL}/AdminVentas`,
      type: 'POST',
      //ataType: 'json',
      data: ventaData,
      success: function (response) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Venta registrada correctamente.'
        }).then(() => {
          // Limpiar los campos del formulario
          limpiarFormulario();

           // desaparecer boton
           $('#btnCancelarEditar').hide();

  
          // Actualizar la tabla de Ventas
          getVentas();
        });
      },
      error: function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar la Venta. Por favor, intenta nuevamente.'
        });
      }
    });
  });



 // borrar linea
 $(document).on('click', '.btnEliminarVenta', function () {
    // Obtener el ID de la Venta  a eliminar
    var ID_VENTA = $(this).closest('tr').find('th').text();
  
    // Mostrar el mensaje de confirmación utilizando SweetAlert2
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Enviar la solicitud de borrado
        $.ajax({
          url: `${API_URL}/AdminVentas/${ID_VENTA}`,
          type: 'DELETE',
          success: function (response) {
            // Mostrar mensaje de éxito
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: response
            }).then(() => {
              // Recargar la tabla de Ventas después de eliminar uno
              $("#tablaVentas").empty(); // Vaciar la tabla
              getVentas(); // Volver a cargar las Ventas
            });
          },
          error: function (error) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar la Venta. Por favor, intenta nuevamente.'
            });
          }
        });
      }
    });
  });


   //editar venta de la tabla
   $(document).on('click', '.btnEditarventa', function (e) {
    e.preventDefault();
    // Obtener los datos de la Venta desde la fila de la tabla
    var ID_VENTA = $(this).closest('tr').find('td');

    var ID_VENTA = ID_VENTA.eq(0).text();
    var FECHA = FECHA.eq(1).text();
    var ESTADO = ESTADO.eq(2).text();
    var HORA = HORA.eq(3).text();
    var MONTO_TOTAL_VENTA = MONTO_TOTAL_VENTA.eq(4).text();

    $("#inputId_venta").val(ID_VENTA);
    $("#inputFecha").val(FECHA);
    $("#inputEstado").val(ESTADO);
    $("#inputHora").val(Hora);
    $("#inputMonto_total_venta").val(MONTO_TOTAL_VENTA);
  });
  
  // Botón editar del formulario
  $("#btnEditarVentaTabla").click(function (e) {

    // Obtener los datos del formulario
    var ID_VENTA = $("#inputId_venta").val();
    var FECHA = $("#inputFecha").val();
    var ESTADO = $("#inputEstado").val();
    var HORA = $("#inputHora").val();
    var MONTO_TOTAL_VENTA = $("#inputMonto_total_venta").val();

    // Crear el objeto con los datos de la  Venta
    var ventaData = {
      ID_VENTA: ID_VENTA,
      FECHA: FECHA,
      ESTADO: ESTADO,
      HORA: HORA,
      MONTO_TOTAL_VENTA: MONTO_TOTAL_VENTA,
    };

    // Enviar la solicitud de actualización
    $.ajax({
      url: `${API_URL}/AdminVentas`,
      type: 'PUT',
      data: ventaData,
      success: function (response) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Venta actualizada correctamente.'
        }).then(() => {
          // Limpiar los campos del formulario
          $("#inputId_venta").val('');
          $("#inputFecha").val('');
          $("#inputEstado").val('');
          $("#inputHora").val('');
          $("#inputMonto_total_venta").val('');

          // Actualizar la tabla de Ventas
          $("#tablaVentas").empty(); // Vaciar la tabla
          getVentas(); // Volver a cargar las Ventas
        });
      },
      error: function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar la Venta. Por favor, intenta nuevamente.'
        });
      }
    });
  });


//boton CANCELAR EDICION
$("#btnCancelarEditar").click(function () {
  limpiarFormulario();
  $('#btnCancelarEditar').hide();
  $('#btnEditarVentaTabla').hide();
  $('#btnAgregarVenta').show();
});


//entregar ultimo id
ultimoId = () =>{
  let ultimoId = $("#tablaVentas tr:last th").text();
  let value = parseInt(ultimoId) + 1;
  if (isNaN(value)){
    value=1
  }
  return value;
};


//actualizar
function actualizarTabla() {
  $('#tablaVentas tbody').empty();
  getVentas();
};



  //limpiar formulario
  function limpiarFormulario() {
    $("#inputId_venta").val('');
          $("#inputFecha").val('');
          $("#inputEstado").val('');
          $("#inputHora").val('');
          $("#inputMonto_total_venta").val('');

  };