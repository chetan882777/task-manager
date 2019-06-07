const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/taskmanager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

// const User = mongoose.model('user', {
//     name:{
//         type: String
//     },
//     age: {
//         type: Number
//     }
// })

// const me = new User({
//      name: 'Chetan' , 
//      age: 20
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })

const Task = mongoose.model('tasks', {
    description:{
        type: String
    },
    completed: {
        type: Boolean
    }
})

const myTask = new Task({
     description: 'Start coding' , 
     completed: false
})

myTask.save().then(()=>{
    console.log(myTask)
}).catch((error)=>{
    console.log(error)
})