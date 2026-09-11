import React, { useEffect, useState } from "react";
import apiClient from "../ApiClient/interceptor";

const Todo = ({ tasks = [], setTasks }) => {
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // GET TODOS
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await apiClient.get("/todos");

        console.log("Todos:", response.data);

        setTasks(response.data.data);
      } catch (error) {
        console.log("Fetch Todo error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load tasks"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [setTasks]);

  // =========================
  // CREATE TODO
  // =========================
  const addTodo = async () => {
    if (!title.trim()) {
      alert("Please enter a task");
      return;
    }

    try {
      const response = await apiClient.post(
        "/todos/create",
        {
          title: title.trim(),
        }
      );

      console.log("Created Todo:", response.data);

      const newTodo = response.data.data;

      setTasks((previousTasks) => [
        ...previousTasks,
        newTodo,
      ]);

      setTitle("");
    } catch (error) {
      console.log("Create Todo error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to create todo"
      );
    }
  };

  // =========================
  // TOGGLE TODO
  // =========================
  const toggleTodo = async (id, currentStatus) => {
    try {
      const response = await apiClient.patch(
        `/todos/${id}`,
        {
          isDone: !currentStatus,
        }
      );

      const updatedTodo = response.data.data;

      setTasks((previousTasks) =>
        previousTasks.map((todo) =>
          todo._id === id
            ? updatedTodo
            : todo
        )
      );
    } catch (error) {
      console.log("Update Todo error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update todo"
      );
    }
  };

  // =========================
  // EDIT TODO
  // =========================
  const editTodo = async (id) => {
    if (!editTitle.trim()) {
      alert("Task cannot be empty");
      return;
    }

    try {
      const response = await apiClient.patch(
        `/todos/${id}`,
        {
          title: editTitle.trim(),
        }
      );

      const updatedTodo = response.data.data;

      setTasks((previousTasks) =>
        previousTasks.map((todo) =>
          todo._id === id
            ? updatedTodo
            : todo
        )
      );

      setEditId(null);
      setEditTitle("");
    } catch (error) {
      console.log("Edit Todo error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to edit todo"
      );
    }
  };

  // =========================
  // DELETE TODO
  // =========================
  const deleteTask = async (id) => {
    try {
      await apiClient.delete(`/todos/${id}`);

      setTasks((previousTasks) =>
        previousTasks.filter(
          (todo) => todo._id !== id
        )
      );
    } catch (error) {
      console.log("Delete Todo error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete todo"
      );
    }
  };

  // =========================
  // CLEAR COMPLETED
  // =========================
  const clearCompleted = async () => {
    const completedTasks = tasks.filter(
      (todo) => todo.isDone
    );

    if (completedTasks.length === 0) {
      alert("No completed tasks");
      return;
    }

    try {
      await Promise.all(
        completedTasks.map((todo) =>
          apiClient.delete(
            `/todos/${todo._id}`
          )
        )
      );

      setTasks((previousTasks) =>
        previousTasks.filter(
          (todo) => !todo.isDone
        )
      );
    } catch (error) {
      console.log(
        "Clear completed error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to clear completed tasks"
      );
    }
  };

  // =========================
  // STATISTICS
  // =========================
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (todo) => todo.isDone
  ).length;

  const pendingTasks = tasks.filter(
    (todo) => !todo.isDone
  ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  // =========================
  // FILTER
  // =========================
  const filteredTasks = tasks.filter((todo) => {
    if (filter === "pending") {
      return !todo.isDone;
    }

    if (filter === "completed") {
      return todo.isDone;
    }

    return true;
  });

  // =========================
  // UI
  // =========================
  return (
    <div className="todo">

      <h2>📝 To-Do List</h2>

      {/* ADD TODO */}
      <div className="todo-form">

        <input
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
        />

        <button onClick={addTodo}>
          Add Task
        </button>

      </div>

      {/* STATISTICS */}
      <div className="todo-stats">

        <div className="todo-stat">
          <span>Total</span>
          <strong>{totalTasks}</strong>
        </div>

        <div className="todo-stat">
          <span>Pending</span>
          <strong>{pendingTasks}</strong>
        </div>

        <div className="todo-stat">
          <span>Completed</span>
          <strong>{completedTasks}</strong>
        </div>

      </div>

      {/* PROGRESS */}
      <div className="todo-progress">

        <div className="progress-header">
          <span>Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

      </div>

      {/* FILTERS */}
      <div className="todo-filters">

        <button
          className={
            filter === "all"
              ? "active"
              : ""
          }
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={
            filter === "pending"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter("pending")
          }
        >
          Pending
        </button>

        <button
          className={
            filter === "completed"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter("completed")
          }
        >
          Completed
        </button>

        <button
          className="clear-completed"
          onClick={clearCompleted}
        >
          Clear Completed
        </button>

      </div>

      {/* TODO LIST */}
      <div className="todo-list">

        {loading ? (
          <p className="todo-message">
            Loading tasks...
          </p>
        ) : error ? (
          <p className="todo-message error">
            {error}
          </p>
        ) : filteredTasks.length === 0 ? (
          <p className="todo-message">
            No tasks found.
          </p>
        ) : (
          filteredTasks.map((todo) => (

            <div
              className={`todo-item ${
                todo.isDone
                  ? "completed"
                  : ""
              }`}
              key={todo._id}
            >

              {/* CHECKBOX */}
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() =>
                  toggleTodo(
                    todo._id,
                    todo.isDone
                  )
                }
              />

              {/* TITLE / EDIT */}
              {editId === todo._id ? (
                <input
                  className="edit-input"
                  type="text"
                  value={editTitle}
                  onChange={(e) =>
                    setEditTitle(
                      e.target.value
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      editTodo(todo._id);
                    }

                    if (e.key === "Escape") {
                      setEditId(null);
                      setEditTitle("");
                    }
                  }}
                />
              ) : (
                <span className="todo-title">
                  {todo.title}
                </span>
              )}

              {/* EDIT / SAVE */}
              {editId === todo._id ? (
                <button
                  onClick={() =>
                    editTodo(todo._id)
                  }
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditId(todo._id);
                    setEditTitle(
                      todo.title
                    );
                  }}
                >
                  Edit
                </button>
              )}

              {/* DELETE */}
              <button
                onClick={() =>
                  deleteTask(todo._id)
                }
              >
                Delete
              </button>

            </div>

          ))
        )}

      </div>

    </div>
  );
};

export default Todo;