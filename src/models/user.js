const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('user', {
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
})

module.exports = User