var moduleIMDB = (function () {
  var peliculas = [];

  //Creo Pelicula con sus atributos
  function Pelicula() {
    this.id = 0;
    this.nombre = '';
    this.descripcion = '';
    this.imagen = '';
    this.visto = false;
  }

  function agregarPeli() {
    // Creo la instancia Pelicula
    var peli = new Pelicula();
    peli.id = document.getElementById('id-peli').value;

    //Corroboro que no esté duplicda la peli
    validarDuplicidad(peli.id);
    if(peli.id == null || validarDuplicidad(peli.id)!== false){
      alert('Disculpe, el ID de la pelicula que esta tratando de ingresar, ya existe.');
    }
    else{
      // Tomo el valor de los input y se los asigno a las variables
      peli.id = document.getElementById('id-peli').value;
      peli.nombre = document.getElementById('titulo').value;
      peli.descripcion = document.getElementById('descripcion').value;
      peli.imagen = document.getElementById('link-img').value;
      peliculas.push(peli);
      localStorage.setItem("pelis", JSON.stringify(peliculas));

      // Se vacian los input
      document.getElementById('id-peli').value = "";
      document.getElementById('titulo').value = "";
      document.getElementById('descripcion').value = "";
      document.getElementById('link-img').value = "";
    }
  }

  function marcarVisto(peli){
    var pos = validarDuplicidad(peli);
    peliculas[pos].visto = true;
    var container = document.getElementById("peliculas");
    container.removeChild(document.getElementById('pelicula-'+ peli));
    localStorage.setItem("pelis", JSON.stringify(peliculas));
  }
 
  function validarDuplicidad(peli){
    if (peliculas){
      for(var i = 0; i < peliculas.length; i++){
        if (peli == peliculas[i].id){
          return i;
        }
      } 
    }
    return false;
  }

  function ordenarPelis(){
    console.log('k');
    var tipo = document.getElementById("ordenar").value;
    peliculas.sort(function(a, b){
      switch(tipo){
        case "az":
          if (a.nombre < b.nombre)
            return -1;
          if (a.nombre > b.nombre)
            return 1;
          return 0;
        break;

        case "za":
          if (a.nombre > b.nombre)
            return -1;
          if (a.nombre < b.nombre)
            return 1;
          return 0;
        break;

        case "id-asc":
          if (parseInt(a.id) < parseInt(b.id))
            return -1;
          if (parseInt(a.id) > parseInt(b.id))
            return 1;
          return 0;
        break;
      }
       
    });
    mostrarPelis();
    //localStorage.setItem("pelis", JSON.stringify(peliculas));
  }

  function mostrarPelis(){
    //Recorro  y guardo info en el arreglo de peliculas para mostrarlas
    document.getElementById("peliculas").innerHTML = '';
    for (var i = 0; peliculas.length > i; i++) {
      // p contiene el objeto de pelicula
      var p = peliculas[i];
      //
      if(p.visto == false){
        var un_div = document.createElement('div');
        var un_h1 = document.createElement('h1');
        var un_p = document.createElement('p');
        var un_img = document.createElement('img');
        var visto = document.createElement('a');

        //Se carga los atributos y textos de los elementos
        un_div.setAttribute("id",'pelicula-'+ p.id);
        un_div.className = "class_peli";
        un_h1.appendChild(document.createTextNode(p.nombre));
        un_p.appendChild(document.createTextNode(p.descripcion));
        un_img.setAttribute("src", p.imagen);
        visto.appendChild(document.createTextNode('Marcar como visto'));

        visto.onclick = function(peliID){
          //var peliID = p.id;
          return function(){
            marcarVisto(peliID);
          };
        }(p.id);


        // Se agregan los nodos al DOM
        un_div.appendChild(un_h1);
        un_div.appendChild(un_p);
        un_div.appendChild(un_img);
        un_div.appendChild(visto);

        document.getElementById('peliculas').appendChild(un_div);
      }
    }
  }


  return {
      iniciarPrograma: function (){
        console.log(peliculas);
        console.log(localStorage.getItem("pelis"));
        if(localStorage.getItem("pelis")){
          console.log(peliculas);
          peliculas = JSON.parse(localStorage.getItem("pelis"));
        }
        else{
          peliculas = [];
        }
        console.log(peliculas);
        console.log('Agregando peliculas...');
        document.getElementById('agregar').onclick = function(){
          agregarPeli();
        };
        document.getElementById('ordenar').onchange = function(){
          ordenarPelis();
        };
        document.getElementById('mostrar').onclick = function(){
          mostrarPelis();
        };
      }
    };
})();