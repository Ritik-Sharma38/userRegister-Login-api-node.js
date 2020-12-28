const router = require('express').Router()
const User = require('../model/User')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validation')
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res)=>{
     //validation
    const error = await registerValidation(req.body)
    if(error) return res.status(400).send({error: error.details[0].message})

     //check if user already exist
     const emailExist = await User.findOne({email: req.body.email})
     if(emailExist) return res.status(400).send({error: 'Email already exist'})

     //hash password
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(req.body.password, salt)

    //create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPass,
    })
    try{
        const savedUser = await user.save();
        res.send({user: savedUser._id})
    }catch(err){
        console.log("Error in registration"+err)
        res.status(400).send({error: err})
    }
})

router.post('/login', async (req, res)=>{
    //validation
    const error = await loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    //check if user already exist
    const emailExist = await User.findOne({email: req.body.email})
    if(!emailExist) return res.status(400).send({error: "Email doesn't exist"})

    //password is correct
    const validpass = await bcrypt.compare(req.body.password, emailExist.password)
    if(!validpass) return res.status(400).send({error: 'Invalid password'})

    //create and assign a token
    const token = jwt.sign({_id: emailExist._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send({token: token})

})

module.exports = router