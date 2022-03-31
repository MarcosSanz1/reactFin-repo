import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

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
      method: 'DELETE',
    })
    setTasks(tasks.filter((task) => task.id !== id))
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

    // Usamos fetch para buscar la task de la API que queremos borrar y method para poner que queremos hacer
    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      // Guardamos en string el reminder de la task pasada por id
      body: JSON.stringify(uptask),
    })

    const data = await res.json()

    setTasks(tasks.map((task) => 
    task.id === id ? { ...task, reminder: !data.reminder} : task))
    console.log(tasks);
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
  }

  // PODEMOS HACERLO CON function
  // Le pasamos al componente Tasks (la lista de tasks y funciones CRUD). También
  // podemos poner algún condicional antes de pasar las tasks a Tasks.js. Aquí por ejemplo
  // le decimos que si el tamaño de la lista es > 0 muestre las tareas y si no ":"
  // le podemos dejar algún mensaje.
  // Como el botón de Add está en Header, es en este donde tenemos que pasar la función
  return (
    <Router>
      <div className="container">
        {/* setShowAddTask queremos establecerlo en el opuesto de cualquier valor */}
        <Header onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}/>
        {/* Queremos que cuando se muestre la lista de tasks solo se muestre este,
        no se muestre el About, para ello usamos dos rutas y exact */}
        <Routes>
          <Route path="/"
          element={
            <>
              {showAddTask ? <AddTask onAdd={addTask} /> : null}
              {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} 
              onToggle={toggleReminder} onAdd={addTask}/>) : ('No Tasks To Show')}
            </>
          } exact />
          <Route path="/about" element={<About/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );

  // LLamo a Tasks. Pero no tiene AddTask entonces no me muestra el form de este.
  // Necesito pasar la variable showAddTask para saber si esta a true o a false

  // ERROR RUTAS:
  // La función no es válida en un React child. Esto ocurre si tu devuelves un
  // componente insertado de Component por render. O al querer llamar a esta función
  // en el render tengo:
  //  - el componente AddTask que le paso la función de add
  //  - el componente Tasks que le paso la función lista de tasks y las funciones
  // Necesito un element, "una página/componente como el About.js" element={<X/>}
  // Necesito pasar esta linea {showAddTask ? <AddTask onAdd={addTask} /> : null}
  // Tengo que pasar la función addTask a el componente AddTask, no se si crear directamente
  // la función en el componente

  // O PODEMOS HACERLO CON class
  // class App extends Component{
  //   render() {
  //     return <h1>Hello from a class</h1>
  //   }
  // }
}

export default App;