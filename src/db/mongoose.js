const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1/taskmanager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

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
        lowercase: true,
        validate(value){
            if(value.length < 6 || value.includes('password')){
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

// const me = new User({
//      name: '  Chetan   ',
//      email: '  chetan@gmail.com',
//      password: ' 123456'
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })

const Task = mongoose.model('tasks', {
    description:{
        type: String,
        required:true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const myTask = new Task({
     description: '    Start coding' , 
})

myTask.save().then(()=>{
    console.log(myTask)
}).catch((error)=>{
    console.log(error)
})