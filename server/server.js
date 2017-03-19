const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { ObjectId } = require('mongodb');
const _ = require('lodash');

const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');
const { Conversation } = require('./models/conversation');
const { Message } = require('./models/message');
const { authenticate } = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/api', authenticate, (req, res) => {
    User.find({}).nin('_id', req.user._id).then(users => {
        res.send({
            title: 'Messenger App | Home',
            userList: users
        });
    });
});

app.get('/api/messenger/:id', authenticate, (req, res) => {
    const userOneId = req.user._id;
    const userTwoId = ObjectId(req.params.id);
    var userList = [];
    var targetUser = undefined;
    currentUser = req.user;

    User.findById(req.params.id).then((user) => {
        targetUser = user;
    }).catch((e) => {
        res.status(404).send();
    });
    User.find({}).nin('_id', req.user._id).then(users => {
        userList = users;

        Conversation.findOne({participants: { $all: [userOneId, userTwoId] }})
            .then((conversation) => {
                if (!conversation) {
                    return res.send({
                        title: 'Messenger App | Start A Conversation',
                        userList,
                        messages: [],
                        currentUser,
                        targetUser
                    });
                }
                Message.find({conversationId: conversation._id})
                    .then(messages => {
                        return res.send({
                            title: 'Messenger App | Continue A Conversation',
                            userList,
                            messages,
                            currentUser,
                            targetUser
                        });
                    })
            });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.post('/api/messenger/:id', authenticate, (req, res) => {
    const userOneId = req.user._id;
    const userTwoId = ObjectId(req.params.id);
    const sender = req.user.username;
    var receiver = null;

    User.findById(req.params.id)
        .then((user) => {
            receiver = user.username;

            Conversation.findOne({participants: { $all: [userOneId, userTwoId] }})
                .then((conversation) => {            
                    if (!conversation) {                
                        const conversation = new Conversation({
                            participants: [userOneId, userTwoId]
                        });
                        conversation.save().then((conv) => {
                            const message = new Message({
                                sender,
                                receiver,
                                content: req.body.content,
                                createdAt: new Date().getTime(),
                                conversationId: conv._id
                            });
                            message.save().then((mess) => {
                                res.send(mess);
                            });
                        });
                    } else {
                        const message = new Message({
                            sender,
                            receiver,
                            content: req.body.content,
                            createdAt: new Date().getTime(),
                            conversationId: conversation._id
                        });
                        message.save().then((mess) => {
                            res.send(mess);
                        });
                    }
                }).catch((e) => {
                    res.status(400).send();
                });
        }).catch((e) => {
            res.status(404).send();
        });
});

//  Authentication Routes

app.post('/api/auth/register', (req, res) => {
    const body = _.pick(req.body, ['username', 'email', 'password']);
    const user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {      
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.post('/api/auth/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);          
        });
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.delete('/api/auth/logout', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});
