const mongoose = require('mongoose');

const Conversation = mongoose.model('Conversation', {
    participants: {
        type: Array
    }
});

module.exports = { Conversation };
