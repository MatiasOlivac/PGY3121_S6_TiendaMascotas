

//buscar los Productos en la api
$(document).ready(function() {

  getProductos();
  getVentas();
  //getValorProductos();
  getEstadoVenta();

}); 

//buscar los productos en la api
getProductos = () => {
  $.ajax({
    url: `${API_URL}/AdminProducto`,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      console.log(data);
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
    url: `${API_URL}/AdminProducto`,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      console.log(data);
      $.each(data, function(index, value) {
        //llenar el select Productos
        $("#inputProducto").append(`<option id="${value.ID_PRODUCTOS}" value="${value.ID_PRODUCTOS}">${value.VALOR}</option>`);
      });

    }
  });
}

//buscar el Estado de la Venta
getEstadoVenta = () => {
  $.ajax({
    url: `${API_URL}/AdminVenta`,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      console.log(data);
      $.each(data, function(index, value) {
        //llenar el select Productos
        $("#inputEstado").append(`<option id="${value.ID_VENTA}" value="${value.ID_VENTA}">${value.ESTADO}</option>`);
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
        $.each(data, function (index, value){
          $("#tablaVentas").append(
            `<tr>
                <th scope="row">${ultimoId()}</th>
                <td>${value.ID_VENTA == null ? "" : value.ID_VENTA}
                                <input type="hidden" name="id_venta" value="${value.ID_VENTA}">
                <td>${value.FECHA}</td>
                <td>${value.HORA}</td>
                <td>
                ${value.ESTADO}
                <input type= "hidden" name="id_estado" id="id_estado" value="${value.ESTADO}>
                </td>
                <td>${value.ID_PRODUCTO}
                <input type= "hidden" name="id_producto" id="id_producto" value="${value.ID_PRODUCTO}>
                </td>
                <td>${value.CANTIDAD}</td>
              <td>${value.TOTAL}</td>
              <td>
                <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                  <button type="button" class="btn btn-success btnEditarVenta"><i
                   class="fa-solid fa-pencil"></i></button>
                  <button type="button" class="btn btn-danger btnEliminarVenta"><i
                   class="fa-solid fa-trash"></i></button>
                  <button type="button" class="btn btn-info btnDetalleVenta"><i 
                   class="fa-solid fa-eye"></i></button>
                </div>
              </td>
          </tr>`)
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
  
    var ID_VENTA = $('#inputId_venta').val();
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
$(document).on("click", ".btnDetalleVenta", function (e) {
  e.preventDefault();
  // Obtener los datos de la Venta desde la fila de la tabla
  var ID_VENTA = $(this).closest('tr').find('td');

  var ID_VENTA = ID_VENTA.eq(0).text();
  var FECHA = FECHA.eq(1).text().trim();
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
      var IdVenta = $(this).closest('tr').find('td');
      var venta_id = IdVenta.eq(0).find('input').val();
      console.log(IdVenta);
      console.log(venta_id);

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
    var venta = $(this).closest('tr').find('td');

    var idVenta = venta.eq(0).find('input');
    var Fecha = venta.eq(1).text();
    var Hora = venta.eq(2).text();
    var Estado = venta.eq(3).text();
    var idProducto = venta.eq(4).text();
    var Cantidad = venta.eq(5).text();
    var Total= venta.eq(6).text();

    $("#inputId_venta").val(idVenta);
    $("#inputFecha").val(Fecha);
    $("#inputHora").val(Hora);
    $("#inputEstado").val(Estado);
    $("#inputProducto").val(idProducto);
    $("#inputCantidad").val(Cantidad);
    $("#inputTotal").val(Total);

    console.log(idVenta);
    console.log(Fecha);
    console.log(Hora);
    console.log(Estado);
    console.log(idProducto);
    console.log(Cantidad);
    console.log(Total);

    // esconder botones 
    $('#btnCancelarEditar').show();
    $('#btnEditarVentaTabla').show();
    $('#btnAgregarVenta').hide();    
  });
  
  // Botón editar del formulario
  $("#btnEditarVentaTabla").click(function (e) {

    // Obtener los datos del formulario
    var idVenta = $("#inputId_venta").val();
    var Fecha = $("#inputFecha").val();
    var Hora = $("#inputHora").val();
    var Estado = $("#inputEstado").val();
    var idProducto = $("#inputProducto").val();
    var Cantidad = $("#inputCantidad").val();
    var Total = $("#inputTotal").val();

    // Crear el objeto con los datos de la  Venta
    var ventaData = {
      ID_VENTA: idVenta,
      FECHA: Fecha,
      HORA: Hora,
      ESTADO: Estado,
      ID_PRODUCTO: idProducto,
      CANTIDAD: Cantidad,
      TOTAL: Total,
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