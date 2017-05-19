var toDoList = (function () {
  var tasks = [];

  //Creo Tarea con sus atributos
  function Task() {
    this.id = 0;
    this.titulo = '';
    this.descripcion = '';
    this.realizado = false;
  }

  function addTask() {
    // Creo la instancia Tarea
    var task = new Task();
    task.id = document.getElementById('id-number').value;

    //Corroboro que no esté duplicda la tarea
    validarDuplicidad(task.id);
    if(task.id == null || validarDuplicidad(task.id)!== false){
      alert('Disculpe, el ID de la pelicula que esta tratando de ingresar, ya existe.');
    }
    else{
      // Tomo el valor de los input y se los asigno a las variables
      task.id = document.getElementById('id-number').value;
      task.titulo = document.getElementById('id-title').value;
      task.descripcion = document.getElementById('id-ltext').value;
      tasks.push(task);
      localStorage.setItem("tareas", JSON.stringify(tasks));

      // Se vacian los input
      document.getElementById('id-number').value = "";
      document.getElementById('id-title').value = "";
      document.getElementById('id-ltext').value = "";
    }
  }

  function cambiarRealizada(task){
    var pos = validarDuplicidad(task);
    if (tasks[pos].realizado) {
      tasks[pos].realizado = false;
    } else {
      tasks[pos].realizado = true;
    }
    console.log(tasks[pos].realizado);
    //var container = document.getElementById("tasks");
    //container.removeChild(document.getElementById('Tarea- '+ task));
    localStorage.setItem("tareas", JSON.stringify(tasks));
  }
  
  function habilitarEditar(task){
    var pos = validarDuplicidad(task);
    var tTitulo = document.getElementById('task-titulo-'+tasks[pos].id);
    var tDesc = document.getElementById('task-descripcion-'+tasks[pos].id)
    
    tTitulo.removeAttribute("disabled");
    tDesc.removeAttribute("disabled");
  }

  function editarTarea(task){
    var pos = validarDuplicidad(task);
    tasks[pos].titulo = document.getElementById('task-titulo-'+tasks[pos].id).value;
    tasks[pos].descripcion = document.getElementById('task-descripcion-'+tasks[pos].id).value;

    document.getElementById('task-titulo-'+tasks[pos].id).setAttribute("disabled", "disabled");
    document.getElementById('task-descripcion-'+tasks[pos].id).setAttribute("disabled", "disabled");

    localStorage.setItem("tareas", JSON.stringify(tasks));
  }
  function borrarTarea(task){
    var pos = validarDuplicidad(task);
    tasks.splice(pos,1);
    localStorage.setItem("tareas", JSON.stringify(tasks));
    alert('Se eliminó la tarea satisfactoriamente');
  }
  function borrarTodas(task){
    var pos = validarDuplicidad(task);
    tasks.splice(task);
    localStorage.setItem("tareas", JSON.stringify(tasks));
    alert('Se eliminaron TODAS las tareas, por favor recargue la página para ver los cambios');
  }
  function validarDuplicidad(task){
    if (tasks){
      for(var i = 0; i < tasks.length; i++){
        if (task == tasks[i].id){
          return i;
        }
      } 
    }
    return false;
  }

  function orderTasks(){
    var orden = document.getElementById("orderby").value;
    console.log('k', orden);
    tasks.sort(function(a, b){
      switch(orden){
        case "o-asc":
          if (a.titulo < b.titulo)
            return -1;
          if (a.titulo > b.titulo)
            return 1;
          return 0;
        break;

        case "o-desc":
          if (a.titulo > b.titulo)
            return -1;
          if (a.titulo < b.titulo)
            return 1;
          return 0;
        break;

        case "o-id":
          if (parseInt(a.id) < parseInt(b.id))
            return -1;
          if (parseInt(a.id) > parseInt(b.id))
            return 1;
          return 0;
        break;
      }
       
    });
    mostrarTasks();
  }

  function mostrarTasks(){
    //Recorro  y guardo info en el arreglo de tareas para mostrarlas
    document.getElementById("show-tasks").innerHTML = '';
    for (var i = 0; tasks.length > i; i++) {
      // t contiene el objeto de tarea
      var t = tasks[i];
      
      // Datos del Formulario
      var un_div = document.createElement('div');
      var un_h1 = document.createElement('input');
      var un_id = document.createElement('h4');
      var un_text = document.createElement('textarea');
      // el check
      var cont_check = document.createElement('div');
      var lab_check = document.createElement('label');
      var un_check = document.createElement('input');
      // Botones adicionales
      var un_guardar = document.createElement('button');
      var span_guardar = document.createElement('span');
      var un_edit = document.createElement('button');
      var span_edit = document.createElement('span');
      var un_delete = document.createElement('button');
      var span_delete = document.createElement('span');


      //Se carga los atributos y textos de los elementos
      un_div.setAttribute("id","tarea-" + t.id);
      un_div.className = "class_tarea";
      un_text.appendChild(document.createTextNode(t.descripcion));
      un_check.className = "class-chekbox";

      // id a los inputs de la tarea
      un_h1.setAttribute("id", "task-titulo-" + t.id)
      un_text.setAttribute("id", "task-descripcion-" + t.id)
      
      //botones
      lab_check.appendChild(document.createTextNode("Realizada"));
      un_guardar.setAttribute("id", "task-guardar-" + t.id)
      span_delete.className = "icon-bin";
      span_edit.className = "icon-pencil";
      span_guardar.className = "icon-floppy-disk";

      un_id.appendChild(document.createTextNode(t.id));
      //Agregando atributos al resto de los elementos
      un_h1.setAttribute("type", "text");
      un_h1.setAttribute("disabled", "disabled");
      un_h1.setAttribute("value", t.titulo);

      un_text.setAttribute("disabled", "disabled");
      un_text.setAttribute("value", t.descripcion);

      cont_check.setAttribute("id", "container_check")
      un_check.setAttribute("type", "checkbox");
      if(t.realizado) {
        un_check.setAttribute("checked", "checked");
      }

      un_check.onclick = function(taskID){
        return function(){
          cambiarRealizada(taskID);
        };
      }(t.id);

      un_edit.onclick = function(taskID){
        return function(){
          habilitarEditar(taskID);
        };
      }(t.id);

      un_guardar.onclick = function(taskID){
        return function(){
          editarTarea(taskID);
        };
      }(t.id);
      un_delete.onclick = function(taskID){
        return function(){
          borrarTarea(taskID);
        };
      }(t.id);

      // Se agregan los nodos al DOM
      un_div.appendChild(un_id);
      un_div.appendChild(un_h1);
      un_div.appendChild(un_text);
      un_div.appendChild(cont_check);
      cont_check.appendChild(lab_check);
      cont_check.appendChild(un_check);
      un_div.appendChild(un_edit);
      un_edit.appendChild(span_edit);
      un_div.appendChild(un_delete);
      un_delete.appendChild(span_delete);
      un_div.appendChild(un_guardar);
      un_guardar.appendChild(span_guardar);

      document.getElementById('show-tasks').appendChild(un_div);
    }
  }


  return {
      iniciarPrograma: function (){
        console.log(tasks);
        console.log(localStorage.getItem("tareas"));
        if(localStorage.getItem("tareas")){
          console.log(tasks);
          tasks = JSON.parse(localStorage.getItem("tareas"));
        }
        else{
          tasks = [];
        }
        console.log(tasks);
        console.log('Agregando tareas. Por favor, espere');
        document.getElementById('one-add').onclick = function(){
          addTask();
        };
        document.getElementById('orderby').onchange = function(){
          orderTasks();
        };
        document.getElementById('all-show').onclick = function(){
          mostrarTasks();
        };
        document.getElementById('all-delete').onclick = function(){
          borrarTodas();
        };
      }
    };
})();