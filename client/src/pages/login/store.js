//import { Link } from 'react-router-dom';
import { useState, useHistory } from 'react'
//import { useCookies} from 'react-cookie'
import './logincss.css';

const Login = () => {

    const [email, setEmail] = useState(null)//44444444444444
    const [password, setPassword] = useState(null)//4444444444
    const [confirmPassword, setConfirmPassword] = useState(null)//4444444444
    const [error, setError] = useState(null)//222222
  



  return (
      <div className="login">
          <div className="auth-container-box">
              <form>
                  <input
                  type="email"
                  placeholder="email"//it is saying if islogin is true, bring out please login otherwise say please sign up
                  onChange={(e) => setEmail(e.target.value)}//
                  />

                  <input
                  type="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                  />

                  <input /*saying if isloging is false that means it is showing  signup and it will show comfirm pswd*/
                  type="password"
                  placeholder="confirm password"
                  onChange={(e) =>setConfirmPassword(e.target.value)}
                  />
                  
                  <input type="submit" className="create"/>
                  {error && //---comment----------if error does exist show the paragraph error
                  <p>{error}</p>
                  }
              </form>
              <div className="auth-options">
                  <button
                  style={{backgroundColor :'rgb(255, 255, 255)'}}
                  >Login</button>
              </div>
          </div>
      </div>
  );
}
 
export default Login;