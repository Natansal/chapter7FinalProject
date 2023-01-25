import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../App';
import { useEffect, useState } from 'react';


export default function ToDos() {
    const { user } = useContext(AppContext);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`);
            const json = await response.json();
            setTodos(json);
        }
        fetchData()
            .catch((err) => console.log(err));
    }, [])

    const handelChange = (index) => {
        const newToDos = [...todos];
        newToDos[index].completed = !newToDos[index].completed;
        setTodos(newToDos);
    }

    const handelOrderChange = (e) => {
        let newToDos = [...todos];
        switch (e.target.value) {
            case 'ById':
                newToDos.sort((a, b) => {
                    return a.id - b.id;
                });
                setTodos(newToDos);
                break;
            case 'Random':
                for (let i = newToDos.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [newToDos[i], newToDos[j]] = [newToDos[j], newToDos[i]];
                }
                setTodos(newToDos);
                break;
            case 'CheckedLast':
                newToDos.sort((a, b) => {
                    return a.completed - b.completed;
                })
                setTodos(newToDos);
                break;
            case 'CheckedFirst':
                newToDos.sort((a, b) => {
                    return b.completed - a.completed;
                })
                setTodos(newToDos);
                break;
            case 'AlphaBeta':
                newToDos.sort((a, b) => {
                    return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);
                });
                setTodos(newToDos);
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <select onChange={(e) => handelOrderChange(e)}>
                <option value="ById">ById</option>
                <option value="Random">Random</option>
                <option value="CheckedFirst">Checked First</option>
                <option value="CheckedLast">Checked Last</option>
                <option value="AlphaBeta">AlphaBeta</option>
            </select>
            <ol>
                {todos.map((todo, index) => <li key={todo.id}>{todo.title}<input type='checkbox' defaultChecked={todo.completed} onChange={() => handelChange(index)} /></li>)}
            </ol>
        </div>
    )

}