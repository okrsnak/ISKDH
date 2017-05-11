/**
 * Created by ondrej on 17.4.17.
 */
'use strict';

let {Game} = require('../../models/game');


class CopyDAO {

    static addCopy(gameId, copy, callback) {
        let newCopy = {
            price: copy.price,
            registrationNumber: copy.registrationNumber
        };

        Game.findOneAndUpdate({id: gameId}, {$push: {copy: newCopy}}, (err, copy) => {
            callback(gameId);
        });
    }

    static setStateCopy(registrationNumber, state, callback) {
        Game.findOneAndUpdate({'copy.registrationNumber': registrationNumber}, {'$set': {'copy.$.state': state}}, (err, copy) => {
            callback();
        });
    }
}

module.exports = CopyDAO;