import Todohmpglist from "../../components/todohmpglist";
import Login from "../login/Login";
import { useEffect, useState } from "react";

const Homepage = () => {

    const authToken = true
    const [todos, settodos] = useState([]);



    //to display the todos by geting from db...it gets the todos from db and then make them = const todos above
    const gettodos = async () => {
        try{
            const response = await fetch('http://localhost:5000/todos');
            const jsonData = await response.json();


            settodos(jsonData);
        }catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        gettodos();
    }, [])


    return (
        <div className="homepage">
            {!authToken && <Login/>}
            <h1>homepage</h1>
            <div>
                {todos &&
                    <Todohmpglist 
                        todos={todos}
                    />
                }
                
            </div>
        </div>
    );
}
 
export default Homepage;