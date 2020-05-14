const router = require('express').Router();

router.use((req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    } else {
        res.redirect('/')
    }
})

router.get('/', (req, res) => {
    res.render('chat', {login : req.user})
});

module.exports = router;