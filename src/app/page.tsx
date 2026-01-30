
"use client"
import { useState, useEffect } from "react";
import "./globals.css";

const initialTodos: any[] = [];

export default function Home() {
  const [todos, setTodos] = useState(initialTodos);
  const [inputValue, setInputValue] = useState("");

  // Load todos from localStorage on component mount
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos array changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function addTask() {
    if (inputValue.trim().length === 0) return;

    const updatedTodos = [...todos];

    const obj = {
      title: inputValue,
      isCompleted: false
    };
    updatedTodos.push(obj);
    setTodos(updatedTodos);
    setInputValue("");
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      addTask();
    }
  }

  function markAsCompleted(index: number) {
    const updatedTodos = [...todos];
    updatedTodos[index].isCompleted = !updatedTodos[index].isCompleted;
    setTodos(updatedTodos);
  }

  function removeTask(index: number) {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  }

  return (
    <div style={{
      minHeight: "100vh",
      padding: "20px",
      fontFamily: "monospace"
    }}>

      {(
        <div style={{
          position: "fixed",
          padding: "19px",
          backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "5px",
          fontSize: "30px",
          width: "350px",
          height: "90vh",
          overflow: "hidden",
          color: "white",
          borderRadius: "20px"
        }}>
          <span>Total: {todos.length}</span>
          <span>Completed: {todos.filter(t => t.isCompleted).length}</span>
          <span>Pending: {todos.filter(t => !t.isCompleted).length}</span>
        </div>
      )}

      <div style={{
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "white",
        borderRadius: "12px",
        overflow: "hidden"
      }}>


        <h1 style={{
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
          fontWeight: "600",
          margin: "0",
          padding: "24px",
          fontSize: "28px",
        }}>
          My Todo List
        </h1>


        <div style={{
          padding: "10px",
          backgroundColor: "whitesmoke",
          marginTop: "10px",
          position: "fixed",
          right: "0",
          top: "0",
          borderRadius: "12px"

        }}>
          <h1 style={{
            textAlign: "center",
            backgroundColor: "black",
            color: "white",
            fontWeight: "600",
            padding: "24px",
            fontSize: "28px",
            borderRadius: "12px",
            marginBottom: "5px"
          }}>
            Add Todo
          </h1>
          <div style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",

          }}>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              style={{
                flex: "1",
                padding: "12px 16px",
                fontSize: "16px",
                border: "2px solid lightgray",
                borderRadius: "8px",
                outline: "none",
                transition: "all 0.3s ease",
                fontFamily: "inherit"
              }}
              onFocus={(e) => e.target.style.borderColor = "slateblue"}
              onBlur={(e) => e.target.style.borderColor = "lightgray"}
            />
            <button
              onClick={addTask}
              style={{
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: "600",
                color: "white",
                backgroundColor: "black",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Add Task
            </button>
          </div>
        </div>

        <div style={{
          padding: todos.length === 0 ? "40px 24px" : "12px",
          minHeight: "200px"
        }}>

          {todos.length === 0 ? (
            <div style={{
              textAlign: "center",
              color: "darkgray",
              fontSize: "28px",
              padding: "40px 0"
            }}>
              No tasks yet. Add one to get started!
            </div>
          )
            :
            (
              todos.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "16px",
                    margin: "8px 12px",
                    backgroundColor: item.isCompleted ? "gainsboro" : "white",
                    border: "2px solid lightgray",
                    borderRadius: "10px",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 8px lightgray"
                  }}
                >

                  <button
                    onClick={() => markAsCompleted(index)}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: item.isCompleted ? "2px solid limegreen" : "2px solid lightgray",
                      backgroundColor: item.isCompleted ? "limegreen" : "white",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      transition: "all 0.3s ease",
                      flexShrink: "0"
                    }}
                  >
                    {item.isCompleted ? "✓" : ""}
                  </button>


                  <span style={{
                    flex: "1",
                    marginLeft: "16px",
                    fontSize: "16px",
                    color: item.isCompleted ? "gray" : "black",
                    textDecoration: item.isCompleted ? "line-through" : "none",
                    transition: "all 0.3s ease",
                    wordBreak: "break-word"
                  }}>
                    {item.title}
                  </span>


                  <div style={{
                    display: "flex",
                    gap: "8px",
                    marginLeft: "12px"
                  }}>
                    <button
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "lightblue",
                        color: "dodgerblue",
                        cursor: "pointer",
                        fontSize: "16px",
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      ✏️
                    </button>

                    <button
                      onClick={() => removeTask(index)}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "mistyrose",
                        color: "crimson",
                        cursor: "pointer",
                        fontSize: "16px",
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
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