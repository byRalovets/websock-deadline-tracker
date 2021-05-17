const Deadline = require('./models/deadline').Deadline;
const User = require('./models/user').User;
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const secret = getSecret();

/**
 * @param req - payload from request
 * @param res - websocket connection for response
 */
exports.loginUser = (req, res) => {
    const password = md5(req.password);
    const email = req.email;
    User.findOne({email: email}, function (err, user) {
        if (user) {
            if (user.checkPassword(password)) {
                console.log(JSON.stringify(
                    {
                        type: 'LOGIN_OK',
                        payload: {
                            jwt: jwt.sign({user: JSON.stringify(user)}, secret),
                            user: user
                        }
                    }
                ));
                res.send(JSON.stringify(
                    {
                        type: 'LOGIN_OK',
                        payload: {
                            jwt: jwt.sign({user: JSON.stringify(user)}, secret),
                            user: user
                        }
                    }
                ));
            }
            return;
        }
        res.send('404');
    });
}

/**
 * @param req - payload from request
 * @param res - websocket connection for response
 */
exports.registerUser = (req, res) => {
    const user = new User(req.user);
    user.password = md5(user.password);
    user.save(function (err, user) {
        if (err) {
            res.send('404');
        }
        console.log(JSON.stringify(
            {
                type: 'REGISTER_OK',
                payload: {
                    jwt: jwt.sign({user: JSON.stringify(user)}, secret),
                    user: user
                }
            }
        ));
        res.send(JSON.stringify(
            {
                type: 'REGISTER_OK',
                payload: {
                    jwt: jwt.sign({user: JSON.stringify(user)}, secret),
                    user: user
                }
            }
        ));
    });
}

/**
 * @param req - payload from request
 * @param res - websocket connection for response
 */
exports.deleteDeadline = (req, res) => {
    const token = req.token;

    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            console.log(token);
            res.send('401');
        }
    });

    Deadline.remove({_id: req.deadlineId}, function (err, deadline) {
        if (err) {
            res.send('401');
        }
        console.log(JSON.stringify(
            {
                type: 'DELETE_DEADLINE_OK',
                payload: {
                    deadline: deadline
                }
            }
        ));
        res.send(JSON.stringify(
            {
                type: 'DELETE_DEADLINE_OK',
                payload: {
                    deadline: deadline
                }
            }
        ));
    });
}

/**
 * @param req - payload from request
 * @param res - websocket connection for response
 */
exports.updateDeadline = (req, res) => {
    const token = req.token;

    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            console.log(token);
            res.send('401');
        }
    });

    const deadlineId = req.deadlineId;
    const deadline = req.deadline;
    Deadline.findOneAndUpdate({_id: deadlineId}, deadline, {new: true}, function (err, deadline) {
        if (err) {
            res.send('401');
        }
        console.log(JSON.stringify(
            {
                type: 'PUT_DEADLINE_OK',
                payload: {
                    deadline: deadline
                }
            }
        ));
        res.send(JSON.stringify(
            {
                type: 'PUT_DEADLINE_OK',
                payload: {
                    deadline: deadline
                }
            }
        ));
    });
}

/**
 * @param req - payload from request
 * @param res - websocket connection for response
 */
exports.createDeadline = (req, res) => {
    const token = req.token;

    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            console.log(token);
            res.send('401');
        }
    });

    const newDeadline = new Deadline(req.deadline);
    newDeadline.save(function (err, deadline) {
        if (err) {
            res.send('401');
        }
        console.log(JSON.stringify(
            {
                type: 'POST_DEADLINE_OK',
                payload: {
                    deadline: deadline
                }
            }
        ));
        res.send(JSON.stringify(
            {
                type: 'POST_DEADLINE_OK',
                payload: {
                    deadline: deadline
                }
            }
        ));
    });
}

/**
 * @param req - payload from request
 * @param res - websocket connection for response
 */
exports.getDeadlines = (req, res) => {
    const token = req.token;

    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            console.log(token);
            res.send('401');
        }
    });

    const authorId = req.authorId;
    Deadline.find({authorId: authorId}, function (err, deadlines) {
        if (err) {
            console.log(401);
            res.send('401');
        }
        console.log(JSON.stringify({
            type: 'GET_DEADLINES_OK',
            payload: {
                deadlines: deadlines
            }
        }));
        res.send(JSON.stringify(
            {
                type: 'GET_DEADLINES_OK',
                payload: {
                    deadlines: deadlines
                }
            }
        ));
    });
}

function getSecret() {
    const fs = require('fs');
    const data = fs.readFileSync('jwt-config.json', 'utf8');
    return JSON.parse(data).secret;
}
