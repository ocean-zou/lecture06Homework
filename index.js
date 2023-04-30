const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const tasks = [{ id: 1, description: 'task 1', done: false }]
let id = 1

app.get('/tasks', (req, res) => {
    res.json(tasks)
})
app.get('/tasks', (req, res) => {
    const description = req.query.description;
    const filteredTasks = tasks.filter(task => task.description.includes(description));
    res.json(filteredTasks);
});
app.get('/tasks/:id', (req, res) => {
    const id = req.params.id
    const task = tasks.find(task => task.id === id)
    if (!task) {
        return res.status(404).json({ error: 'Task not found' })
    }
    res.json(task)
})
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find((task) =>
        task.id === req.params.id
    )
    if (!task) {
        return res.status(404).json({ error: 'Task not found' })
    }
    task.description=req.body.description || task.description
    task.done = req.body.done === undefined ? task.done : req.body.done
   res.json(task)
})
app.post('/tasks', (req, res) => {
    id++
    const description = req.body.description
    const done = req.body.done
    const task = {id, description, done}
    tasks.push(task)
    res.status(201).json({ message: 'Task added', task })
})
app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id
    const index = tasks.findIndex((task) => {
        task.id === id
    })
    tasks.splice(index, 1)
    res.status(200).json('delete success')
})

app.listen(3000, () => {
    console.log('server listening on port 3000')
})