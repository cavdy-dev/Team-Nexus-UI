/* eslint-disable no-else-return */
import http from 'http';
import { port } from '../config/config/config';
import authValidation from './validations/authValidation';
import authController from './controllers/authController';
import checkIfExist from './helpers/checkIfExist';

const { registerValidation, loginValidation } = authValidation;
const { register } = authController;
const {
  emailExist, usernameExist, emailDontExist, comparePassword
} = checkIfExist;


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  const { url, method } = req;
  if (url === '/') {
    /* istanbul ignore next */
    const welcomeMessage = {
      status: 200,
      data: 'Welcome to Team Nexus'
    };
    /* istanbul ignore next */
    res.end(JSON.stringify(welcomeMessage));
  } else if (url === '/login' && method === 'POST') {
    res.setHeader('Content-Type', 'application/json');
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    /* istanbul ignore next */
    req.on('end', async () => {
      const result = loginValidation(body);
      const { errors, newData } = result;
      // Checks if error
      if (Object.keys(errors).length !== 0) {
        res.statusCode = 422;
        const errorRes = { status: 422, data: errors };
        return res.end(JSON.stringify(errorRes));
      }
      // Checks if email exist
      const emailError = await emailDontExist(newData);
      if (Object.keys(emailError).length !== 0) {
        res.statusCode = 404;
        const errorRes = { status: 404, data: emailError };
        return res.end(JSON.stringify(errorRes));
      }
      // checks if password
      const checkPassword = await comparePassword(newData);
      if (Object.keys(checkPassword).length !== 0) {
        res.statusCode = 400;
        const errorRes = { status: 400, data: checkPassword };
        return res.end(JSON.stringify(errorRes));
      }

      // Return response
      const rest = { status: 200, data: 'successfully logged in' };
      return res.end(JSON.stringify(rest));
    });
  } else if (url === '/register' && method === 'POST') {
    res.setHeader('Content-Type', 'application/json');
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    /* istanbul ignore next */
    req.on('end', async () => {
      const result = registerValidation(body);
      const { errors, newData } = result;
      // Checks if error
      if (Object.keys(errors).length !== 0) {
        res.statusCode = 422;
        const errorRes = { status: 422, data: errors };
        return res.end(JSON.stringify(errorRes));
      }
      // Checks if email exist
      const emailError = await emailExist(newData);
      if (Object.keys(emailError).length !== 0) {
        res.statusCode = 409;
        const errorRes = { status: 409, data: emailError };
        return res.end(JSON.stringify(errorRes));
      }
      // checks if username exist
      const usernameError = await usernameExist(newData);
      if (Object.keys(usernameError).length !== 0) {
        res.statusCode = 409;
        const errorRes = { status: 409, data: usernameError };
        return res.end(JSON.stringify(errorRes));
      }

      // Return response
      const response = await register(newData);
      const rest = { status: 200, data: response };
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
