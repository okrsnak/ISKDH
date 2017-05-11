/**
 * Created by ondrej on 31.3.17.
 */
require('./config');

const express = require('express');
const path = require('path');
const routes = require('./PL/routes');
const hbs = require('hbs');


let app = express();
app.set('views engine', 'hbs');
app.set('views', __dirname + '/PL/views');
hbs.registerPartials(__dirname + '/PL/views/partials');
hbs.registerHelper('ifCond', function(v1, v2, options) {
    if(v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

app.use(express.static(path.join(__dirname, '/public')));
app.use('/games', routes.games);
app.use('/users', routes.users);

let port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});