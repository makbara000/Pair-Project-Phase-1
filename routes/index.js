const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('Login')
  });


module.exports=router;