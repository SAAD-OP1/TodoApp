import { useEffect } from 'react';
import './Styles.css';

export function Todos({ todos, setTodos }) {
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await fetch("http://localhost:3000/todos");
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const json = await res.json();
                setTodos(json.todos);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchTodos();

        const intervalId = setInterval(fetchTodos, 500); // Refresh every 0.5 seconds
        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [setTodos]);

    const handleToggleCompleted = async (id) => {
      console.log(id);
      try {
        const res = await fetch("http://localhost:3000/completed", {
            method: 'PUT',
            body: JSON.stringify({ id: id }),
            headers: { "Content-Type": "application/json" }
        });
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const json = await res.json();
    } catch (error) {
        console.error('Error:', error);
        alert("Failed to update todo");
    }
    };

    return (
        <div>
            {todos.map(todo => (
                <div className = "todo-item">
                    <h2>Title: {todo.title}</h2>
                    <h2>Description: {todo.description}</h2>
                    <button onClick={() => handleToggleCompleted(todo._id)}>
                        {todo.completed ? "Done" : "Mark as Done"}
                    </button>
                </div>
            ))}
        </div>
    );
}
