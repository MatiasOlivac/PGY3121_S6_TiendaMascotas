

//buscar los Productos en la api
$(document).ready(function() {

  getProductos();

}); 

//buscar los productos en la api
getProductos = () => {
  $.ajax({
    url: `${API_URL}/AdminProductos`,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      $.each(data, function(index, value) {
        //llenar el select Productos
        $("#inputProducto").append(`<option id="${value.ID_PRODUCTOS}" value="${value.ID_PRODUCTOS}">${value.NOMBRE}</option>`);
      });

    }
  });
}

//buscar los productos en la api
getValorProductos = () => {
  $.ajax({
    url: `${API_URL}/AdminProductos`,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      $.each(data, function(index, value) {
        //llenar el select Productos
        $("#inputProducto").append(`<option id="${value.VALOR}" value="${value.VALOR}">${value.NOMBRE}</option>`);
      });

    }
  });
}

//buscar las Ventas en la api
getVentas = () => {
    $.ajax({
      url: `${API_URL}/AdminVenta`,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        $.each(data, function (index, value) {
          // Llenar la tabla
          $("#tablaVentas").append(`<tr>
            <th scope="row">${value.ID_VENTA}</th>
            <td>${value.FECHA}</td>
            <td>${value.HORA}</td>
            <td>${value.ESTADO}</td>
            <td>${value.ID_PRODUCTO}</td>
            <td>${value.CANTIDAD}</td>
            <td>${value.TOTAL}</td>
            <td>
            <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-success btnEditarVenta"><i class="fa-solid fa-pencil"></i></button>
              <button type="button" class="btn btn-danger btnEliminarVenta"><i class="fa-solid fa-trash"></i></button>
              <button type="button" class="btn btn-info btnDetalleVenta"><i class="fa-solid fa-eye"></i></button>
            </div>
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

//botones invisibles
$('#btnCancelarEditar').hide();
$('#btnEditarVentaTabla').hide();


//funcionalidad para agregar las ventas a la tabla
$("#btnAgregarVenta").click(function (e) {
    e.preventDefault();
  
    var ID_VENTA = $("#inputId_venta").val();
    var FECHA = $("#inputFecha").val();
    var HORA = $("#inputHora").val();
    var ESTADO = $("#inputEstado").val();
    var ID_PRODUCTO = $("#inputProducto").val();
    var CANTIDAD = $("#inputCantidad").val();
    var TOTAL = $("#inputTotal").val();
  
    var ventaData = {
      ID_VENTA: ID_VENTA,
      FECHA: FECHA,
      HORA: HORA,
      ESTADO: ESTADO,
      ID_PRODUCTO: ID_PRODUCTO,
      CANTIDAD: CANTIDAD,
      TOTAL: TOTAL
    };
  
    $.ajax({
      url: `${API_URL}/AdminVenta`,
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
          actualizarTabla();
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


//Detalle venta de la tabla
$(document).on('click', '.btnDetalleVenta', function (e) {
  e.preventDefault();
  // Obtener los datos de la Venta desde la fila de la tabla
  var ID_VENTA = $(this).closest('tr').find('td');

  var ID_VENTA = ID_VENTA.eq(0).text();
  var FECHA = FECHA.eq(1).text();
  var HORA = HORA.eq(2).text();
  var ESTADO = ESTADO.eq(3).text();
  var ID_PRODUCTO = ID_PRODUCTO.eq(4).text();
  var CANTIDAD = CANTIDAD.eq(5).text();
  var TOTAL= TOTAL.eq(6).text();

  $("#inputId_venta").val(ID_VENTA);
  $("#inputFecha").val(FECHA);
  $("#inputHora").val(HORA);
  $("#inputEstado").val(ESTADO);
  $("#inputProducto").val(ID_PRODUCTO);
  $("#inputCantidad").val(CANTIDAD);
  $("#inputTotal").val(TOTAL);

  console.log(ID_VENTA);
  console.log(FECHA);
  console.log(HORA);
  console.log(ESTADO);
  console.log(ID_PRODUCTO);
  console.log(CANTIDAD);
  console.log(TOTAL);

  // esconder botones 
  $('#btnCancelarEditar').show();
  $('#btnEditarVentaTabla').show();
  $('#btnAgregarVenta').hide();    
});



 // Boton Borrar
 $(document).on("click", ".btnEliminarVenta", function (e) {
  e.preventDefault();
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  swalWithBootstrapButtons.fire({
    title: 'Estás seguro de que quieres eliminar la Venta?.',
    text: " Se eliminará permanentemente!.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, Eliminar!.',
    cancelButtonText: 'No, Cancelar!.',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      var ID_VENTA = $(this).closest('tr').find('td');
      var venta_id = ID_VENTA.eq(0).find('input').val();
      console.log(ID_VENTA);
      console.log(venta_id_id);

        // Enviar la solicitud de borrado
        $.ajax({
          url: `${API_URL}/AdminVenta`,
          type: 'DELETE',
          dataType: 'json',
          data: {
            ID_VENTA : venta_id
        },
        success: function(respuesta){
            console.log('Venta Eliminada')
        }
        
    })
        swalWithBootstrapButtons.fire(
          'Venta eliminada!.',
          'presione ok para finalizar.',
          'success'
        )
        actualizarTabla();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado.',
          'No se ha eliminado la Venta .',
          'error'
        )
      }
    })
  });

   //editar venta de la tabla
   $(document).on('click', '.btnEditarventa', function (e) {
    e.preventDefault();
    // Obtener los datos de la Venta desde la fila de la tabla
    var ID_VENTA = $(this).closest('tr').find('td');

    var ID_VENTA = ID_VENTA.eq(0).text();
    var FECHA = FECHA.eq(1).text();
    var HORA = HORA.eq(2).text();
    var ESTADO = ESTADO.eq(3).text();
    var ID_PRODUCTO = ID_PRODUCTO.eq(4).text();
    var CANTIDAD = CANTIDAD.eq(5).text();
    var TOTAL= TOTAL.eq(6).text();

    $("#inputId_venta").val(ID_VENTA);
    $("#inputFecha").val(FECHA);
    $("#inputHora").val(HORA);
    $("#inputEstado").val(ESTADO);
    $("#inputProducto").val(ID_PRODUCTO);
    $("#inputCantidad").val(CANTIDAD);
    $("#inputTotal").val(TOTAL);

    console.log(ID_VENTA);
    console.log(FECHA);
    console.log(HORA);
    console.log(ESTADO);
    console.log(ID_PRODUCTO);
    console.log(CANTIDAD);
    console.log(TOTAL);

    // esconder botones 
    $('#btnCancelarEditar').show();
    $('#btnEditarVentaTabla').show();
    $('#btnAgregarVenta').hide();    
  });
  
  // Botón editar del formulario
  $("#btnEditarVentaTabla").click(function (e) {

    // Obtener los datos del formulario
    var ID_VENTA = $("#inputId_venta").val();
    var FECHA = $("#inputFecha").val();
    var HORA = $("#inputHora").val();
    var ESTADO = $("#inputEstado").val();
    var ID_PRODUCTO = $("#inputProducto").val();
    var CANTIDAD = $("#inputCantidad").val();
    var TOTAL = $("#inputTotal").val();

    // Crear el objeto con los datos de la  Venta
    var ventaData = {
      ID_VENTA: ID_VENTA,
      FECHA: FECHA,
      HORA: HORA,
      ESTADO: ESTADO,
      ID_PRODUCTO: ID_PRODUCTO,
      CANTIDAD: CANTIDAD,
      TOTAL: TOTAL,
    };

    // Enviar la solicitud de actualización
    $.ajax({
      url: `${API_URL}/AdminVenta`,
      type: 'PUT',
      data: ventaData,
      success: function (response) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Venta actualizada correctamente.'
        }).then(() => {
          // Limpiar los campos del formulario
          limpiarFormulario();

          // Actualizar la tabla de Ventas
          $("#tablaVentas").empty(); // Vaciar la tabla
          getVentas(); // Volver a cargar las Ventas
           // desaparecer botones
          $('#btnCancelarEditar').hide();
          $('#btnEditarVentaTabla').hide();
          $('#btnAgregarVenta').show();
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
  getProductos();
};



  //limpiar formulario
  function limpiarFormulario() {
    $("#inputId_venta").val('');
          $("#inputFecha").val('');
          $("#inputHora").val('');
          $("#inputEstado").val('');
          $("#inputProducto").val('');
          $("#inputCantidad").val('');
          $("#inputMonto_total_venta").val('');

  };