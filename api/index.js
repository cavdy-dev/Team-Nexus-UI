import http from 'http';

const port = 8800;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  const { url } = req;
  if (url === '/') {
    const welcomeMessage = {
      status: 200,
      data: 'Welcome to Team Nexus'
    };
    res.end(JSON.stringify(welcomeMessage));
  } else {
    res.statusCode = 404;
    const notFound = {
      status: 404,
      data: 'Route Not Found'
    };
    res.end(JSON.stringify(notFound));
  }
});

server.listen(port, () => {
  console.log('Server is running at ', port);
});

export default server;
