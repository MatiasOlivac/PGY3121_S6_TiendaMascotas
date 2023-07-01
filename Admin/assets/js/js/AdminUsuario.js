//Editar usuario tabla
$(document).on('click', '.btnEditarUsuario', function (e) {
    e.preventDefault();
    //Obtener los datos del usuario desde la fila de la tabla
    var usuario =$(this).closest('tr').find('td');

    var idUsuario = usuario.eq(0).text();
    var rut = usuario.eq(1).text();
    var primerNombre = usuario.eq(2).text();
    var segundoNombre = usuario.eq(3).text();
    var apPaterno = usuario.eq(4).text();
    var apMaterno = usuario.eq(5).text();
    //var estaSuscrito = usuario.eq(6).text() === 'SI' ? '1' : '0';
    //var estado = usuario.eq(7).text();
    //var usuarioRolesIdRol = usuario.eq(8).find('input').val();
    var correo = usuario.eq(9).text();
    var contraseña = usuario.eq(10).text();
    var comuna = usuario.eq(11).text();
    var direccion = usuario.eq(12).text();

    $("#inputIdUsuario").val(idUsuario);
    $("#inputRut").val(rut);
    $("#inputPrimerNombre").val(primerNombre);
    $("#inputSegundoNombre").val(segundoNombre);
    $("#inputApellidoPaterno").val(apPaterno);
    $("#inputApellidoMaterno").val(apMaterno);
    //$("#inputEstaSuscrito").val(estaSuscrito);//Agregar a interfaz en caso que sea necesario
    //$("#inputEstado").val(estado);//Agregar a interfaz en caso que sea necesario
    //$("#inputUsuarioRolesIdRol").val(usuarioRolesIdRol); //Agregar a interfaz en caso que sea necesario
    $("#inputCorreo").val(correo);
    $("#inputContraseña").val(contraseña);
    $("#inputComuna").val(comuna);
    $("#inputDireccion").val(direccion);
  });

  //Botón editar del formulario
  $(".btnEditarUsuarioTabla").click(function (e){

    //Obtener los datos del formulario
    var idUsuario = $("#inputIdUsuario")
    var rut =$("#inputRut").val();
    var primer_nombre =$("#inputPrimerNombre").val();
    var segundo_nombre =$("#inputSegundoNombre").val();
    var ap_paterno =$("#inputApellidoPaterno").val();
    var ap_materno =$("#inputApellidoMaterno").val();
    var esta_suscrito =$("#inputEstaSuscrito").val();//Agregar a interfaz en caso que sea necesario
    var estado =$("#inputEstado").val();//Agregar a interfaz en caso que sea necesario
    var usuario_roles_id_rol =$("#inputUsuarioRolesIdRol").val(); //Agregar a interfaz en caso que sea necesario
    var correo =$("#inputCorreo").val();
    var contraseña =$("#inputContraseña").val();
    var comuna =$("#inputComuna").val();
    var direccion =$("#inputDireccion").val();

    //Crear objeto con datos de usuarios
    var usuarioData = {
      ID_USUARIO: idUsuario,
      RUT: rut,
      PRIMER_NOMBRE: primer_nombre,
      SEGUNDO_NOMBRE: segundo_nombre,
      AP_PATERNO: ap_paterno,
      AP_MATERNO: ap_materno,
      ESTA_SUSCRITO: esta_suscrito,//Agregar a interfaz en caso que sea necesario
      ESTADO: estado,//Agregar a interfaz en caso que sea necesario
      USUARIO_ROLES_ID_ROL: usuario_roles_id_rol,//Agregar a interfaz en caso que sea necesario
      CORREO: correo,
      CONTRASEÑA: contraseña,
      COMUNA: comuna,
      DIRECCION: direccion
    };

    // Enviar la solicitud de actualización
    $.ajax({
      url:`${API_URL}/AdminUsuario`,
      type: `PUT`,
      data: usuarioData,
      success: function (response){
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Usuario actualizado correctamente.'
          }).then(()=>{
            // Limpiar los campos del formulario
            $("#inputIdUsuario").val('');
            $("#inputRut").val('');
            $("#inputPrimerNombre").val('');
            $("#inputSegundoNombre").val('');
            $("#inputApellidoPaterno").val('');
            $("#inputApellidoMaterno").val('');
            $("#inputEstaSuscrito").val('0');//Agregar a interfaz en caso que sea necesario
            $("#inputEstado").val('');//Agregar a interfaz en caso que sea necesario
            $("#inputUsuarioRolesIdRol").val(''); //Agregar a interfaz en caso que sea necesario
            $("#inputCorreo").val('');
            $("#inputContraseña").val('');
            $("#inputComuna").val('');
            $("#inputDireccion").val('');

            //Actualizar la tabla usuario
            $("#tablaUsuario").empty(); //Vaciar la tabla
            getUSUARIOS(); //Duda
          });
      },
      error: function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el usuario. Por favor, intentalo nuevamente' 
        });
      }
    });
  });