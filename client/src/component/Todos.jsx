import React, { useState, useEffect, useContext } from 'react';
import { CurrentUser, Error } from './App';
import { getRequest, patchRequest } from '../Requests'
import Delete from "./Delete";
import Add from "./Add";
import Edit from "./Edit";
import Search from "./Search";
import '../css/Todos.css';
function Todos() {
    const { currentUser } = useContext(CurrentUser);
    const { setErrorMessage } = useContext(Error);
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('id');
    const [editingTodoId, setEditingTodoId] = useState(null);
    const getAllTodos = async () => {
        const requestResult = await getRequest(`users/${currentUser.id}/todos`)
        if (requestResult.succeeded) {
            setTodos(requestResult.data);
            setFilteredTodos(requestResult.data);
        } else {
            setErrorMessage(requestResult.error)
        }
    };

    const handleToggleComplete = async (id, completed, titel) => {
        const body = {
            user_id: currentUser.id,
            id: id,
            title: titel,
            completed: completed
        };
        const requestResult = await patchRequest(`todos/${id}`, body);
        if (requestResult.succeeded) {
            setTodos(todos.map((todo) => (todo.id === id ? body : todo)));
            setFilteredTodos(filteredTodos.map((todo) => (todo.id === id ? body : todo)));
        } else {
            setErrorMessage(requestResult.error)
        }
    };

    const sortTodos = (criteria) => {
        let sorted = [...todos];
        switch (criteria) {
            case 'id':
                sorted.sort((a, b) => a.id - b.id);
                break;
            case 'alphabetical':
                sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'completed':
                sorted.sort((a, b) => b.completed - a.completed);
                break;
            case 'random':
                sorted.sort(() => Math.random() - 0.5);
                break;
            default:
                break;
        }
        setFilteredTodos(sorted);
    };

    useEffect(() => {
        setFilteredTodos(todos);
    }, [todos]);

    useEffect(() => {
        if (currentUser?.id) {
            getAllTodos();
        }
    }, [currentUser]);

    useEffect(() => {
        sortTodos(sortCriteria);
    }, [sortCriteria]);

    return (
        <div className="page-container">
            <div className='search-sort-container'>
                <Search
                    allSearchCriteria={['id', 'title', 'completed']}
                    origin={todos}
                    setFilter={setFilteredTodos}
                />
            </div>
            <div className="todos-wrapper">
                <div className='add-sort-container'>
                    <Add
                        permanentInformation={{
                            user_id: currentUser?.id,
                            completed: false
                        }}
                        arrayOfData={todos}
                        setArrayOfData={setTodos}
                        type={'todo'}
                        arrayOfInputType={['title']}
                    />
                    <div className="sort-container">
                        <label>Sort By: </label>
                        <select
                            value={sortCriteria}
                            onChange={(e) => setSortCriteria(e.target.value)}
                        >
                            <option value="id">ID</option>
                            <option value="alphabetical">Alphabetical</option>
                            <option value="completed">Completion Status</option>
                            <option value="random">Random</option>
                        </select>
                    </div>
                </div>
                {JSON.stringify(todos) === '[]' ? <p className='no-items'> No todos found. Start by adding a new todo to get started! </p> : <ul className='todos-list'>
                    {filteredTodos.map((todo) => (
                        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggleComplete(todo.id, !todo.completed,
                                )}
                            />
                            <span className="todo-id">#{todo.id}</span>
                            {editingTodoId !== todo.id &&
                                (<><span className="todo-title">{todo.title}</span>
                                    <Delete
                                        id={todo.id}
                                        type='todo'
                                        arrayOfData={todos}
                                        setArrayOfData={setTodos}
                                       
                                    />
                                </>)}
                            <Edit
                                type={'todo'}
                                id={todo.id}
                                body={{
                                    title: todo.title,
                                    user_id: currentUser?.id,
                                    id: todo.id,
                                    completed: todo.completed
                                }}
                                editingId={editingTodoId}
                                setEditingId={setEditingTodoId}
                                arrayOfData={todos}
                                setArrayOfData={setTodos}
                                fields={['title']} />
                        </li>
                    ))}
                </ul>}
            </div>
        </div>
    );
}
export default Todos;