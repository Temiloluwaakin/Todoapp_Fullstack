const PORT = process.env.PORT ?? 5000
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')


//middleware
app.use(cors());
app.use(express.json());



//get all todos------------geting all todos from todos
app.get('/todos', async (req,res) => {
  try{
      const alltodos = await pool.query('SELECT * FROM todos')

      res.json(alltodos.rows);//we dont need [0] because we are returning all
  }catch (err) {
      console.error(err.message);
  }
});


// get all todos FOR MY PAGE
app.get('/todos/:userEmail', async (req, res) => {
  const { userEmail } = req.params//this is to get the useremail from the client and pass it here
  try {
    const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
    res.json(todos.rows)
  } catch (err) {
    console.error(err)
  }
})


//create a todos---------------creating a todos and posting to todoss
app.post('/todos', async (req,res) => {
  try{
      const { user_email } = req.body;
      const { title } = req.body;
      const { notes } = req.body;
      const { date } = req.body;
      const id = uuidv4()
      const newtodo = await pool.query(
          'INSERT INTO todos (todos_id, user_email, title, notes, date) VALUES($1, $2, $3, $4, $5) RETURNING *',
          [todos_id, user_email, title, notes, date]
      );//RETURNING usd when udt,retur or dlting to clear the jargons in postman along with the [0] innewcontact

      res.json(newtodo.rows[0]);
  }catch (err) {
      console.error(err.message);
  }
});



// signup
app.post('/signup', async (req, res) => {
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
  
    try {
      const signUp = await pool.query(`INSERT INTO todousers (email, hashed_password) VALUES($1, $2)`,
        [email, hashedPassword])
    
      const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })
      
      res.json({ email, token })
    } catch (err) {
      console.error(err)
      if (err) {
        res.json({ detail: err.detail})
      }
    }
  })




// login
app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
      const todousers = await pool.query('SELECT * FROM todousers WHERE email = $1', [email])
  
      if (!todousers.rows.length) return res.json({ detail: 'User does not exist!' })
      
      const success = await bcrypt.compare(password, todousers.rows[0].hashed_password)
      const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })
  
      if (success) {
        res.json({ 'email' : todousers.rows[0].email, token})
      } else {
        res.json({ detail: "Login failed"})
      }
    } catch (err) {
      console.error(err)
    }
})


app.listen(PORT, () => console.log(
    `server is running on PORT ${PORT}`
));