const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
        name:{
            type: String,
            required: true,
            trim : true
        },

        email:{
            type: String,
            unique: true,
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

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    console.log(user.email)
    console.log(email)

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch =  await bcrypt.compare("asdfghjkl" , user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }


    return user
}


userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('user', userSchema)

module.exports = User