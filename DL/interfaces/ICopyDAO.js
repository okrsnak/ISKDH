/**
 * Created by ondrej on 9.5.17.
 */
'use strict';

let implementingClass = require('../classes/CopyDAO');

class ICopyDAO {

    /**
     * Přidání nové kopie ke hře
     * @param gameId ID hry
     * @param copy Data kopie
     * @param callback
     */
    static addCopy(gameId, copy, callback) {}

    /**
     * Změna stavu ve kterém se kopie nachází (Volná, vypůjčena)
     * @param registrationNumber Evidenční číslo kopie
     * @param state Změna na tento stav
     * @param callback
     */
    static setStateCopy(registrationNumber, state, callback) {}
}

module.exports = {
    addCopy: implementingClass.addCopy,
    setStateCopy: implementingClass.setStateCopy,
};