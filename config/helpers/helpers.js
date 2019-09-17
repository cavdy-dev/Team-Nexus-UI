import bcrypt from 'bcrypt';

const Helper = {
  /**
   *hash password method
   *@params {string} password  
   *@returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  /**
   * compare password
   * @params {string} hashPassword
   * @params {string} password
   * @returns {Boolean} true or false 
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  /**
   * isValidEmail Helper method
   * @param {string} email
   * @retuns {Boolean} true or false
   */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
}

export default Helper;