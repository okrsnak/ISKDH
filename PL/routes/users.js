/**
 * Created by ondrej on 3.5.17.
 */

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const _ = require('lodash');
let router = express.Router();
let {authenticate} = require('../../middleware/authenticate');


let IUserDAO = require('../../DL/interfaces/IUserDAO');
let ILoanBL = require('../../BL/interfaces/ILoanBL');
let {User} = require('../../models/user');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cookieParser());


let parseUser = (req) => {
    return {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        identificationNumber: req.body.identificationNumber,
        phoneNumber: req.body.phoneNumber,
    };
};


router.get('/', (req, res) => {
    IUserDAO.getUsers(null, (users) => {
        res.render('users.hbs', {users});
    });
});

router.get('/register', (req, res) => {
    res.render('registrationForm.hbs');
});

router.post('/register', (req, res) => {
    let user = parseUser(req);

    IUserDAO.addUser(user, (ok, token) => {
        if(ok) {
            res.cookie('token', token).render('registrationForm.hbs', {send: true, exist: false});
        } else {
            res.render('registrationForm.hbs', {send: true, exist: true});
        }
    });
});

router.get('/login', (req, res) => {
    res.render('loginForm.hbs');
});

router.post('/login', (req, res) => {
    let user = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(user.email, user.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.cookie('token', token);
            res.redirect(`/users`);
        });
    }).catch((e) => {
        res.status(400).send();
    })
});

router.get('/logout', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        //TODO
        res.clearCookie('token');
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
});

//TODO
// router.get('/:id/new', (req, res) => {
//     res.render('addPaymentForm.hbs');
// });

router.get('/:id', (req, res) => {
    let id = {
        id: req.params.id
    };
    IUserDAO.getUsers(id, (users) => {
        let user = users[0];
        ILoanBL.getLoans({user: id.id}, (loans) => {
            console.log(loans);
            res.render('userDetail.hbs', {user, loans});
        })
    });
});

router.get('/:id/new', (req, res) => {
    let id = {
        id: req.params.id
    };
    res.render('loanNewForm.hbs', id)
});

router.post('/:id/new', (req, res) => {
    let id = req.params.id;
    let registrationNumber = req.body.registrationNumber;
    ILoanBL.addLoan({id, registrationNumber}, () => {
        res.redirect(`/users/${id}`);
    });
});

module.exports = router;