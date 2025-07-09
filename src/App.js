import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Pages/Home";
import TodoDetails from "./components/Pages/ToDoDetails";

function App() {
  return (
    <Router>
      <div className="container">
        <header>
          <Link to="/" className="title">
            📝 To‑Do
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api-todo/:id" element={<TodoDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
