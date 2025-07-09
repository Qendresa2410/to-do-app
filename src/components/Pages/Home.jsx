import { useState, useEffect } from "react";
import TaskItem from "../TaskItem/TaskItem"; // prilagodi putanju ako treba

const CATEGORY_OPTIONS = ["Posao", "Osobno", "Obitelj", "API"];

function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Posao");
  const [filter, setFilter] = useState("Sve");
  const [error, setError] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
      const data = await res.json();
      const apiTasks = data.map((t) => ({
        id: t.id,
        title: t.title,
        completed: t.completed,
        category: "API",
        source: "api",
      }));
      setTasks(apiTasks);
    }
    fetchTasks();
  }, []);

  function handleAdd(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError(true);
      return;
    }
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      category,
      source: "local",
    };
    setTasks((prev) => [...prev, newTask]);
    setTitle("");
    setError(false);
  }

  function toggleComplete(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function confirmDelete() {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setTaskToDelete(null);
    }
  }

  const filteredTasks = tasks.filter((t) =>
    filter === "Sve" ? true : t.category === filter
  );

  return (
    <div>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (e.target.value.trim()) setError(false);
          }}
          placeholder="Naziv zadatka"
          required
          className={error ? "input-error" : ""}
        />
        {error && <p className="error-message">Naziv zadatka je obavezan.</p>}

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORY_OPTIONS.filter((c) => c !== "API").map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button type="submit">Dodaj</button>
      </form>

      <div>
        {["Sve", ...CATEGORY_OPTIONS].map((c) => (
          <button key={c} onClick={() => setFilter(c)}>
            {c}
          </button>
        ))}
      </div>

      <div>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleComplete}
             onRequestDelete={() => setTaskToDelete(task)} 
          />
        ))}
      </div>

      {taskToDelete && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <p>
              Jeste li sigurni da želite izbrisati zadatak: <b>{taskToDelete.title}</b>?
            </p>
            <button onClick={confirmDelete} className="confirm-btn">Da</button>
            <button onClick={() => setTaskToDelete(null)} className="cancel-btn">Odustani</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
