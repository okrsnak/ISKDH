/**
 * Created by ondrej on 1.5.17.
 */

let {User} = require('../../models/user');


//TODO

class PaymentDAO {

    static addPayment(UserId, payment, callback) {

        let newPayement = {
            amount: payment.amount,
            payment: payment.date,
            description: payment.description
        };

        User.findOneAndUpdate({id: UserId}, {$push: {payment: newPayement}}, (err, payment) => {
            callback(payment);
        });
    }

    static getPayments(filter, callback) {
        User.find(filter).then((users) => {
            callback(users)
        });
    };
}

module.exports = PaymentDAO;