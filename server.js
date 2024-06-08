const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 5000;

let tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const task = { ...req.body, completed: false, id: tasks.length + 1 };
    tasks.push(task);
    res.json(task);
});

app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    res.json(task);
});

app.put('/tasks/:id', (req, res) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    tasks[index] = req.body;
    res.json(tasks[index]);
});

app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    res.json({ message: 'Task deleted' });
});

app.get('/tasks', (req, res) => {
    const searchTerm = req.query.search;
    if (searchTerm) {
        res.json(tasks.filter(task => task.title.includes(searchTerm)));
    } else {
        res.json(tasks);
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});