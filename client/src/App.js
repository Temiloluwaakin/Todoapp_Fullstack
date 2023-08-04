//import Login from "./pages/login/Login";
import {Route, Routes } from 'react-router-dom';
import Homepage from "./pages/homepage/Homepage";
import Mypage from './pages/mypage/Mypage';
//import { useCookies } from 'react-cookie';
//import Auth from './components/Auth'//2222---------


function App() {


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Homepage /> } />
        <Route path='/Mypage' element={ <Mypage /> } />
      </Routes>
    </div>
  );
}

export default App;
