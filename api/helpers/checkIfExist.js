import bcrypt from 'bcrypt';
import findItem from './findItem';

const { findFromUser } = findItem;

/**
 * @class FindItem
 */
class FindItem {
  /**
   * @description Check if email exists
   * @static
   * @param {object} data
   * @memberof FindItem
   * @returns {object} response
   */
  static async emailExist(data) {
    const { email } = data;
    const emailExist = await findFromUser({ email });

    const errors = {};
    if (emailExist) {
      errors.email = 'Email already exist';
    }
    return errors;
  }

  /**
   * @description Check if email exists
   * @static
   * @param {object} data
   * @memberof FindItem
   * @returns {object} response
   */
  static async emailDontExist(data) {
    const { email } = data;
    const emailExist = await findFromUser({ email });

    const errors = {};
    if (!emailExist) {
      errors.email = 'Email does not exist';
    }
    return errors;
  }

  /**
   * @description Check if username exists
   * @static
   * @param {object} data
   * @memberof FindItem
   * @returns {object} response
   */
  static async usernameExist(data) {
    const { username } = data;
    const usernameExist = await findFromUser({ username });

    const errors = {};
    if (usernameExist) {
      errors.username = 'Username not available';
    }
    return errors;
  }

  /**
   * @description Check for password
   * @static
   * @param {object} data
   * @memberof FindItem
   * @returns {object} response
   */
  static async comparePassword(data) {
    const { email, password } = data;
    const userData = await findFromUser({ email });
    const validPassword = bcrypt.compareSync(password, userData.password);

    const errors = {};
    if (!validPassword) {
      errors.password = 'incorrect password';
    }
    return errors;
  }
}

export default FindItem;
