import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

const Home = () => {
  const [tarea, setTarea] = useState('');
  const [tareas, setTareas] = useState([]);

  
  const handleInputChange = (e) => {
    setTarea(e.target.value);
  };

  
  const handleAddTarea = () => {
    if (tarea.trim() !== '') {
      setTareas([...tareas, tarea]);
      setTarea('');
    }
  };

  function deleteTarea  (index) {
    const eliminar = tareas.filter((_, i) => i !== index);
    setTareas(eliminar);
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
              <span>{tarea}</span>
              <button
              className="delete"
              onClick={() => deleteTarea(index) }
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