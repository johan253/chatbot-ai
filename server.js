const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const data = require('./src/api/test-data.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/addMessage', (req, res) => {
    const message = req.body;

    if (!message.id || !message.text || !message.role || !message.chatId) {
        console.log("Message is missing required fields");
        return res.status(400).send("Message is missing required fields");
    }

    const chat = data.chats.find(chat => chat.id === message.chatId);
    if (!chat) {
        console.log("Chat not found");
        return res.status(404).send("Chat not found");
    }

    const newMessage = {
        id: message.id,
        text: message.text,
        role: message.role
    }
    chat.messages.push(newMessage);

    fs.writeFile('./src/api/test-data.json', JSON.stringify(data, null, 2), 'utf8', (err) => {
        if (err) {
            console.log("Error writing to file");
            return res.status(500).send("Error writing to file");
        }
        console.log("Message added successfully");
        res.status(200).send("Message added successfully");
    });
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
