import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import getChatFromId from "../../api/getChatFromId";
import addMessage from "../../api/addMessage";
import Navbar from "../../components/Navbar";

const ChatPage = () => {
    const { id } = useParams();
    const [chat, setChat] = useState({});
    const inputRef = useRef(null);
    useEffect(() => {
        setChat(getChatFromId(id));
    }, [id]);

    const handleMessageSend = (e) => {
        e.preventDefault();
        const message = inputRef.current.value;
        if (!message) {
            return;
        }
        const newMessage = {
            id: chat.messages.length + 1,
            text: message,
            role: "user"
        };
        chat.messages.push(newMessage);
        addMessage(newMessage);
        setChat({...chat});
        inputRef.current.value = "";
    }
    return (
        <div className="flex flex-col h-screen">
            <Navbar/>
            <h1>Chat Page for chat id number: {chat.id}</h1>
            <section className="flex-grow overflow-auto p-4">
                { chat.messages && chat.messages.map(message => (
                    message.role === "user" ? (
                        <div key={message.id} className="flex justify-end my-2">
                            <div className="bg-blue-500 text-white p-2 rounded-lg">
                                {message.text}
                            </div>
                        </div>
                    ) : (
                        <div key={message.id} className="flex justify-start my-2">
                            <div className="bg-gray-200 p-2 rounded-lg">
                                {message.text}
                            </div>
                        </div>
                    )
                ))}
            </section>
            <div className="flex w-full p-3 border-t">
                <form
                className="flex w-full"
                onSubmit={handleMessageSend}>
                    <input type="text" 
                    placeholder="Type a message..."
                    className="flex-grow p-2 border rounded-l-lg focus:outline-none"
                    ref={inputRef} />
                    <button className="p-2 bg-blue-500 text-white rounded-r-lg"
                    onClick={handleMessageSend}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatPage;