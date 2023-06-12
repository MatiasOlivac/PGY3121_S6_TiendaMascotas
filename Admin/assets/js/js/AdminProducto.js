//buscar las promociones en la api
  $(document).ready(function() {

    getProductos();
    getEspecies();
    getPromociones();


  }); 


//buscar las especies en la api
  getEspecies = () =>{
    $.ajax({
      url: `${API_URL}/Especie`,
      type: 'GET',
      dataType: 'json',
      success: function(data){
        $.each(data, function(index,value){
          $('#inputEspecieProducto').append(`<option ${value.ID_ESPECIES}"> 
            ${value.ID_ESPECIES}. ${value.NOMBRE}
            </option>`)
        })
      }
    })
  };


//buscar las promociones en la api
  getPromociones = () =>{
    $.ajax({
      url: `${API_URL}/Promociones`,
      type: 'GET',
      dataType: 'json',
      success: function(data){
        $.each(data, function(index,value){
          $('#inputPromocionProducto').append(`<option ${value.ID_PROMOCIONES}"> 
            ${value.ID_PROMOCIONES}. ${value.NOMBRE}
            </option>`)
        })
      }
    })
  };


//buscar los productos en la api
  getProductos = () =>{
    $.ajax({
      url: `${API_URL}/AdminProducto`,
      type: 'GET',
      dataType: 'json',
      success: function(data){
        $.each(data, function(index,value){
          $('#tablaProductos').append(
            `<tr>
                <th scope="row">${ultimoId()}</th>
                <td> ${value.NOMBRE == null ? "" : value.NOMBRE} 
                                <input type="hidden" name="id_rol" value="${value.ID_PRODUCTOS}">
                <td>${value.VALOR}</td>
                <td>${value.STOCK}</td>
                <td>${value.NOMBRE_PROMOCION}</td>
                <td>${value.NOMBRE_ESPECIE}</td>
                <td>${value.IMAGEN}</td>
                <td>
                  <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-success btnEditarProducto"><i
                      class="fa-solid fa-pencil"></i></button>
                    <button type="button" class="btn btn-danger btnEliminarProducto"><i
                      class="fa-solid fa-trash"></i></button>
                  </div>
                </td>
            </tr>`)
        })
      }
    })
  };



//botones invisibles
  $('#btnCancelarEditar').hide();
  $('#btnModificarProducto').hide();


//añadir Producto a la lista con jquery
$(document).on('click', '#btnAgregarProducto', function(){

var NOMBRE = $('#inputNombreProducto').val();
var VALOR = $("#inputValorProducto").val();
var STOCK = $("#inputStockProducto").val();
var IMAGEN = $("#inputImagenProducto").val();
var ESPECIE = $("#inputEspecieProducto").val();
var PROMOCION = $("#inputPromocionProducto").val();


  $.ajax({
      url: `${API_URL}/AdminProducto`,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
          NOMBRE: NOMBRE,
          VALOR: VALOR,
          STOCK: STOCK,
          IMAGEN: IMAGEN,
          ESPECIES_ID_ESPECIES: ESPECIE,
          PROMOCIONES_ID_PROMOCIONES: PROMOCION
      })
      ,
      
      success: function(respuesta){
          console.log(respuesta);
          
          $('#btnCancelarEditar').hide();
          limpiarFormulario();
          actualizarTabla();
      }

  })
  $('#btnCancelarEditar').hide();
  limpiarFormulario();
  actualizarTabla();
Swal.fire(
  'Producto Ingresado!',
  'Presione "ok" para continuar.',
  'success'); //mensaje de ingreso correcto
  
});



//botón BORRAR
  $(document).on("click", ".btnEliminarProducto", function (e) {
    e.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estás seguro que lo quieres eliminar?.',
      text: "El producto se eliminará permanentemente!.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!.',
      cancelButtonText: 'No, Cancelar!.',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        var IdProducto = $(this).closest('tr').find('td');
        var prod_id = IdProducto.eq(0).find('input').val();
        console.log(IdProducto);
        console.log(prod_id);


        $.ajax({
          url: `${API_URL}/AdminProducto`,
          type: 'DELETE',
          dataType: 'json',
          data: {
            ID_PRODUCTOS : prod_id
        },
        success: function(respuesta){
            console.log('Producto Eliminado')
        }
        
    })
        swalWithBootstrapButtons.fire(
          'Producto eliminado!.',
          'presione ok para finalizar.',
          'success'
        )
        actualizarTabla();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado.',
          'El Producto está a salvo! :D .',
          'error'
        )
      }
    })
  });


// editar producto de la tabla
  $("#tablaProductos").on("click", ".btnEditarProducto", function (e) {
    e.preventDefault();
    var idProducto = $(this).closest('tr').find('th').text();
    var producto = $(this).closest('tr').find('td');

    var Nombre = producto.eq(0).text().trim();
    var Valor = producto.eq(1).text().trim();
    var Stock = producto.eq(2).text().trim();
    var Promocion = producto.eq(3).find('input').val();
    var Especie = producto.eq(4).find('input').val();
    var Imagen = producto.eq(5).text().trim();

    $("#inputNombreProducto").val(Nombre);
    $("#inputValorProducto").val(Valor);
    $("#inputStockProducto").val(Stock);
    $("#inputPromocionProducto").val(Promocion);
    $("#inputEspecieProducto").val(Especie);
    $("#inputImagenProducto").val(Imagen);
    $("#inputIdProducto").val(idProducto);

    $('#btnCancelarEditar').show();
    $('#btnModificarProducto').show();
    $('#btnAgregarProducto').hide();


  });


//modificar usuario
$("#btnModificarProducto").click(function () {
    let Nombre = $("#inputNombreProducto").val();
    let Valor = $("#inputValorProducto").val();
    let Stock = $("#inputStockProducto").val();
    let Imagen = $("#inputImagenProducto").val();
    let Promocion = $("#inputPromocionProducto").val();
    let Especie = $("#inputEspecieProducto").val();
    let idProducto = $("#inputIdProducto").val();
    
    console.log(Nombre);
    console.log(Valor);
    console.log(Stock);
    console.log(Especie);
    console.log(Promocion);
    console.log(Imagen);
    console.log(idProducto);


    $.ajax({
          url: `${API_URL}/AdminProducto`,
          type: 'PATCH',
          contentType: 'application/json',
          crossDomain: true,
          data: JSON.stringify({
              NOMBRE : Nombre,
              VALOR : Valor,
              STOCK : Stock,
              IMAGEN : Imagen,
              PROMOCIONES_ID_PROMOCIONES : Promocion,
              ESPECIES_ID_ESPECIES : Especie,
              ID_PRODUCTOS : idProducto
          }),
          success: function(respuesta){
              console.log("modificado");
              limpiarFormulario();
              actualizarTabla();
              $('#btnCancelarEditar').hide();
              $('#btnModificarProducto').hide();
              $('#btnAgregarProducto').show();
          }
      })
  });

      //boton CANCELAR EDICION
      $("#btnCancelarEditar").click(function () {
        limpiarFormulario();
        $('#btnCancelarEditar').hide();
        $('#btnModificarProducto').hide();
        $('#btnAgregarProducto').show();
      });



//entregar ultimo id
ultimoId = () =>{
    let ultimoId = $("#tablaProductos tr:last th").text();
    let value = parseInt(ultimoId) + 1;
    if (isNaN(value)){
      value=1
    }
    return value;
  };

//actualizar
  function actualizarTabla() {
    $('#tablaProductos tbody').empty();
    getProductos();
    getEspecies();
    getPromociones();
  };


//limpiar formulario
  function limpiarFormulario() {
    $("#inputNombreProducto").val('');
    $("#inputValorProducto").val('');
    $("#inputStockProducto").val('');
    $("#inputImagenProducto").val('');
    $("#inputEspecieProducto").val('');
    $("#inputPromocionProducto").val('');
    $("#inputIdProducto").val('');
  };

