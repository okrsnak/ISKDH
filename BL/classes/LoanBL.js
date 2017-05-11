/**
 * Created by ondrej on 10.5.17.
 */
'use strict';

let ILoanDAO = require('../../DL/interfaces/ILoanDAO');
let fine = 0;
const FINE_PER_DAY = 10;
let numberOfDays = 0;

class LoanBL {

    static addLoan(loan, callback) {
        ILoanDAO.addLoan(loan, () => {
            callback();
        })
    }

    static modifyLoan(callback) {
        //TODO
    }

    static getLoans(filter, callback) {
        ILoanDAO.getLoans(filter, (loan)=> {
            callback(loan);
        })
    }

    static countLoan() {
        //TODO
    }
}

module.exports = LoanBL;