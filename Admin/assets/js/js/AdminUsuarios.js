$(document).ready(function() {
    getUSUARIOS();
  });


getUSUARIOS = () => {
  $.ajax({
    url: `${API_URL}/AdminUsuario`,
    type: `GET`,
    datatype: `json`,
    success: function(data) {
      $.each(data, function (index, value){
        //Llenar la Tabla ******** Agregar ESTA_SUSCRITO, ESTADO, USUARIO_ROLES_ID_ROL
        $("#tablaUsuarios").append(`<tr> 
          <th scope="row">${value.ID_USUARIO}</th>
          <td>${value.PRIMER_NOMBRE}</td>
          <td>${value.SEGUNDO_NOMBRE}</td>
          <td>${value.AP_PATERNO}</td>
          <td>${value.AP_MATERNO}</td>
          <td>${value.RUT}</td>
          <td>${value.CONTRASEÑA}</td>
          <td>${value.CORREO}</td>      
          <td>${value.COMUNA}</td>
          <td>${value.DIRECCION}</td>
          
          <td>
              <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-success btnEditarUsuario"><i class="fa-solid fa-pencil"></i></button>
                <button type="button" class="btn btn-danger btnEliminarUsuario"><i class="fa-solid fa-trash"></i></button>
              </div>
            </td>

          </tr>`)
      });
    },
    error: function (error){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener la lista de usuarios. Por favor, intenta nuevamente.'
      });
    }
  });
}

//Funcionalidad para agregar los usuarios a la tabla

$("#btnAgregarUsuario").click(function (e){
  e.preventDefault();

  var primer_nombre =$("#inputPrimerNombre").val();
  var segundo_nombre =$("#inputSegundoNombre").val();
  var ap_paterno =$("#inputApellidoPaterno").val();
  var ap_materno =$("#inputApellidoMaterno").val();
  var rut =$("#inputRut").val();
  //var esta_suscrito =$("#inputEstaSuscrito").val();//Agregar a interfaz en caso que sea necesario
  //var estado =$("#inputEstado").val();//Agregar a interfaz en caso que sea necesario
  //var usuario_roles_id_rol =$("#inputUsuarioRolesIdRol").val(); //Agregar a interfaz en caso que sea necesario
  var correo =$("#inputCorreo").val();
  var contraseña =$("#inputContraseña").val();
  var comuna =$("#inputComuna").val();
  var direccion =$("#inputDireccion").val();

  var usuarioData = {
    PRIMER_NOMBRE: primer_nombre,
    SEGUNDO_NOMBRE: segundo_nombre, //CAMBIAR VARIABLES A MAYUSCULAS EN CASO DE TENER UN ERROR RECURRENTE
    AP_PATERNO: ap_paterno,
    AP_MATERNO: ap_materno,
    RUT: rut,
    //ESTA_SUSCRITO: esta_suscrito,//Agregar a interfaz en caso que sea necesario
    //ESTADO: estado,//Agregar a interfaz en caso que sea necesario
    //USUARIO_ROLES_ID_ROL: usuario_roles_id_rol,//Agregar a interfaz en caso que sea necesario
    CORREO: correo,
    CONTRASEÑA: contraseña,
    COMUNA: comuna,
    DIRECCION: direccion
  };

  $.ajax({
    url: `${API_URL}/AdminUsuario`,
    type: 'POST',
    data: usuarioData,
    success: function(response){
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Usuario registrado correctamente'
      }).then(() =>{
        //Limpiar los campos del formulario
        $("#inputPrimerNombre").val('');
        $("#inputSegundoNombre").val('');
        $("#inputApellidoPaterno").val('');
        $("#inputApellidoMaterno").val('');
        $("#inputRut").val('');
        //$("#inputEstaSuscrito").val('0');//Agregar a interfaz en caso que sea necesario
        //$("#inputEstado").val('');//Agregar a interfaz en caso que sea necesario
        //$("#inputUsuarioRolesIdRol").val(''); //Agregar a interfaz en caso que sea necesario
        $("#inputCorreo").val('');
        $("#inputContraseña").val('');
        $("#inputComuna").val('');
        $("#inputDireccion").val('');

        //Actualizar la tabla de usuarios
        getUSUARIOS();  //Preguntar por este get
      });
    },
    error: function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar el usuario. Por favor, intenta nuevamente.'
        });
      }
  });
});

function ultimoId(){
      let ultimoId = $("#tablaUsuarios tr:last th").text();
      return parseInt(ultimoId)+1;
  }      

  //Borrar Linea
  $(document).on('click', '.btnEliminarUsuario', function (e){
    e.preventDefault();
    // Obtener el ID del usuario a eliminar
    var idUsuario = $(this).closest('tr').find('th').text();

    //Mostrar el mensaje de confirmación utilizando SweetAlert2
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed){
        // Enviar la solicitud de borrado
        $.ajax({
          url: `${API_URL}/AdminUsuario/${idUsuario}`,
          type: 'DELETE',
          success: function (response) {
            // Mostrar mensaje de éxito
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: response
          }).then(() => {
            // Recargar la tabla de usuarios después de eliminar uno
            $("#tablaUsuarios").empty(); // Vaciar la tabla
            getUSUARIOS(); // Volver a cargar los usuarios
          });
        },
        error: function (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar el usuario. Por favor, intenta nuevamente.'
          });
        }
      });
    }
  });
});


//Editar usuario tabla
$(document).on('click', '.btnEditarUsuario', function (e) {
  e.preventDefault();
  //Obtener los datos del usuario desde la fila de la tabla
  var usuario =$(this).closest('tr').find('td');
  
  var primerNombre = usuario.eq(0).text().trim();
  var segundoNombre = usuario.eq(1).text().trim();
  var apPaterno = usuario.eq(2).text().trim();
  var apMaterno = usuario.eq(3).text().trim();
  var rut = usuario.eq(4).text();
  //var estaSuscrito = usuario.eq(6).text() === 'SI' ? '1' : '0';
  //var estado = usuario.eq(7).text();
  //var usuarioRolesIdRol = usuario.eq(8).find('input').val();
  var correo = usuario.eq(5).text().trim();
  var contraseña = usuario.eq(6).text();
  var comuna = usuario.eq(7).text().trim();
  var direccion = usuario.eq(8).text().trim();
  var idUsuario = $(this).closest("tr").find("th").text();

  
  $("#inputPrimerNombre").val(primerNombre);
  $("#inputSegundoNombre").val(segundoNombre);
  $("#inputApellidoPaterno").val(apPaterno);
  $("#inputApellidoMaterno").val(apMaterno);
  $("#inputRut").val(rut);
  //$("#inputEstaSuscrito").val(estaSuscrito);//Agregar a interfaz en caso que sea necesario
  //$("#inputEstado").val(estado);//Agregar a interfaz en caso que sea necesario
  //$("#inputUsuarioRolesIdRol").val(usuarioRolesIdRol); //Agregar a interfaz en caso que sea necesario
  $("#inputCorreo").val(correo);
  $("#inputContraseña").val(contraseña);
  $("#inputComuna").val(comuna);
  $("#inputDireccion").val(direccion);
  $("#inputIdUsuario").val(idUsuario);
});


$("#btnEditarUsuarioTabla").click(function (e) {
  e.preventDefault(); // Evitar el envío predeterminado del formulario

  // Obtener los datos del formulario
  var primer_nombre = $("#inputPrimerNombre").val();
  var segundo_nombre = $("#inputSegundoNombre").val();
  var ap_paterno = $("#inputApellidoPaterno").val();
  var ap_materno = $("#inputApellidoMaterno").val();
  var rut = $("#inputRut").val();
  var correo = $("#inputCorreo").val();
  var contraseña = $("#inputContraseña").val();
  var comuna = $("#inputComuna").val();
  var direccion = $("#inputDireccion").val();
  var idUsuario = $("#inputIdUsuario").val();

  // Crear objeto con los datos del usuario
  var usuarioData = {

        RUT: rut,    
        PRIMER_NOMBRE: primer_nombre,
        SEGUNDO_NOMBRE: segundo_nombre,
        AP_PATERNO: ap_paterno,
        AP_MATERNO: ap_materno,
        CORREO: correo,
        CONTRASEÑA: contraseña,
        COMUNA: comuna,
        DIRECCION: direccion,
        ID_USUARIO: idUsuario
  };

  console.log(usuarioData);
  
  // Enviar la solicitud de actualización
  $.ajax({
    url: `${API_URL}/AdminUsuario`,
    type: "PATCH",
    data: JSON.stringify(usuarioData), // Convertir a JSON sin comillas adicionales
    contentType: "application/json", // Establecer el tipo de contenido a JSON
    success: function (response) {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Usuario actualizado correctamente."
      }).then(() => {
        // Limpiar los campos del formulario
        $("#inputPrimerNombre").val("");
        $("#inputSegundoNombre").val("");
        $("#inputApellidoPaterno").val("");
        $("#inputApellidoMaterno").val("");
        $("#inputRut").val("");
        $("#inputCorreo").val("");
        $("#inputContraseña").val("");
        $("#inputComuna").val("");
        $("#inputDireccion").val("");
        $("#inputIdUsuario").val("");

        // Actualizar la tabla de usuarios
        $("#tablaUsuario").empty(); // Vaciar la tabla
        getUSUARIOS(); 
      });
    },
    error: function (error) {
      
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el usuario. Por favor, inténtalo nuevamente."
      });
    }
  });
});

