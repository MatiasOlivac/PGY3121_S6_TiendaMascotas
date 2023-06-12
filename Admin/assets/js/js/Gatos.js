//buscar las promociones en la api
$(document).ready(function() {

    getProductos();
    
    
    }); 
    
    
    getProductos = () =>{
        $.ajax({
          url: `${API_URL}/AdminProducto`,
          type: 'GET',
          dataType: 'json',
          success: function(data){
            $.each(data, function(index,value){
              $('#TablaGato').append(
                `<div class="card mb-3 mt-5 mr-3 ml-3" style="width: 18rem;">
                  <img src="${value.IMAGEN}" alt="..." style="width: 18rem; height: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">${value.NOMBRE}</h5>
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
        console.log(IMAGEN);

      };
    