import Todohmpglist from "../../components/todohmpglist";
import Login from "../login/Login";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie'

const Homepage = () => {

    const [cookies, setCookie, removeCookie] = useCookies(null)
    const authToken = cookies.AuthToken//222222----------
    const userEmail = false
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



    const signOut = () => {
        console.log('signout')
        removeCookie('Email')
        removeCookie('AuthToken')
        window.location.reload()
    
    }

    
    return (
        <div className="homepage">
            {!authToken && <Login/>}
            {authToken &&// saying if auth token is true show this below
                <>            
                <h1>homepage</h1><button className="signout" onClick={signOut}>SIGN OUT</button>
                <Link to='/Mypage'>my page</Link>
                <div>
                    {todos &&
                        <Todohmpglist 
                            todos={todos}
                        />
                    }
                    
                </div>
            </>}
        </div>
    );
}
 
export default Homepage;