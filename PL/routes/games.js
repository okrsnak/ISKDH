/**
 * Created by ondrej on 17.4.17.
 */

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
let router = express.Router();

let IGameDAO = require('../../DL/interfaces/IGameDAO');
let ICopyDAO = require('../../DL/interfaces/ICopyDAO');
let ILoanBL = require('../../BL/interfaces/ILoanBL');
let {authenticate} = require('../../middleware/authenticate');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cookieParser());

let parseGame = (req) => {
    return {
        name: req.body.name,
        year: req.body.year,
        numberOfPlayers: {
            max: req.body.max,
            min: req.body.min
        },
        description: req.body.description,
    };
};

let parseCopy = (req) => {
    return {
        registrationNumber: req.body.registrationNumber,
        price: req.body.price,
        state: req.body.state,
    };
};

let parseReview = (req) => {
    return {
        rating: req.body.rating,
        description: req.body.description,
    };
};

router.get('/', (req, res) => {
    IGameDAO.getGames(null,(games) => {
        res.render('games.hbs', {games});
    });
});

router.get('/new', (req, res) => {
    res.render('gameNewForm.hbs');
});

router.post('/new', (req, res) => {

    let game = parseGame(req);

    IGameDAO.addGame(game, (ok) => {
        if(ok) {
            res.render('gameNewForm.hbs', {send: true, exist: false});
        } else {
            res.render('gameNewForm.hbs', {send: true, exist: true});
        }
    });
});

router.get('/:id', (req, res) => {
    let id = {
        id: req.params.id
    };
    IGameDAO.getGames(id, (game) => {
        res.render('gameDetail.hbs', game[0]);
    });
});

router.get('/:id/edit', (req, res) => {
    let id = {
        id: req.params.id
    };
    IGameDAO.getGames(id, (game) => {
        res.render('gameEditForm.hbs', game[0]);
    });
});

router.post('/:id/edit', (req, res) => {

    let hra = parseGame(req);

    IGameDAO.modifyGame(game, (game) => {
        res.redirect(`/games/${game.id}`);
    });

});

router.get('/:id/new', (req, res) => {
    let id = req.params.id;
    res.render('copyNewForm.hbs', {id});
});

router.post('/:id/new', (req, res) => {
    let id = req.params.id;

    let copy = parseCopy(req);

    ICopyDAO.addCopy(id, copy, (gameId) => {
        res.redirect(`/games/${gameId}`);
    });
});

router.get('/:id/copy/:regNumber/edit', (req, res) => {
    let id = req.params.id;
    let registrationNumber = req.params.regNumber;
    res.render('copyEditForm.hbs', {id, registrationNumber});
});

router.post('/:id/copy/:regNumber/edit', (req, res) => {
    let id = req.params.id;
    let registrationNumber = req.params.regNumber;

    let state = req.body.state;

    ICopyDAO.setStateCopy(registrationNumber, state, () => {
        res.redirect(`/games/${id}`);
    });
});

router.get('/:id/copy/:regNumber/new', (req, res) => {
    //TODO
    let id = req.params.id;
    let registrationNumber = req.params.registrationNumber;
    ILoanBL.addLoan({id, registrationNumber}, () => {
        res.redirect(`/games/${id}`);
    });
});


module.exports = router;