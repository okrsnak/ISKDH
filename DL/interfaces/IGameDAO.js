/**
 * Created by ondrej on 17.4.17.
 */
'use strict';

let implementingClass = require('../classes/GameDAO');

class IGameDAO {

    /**
     * Přidání nové hry
     * @param game Data se hrou
     * @param callback
     */
    static addGame(game, callback) {};

    /**
     * Změna údajů u stávající hry
     * @param game Data se hrou
     * @param callback
     */
    static modifyGame(game, callback) {};

    /**
     * Seznam her
     * @param filter Filter pro vyhledávání
     * @param callback
     */
    static getGames(filter,callback) {};
}

module.exports = {
    addGame: implementingClass.addGame,
    modifyGame: implementingClass.modifyGame,
    getGames: implementingClass.getGames
};