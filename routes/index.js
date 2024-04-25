const logMiddleware = require('../middlewares/log.middleware');

const router = require('express').Router();


router.use(logMiddleware)
router.get('/', (req, res) => {
    res.render('Login')
  });


module.exports=router;