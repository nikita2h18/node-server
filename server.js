const express = require("express");
const app = express();
const jsonParser = express.json();
let todoList = [{value: "Сходить потусить", isDone: false, id: 0}]

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
    next();
});

app.post("/all", jsonParser, (request, response) => {
    if(!request.body) return response.sendStatus(400);

    todoList.push(request.body)

    response.json(todoList);
});

app.put("/switch", jsonParser, (request, response) => {
    todoList.forEach(t => {
        if (t.id === request.body.id) {
            t.isDone = !t.isDone
        }
    });

    response.json(todoList);
});

app.post("/delete", jsonParser, (request, response) => {
    todoList = todoList.filter(t => t.id !== request.body.id);
    response.json(todoList);
})

app.get('/', (request, response) => {
    response.send(todoList);
})

app.listen(3000);
