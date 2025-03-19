import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

const Home = () => {

  const [tarea, setTarea] = useState('');
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    getTodos()
  }, []);
  function getTodos() {
    fetch("https://playground.4geeks.com/todo/users/madg26")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data);
        setTareas(data.todos)
      })
      .catch((err) => { return err })
  }

  const handleInputChange = (e) => {
    setTarea(e.target.value);

  };


  const handleAddTarea = () => {
    if (tarea.trim() === ""){
      return;
    }
   
    fetch("https://playground.4geeks.com/todo/todos/madg26", {
      method: "POST",
      body: JSON.stringify({ label: tarea, is_done: "false" }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setTareas([...tareas, data]);
        setTarea('');
      })
      .catch((err) => { return err })
  };

  function deleteTarea(id) {
    fetch("https://playground.4geeks.com/todo/todos/" + id, {
      method: "DELETE"
    })
      .then((response) => {
        return response;
      }
      )
      .then(() => {
        getTodos()
      })
      .catch((err) => { return err });
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTarea();

    }
  };

  return (
    <div className="tabla mt-5">
      <h1>Lista de Tareas</h1>

      <input
        type="text"
        value={tarea}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Escribe una tarea..."
      />
      <ul className="tabla">
        {tareas.map((tarea, index) => (
          <li className="taks" key={index}>
            <span>{tarea.label}</span>
            <button
              className="delete"
              onClick={() => deleteTarea(tarea.id)}
            >x</button>
          </li>
        ))}
      </ul>
      <div className="tareasPendientes">
        <strong>{tareas.length}</strong>
        <p className="texto">Tareas pendientes</p>
      </div>


    </div>
  );
}


export default Home;