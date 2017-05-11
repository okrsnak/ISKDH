/**
 * Created by ondrej on 6.4.17.
 */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

let userSchema = new mongoose.Schema({
    id:        mongoose.Schema.Types.ObjectId,
    password:  String,
    name:      String,
    surname:   String,
    active:    {
        type: Boolean,
        default: true,
    },
    identificationNumber: String,
    email:      String,
    phoneNumber:    String,
    payment:     [{
        id:     mongoose.Schema.Types.ObjectId,
        amount: Number,
        date:  Date,
        description:   String
    }],
    role:       {
        type:   String,
        default: 'Člen',
    },
    tokens: [{
        access: String,
        token: String
    }]
});


userSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({id: user.id.toHexString(), access}, 'secretCode').toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
};

userSchema.methods.removeToken = function (token) {
    let user = this;
    return user.update({
        $pull: {
            tokens: {
                token: token
            }
        }
    })
};

userSchema.statics.findByToken = function (token) {
    let User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, 'secretCode');
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        'id': decoded.id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

userSchema.statics.findByCredentials = function (email, password) {
    let User = this;

    return User.findOne({
        email
    }).then((user) => {
        if(!user) {
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if(res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
};

userSchema.pre('save', function(next) {
    let user = this;
    if(user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        });
    } else {
        next();
    }
});


let User = mongoose.model('User', userSchema);

module.exports = {User};