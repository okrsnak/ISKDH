/**
 * Created by ondrej on 6.4.17.
 */
const mongoose = require('mongoose');

let gameSchema = new mongoose.Schema({
    id:             mongoose.Schema.Types.ObjectId,
    name:          String,
    year:      Number,
    numberOfPlayers : {
                    min: Number,
                    max: Number
    },
    description:          String,
    review:        [{
        rating: Number,
        description:      String,
        user:      mongoose.Schema.Types.ObjectId,
    }],
    copy:          [{
        price: Number,
        registrationNumber: Number,
        state:           {
            type: String,
            default: 'Volná'
        }}]
});

let Game = mongoose.model('Game', gameSchema);

module.exports = {
    Game
};