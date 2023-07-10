// document.querySelectorAll('#btnAgregarCarrito').forEach(function(button) {
//   button.addEventListener('click', function() {
//     var card = this.parentElement.parentElement;
//     var nombre = card.querySelector('.card-title').textContent;
//     var imagen = card.querySelector('.card-img-top').getAttribute('src');
//     var cardBody = card.querySelector('.card-body');
//     var precioText = cardBody.querySelector('.card-text:last-child');
//     var precio = parseFloat(precioText.textContent.replace(/[^0-9.]/g, ''));
//     var cantidad = 1;

//     var carritoData = {
//       IMAGEN: imagen,
//       NOMBRE: nombre,
//       PRECIO: precio,
//       CANTIDAD: cantidad
//     };

//     console.log(carritoData);

//     $.ajax({
//       url: `${API_URL}/Carrito`,
//       type: 'POST',
//       contentType: 'application/json',
//       data: JSON.stringify(carritoData),
//       success: function(response) {
//         console.log(response);
//       }
//     });
//   });
// });
document.querySelectorAll('#btnAgregarCarrito').forEach(function(button) {
  button.addEventListener('click', function() {
    var card = this.parentElement.parentElement;
    var nombre = card.querySelector('.card-title').textContent;
    var imagen = card.querySelector('.card-img-top').getAttribute('src');
    var cardBody = card.querySelector('.card-body');
    var precioText = cardBody.querySelector('.card-text:last-child');
    var precio = parseFloat(precioText.textContent.replace(/[^0-9.]/g, ''));
    var cantidad = 1;
    var subtotal = cantidad * precio;
    var id_productos = 1;

    var carritoData = {
      IMAGEN: imagen,
      NOMBRE: nombre,
      ID_PRODUCTOS: id_productos,
      CANTIDAD: cantidad,
      PRECIO: precio,
      SUBTOTAL: subtotal
    };

    // Utiliza JSON.stringify para convertir el objeto carritoData a una cadena JSON
    var dataCarrito = JSON.stringify(carritoData);

    console.log(dataCarrito);

    $.ajax({
      url: `${API_URL}/Carrito`,
      type: 'POST',
      contentType: 'application/json', // Establece el tipo de contenido como application/json
      data: dataCarrito,
      success: function(response) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Usuario registrado correctamente'
        })
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
});



const agregarProductoCarrito = (imagen, nombre, cantidad, precio) => {
  $("#tablaCarrito").append(`
    <tr>
      <th scope="row">Nuevo</th>
      <td><img src="${imagen}" alt="producto" style="width: 100px;"></td>
      <td>${nombre}</td>
      <td>${cantidad}</td>
      <td>${precio}</td>
      <td>${precio}</td>
      <td>
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-danger btnEliminarCarrito"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `);
};
