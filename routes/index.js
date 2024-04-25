const logMiddleware = require('../middlewares/log.middleware');

const router = require('express').Router();


router.get('/', (req, res) => {
  res.render('Home')
});

router.get('/register', (req, res) => {
  res.render('Register')
});
router.post('/register', (req, res) => {
  res.render('Register')
});

router.get('/login', (req, res) => {
  res.render('Login')
});
router.post('/login', (req, res) => {
  res.render('Login')
});
router.use(logMiddleware)

router.get('/users', (req, res) => {
    res.render('users')
  });


module.exports=router;