const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const userSchema = new mongoose.Schema({
        name:{
            type: String,
            required: true,
            trim : true
        },
        email:{
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw Error('Email is invalid!')
                }
            }
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6,
            lowercase: true,
            validate(value){
                if(value.includes('password')){
                    throw Error('Password is invalid')
                }
            }
        },
        age: {
            type: Number,
            default: 0,
            validate(value){
                if(value < 0){
                    throw Error('Age is invalid!')
                }
            }
        }
    }
)

userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')){
        user.password = await bcryptjs.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('user', userSchema)

module.exports = User