/**
 * Created by ondrej on 17.4.17.
 */
'use strict';

let mongoose = require('../../mongoose');
let {Loan} = require('../../models/loan');
let ICopyDAO = require('../interfaces/ICopyDAO');


class LoanDAO {

    static addLoan(loan, callback) {

        let SLoan = new Loan({
            id:         mongoose.Types.ObjectId(),
            copy:      loan.registrationNumber,
            user:       loan.id
        });

        SLoan.save().then(() => {
            ICopyDAO.setStateCopy(loan.evidencniCislo, 'Vypůjčena', () => {
                callback();
            });
        });
    }

    static modifyLoan(loan, callback) {
        //TODO
    }

    static getLoans(filter, callback) {
        Loan.find(filter).then((loans) => {
            callback(loans)
        });
    };
}

module.exports = LoanDAO;
