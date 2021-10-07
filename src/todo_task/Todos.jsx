import { useState } from "react";
import './styles.css';

export default function Todos() {
    const [state, setState] = useState({
        todos: [],
        todoName: ''
    });
    const { todos, todoName } = state;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!todos.find(todo => todo.title === todoName)) {
            const updatedTodos = [...todos, { title: todoName, isCompleted: false }];
            setState({ ...state, todos: updatedTodos });
        }
        else
            alert(`${todoName} already exists`);
    };

    const handleInputChange = (event) => setState({ ...state, todoName: event.target.value });

    const deleteTodo = (event, todoTitle) => {
        event.stopPropagation();

        const updatedTodos = todos.filter(todo => todo.title !== todoTitle);
        console.log('_deleteTodo', { updatedTodos, todoTitle });
        setState({ ...state, todos: updatedTodos });
    };

    const toggleTodoStatus = (todoTitle) => {
        const updatedTodos = todos.map(todo => ({
            ...todo,
            isCompleted: todo.title === todoTitle ? !todo.isCompleted : todo.isCompleted
        }));
        setState({ ...state, todos: updatedTodos });
    };

    console.log('_state', state);
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter a todo" onChange={handleInputChange} value={todoName} />
                <button type="submit">Save</button>
            </form>

            {todos.map(({ title, isCompleted }) => (
                <div key={title} onClick={() => toggleTodoStatus(title)}>
                    <h2 className="todo-item">
                        <span className={isCompleted ? 'completed' : 'notcompleted'}>{title}</span>
                        <button className="deleteTodoBtn" type="button" onClick={(event) => deleteTodo(event, title)}>x</button>
                    </h2>
                </div>
            ))}
        </>
    )
}