/**
 * Created by ondrej on 9.5.17.
 */
'use strict';

let implementingClass = require('../classes/LoanDAO');


class ILoanDAO {

    /**
     * Přidání nové výpůjčky
     * @param loan Data s výpůjčkou
     * @param callback
     */
    static addLoan(loan, callback) {}

    /**
     * Úprava existující výpůjčky
     * @param loan Data s výpůjčkou
     * @param callback
     */
    static modifyLoan(loan, callback) {}

    /**
     * Seznam výpůjček
     * @param filter Filter pro vyhledávání konkrétních výpůjček
     * @param callback
     */
    static getLoans(filter, callback) {}
}

module.exports = {
    addLoan: implementingClass.addLoan,
    modifyLoan: implementingClass.modifyLoan,
    getLoans: implementingClass.getLoans
};