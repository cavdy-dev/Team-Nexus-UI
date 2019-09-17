import http from 'http';
import {
  port
} from '../config/config/config';
import db from '../config/models/index';


/**
 * Middleware body parser
 */
const collectRequestData = (request, callback) => {
  const FORM_RAW = 'application/json';
  if (request.headers['content-type'] === FORM_RAW) {
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', () => {
      callback(JSON.parse(body));
    });
  } else {
    callback(null);
  }
}
/***
 * SQL connection
 */
/**
 * Email checker
 * @params {string} email
 * @returns {Boolean} true or false
 */
const isvalidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  const {
    url,
    method
  } = req;
  if (url === '/' && method === 'GET') {
    const welcomeMessage = {
      status: 200,
      data: 'Welcome to Team Nexus'
    };
    res.end(JSON.stringify(welcomeMessage));
  } else if (url === '/register' && method === 'POST') {
    collectRequestData(req, result => {
      const {
        firstname,
        lastname,
        email,
        password
      } = result;
      if (!firstname || !lastname || !email || !password) {
        res.statusCode = 400;
        const message = {
          'data': 'some values are missing',
        }
        return res.end(JSON.stringify(message));
      }
      if (password.length < 5) {
        res.statusCode = 400;
        const message = {
          'data': 'password must be greater than 5'
        }
        return res.end(JSON.stringify(message));
      }
      if (!isvalidEmail(email)) {
        res.statusCode = 400;
        const message = {
          'data': 'please enter a valid email'
        }
        return res.end(JSON.stringify(message));
      }
      /**
       * Suppose to insert into db and return user.     
       */
      const userObject = {
        firstname,
        lastname,
        email
      }
      return res.end(JSON.stringify(userObject));
    });
  } else if (url === '/login' && method === 'POST') {
    collectRequestData(req, result => {
      const {
        email,
        password
      } = result;
      if(!email || !password){
        res.statusCode = 400;
        const message ={
          'data':'some values are missing'
        }
        return res.end(JSON.stringify(message));
      }
      if(!isvalidEmail(email)){
        res.statusCode = 400;
        const message ={
        'data':'please enter a valid email'
        }
        return res.end(JSON.stringify(message));
      }
    //find a user from db with the email if found 

    })
  } else if (url === '/register' && method === 'GET') {
    const message = {
      status: 200,
      data: '/register Get endpoint reached'
    }
    res.end(JSON.stringify(message));
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