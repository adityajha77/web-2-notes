const express = require('express');
const app = express();

app.use(express.json()); // TODO 1: Body parser

// TODO 1: Manual CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// TODO 2: GET
app.get('/messages', (req, res) => {
    res.json(messages);
});

// TODO 3: POST
app.post('/messages', (req, res) => {
    const { user, text } = req.body;
    messages.push({ id: Date.now(), user, text });
    res.json({ status: "success" });
});

app.listen(3000);