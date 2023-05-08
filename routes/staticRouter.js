const express = require('express')
const URL = require('../models/url');
const { restrictTo } = require('../middlewares/auth');

const router = express.Router();

router.get('/admin/urls' , restrictTo(["ADMIN"]), async (req,res) => {
    if(!req.user) return res.redirect('/login')
    const allurls = await URL.find({createdAt : req.user._id})
     return res.render("home", {
        urls : allurls
     })
});

router.get('/' , restrictTo(["ADMIN", "NORMAL"]), async (req,res) => {
    if(!req.user) return res.redirect('/login')
    const allurls = await URL.find({createdAt : req.user._id})
     return res.render("home", {
        urls : allurls
     })
})

router.get('/signup', (req, res) => {
    res.render("signup")
})

router.get('/login', (req,res) => {
    res.render('login')
})

module.exports = router



