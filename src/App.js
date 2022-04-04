import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import NotFound from "./components/NotFound";
import TaskView from "./components/TaskView";
import swal from 'sweetalert';
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  // showAddTask -> Será un boolean para saber si el componente de AddTask se tiene que ver o no
  // "por defecto lo ponemos a false, porque queremos que lo muestre cuando cliquemos en el btn Add"
  // setShowAddTask -> Vamos a utilizar esta, solo para poder mostrar y ocultar, ya que está va a ser
  // lo contrario de la anterior, es decir si la var anterior tenia como valor true, esta tendre false
  // Esto nos servirá para usarla en el botón y que cuando le clique muestre el componente.
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    // Ya no necesitamos declarar aquí las tasks, ya que lo tendremos en db.json "API"
    // {
    //     id: 1,
    //     text: 'Doctors Appointment',
    //     day: 'Feb 5th at 2:30pm',
    //     reminder: true
    // },
    // {
    //     id: 2,
    //     text: 'Meeting at School',
    //     day: 'Feb 6th at 1:30pm',
    //     reminder: true
    // },
    // {
    //     id: 3,
    //     text: 'Food Shopping',
    //     day: 'Feb 5th at 2:30pm',
    //     reminder: false
    // }
  ]);

  const base = "/taskTracker";

  // De forma predeterminada, el inicio de sesión tendrá un valor a falso. Ya que todavía no hemos iniciado sesión 
  const [login, setLogin] = useState(false);

  // Función useEffect para sacar las tasks
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks();
  },[])

  // Fetch Tasks = Busca tasks "recoge el contenido de la API"
  const fetchTasks = async () => {
    // res -> Es igual a esperar porque buscar devuelve una promise, así que queremos
    // esperar esa promise de la url de la API. Luego esperaremos estos datos y guardaremos en data.
    // y más tarde lo sacaremos por consola. Esto nos guardará los datos de la API en data.
    const res = await fetch('http://localhost:3001/tasks')
    const data = await res.json()

    console.log(data);
    return data
  }

  // FETCH TASK
  // Guardará el contenido de una task que buscará por su id.
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`)
    const data = await res.json()

    console.log(data);
    return data
  }

  // DELETE TASK
  // Para borrar una task de la lista, utilizamos la "función setTasks" que habíamos dicho
  // que era donde actualizaremos esta lista y .filter que es con el que podremos borrar la task
  // que le pasamos al darle click al icono. // Mostrará las task que no tengan el id pasado.
  
  // const deleteTask = (id) => {
  //   setTasks(tasks.filter((task) => task.id !== id))
  // }

  // Usamos fetch para buscar la task de la API que queremos borrar y method para poner que queremos hacer
  const deleteTask = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'DELETE'
    })
    
    
    swal({
      title: "Are you sure?",
      text: "Task will be deleted",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Task has been deleted successfully", {
          icon: "success",
        })
        setTasks(tasks.filter((task) => task.id !== id));
      }
    });
  }

  // TOGGLE REMINDER
  // Vamos a hacer una función que al darle doble click cambie el estado del reminder
  // Para modificar una task de la lista, utilizamos la "función setTasks" que habíamos dicho
  // que era donde actualizaremos esta lista. Usaremos map para decir cual es nuestro estado y
  // si la id de la task es = a la que le recogemos, entonces vamos a tener un objeto específico con 
  // la task que ya teníamos y cambiando el valor de reminder, que será lo opuesto de lo que tenía,
  // si tenía el valor a true ahora será false y viceversa. De lo contrario, va a devolver la task que ya teníamos
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const uptask = {...taskToToggle, 
    reminder: !taskToToggle.reminder}

    console.log(uptask)
    // Usamos fetch para buscar la task de la API que queremos buscar y method para poner que queremos hacer
    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      // Guardamos en string el reminder de la task pasada por id
      body: JSON.stringify(uptask),
    })

    // const data = await res.json()

    setTasks(tasks.map((task) => 
    // task.id === id ? { ...task} : task))
    task.id === id ? task = uptask : task))
    // console.log(data);
  }

  // ADD TASK
  // const addTask = (task) => {
  //   // Cramos una constante que creará una id con un número aleatorio para luego 
  //   // añadirlo a la task y más tarde añadir esa task a la lista de tasks
  //   // const id = Math.floor(Math.random() * 10000) + 1
  //   // const newTask = { id, ...task }
  //   // setTasks([...tasks, newTask])
  // }

  // Primero guarda el contenido de la API y le decimos que va a hacer POST. Luego
  // guarda el contenido del body y transforma el JSON en String. Por último esperamos
  // al res.json y añadimos a la lista de tasks la nueva data.
  const addTask = async (task) => {
    const res = await fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])
    setShowAddTask(false)
    console.log(tasks)
  }

  // PODEMOS HACERLO CON function
  // Le pasamos al componente Tasks (la lista de tasks y funciones CRUD). También
  // podemos poner algún condicional antes de pasar las tasks a Tasks.js. Aquí por ejemplo
  // le decimos que si el tamaño de la lista es > 0 muestre las tareas y si no ":"
  // le podemos dejar algún mensaje.
  // Como el botón de Add está en Header, es en este donde tenemos que pasar la función
  return (
    <Router basename={base} forceRefresh={true} getUserConfirmation={
      (message, callback) => {
        callback(window.confirm())
      }
    } >
      <div className="container">
        {/* setShowAddTask queremos establecerlo en el opuesto de cualquier valor */}
        <Header onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}/>
        <button onClick={() => setLogin(!login)}>{login ? "log out" : "login"}</button>
        {/* Queremos que cuando se muestre la lista de tasks solo se muestre este,
        no se muestre el About, para ello usamos dos rutas y exact */}
        <Routes>
          <Route path="/"
          element={
            <>
              {showAddTask ? <AddTask onAdd={addTask}/> : null}
              {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} 
              onToggle={toggleReminder} onAdd={addTask}/>) : ('No Tasks To Show')}
            </>
          } exact />
          <Route path="/about" element={<About/>} />
          <Route path="*" element={<NotFound/>} />
          <Route path="/task/:id" element={<TaskView/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );

  // O PODEMOS HACERLO CON class
  // class App extends Component{
  //   render() {
  //     return <h1>Hello from a class</h1>
  //   }
  // }
}

// FALTA:
// - Formulario:
//  + Agregar datetimepicker y tipo "Date", usando la biblioteca Moment HECHO
//  + Quitar el alert de faltan datos y que me salga lo que falta debajo de su input HECHO
// lo he hecho con el "parámetro" de required que me saca una "pequeña alerta" de campo vacío
//  + Arreglar etiquetas de los inputs HECHO
//  + Cuando le de a save se cierre y no le tenga que dar a Close HECHO
// - Arreglar lo del reminder, "que no le tenga que dar 4 veces" HECHO
// - Cuando le de al icono de borrar me saque un "modal" SweetAlert para que el usuario tenga
// que aceptar la eliminación. HECHO
// - Por último "cambiar lo de CSS" por Bootstrap. Implementar Bootstrap IMPLEMENTADO EN FORM

// Comentario para cerrar el form con el boton Save:
// Le seteo el valor de la boolean dentro de la función addTask, y como esta se la paso
// al componente AddTask.js y al header le pasan ya la bool actualizada.

// APUNTE CAMBIO DE REMINDER:
// Tenia un error con lo del cambiar el valor del reminder. Porque yo primero buscaba la task seleccionada.
// Entraba en esta, y modificaba el valor del reminder al contrario luego hacia un put de la modificada y
// hacía un set de las tasks, cogía la tarea y volvía a modificar el reminder. Ahora si la id es igual a 
// la id recogida hace un ternario de que si la tarea es igual a la tarea modificada la guarda en la lista y 
// si no deja la task con dicha id como estaba.

// REACT ROUTER COURSE:
// + BrowserRouter: Engloba todas las rutas.

// + <Route path='' component={} />: le decímos la ruta y el componente. Para asignar esa ruta a su componente

// + exact: Por defecto los componentes se van "poniendo" uno encima de otro. Cuando cambie de ruta me sacará
// el componente que ya teníamos más el de la nueva ruta.

// + <Switch>: ¿? "Me daba error y yo uso <Routes>"

// + <Link to="">: Crea un link que llebará a la page de la ruta pasada. Para cambiar de ruta.

// + basename: Esto lo usamos dentro de BrowserRouter para poner una base en la ruta.
//  ej -> localhost:3000/"base"/about

// + forceRefresh: Esto lo usamos dentro de BrowserRouter para dar el efecto de refresco cuando cambiamos de ruta.
//   NO FUNCIONA

// + getUserConfirmation: esto lo usamos dentro de BrowserRouter para poder pedir una confirmación mediante un "modal".
// este va a tener dentro una función con mensaje y callback, que mostrará una ventana de confirmación.
// ej -> getUserConfirmation={(message, callback) => { callback(window.confirm()) } }
//   NO FUNCIONA

// + Por defecto cuando cambiamos de ruta nos lleva arriba de la página

// + Vamos a hacer la page/component del Error 404 Not Found. Para ello creamos un nuevo componente y en
// <Route path{"*"} element={}> usamos el * para decir lo que sea.

// Access URL Params. Pasar a la ruta una id. Por ejemplo que cuando le de a click en un item me muestre solo la task con ese id
// Si lo quiero implementar en lo que tengo, necesito en TaskItem hacer como con el doubleClick. Una función que
// recoja un id y muestre la task con esa id. Ya tengo la función fetchTask, que busca una task por id.
// Necesitamos si o si otra page con la tarea
// Lo de sacar un parametro de la url no va bien, con el match y params.id. Hay que usar UseParams

// con draggable a true y onDragStart podemos sacar un evento arrastrando el item. "En vez de Onclick".

// + useParams: Obtiene el parametro después de : para luego utilizarlo en la page.

// + useLocation: Obtiene la ruta de donde estas. Y con este podemos obtener los parámetros que van después de &
// con URLSearchParams(useLocation().search), y con .get sobre este y ("first" o "last") podemos sacar el primer o último parámetro detras de &.

// + Vamos a crear un nuevo estado para hacer un login. Este en un inicio estará a false ya que no hemos iniciado sesión.
// Ahora crearemos un boton para el login que al clicar seteará el valor al contrario que estaba, para luego cambiar el contenido con un ternario

// VOY POR: Tengo que crear un nuevo componente Profile.js, crear una ruta y un link para cambiar de page (como el About) y luego volver al video minuto 26:00
// Me falta esto, el useHistory y el NestedRouting. Lo tengo que terminar en 1 hora

export default App;