import bcrypt from 'bcryptjs';
import { User } from '../../config/models';

/**
 * @class AuthController
 */
class AuthController {
  /**
   * @description Auth register services
   * @static
   * @param {object} data
   * @memberof AuthController
   * @returns {object} user
   */
  static async register(data) {
    try {
      const { name, username, email, password } = data;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      await User.create({
        name,
        username,
        email,
        password: hash
      });

      return 'successfully signed up';
    } catch (error) {
      return 'something went wrong!';
    }
  }
}

export default AuthController;
