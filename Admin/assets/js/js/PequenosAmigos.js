// crear ajax para cargar las cards
$(document).ready(function(){
  $.ajax({
    url: `${API_URL}/AdminProducto/buscar_otros`,
    type: "GET",
    dataType: "json",
    success: function(data){
      console.log(data);
      // recorrer el arreglo de libros
      $.each(data, function(index, value){
        // crear la card
        var card = '<div class="card mb-3 mt-5 mr-3 ml-3" style="width: 18rem;">';
        card += '<img src="src/img_PeqAmig/AliPeqAmig_ave.jpg" alt="..." style="width: 18rem; height: 18rem;">';
        card += '<div class="card-body">';
        card += '<h5 class="card-title">' + value.NOMBRE + '</h5>';
        card += '<p class="card-text">Precio: $' + value.VALOR + '</p>';
        card += '<a href="InfoProduct.html?id=' + value.ID_PRODUCTOS + '&valor=' + value.VALOR + '&nombre=' + value.NOMBRE + '&stock=' + value.STOCK + '" class="btn btn-info">Ver Producto</a>';
        card += '</div>';
        card += '</div>';
        // agregar la card al contenedor
        $('#TablaOtros').append(card);
      });
    },
    error: function(error){
      console.log(error);
    }
  });
});