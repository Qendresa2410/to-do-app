import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TodoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTodo() {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
      const data = await res.json();
      setTodo(data);
      setLoading(false);
    }

    fetchTodo();
  }, [id]);

  if (loading) return <p>Učitavanje</p>;
  if (!todo?.id) return <p>Zadatak nije pronađen.</p>;

  return (
    <div>
      <h2>Detalji zadatka</h2>
      <p><strong>ID:</strong> {todo.id}</p>
      <p><strong>Naslov:</strong> {todo.title}</p>
      <p><strong>Status:</strong> {todo.completed ? "Dovršeno" : "Nedovršeno"}</p>
      <button onClick={() => navigate("/")}>Natrag</button>
    </div>
  );
}

export default TodoDetails;
