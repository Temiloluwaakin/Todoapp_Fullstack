import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import Todohmpglist from "../../components/todohmpglist";
import Login from "../login/Login";
import { Link } from 'react-router-dom';
import Addnewtodo from '../../components/Addnewtodo';

const Mypage = () => {


  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken//222222----------
  const userEmail = cookies.Email
  const [ todos, settodos] = useState(null)//1111--------------------------
  const [showModal, setShowModal] = useState(false)

  const gettodos = async () => {
    try {//the process.env... is to hide 'localhost8000' check vid 2:02 
      const response = await fetch(`http://localhost:5000/todos/${userEmail}`)
      const json = await response.json()
      settodos(json)//1111---------------------------put the data gotten into settask which will no be put to task up
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (authToken) {//22222------if auth token exists get data
      gettodos()
    }}
  , [])//---------------------the useeffect is to fetch from api EVERYTIME this component id rendered

  console.log(todos)//1111 -----------------to show the task on the console



  ////Sort tasks by date
  const sortedTasks = todos?.sort((a,b) => new Date(a.date) - new Date(b.date))// to sort the task by date and in new const
  
  const signOut = () => {
    console.log('signout')
    removeCookie('Email')
    removeCookie('AuthToken')
    window.location.reload()

  }

  return (
    <div className="mypage">
      <Link to = '/'>TODO APP</Link><button className="signout" onClick={signOut}>SIGN OUT</button>
      {!authToken && <Login/>}
      {authToken &&// saying if auth token is true show this below
        <>            
        <h1>My Page</h1>
        <div>
          {todos &&
            <Todohmpglist 
              todos={todos}
            />
          }
            
        </div>
      </>}
      {showModal && <Addnewtodo mode={'create'} setShowModal={setShowModal} getData={getData} />}
    </div>
  );
}
 
export default Mypage;