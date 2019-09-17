import validator from 'validator';
import spaceTrimer from './spaceTrimer';

/**
 * @description Auth Validation
 * @class authValidation
 */
class authValidation {
  /**
   * @description Signup Validation
   * @static
   * @param {object} data
   * @returns {object} validation
   * @memberof authValidation
   */
  static registerValidation(data) {
    let {
      name, username, email, password
    } = JSON.parse(data);
    const errors = {};

    name = spaceTrimer(name).toLowerCase();
    username = spaceTrimer(username).toLowerCase();
    email = spaceTrimer(email).toLowerCase();
    password = spaceTrimer(password);

    if (!validator.isAlpha(name)) {
      errors.name = 'Name should be alphabet';
    }
    if (!validator.isLength(name, { min: 5, max: 15 })) {
      errors.name = 'Name should be between 5 and 15 characters';
    }

    if (!validator.isAlphanumeric(username)) {
      errors.username = 'Username can only contain alphabet and numbers';
    }
    if (!validator.isLength(username, { min: 3, max: 15 })) {
      errors.username = 'Username should be between 3 and 15 characters';
    }

    if (!validator.isEmail(email)) {
      errors.email = 'Please put in a valid email';
    }

    if (!validator.isLength(password, { min: 7 })) {
      errors.password = 'Password should be at least 7 characters long';
    }

    const newData = { name, username, email, password };
    return {
      errors,
      newData
    };
  }
}

export default authValidation;
