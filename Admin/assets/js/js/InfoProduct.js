$(document).ready(function() {
    // Obtener los parámetros de la URL
    var params = new URLSearchParams(window.location.search);

    // Obtener los valores de los parámetros
    var id = params.get('id');
    var NOMBRE = params.get('nombre');
    var VALOR = params.get('valor');
    var STOCK = params.get('stock');
    var RESTA = (params.get('valor')*20/100);
    var TOTAL = params.get('valor')-RESTA;
    

    // Asignar los valores a los elementos HTML
    $('#nombre').text(NOMBRE);
    $('#valor').text('Precio Normal: $' + VALOR);
    $('#stock').text('Stock: ' + STOCK);
    $('#resta').text(RESTA);
    $('#total').text('Precio: $' + TOTAL);
    
  });