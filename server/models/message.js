const mongoose = require('mongoose');

const Message = mongoose.model('Message', {
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    content: {
        type: String,
        require: true,
        minlength: 1,
        trim: true
    },
    createdAt: {
        type: Number,
        require: true
    },
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }
});

module.exports = { Message };
