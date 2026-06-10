const bcrypt = require('bcryptjs')
const User = require('../models/User')
const generateToken = require('../utils/generateToken')

const register = async (req, res) => {
    const { name, email, password } = req.body

    const exists = await User.findOne({email})

    if(exists){
        return res.status(400).json({
            message: "User already exsists"
        })
    }

    const hashedPassword = bcrypt.hash(password, 15)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    res.status(201).json({
        token: generateToken(user._id)
    })

}

const login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(400).json({
            message: 'Invalid Credentials'
        })
    }

    res.json({
        token: generateToken(user._id)
    })
}

const me = async (req, res) => {
    res.json(req.user)
}


module.exports = {
    register, login, me
}