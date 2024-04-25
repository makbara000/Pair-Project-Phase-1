const express = require('express')
const app = express()
const port = 3000
const session = require('express-session');

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'keyboard cat',
  cookie: {
    secure: false,
    sameSite: true, 
  },
}));
app.use(require('./routes'))



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})