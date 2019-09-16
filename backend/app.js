const express = require('express')
const app = express()
const port = 3001

// app.get('/', (req, res) => res.send('Hello World!'))
app.get("/", (req, res, next) => {
    res.json([
        {"name":"Tony","gender":"Male"},
        {"name":"Lisa","gender":"Female"},
        {"name":"Michael","gender":"Male"},
        {"name":"Ginger","gender":"Female"},
        {"name":"Grace","gender":"Female"}]
    );
   });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))