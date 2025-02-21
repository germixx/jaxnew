const mongoose = require('mongoose');

// mongoose.set('debug', true);
const dmSchemas = mongoose.Schema({
    business_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        // required: true
    },
    message: {
        type: String,
        required: true
    },
    time_sent: {
        type: Date,
        default: Date.now
    }

});

const Chatroom = module.exports = function (collection) {
    return mongoose.model('chatroom', dmSchemas, collection);
}