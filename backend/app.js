// content of index.js
require('dotenv').config()

const http = require('http')

const hostname = process.env.HOST;
const port = process.env.PORT;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(`{"message": "Hello World"}`);
});

process.env.NODE_ENV="development";

if(process.env.NODE_ENV === "production")
{
    server.listen(port, hostname, () => {
        console.log(`Production Server: running at http://${hostname}:${port}/`);
    });

}
else if(process.env.NODE_ENV === "development")
{
    server.listen(port, hostname, () => {
        console.log(`Production Server: running at http://${hostname}:${port}/`);
    });

}
