/* eslint-disable no-else-return */
import http from 'http';
import Helpers from '../config/helpers/helpers';
import {
  User
} from '../../config/models';
import bcrypt from 'bcrypt';

// import db from '../config/models/index';
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

import {
  port
} from '../config/config/config';
import authValidation from './validations/authValidation';
import authController from './controllers/authController';
import checkIfExist from './helpers/checkIfExist';

const {
  registerValidation
} = authValidation;
const {
  register
} = authController;
const {
  emailExist,
  usernameExist
} = checkIfExist;


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  const {
    url,
    method
  } = req;
  if (url === '/') {
    /* istanbul ignore next */
    const welcomeMessage = {
      status: 200,
      data: 'Welcome to Team Nexus'
    };
    res.end(JSON.stringify(welcomeMessage));
  } else if (url === '/login' && method === 'POST') {
    collectRequestData(req, result => {
      const {
        email,
        password
      } = result;
      if (!email || !password) {
        res.statusCode = 400;
        const message = {
          'data': 'some values are missing'
        }
        return res.end(JSON.stringify(message));
      }
      if (!Helpers.isValidEmail(email)) {
        res.statusCode = 400;
        const message = {
          'data': 'please enter a valid email'
        }
        return res.end(JSON.stringify(message));
      }
      
      //find a user from db with the email if found
     const response = User.findOne({
        where: {
          email: email  
        }
       })
       if(!response){
        const message = {
                data: 'invalid credentials'
              }
              return res.end(JSON.stringify(message))
       }else if(!bcrypt.compareSync(response.password,password)){
        const message = {
          data: 'invalid credentials'
        }
        return res.end(JSON.stringify(message))
       }else{
        const message = {
          data: 'login successfull'
        }
        return res.end(JSON.stringify(message))
       }
    })
  } else if (url === '/register' && method === 'POST') {
    res.setHeader('Content-Type', 'application/json');
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    /* istanbul ignore next */
    req.on('end', async () => {
      const result = registerValidation(body);
      const {
        errors,
        newData
      } = result;
      // Checks if error
      if (Object.keys(errors).length !== 0) {
        res.statusCode = 422;
        const errorRes = {
          status: 422,
          data: errors
        };
        return res.end(JSON.stringify(errorRes));
      }
      // Checks if email exist
      const emailError = await emailExist(newData);
      if (Object.keys(emailError).length !== 0) {
        res.statusCode = 409;
        const errorRes = {
          status: 409,
          data: emailError
        };
        return res.end(JSON.stringify(errorRes));
      }
      // checks if username exist
      const usernameError = await usernameExist(newData);
      if (Object.keys(usernameError).length !== 0) {
        res.statusCode = 409;
        const errorRes = {
          status: 409,
          data: usernameError
        };
        return res.end(JSON.stringify(errorRes));
      }

      // Return response
      const response = await register(newData);
      const rest = {
        status: 200,
        data: response
      };
      return res.end(JSON.stringify(rest));
    });
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