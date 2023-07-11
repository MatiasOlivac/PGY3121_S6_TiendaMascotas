//Funcion agregar Carrito
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
          text: 'Producto registrado en el carrito correctamente'
        })
      },
      error: function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar el producto en el carrito. Por favor, intenta nuevamente.'
        });
      }
    });
  });
});



$(document).on('click', '.btnMas', function() {
  var parentRow = $(this).closest('tr');
  var labelMasMenosElement = parentRow.find('.labelMasMenos');
  var labelMasMenosPlaceholder = labelMasMenosElement.attr("placeholder");
  var cantidad = parseInt(labelMasMenosPlaceholder);
  var precioElement = parentRow.find('td:nth-child(5)');
  var precio = parseFloat(precioElement.text().replace(/[^0-9.]/g, ''));
  var subtotalElement = parentRow.find('td:nth-child(6)');
  
  console.log(subtotalElement.text());
  
  cantidad = cantidad + 1;
  console.log(cantidad);
  
  var subtotal = cantidad * precio;
  subtotalElement.text("$" + subtotal.toFixed());
  
  console.log(subtotalElement.text());
  
  labelMasMenosElement.attr("placeholder", cantidad.toString());
});


$(document).on('click', '.btnMenos', function() {
  var parentRow = $(this).closest('tr');
  var labelMasMenosElement = parentRow.find('.labelMasMenos');
  var labelMasMenosPlaceholder = labelMasMenosElement.attr("placeholder");
  var cantidad = parseInt(labelMasMenosPlaceholder);
  var precioElement = parentRow.find('td:nth-child(5)');
  var precio = parseFloat(precioElement.text().replace(/[^0-9.]/g, ''));
  var subtotalElement = parentRow.find('td:nth-child(6)');
  
  console.log(subtotalElement.text());
  if(cantidad>1){
  cantidad = cantidad - 1;
  }
  console.log(cantidad);
  
  var subtotal = cantidad * precio;
  subtotalElement.text("$" + subtotal.toFixed());
  
  console.log(subtotalElement.text());
  
  labelMasMenosElement.attr("placeholder", cantidad.toString());
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
