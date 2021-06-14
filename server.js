const express = require("express");

const app = express();

const jsonParser = express.json();

const todoList = [{value: "Сходить потусить", isDone: false, id: 0}]
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
    next();
});

app.post("/all", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);

    todoList.push(request.body)

    response.json(todoList);
});

app.get('/', (request, response) => {
    response.send(todoList);
})

app.listen(3000);
