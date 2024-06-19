import data from "./test-data.json";
import fs from "fs";

const addChat = (chat) => {
    if (!chat.id || !chat.name || !chat.active || !chat.date || !chat.messages) {
        throw new Error("Chat is missing required fields");
    }
    if (!chat.messages.length || chat.messages[0].text === undefined || chat.messages[0].role === undefined) {
        throw new Error("Chat is missing required message fields");
    }
    data.chats.push(chat);
    fs.writeFile('test-data.json', JSON.stringify(data), 'utf8', (err) => {
        if (err) {
            throw new Error("Error writing to file");
        }
    });
};

export default addChat;