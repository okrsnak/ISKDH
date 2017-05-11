/**
 * Created by ondrej on 9.5.17.
 */
'use strict';

let implementingClass = require('../classes/PaymentDAO');

class IPaymentDAO {

    /**
     * Přidání nové platby
     * @param UserId Id uživatele který platbu provedl
     * @param payment Data s platbou
     * @param callback
     */
    static addPayment(UserId, payment, callback) {}

    /**
     * Seznam Plateb
     * @param filter Filter pro vyhledávání plateb
     * @param callback
     */
    static getPayments(filter, callback) {}
}

module.exports = {
    addPayment: implementingClass.addPayment,
    getPayments: implementingClass.getPayments
};