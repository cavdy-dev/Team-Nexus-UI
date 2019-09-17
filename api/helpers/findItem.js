import { User } from '../../config/models';

/**
 *
 *
 * @class FindItem
 */
class FindItem {
  /**
   * @description Fin
   * @static
   * @param {object} user
   * @memberof FindItem
   * @returns {object} response
   */
  static async findFromUser(user) {
    const response = await User.findOne({
      where: user
    });

    return response;
  }
}

export default FindItem;
