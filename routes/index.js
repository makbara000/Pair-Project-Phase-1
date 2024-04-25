const logMiddleware = require('../middlewares/log.middleware');

const router = require('express').Router();

//|-----AUTHENTICATION------|
//register
router.get('/register', (req, res) => {
  res.render('Register')
});
router.post('/register', (req, res) => {
  res.render('Register')
});

//login
router.get('/login', (req, res) => {
  res.render('Login')
});
router.post('/login', (req, res) => {
  res.render('Login')
});
//logout
router.get("/logout");
//-----------





//|-----MIDDLEWARE------|
router.use(logMiddleware)
//-----------




//|--user:-investor------|
router.get('/'); //user home, showStocklist
router.get('/cart');

router.get('/cart/increase/:id');
router.get('/cart/decrease/:id');
router.post('/cart/buy/:id');

router.get('/user/edit/profile/:id');
router.post('/user/edit/profile/:id');
router.get('/addToCart/:id');
//-----------




//|--user:-admin--------|
router.get('/admin');//adminPage
router.get('/admin/addStock');//getFormAddStock
router.post('/admin/addStock');//postFormAddStock
router.get("/admin/editStock/:id");//getEdit;
router.post("/admin/editStock/:id");//postEdit
router.get("/admin/deleteStock/:id");//destroyProduct;
//-----------

module.exports=router;