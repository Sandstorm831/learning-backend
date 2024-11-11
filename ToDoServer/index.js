const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

function uid(){
    return Date.now().toString(36) + Math.random().toString(36).substring(2,12).padStart(12,0);
}

todos = [
    {
        id: "m2mzyi4200p2kiyzobnt",
        content:{
            title: "First todo",
            completed: false,
            description: "Do the first thing, that is, get up you idiot!"
        }
    }
]

app.get('/todos', (req, res) => {
    res.json(todos);
})

app.get('/todos/:id', (req, res) => {
    const itemId = req.params.id;
    let found = false;
    for(let i=0; i<todos.length; i++){
        if(todos[i].id == itemId){
            res.json(todos[i]);
            found = true;
            break;
        }
    }
    if(!found){
        res.status(404).json({
            msg: "Task not found"
        })
    }
})


app.post('/todos', (req, res) => {
    const uuid = uid();
    const obj = {
        id: uuid,
        content: {
            title: req.body.title,
            completed: req.body.completed,
            description: req.body.description
        }
    }
    todos.push(obj);
    res.status(201).json({
        id: uuid
    })
})


app.put('/todos/:id', (req, res) => {
    const itemId =  req.params.id;
    let isFound = false;
    for(let i=0; i<todos.length; i++){
        if (itemId == todos[i].id){
            const keys = Object.keys(req.body);
            for(let j=0; j<keys.length; j++){
                todos[i].content[keys[j]] = req.body[keys[j]];
            }
            isFound = true;
            res.status(200).json({
                msg: "Task updated"
            })
            break;
        }
    }
    if(!isFound){
        res.status(404).json({
            msg: "Todo item id not found"
        })
    }
})

app.delete('/todos/:id', (req, res)=> {
    const itemId = req.params.id;
    let isDeleted = false;
    for(let i=0; i<todos.length; i++){
        if(todos[i].id == itemId){
            isDeleted = true;
            todos.splice(i,1);
            res.status(200).json({
                msg: "todo item is delted"
            })
            break;
        }
    }
    if(!isDeleted){
        res.status(404).json({
            msg: "todo item is not found"
        })
    }
})

app.use((req, res, next) => {
    res.status(404).json({
        message: "Route not found"
    })
})

app.listen(3000, () => {
    console.log("App is running on port 3000");
})

module.exports = app;