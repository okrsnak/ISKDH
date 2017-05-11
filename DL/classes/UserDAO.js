/**
 * Created by ondrej on 3.5.17.
 */
'use strict';
let mongoose = require('../../mongoose');
let {User} = require('../../models/user');


class UserDAO {
    static addUser(user, callback) {
        let exists = 1;
        User.find({email: user.email}).then((users) => {
            if(users.length === 0) {
                exists = 0;
            }

            if(!exists) {
                let SUser = new User({
                    id:                         mongoose.Types.ObjectId(),
                    email:                      user.email,
                    password:                   user.password,
                    name:                       user.name,
                    surname:                    user.surname,
                    identificationNumber:       user.identificationNumber,
                    phoneNumber:                user.phoneNumber,
                });

                SUser.save().then(() => {
                    return SUser.generateAuthToken();
                }).then((token)=>{
                    callback(!exists, token);
                });
            } else {
                callback(!exists);
            }
        });
    }

    static modifyUser(user, callback) {
        User.findOneAndUpdate({identificationNumber: user.identificationNumber}, user).then((user) => {
            callback(user);
        });
    }

    static getUsers(filter, callback) {
        User.find(filter).then((users) => {
            callback(users)
        });
    };
}


module.exports = UserDAO;