/**
 * Created by ondrej on 4.5.17.
 */
let {User} = require('./../models/user');

/**
 * Autorizace uživatele
 * @param req
 * @param res
 * @param next
 */
let authenticate = (req, res, next) => {
    let token = req.cookies.token;

    User.findByToken(token).then((user) => {
        if(!user) {
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send();
    });
};

module.exports = {authenticate};