import { useState } from 'react';
import { Todos } from './Todos';
import './Styles.css';

export function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);

    const addTodo = async () => {
        try {
            const res = await fetch("http://localhost:3000/todo", {
                method: 'POST',
                body: JSON.stringify({ title: title, description: description }),
                headers: { "Content-Type": "application/json" }
            });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await res.json();
            const newTodo = { title: title, description: description, completed: false };
            setTodos([...todos, newTodo]);
            
        } catch (error) {
            console.error('Error:', error);
            alert("Failed to add todo");
        }
    };

    return (
        <div className = "container">
            <input
                className = "input"
                style={{ padding: 10, margin: 10 }}
                id="title"
                type="text"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <input
                className = "input"
                style={{ padding: 10, margin: 10 }}
                id="description"
                type="text"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <button
                className = "button"
                style={{ padding: 10, margin: 10 }}
                onClick={addTodo}
            >
                Add a Todo
            </button>
            <Todos todos={todos} setTodos={setTodos} />
        </div>
    );
}
