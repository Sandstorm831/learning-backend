const express = require("express");
const { createToDo, updateToDo, deleteToDo } = require("./type");
const {ToDo} = require("./db");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors())


app.get("/todos", async (req, res) => {
    const todos = await ToDo.find();
    res.json({
        todos: todos
    });
})

app.put("/completed", async (req, res) => {
    const createPayload = req.body;
    const parsePayload = updateToDo.safeParse(createPayload);
    if(!parsePayload.success){
        res.status(411).json({
            msg: "Wrong input format"
        })
    }
    await ToDo.updateOne({_id: req.body.id}, {completed: true});
    return res.json({
        msg: "Todo marked as completed",
    });

})


app.post("/todo", async (req, res) => {
    const createPayload = req.body;
    const lengCrit = req.headers["content-length"];
    const parsePayload = createToDo.safeParse(createPayload);
    if(!parsePayload.success){
        res.status(411).json({
            msg: "Wrong input format"
        })
    }
    const newToDo = await ToDo.create({
        title: req.body.title,
        description: req.body.description,
        completed: false
    })
    return res.json({
        msg: "ToDo has been created",
        id: `${newToDo._id}`,
        leng: lengCrit,
    });
})

app.delete("/delete", async (req, res)=> {
    const origPayload = req.body;
    const parsePayload = deleteToDo.safeParse(origPayload);
    if(!parsePayload.success) {
        return res.status(403).json({
            msg: "Wrong input format",
        })
    }
    await ToDo.deleteOne({_id: req.body.id});
    res.json({
        msg: "ToDo Deleted",
    })
})

const PORT = 3000;
app.listen(3000, () => {
    console.log(`App is listening at the port ${PORT}`);
})