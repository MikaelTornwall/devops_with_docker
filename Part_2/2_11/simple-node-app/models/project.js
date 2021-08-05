const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI

mongoose.connect(url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true
}).then(result => {
    console.log('connected to database')
}).catch(error => {
    console.log('error connecting to MongoDB', error.message)
})

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    startDate: Date,
    url: String,
    admins: Array,
    consultants: Array,
    client: String,
    users: Array
})

projectSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(),
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project

// const project = new Project({
//     title: 'Example',
//     description: 'Lorem ipsum and so on',
//     date: new Date(),
//     url: 'http://www.example.com',
//     admins: ['Tero Admin'],
//     consultants: ['Tero Consultant'],
//     client: 'Client Company Ltd.',
//     users: ['Tero Client', 'Maija Client']
// })

// project.save().then(res => {
//     console.log('New project created')
//     mongoose.connection.close()
// })
