import { useState } from 'react'
import { useCookies } from 'react-cookie'

const Addnewtodo = ({ mode, setShowModal, getData, todo }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const editMode = mode === 'edit' ? true : false

  const [data, setData] = useState({
    user_email: editMode ? todo.user_email : cookies.Email,
    title: editMode ? todo.title : null,
    notes: editMode ? todo.notes: null,
    date: editMode ? todo.date : new Date()
  })

  const postData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:5000/todos`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        console.log('WORKED')
        setShowModal(false)
        getData()
      }

    } catch(err) {
      console.error(err)
    }
  }


  const editData = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:5000/todos/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        setShowModal(false)
        getData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  

  const handleChange = (e) => {
    const { name, value } = e.target
    
    setData(data => ({
      ...data,
      [name] : value
    }))

    console.log(data)

  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your todo</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form>
          <input
            required
            maxLength={30}
            placeholder=" Your todo goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <input className={mode} type="submit" onClick={editMode ? editData: postData} />
        </form>

      </div>
    </div>
  )
}

export default Addnewtodo;