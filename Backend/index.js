const express = require('express');
const { createTodo, updateTodo } = require("./typeValidation");
const { todo } = require("./db");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const ObjectId = require('mongoose').Types.ObjectId; // Import ObjectId from mongoose

app.post('/todo', async (req, res) => {
    const todoProvided = req.body;
    const parsedTodo = createTodo.safeParse(todoProvided);

    if (!parsedTodo.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs"
        });
        return;
    }

    const newTodo = await todo.create({
        title: todoProvided.title,
        description: todoProvided.description,
        completed: false
    });

    res.json({
        msg: "todo created"
    });
});

app.get('/todos', async (req, res) => {
    const todos = await todo.find({});

    res.json({
        todos
    })
})

app.put('/completed', async (req, res) => {
    const todoProvided = req.body;
    const parsedTodo = updateTodo.safeParse(todoProvided);

    if(!parsedTodo.success){
        res.status(411).json({
            msg: "You sent the wrong inputs"
        })
        return;
    }

    await todo.updateOne({
        _id: req.body.id
    }, {
      completed: true  
    })

    res.json({
        msg: "Todo marked as completed"
    })
})

app.listen(3000);