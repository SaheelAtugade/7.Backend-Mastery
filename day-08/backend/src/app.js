//create a server
//cofiguration

const express = require('express')
const app = express()
const noteModel = require('./models/notes.model')
const cors = require('cors')
const path = require('path')

app.use(express.static('./public')) //make this folder content available on frontend 
app.use(express.json()) //to read req.body
app.use(cors()) //allow acccepting cross origin request

//create note
app.post('/api/notes', async(req, res)=>{
    const {title, desc}  = req.body

    const note = await noteModel.create({
        title,
        desc
    })

    res.status(201).json({
        message: "note created successfully...",
        note
    })
})

//fetch all notes
app.get('/api/notes', async(req, res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        message: "fetched all notes...",
        notes
    })
})

//delete by id 
app.delete('/api/notes/:id', async(req, res)=>{
    const {id} = req.params
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note deleted..."
    })
})

//update description by id 
app.patch('/api/notes/:id',async(req, res)=>{
    const {id} = req.params;
    const {title} = req.body;
    const {desc} = req.body;

    await noteModel.findByIdAndUpdate(id,{
        title,
        desc
    })

    res.status(200).json({
        message: "Note updated successfully..."
    })
})
console.log(__dirname);

//wildcard route = handle all other api's tha rae not created on backned and send the index file to show frontend
app.use('*name', (req, res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

module.exports = app