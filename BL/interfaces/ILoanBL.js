/**
 * Created by ondrej on 10.5.17.
 */
'use strict';

let implementingClass = require('../classes/LoanBL');

class ILoanBL {

    //TODO
    /**
     * Přidání nové výpůjčky
     * @param callback
     */
    static addLoan(callback) {}

    /**
     * Úprava stávající výpůjčky (prodloužení, vrácení)
     * @param callback
     */
    static modifyLoan(callback) {}

    /**
     * Seznam výpůjček
     * @param callback
     */
    static getLoans(callback) {}
}

module.exports = {
    addLoan: implementingClass.addLoan,
    modifyLoan: implementingClass.modifyLoan,
    getLoans: implementingClass.getLoans
};