/**
 * Created by ondrej on 6.4.17.
 */
let env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/SI1'
} else {
    process.env.MONGODB_URI = 'mongodb://si1:iskdh@ds153730.mlab.com:53730/si1'
}