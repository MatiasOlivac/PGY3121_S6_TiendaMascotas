//buscar los roles en la api
$(document).ready(function() {

    getRoles();

  });


  getRoles = () =>{
    $(document).ready(function() {
      $.ajax({
        url: `${API_URL}/roles`,
        type: 'GET',
        dataType: 'json',
        success: function(data){
          $.each(data, function(index,value){
            $('#tablaRol').append(
                          `<tr>
                              <th scope="row"> ${ultimoId()} </th>
                              <td> ${value.NOMBRE == null ? "" : value.NOMBRE} 
                                <input type="hidden" name="id_rol" value="${value.ID_ROL}">
                                </td>
                              <td>
                                <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                                  <button type="button" class="btn btn-info btnEditarUsuarioRol"><i class="fa-solid fa-pencil"></i></button>
                                  <button type="button" class="btn btn-danger btnEliminarUsuarioRol"><i class="fa-solid fa-trash"></i></button>
                                </div>
                              </td>
                          </tr>`)
          })
        }
      })
    })
  };
  

//botones invisibles
$('#btnModificarUsuarioRol').hide();
$('#btnCancelarEditarRol').hide();


//añadir Rol a la lista con jquery
  $(document).on('click', '#btnAgregarUsuarioRol', function(){

    var NOMBRE = $('#inputNombreRol').val();

      $.ajax({
          url: `${API_URL}/roles`,
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({
              NOMBRE: NOMBRE
          })
          ,
          
          success: function(respuesta){
              console.log(respuesta);
          }

      })
    Swal.fire(
      'Cliente Ingresado!',
      'Presione "ok" para continuar.',
      'success');

      limpiarFormulario();
      actualizarTabla();
  });



//entregar ultimo id
  ultimoId = () =>{
    let ultimoId = $("#tablaRol tr:last th").text();
    let value = parseInt(ultimoId) + 1;
    if (isNaN(value)){
      value=1
    }
    return value;
  };

  
//botón BORRAR
  $(document).on('click', '.btnEliminarUsuarioRol', function(e){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Desea eliminar al usuario?.',
      text: "Se eliminará del registro.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!.',
      cancelButtonText: 'No, Cancelar!.',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        var idUsuarioRol = $(this).closest('tr').find('td');
        var id_rol = idUsuarioRol.eq(0).find('input').val();
        console.log(id_rol);
        console.log(idUsuarioRol);

        $.ajax({
          url: `${API_URL}/roles`,
          type: 'DELETE',
          dataType: 'json',
          data: {
            ID_ROL : id_rol
        },
        success: function(respuesta){
            console.log('Usuario Eliminado')
            actualizarTabla();
        }

    })
        swalWithBootstrapButtons.fire(
          'Usuario eliminado!.',
          'presione ok para finalizar.',
          'success'
        )
        actualizarTabla();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado.',
          'El Usuario está a salvo! :D .',
          'error'
        )
      }
    })
  });



//Editar Usuario
  $("#tablaRol").on("click", ".btnEditarUsuarioRol", function (e) {
        // $('#btnAgregarUsuarioRol').hide();
        // $('#btnModificarUsuarioRol').show();
        e.preventDefault();
        var idUsuarioRol = $(this).closest('tr').find('th').text();
        var NOMBRE = $(this).closest('tr').find('td');

        var NombreRol = NOMBRE.eq(0).text().trim();

        $("#inputNombreRol").val(NombreRol);
        $("#inputIdUsuarioRol").val(idUsuarioRol);

        $('#btnModificarUsuarioRol').show();
        $('#btnCancelarEditarRol').show();
        $('#btnAgregarUsuarioRol').hide();

  });



//modificar usuario
  $("#btnModificarUsuarioRol").click(function () {
    let nombre = $("#inputNombreRol").val();
    let id_rol = $("#inputIdUsuarioRol").val();
    
    console.log(nombre)
    console.log(id_rol)

    $.ajax({
          url: `${API_URL}/roles`,
          type: 'PATCH',
          contentType: 'application/json',
          crossDomain: true,
          data: JSON.stringify({
              NOMBRE : nombre,
              ID_ROL : id_rol
          }),
          success: function(respuesta){
              console.log("modificado");
              limpiarFormulario();
              actualizarTabla();
              $('#btnCancelarEditarRol').hide();
              $('#btnModificarUsuarioRol').hide();
              $('#btnAgregarUsuarioRol').show();
          }
      })
  });

      //boton CANCELAR EDICION
      $("#btnCancelarEditarRol").click(function () {
        limpiarFormulario();
        $('#btnCancelarEditarRol').hide();
        $('#btnModificarUsuarioRol').hide();
        $('#btnAgregarUsuarioRol').show();
      });



      //limpiar formulario
      function limpiarFormulario() {
        $("#inputNombreRol").val('');
        $("#inputIdUsuarioRol").val('');
      };



      //actualizar
      function actualizarTabla() {
        $('#tablaRol tbody').empty();
        getRoles();
      };