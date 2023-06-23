//buscar las promociones en la api
$(document).ready(function() {

    getProductos();


}); 


getProductos = () =>{
    $.ajax({
    url: `${API_URL}/AdminProducto/buscar_perro`,
    type: 'GET',
    dataType: 'json',
    success: function(data){
        $.each(data, function(index,value){
        $('#TablaPerro').append(
            `<div class="card mb-3 mt-5 mr-3 ml-3" style="width: 18rem;">
            <a href="InfoProduct.html">
            <img src="src/img_Perro/Imagen_comida_perro2.JPG" alt="..." style="width: 18rem; height: 18rem;">
                <div class="card-body">
                <input type="hidden" name="id_rol" value="${value.ID_PRODUCTOS}">
                <h5 class="card-title">${value.NOMBRE}</h5></a>
                <p class="card-text"> $${value.VALOR}</p>
                </div>
                <div class="d-flex justify-content-center">
                <button class="btn btn-info col m-4">Agregar</button>
                </div>
            </div>
            `)
        })
    }
    })

};
