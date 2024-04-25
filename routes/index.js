const logMiddleware = require('../middlewares/log.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const Controller = require('../controllers/controller');
const UserController = require('../controllers/userController');
const router = require('express').Router();
// const session = require('express-session');


router.use(logMiddleware)
// router.use(session({
//     resave: false, // don't save session if unmodified
//     saveUninitialized: true, // don't create session until something stored
//     secret: 'keyboard cat'
//   }));

//|-----AUTHENTICATION------|
//register
router.get('/register', Controller.getRegisterForm);
router.post('/register', Controller.postRegisterForm);

// login
router.get('/login', Controller.getLoginForm);
router.post('/login', Controller.postLoginForm);
// router.use(authMiddleware)
router.use(authMiddleware)
//logout
router.get("/logout");
//-----------


//|-----MIDDLEWARE------| //session


//-----------




//|--user:-investor------|
router.get('/', UserController.getUserHome); //user home, showStocklist
router.get('/cart');//show stock to be paid table (can adjust amount) and paid Stock

router.get('/addToCart/:id');
router.get('/cart/increase/:id');
router.get('/cart/decrease/:id');
router.post('/cart/buy/:id');

router.get('/user/edit/profile/:id');
router.post('/user/edit/profile/:id');
//-----------


//|--user:-admin--------|
router.get('/admin');//home adminPage
router.get('/admin/addStock');//getFormAddStock
router.post('/admin/addStock');//postFormAddStock
router.get("/admin/editStock/:id");//getEdit;
router.post("/admin/editStock/:id");//postEdit
router.get("/admin/deleteStock/:id");//destroyProduct;
//-----------

module.exports=router;