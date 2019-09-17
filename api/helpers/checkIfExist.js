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
}

export default FindItem;
