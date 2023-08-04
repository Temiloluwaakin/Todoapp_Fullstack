import { Link } from 'react-router-dom';
import './components.css';

const Todohmpglist = ({todos}) => {
    return (
        <div className="todohmpglist">
            {todos.map((todo) => (
                <div className="todo-preview" key={todo.todos_id}>
                    <Link to={`/todos/${todo.todos_id}`} className='trid'>
                        <div>{todo.user_email}</div>
                        <div>{ todo.title}</div>
                        <div>{ todo.date} </div>
                    </Link>
                    {/*<button onClick={() => deletetodo(todo.todo_id)}>del</button>*/}
                </div>
            ))}
        </div>
    );
}
 
export default Todohmpglist;