/**
 * Created by ondrej on 6.4.17.
 */
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = mongoose;