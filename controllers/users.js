const USERS = require('../models/users')
const {v4 : uuidv4} = require('uuid')
const {setUser} = require('../service/auth')

async function HandleUserSignUp (req, res) {
    const {name, email, password} = req.body;

    await USERS.create({
        name,
        email,
        password
    })

    return res.redirect('/')
}

async function HandleUserLogin (req, res) {
    const {email, password} = req.body;
    const user = await USERS.findOne({email , password})
    console.log(user);
    if(!user) return res.render('login', {
        error : "invalid Username/Password"
    })

    const token = setUser(user)

    res.cookie("token", token)
    return res.redirect('/')
}

module.exports  = {
    HandleUserSignUp,
    HandleUserLogin
}