const express = require('express')
const app = express()
const Project = require('./models/project')
require('dotenv').config()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Hello, Zorld!</h1>')
})


app.get('/api/projects', (req, res) => {
    Project.find({}).then(projects => {
        res.json(projects)
    })
})

app.get('/api/projects/:id', (req, res) => {
    Project.findById(req.params.id).then(project => {
        res.json(project)
    })
})

app.post('/api/projects', (req, res) => {        
    const body = req.body

    if (body.title === undefined) {
        return res.status(400).json({error: 'title missing'})
    }

    const project = new Project({
        title: body.title,
        description: body.description,
        startDate: new Date(),
        url: body.url,
        admins: body.admins,
        consultants: body.consultants,
        client: body.client,
        users: body.users
    })

    project.save().then(savedProject => {
        res.json(savedProject)
    })
})

app.put('/api/projects/modify/:id', (req, res, next) => {
    const body = req.body

    const project = {
        title: body.title,
        descrption: body. description,
        url: body.url
    }

    Project.findByIdAndUpdate(req.params.id, project, {new: true})
        .then(updatedProject => {
            res.json(updatedProject)
        }).catch(error => console.log(eror))
})

app.put('/api/projects/modify/users/:id', (req, res, next) => {
    const body = req.body

    Project.findByIdAndUpdate(
        req.params.id, 
        {$push: {'users': body.user}},
        {new: true})
        .then(updatedProject => {
            res.json(updatedProject)
        }).catch(error => console.log(eror))
})

app.delete('/api/projects/:id', (req, res, next) => {
    Project.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
    })
        .catch(error => {
            // next(error)
            console.log(error)
    })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})