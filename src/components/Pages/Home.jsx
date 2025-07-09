import React, { useEffect, useState } from "react";
import TaskItem from "../TaskItem/TaskItem"

function Home() {
  const CATEGORY_OPTIONS = ["Posao", "Osobno", "Obitelj", "API"];
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Posao");
  const [filter, setFilter] = useState("Sve");

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
    if (!title.trim()) return;
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      category,
      source: "local",
    };
    setTasks((prev) => [prev, newTask]);
    setTitle("");
  }

  function toggleComplete(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const filteredTasks = tasks.filter((t) =>
    filter === "Sve" ? true : t.category === filter
  );

  return (
    <div>
      <form onSubmit={handleAdd}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Naziv zadatka"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORY_OPTIONS.filter((c) => c !== "API").map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button type="submit">Dodaj</button>
      </form>

      <div>
        {["Sve", CATEGORY_OPTIONS].map((c) => (
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
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
