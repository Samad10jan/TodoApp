"use client";
import { useState, useEffect } from "react";
import "./globals.css";

export default function Home() {
  const [todos, setTodos] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = () => {
    if (!inputValue.trim()) return;
    setTodos([...todos, { title: inputValue, isCompleted: false }]);
    setInputValue("");
  };

  return (
    <div className="page">

     
      <div className="stats">
        <h2>Todo Stats</h2>
        <div className="stats-row"><span>Total</span><span>{todos.length}</span></div>
        <div className="stats-row"><span>Completed</span><span>{todos.filter(t => t.isCompleted).length}</span></div>
        <div className="stats-row"><span>Pending</span><span>{todos.filter(t => !t.isCompleted).length}</span></div>
      </div>

    
      <div className="add-todo">
        <h1>Add Todo</h1>
        <div className="add-todo-row">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="What needs to be done?"
          />
          <button onClick={addTask}>Add</button>
        </div>
      </div>

      <div className="todo-card">
        <div className="header">My Todo List</div>

        <div className="todo-list">
          {todos.length === 0 ? (
            <div className="empty">No tasks yet</div>
          ) : (
            todos.map((t, i) => (
              <div key={i} className={`todo-item ${t.isCompleted ? "completed" : ""}`}>
                <button
                  className={`check-btn ${t.isCompleted ? "completed" : ""}`}
                  onClick={() => {
                    const copy = [...todos];
                    copy[i].isCompleted = !copy[i].isCompleted;
                    setTodos(copy);
                  }}
                >
                  {t.isCompleted && "✓"}
                </button>

                <span className={`todo-title ${t.isCompleted ? "completed" : ""}`}>
                  {t.title}
                </span>

                <div className="todo-actions">
                  <button className="icon-btn">✏️</button>
                  <button className="icon-btn" onClick={() => {
                    const copy = [...todos];
                    copy.splice(i, 1);
                    setTodos(copy);
                  }}>
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
