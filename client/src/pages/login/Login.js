import { useState } from 'react'
import { useCookies} from 'react-cookie'
import './logincss.css'

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)//555555
  const [isLogIn, setIsLogin] = useState(true)//11111=
  const [email, setEmail] = useState(null)//44444444444444
  const [password, setPassword] = useState(null)//4444444444
  const [confirmPassword, setConfirmPassword] = useState(null)//4444444444
  const [error, setError] = useState(null)//222222

  const viewLogin = (status) => {//33333----it is for the button part idont understand yet
    setError(null)
    setIsLogin(status)
  }

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault()
    if (!isLogIn && password !== confirmPassword) {//44 if we are on the signup page and pass is not same as as compss
      setError('Make sure passwords match!')//show error
      return
    }
    
    const response = await fetch(`http://localhost:5000/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email, password})
    })

    const data = await response.json()

    if (data.detail) {
      setError(data.detail)
    } else {
      setCookie('Email', data.email)//555555 install react cookie in the client side npm i react-cookie dotenv
      setCookie('AuthToken', data.token)

      window.location.reload()
    }

  }


  return (
    <div className="auth-container">
      <div className="login">
        <form>
          <h2>{isLogIn  ? 'Please log in' : 'Please sign up!'}</h2>
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
          {!isLogIn && <input// saying if isloging is false that means it is showing  signup and it will show comfirm pswd
            type="password"
            placeholder="confirm password"
            onChange={(e) =>setConfirmPassword(e.target.value)}
          />}
          <input type="submit" className="create" onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')} />
          {error && //---comment----------if error does exist show the paragraph error
            <p>{error}</p>
          }
        </form>
        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{backgroundColor : !isLogIn ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)'}}
          >Sign Up</button>
          <button
            onClick={() => viewLogin(true)}
            style={{backgroundColor : isLogIn ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)'}}
          >Login</button>
        </div>

      </div>
    </div>
  )
}

export default Auth
