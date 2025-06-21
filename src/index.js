const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('../model/user')
const bcrypt = require('bcryptjs')
const { error } = require('console')
const jwt = require('jsonwebtoken')
const jwt_SECRET = 'ghjkdghjk2g#$%kjhk5fjjhhgcjh7&&HGJHGuy73&'
const port = 3000;

mongoose.connect('mongodb://localhost:27017/QuickQuiz-login', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const app = express()

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/index.html'));
});

app.use('/', express.static(path.join(__dirname, '../public')))
app.use('/', express.static(path.join(__dirname, '../static')))
app.use(bodyParser.json())

app.post('/api/login', async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			jwt_SECRET
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})

app.post('/api/register', async (req, res) => {
  const { username, password: plainTextPassword } = req.body

  if(!username || typeof username !== 'string'){
    return res.json({ status: 'error', error: 'Invalid Username' })
  }
 
  if(!plainTextPassword || typeof plainTextPassword !== 'string'){
    return res.json({ status: 'error', error: 'Invalid password' })
  }

  if(plainTextPassword.length < 5 ) {
    return res.json({ 
      status: 'error', 
      error: 'Password too small. It Should be atleast 6 characters'
    })
  }

  const password = await bcrypt.hash(plainTextPassword, 10)

  try{
    const response = await User.create({
      username,
      password
    })
    console.log('User created Successgullly:', response)
  }catch (error){
    if (error.code === 11000){
      //duplicate key
      return res.json({ status: 'error', data: '', error: 'Username already is use'})
    }
    throw error
  }

  res.json({ status: 'ok' })
})

 
// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
