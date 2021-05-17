const WebsocketServer = require('ws');
const webSockServer = new WebsocketServer.Server({port: 8091});
const deadlines = require('./controller');

// raralovets@gmail.com
// 28042001

webSockServer.on('connection', function (ws) {

    console.log('New connection at ' + new Date());

    ws.on('message', function (message) {
        console.log('Message is ' + message);
        const messageModel = JSON.parse(message);
        switch (messageModel.type) {
            case 'GET_DEADLINES':
                deadlines.getDeadlines(messageModel.payload, ws);
                break;
            case 'POST_DEADLINE':
                deadlines.createDeadline(messageModel.payload, ws);
                break;
            case 'PUT_DEADLINE':
                deadlines.updateDeadline(messageModel.payload, ws);
                break;
            case 'DELETE_DEADLINE':
                deadlines.deleteDeadline(messageModel.payload, ws);
                break;
            case 'POST_LOGIN':
                deadlines.loginUser(messageModel.payload, ws);
                break;
            case 'POST_REGISTER':
                deadlines.registerUser(messageModel.payload, ws);
                break;
        }
    });

    ws.on('close', () => console.log('Connection closed'));
});

console.log('Websocket server started on port 8091');
