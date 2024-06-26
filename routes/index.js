const logMiddleware = require('../middlewares/log.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const Controller = require('../controllers/controller');
const UserController = require('../controllers/userController');
const adminMiddleware = require('../middlewares/admin.middleware');
const AdminController = require('../controllers/adminController');

const router = require('express').Router();
const session = require('express-session');


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
router.use(authMiddleware);
//logout
router.get("/logout", Controller.logOut);
//-----------


//|-----MIDDLEWARE------| //session


//-----------




//|--user:-investor------|
router.get('/', UserController.getUserHome); //user home, showStocklist
router.get('/cart', UserController.getCart);//show stock to be paid table (can adjust amount) and paid Stock

router.get('/addToCart/:id', UserController.addToCart);
router.get('/cart/increase/:id', UserController.increaseLotCart);
router.get('/cart/decrease/:id', UserController.decreaseLotCart);
router.get('/cart/buy/:id', UserController.payLotCart);

router.get('/user/detail/:id', UserController.getUserDetail);
//-----------

router.use(adminMiddleware)
//|--user:-admin--------|
router.get('/admin', AdminController.adminHome);//home adminPage
router.get('/admin/addStock', AdminController.getAddStockProduct);//getFormAddStock
router.post('/admin/addStock', AdminController.postAddStockProduct);//postFormAddStock

router.get("/admin/editStock/:id", AdminController.getEditStockProduct);//getEdit;
router.post("/admin/editStock/:id", AdminController.postAddStockProduct);//postEdit

router.get("/admin/deleteStock/:id", AdminController.deleteStockProduct);//destroyProduct;
//-----------

module.exports=router;