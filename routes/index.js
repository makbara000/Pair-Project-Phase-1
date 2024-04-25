const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('Login')
  });

router.get('/register', (req, res) => {
    res.render('register')
  });
router.post('/register', (req, res) => {
    res.render('Login')
  });

router.get('/login', (req, res) => {
    res.render('Login')
  });
router.post('/login', (req, res) => {
    res.render('Login')
  });

router.get('/users', (req, res) => {
    res.render('users')
  });


module.exports=router;