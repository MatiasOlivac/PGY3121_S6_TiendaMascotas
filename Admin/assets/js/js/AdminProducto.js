//buscar las promociones en la api
  $(document).ready(function() {

    getProductos();
    getEspecies();
    getPromociones();


  }); 


//buscar las especies en la api
  getEspecies = () => {
    $.ajax({
      url: `${API_URL}/Especie`,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        $.each(data, function(index, value) {
          //llenar el select comunas
          $("#inputEspecieProducto").append(`<option id="${value.ID_ESPECIES}" value="${value.ID_ESPECIES}">${value.NOMBRE}</option>`);
        });

      }
    });
  }



//buscar las promociones en la api
  getPromociones = () => {
    $.ajax({
      url: `${API_URL}/Promociones`,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        $.each(data, function(index, value) {
          //llenar el select comunas
          $("#inputPromocionProducto").append(`<option id="${value.ID_PROMOCIONES}" value="${value.ID_PROMOCIONES}">${value.NOMBRE}</option>`);
        });

      }
    });
  }



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
                <td>
                ${value.NOMBRE_PROMOCION}
                <input type="hidden" name="id_promocion" id="id_promocion" value="${value.PROMOCIONES_ID_PROMOCIONES}">
                </td>
                <td>
                ${value.NOMBRE_ESPECIE}
                <input type="hidden" name="id_especie" id="id_especie" value="${value.ESPECIES_ID_ESPECIES}">
                </td>
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



//funcionalidad para agregar los usuarios a la tabla
  $("#btnAgregarProducto").click(function (e) {
    e.preventDefault();
  
    var NOMBRE = $('#inputNombreProducto').val();
    var VALOR = $("#inputValorProducto").val();
    var STOCK = $("#inputStockProducto").val();
    var IMAGEN = $("#inputImagenProducto").val();
    var ESPECIE = $("#inputEspecieProducto").val();
    var PROMOCION = $("#inputPromocionProducto").val();
  
    var productoData = {
      NOMBRE: NOMBRE,
      VALOR: VALOR,
      STOCK: STOCK,
      IMAGEN: IMAGEN,
      ESPECIES_ID_ESPECIES: ESPECIE,
      PROMOCIONES_ID_PROMOCIONES: PROMOCION
    };
  
    $.ajax({
      url: `${API_URL}/AdminProducto`,
      type: 'POST',
      //ataType: 'json',
      data: productoData,
      success: function (response) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Producto registrado correctamente.'
        }).then(() => {
          // Limpiar los campos del formulario
          limpiarFormulario();
  
          // desaparecer boton
          $('#btnCancelarEditar').hide();

          // Actualizar la tabla de usuarios
          actualizarTabla();

        });
      },
      error: function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar el producto. Por favor, intenta nuevamente.'
        });
      }
    });
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

//editar producto de la tabla
  $(document).on('click', '.btnEditarProducto', function (e) {
    e.preventDefault();
    // Obtener los datos del producto desde la fila de la tabla
    var producto = $(this).closest('tr').find('td');
    
    var idProducto = producto.eq(0).find('input').val();
    var Nombre = producto.eq(0).text().trim();
    var Valor = producto.eq(1).text();
    var Stock = producto.eq(2).text();
    var Promocion = producto.eq(3).find('input').val();
    var Especie = producto.eq(4).find('input').val();
    var Imagen = producto.eq(5).text();

    $("#inputIdProducto").val(idProducto);
    $("#inputNombreProducto").val(Nombre);
    $("#inputValorProducto").val(Valor);
    $("#inputStockProducto").val(Stock);
    $("#inputPromocionProducto").val(Promocion);
    $("#inputEspecieProducto").val(Especie);
    $("#inputImagenProducto").val(Imagen);

    console.log(idProducto);
    console.log(Nombre);
    console.log(Valor);
    console.log(Stock);
    console.log(Promocion);
    console.log(Especie);
    
  // esconder botones 
    $('#btnCancelarEditar').show();
    $('#btnModificarProducto').show();
    $('#btnAgregarProducto').hide();        

  });
  
  // Botón editar del formulario
  $("#btnModificarProducto").click(function (e) {

    // Obtener los datos del formulario
    var idProducto = $("#inputIdProducto").val();
    var Nombre = $("#inputNombreProducto").val();
    var Valor = $("#inputValorProducto").val();
    var Stock = $("#inputStockProducto").val();
    var Imagen = $("#inputImagenProducto").val();
    var Promocion = $("#inputPromocionProducto").val();
    var Especie = $("#inputEspecieProducto").val();


    // Crear el objeto con los datos del usuario
    var ProductoData = {
      ID_PRODUCTOS: idProducto,
      NOMBRE: Nombre,
      VALOR: Valor,
      STOCK: Stock,
      IMAGEN: Imagen,
      PROMOCIONES_ID_PROMOCIONES: Promocion,
      ESPECIES_ID_ESPECIES: Especie
    };

  // Enviar la solicitud de actualización
    $.ajax({
      url: `${API_URL}/AdminProducto`,
      type: 'PATCH',
      data: ProductoData,
      success: function (response) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: response
        }).then(() => {
          // Limpiar los campos del formulario
          limpiarFormulario();

          // Actualizar la tabla de producto
          $("#tablaProductos").empty(); // Vaciar la tabla
          getProductos(); // Volver a cargar los usuarios
          // desaparecer botones
          $('#btnCancelarEditar').hide();
          $('#btnModificarProducto').hide();
          $('#btnAgregarProducto').show();
        });
      },
      error: function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el producto. Por favor, intenta nuevamente.'
        });
      }
    });
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

