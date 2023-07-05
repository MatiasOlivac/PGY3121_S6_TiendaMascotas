$(document).ready(function() {
  getUSUARIOS();
});

//Funcionalidad para agregar los usuarios a la tabla

$("#btnAgregarUsuario").click(function (e){
  e.preventDefault();

  var RUT =$("#inputRut").val();
  var PRIMER_NOMBRE =$("#inputPrimerNombre").val();
  var SEGUNDO_NOMBRE =$("#inputSegundoNombre").val();
  var AP_PATERNO =$("#inputApellidoPaterno").val();
  var AP_MATERNO =$("#inputApellidoMaterno").val();
  //var ESTA_SUSCRITO =$("#inputEstaSuscrito").val();//Agregar a interfaz en caso que sea necesario
  //var ESTADO =$("#inputEstado").val();//Agregar a interfaz en caso que sea necesario
  //var USUARIO_ROLES_ID_ROL =$("#inputUsuarioRolesIdRol").val(); //Agregar a interfaz en caso que sea necesario
  var CORREO =$("#inputCorreo").val();
  var CONTRASEÑA =$("#inputContraseña").val();
  var COMUNA =$("#inputComuna").val();
  var DIRECCION =$("#inputDireccion").val();

  var usuarioData = {
    RUT: RUT,
    PRIMER_NOMBRE: PRIMER_NOMBRE,
    SEGUNDO_NOMBRE: SEGUNDO_NOMBRE,
    AP_PATERNO: AP_PATERNO,
    AP_MATERNO: AP_MATERNO,
    //ESTA_SUSCRITO: ESTA_SUSCRITO,//Agregar a interfaz en caso que sea necesario
    //ESTADO: ESTADO,//Agregar a interfaz en caso que sea necesario
    //USUARIO_ROLES_ID_ROL: USUARIO_ROLES_ID_ROL,//Agregar a interfaz en caso que sea necesario
    CORREO: CORREO,
    CONTRASEÑA: CONTRASEÑA,
    COMUNA: COMUNA,
    DIRECCION: DIRECCION
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

        $('#btnCancelarEditar').hide();

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