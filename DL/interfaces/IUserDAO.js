/**
 * Created by ondrej on 9.5.17.
 */
'use strict';

let implementingClass = require('../classes/UserDAO');

class IUserDAO {

    /**
     * Vytvoření nového uživatele
     * @param user Data uživatele
     * @param callback
     */
    static addUser(user, callback) {}

    /**
     * Úprava stávajícího uživatele
     * @param user Sata uživatele
     * @param callback
     */
    static modifyUser(user, callback) {}

    /**
     * Seznam uživatelů
     * @param filter Filter pro vyhledání uživatele
     * @param callback
     */
    static getUsers(filter, callback) {}
}


module.exports = {
    addUser: implementingClass.addUser,
    modifyUser: implementingClass.modifyUser,
    getUsers: implementingClass.getUsers
};