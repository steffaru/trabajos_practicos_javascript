var moduleIMDB = (function () {
  var peliculas = [];

  function Pelicula() {
    this.id = 0;
    this.nombre = '';
    this.descripcion = '';
    this.imagen = '';
  }

  function agregarPeli() {
    var peli = new Pelicula();
    peli.id = parseInt(prompt('Ingrese el ID'));
    validarDuplicidad(peli.id);
    if(peli.id == null || validarDuplicidad(peli.id)!== false){
      alert('Disculpe, el ID de la pelicula que esta tratando de ingresar, ya existe.');
    }
    else{
      peli.nombre = prompt('Ingrese Nombre de la Pelicula');
      peli.descripcion = prompt('Ingrese breve descripción de la pelicula');
      peli.imagen = prompt('Ingrese la URL de la imagen referente a la pelicula');
      peliculas.push(peli);
      localStorage.setItem("pelis", JSON.stringify(peliculas));
    }
  }

  function eliminar(){
     var peli_eliminar = parseInt(prompt('Que pelicula desea eliminar, ingrese el ID'));
     var i = validarDuplicidad(peli_eliminar);
      if(i !== false){
        peliculas.splice(i,1);
        localStorage.setItem("pelis", JSON.stringify(peliculas));
        alert('Se eliminó el id: '+peli_eliminar+ ' satisfactoriamente');
      }else{
        alert('El ID que está ingresando no se encuentra registrado');
      }
     return peliculas;
  }
 
  function validarDuplicidad(peli){
    for(var i = 0; i < peliculas.length; i++){
      if (peli == peliculas[i].id){
        return i;
      }
    }
    return false;
  }

  function ordenarPelis(){
    peliculas.sort(function(a, b){return a.id-b.id});
    localStorage.setItem("pelis", JSON.stringify(peliculas));
  }
  function mostrarPelis(){
    for (var i = 0; peliculas.length > i; i++) {
      var p = peliculas[i];
      var un_div = document.createElement('div');
      var un_h1 = document.createElement('h1');
      var un_p = document.createElement('p');
      var un_img = document.createElement('img');

      un_h1.appendChild(document.createTextNode(p.nombre));
      un_p.appendChild(document.createTextNode(p.descripcion));
      un_img.setAttribute("src", p.imagen);

      un_div.appendChild(un_h1);
      un_div.appendChild(un_p);
      un_div.appendChild(un_img);

      document.getElementById('peliculas').appendChild(un_div);
    }
  }


  return {
      iniciarPrograma: function () {
        if(localStorage.getItem("pelis")!== null){
          peliculas = JSON.parse(localStorage.getItem("pelis"));
        }
        console.log('Agregando peliculas...');
        agregarPeli();
        ordenarPelis();
        console.log(peliculas);
        return peliculas;
      },
      mostrar: function(){
        mostrarPelis();
      },
      eliminarPelicula: function(){
        eliminar();
        console.log(peliculas);
      }
    };
})();

//moduleIMDB.agregarPeli();
//moduleIMDB.iniciarPrograma();
//moduleIMDB.eliminarPelicula();