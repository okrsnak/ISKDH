/**
 * Created by ondrej on 17.4.17.
 */
'use strict';
let mongoose = require('../../mongoose');
let {Game} = require('../../models/game');


class GameDAO {

    static addGame(game, callback) {
        let exists = 1;
        Game.find({name: game.name, year: game.year}).then((games) => {
            if(games.length === 0) {
                exists = 0;
            }

            if(!exists) {
                let SGame = new Game({
                    id:         mongoose.Types.ObjectId(),
                    name:      game.name,
                    year:  game.year,
                    numberOfPlayers: {
                        min:    game.numberOfPlayers.min,
                        max:    game.numberOfPlayers.max
                    },
                    description:      game.description,
                });

                SGame.save().then(() => {
                    callback(!exists);
                });
            } else {
                callback(!exists);
            }
        });
    }

    static modifyGame(game, callback) {
        Game.findOneAndUpdate({name: game.name, year: game.year}, game).then((game) => {
           callback(game);
        });
    }

    static getGames(filter,callback) {
        Game.find(filter).then((games) => {
            callback(games)
        });
    };
}

module.exports = GameDAO;