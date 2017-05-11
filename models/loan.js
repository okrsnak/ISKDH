/**
 * Created by ondrej on 6.4.17.
 */
const mongoose = require('mongoose');

let loanSchema = new mongoose.Schema({
    id:                 mongoose.Schema.Types.ObjectId,
    dateFrom:     {
        type: Date,
        default: Date.now()
    },
    dateTo:       {
        type: Date,
        default: null
    },
    user:               mongoose.Schema.Types.ObjectId,
    copy:              Number
});

let Loan = mongoose.model('Loan', loanSchema);

module.exports = {Loan};