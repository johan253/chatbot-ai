import data from "./test-data.json";

const getChatFromId = (id) => {
    return data.chats.find(chat => chat.id === id);
}

export default getChatFromId;