import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import getChatFromId from "../../api/getChatFromId";
import addMessage from "../../api/addMessage";
import Navbar from "../../components/Navbar";


const ChatPage = () => {
    const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
    const { id } = useParams();
    const [chat, setChat] = useState({});
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false);
    const inputRef = useRef(null);
    useEffect(() => {
        setChat(getChatFromId(id));
        setMessages(chat.messages);
    }, [id, chat.messages]);

    const sendRequestToChatGPT = async(messages) => {
        // Convert to API format for ChatGPT
        let apiMessages = messages.map(message => {
            return { role: message.role, content: message.text }
        });
        // Configure system message
        const systemMessage = {
            role: "system",
            content: "Your name is ReX, and you are a career advisor for students."
        };
        // Configure request body for ChatGPT
        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [systemMessage, ...apiMessages]
        }
        // confiure request options
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(apiRequestBody)
        };
        // Send request to ChatGPT
        console.log("sending message with API KEY: ", API_KEY);
        fetch("https://api.openai.com/v1/chat/completions", requestOptions)
        .then(response => response.json())
        .then(data => {
            const newMessage = {
                chatId: id,
                id: chat.messages.length + 1,
                text: data.choices[0].message.content,
                role: "assistant"
            };
            chat.messages.push(newMessage);
            addMessage(newMessage);
            setChat({...chat});
            setTyping(false);
        });
    }

    const handleMessageSend = async(e) => {
        e.preventDefault();
        const message = inputRef.current.value;
        if (!message) {
            return;
        }
        const newMessage = {
            chatId: id,
            id: chat.messages.length + 1,
            text: message,
            role: "user"
        };
        chat.messages.push(newMessage);
        addMessage(newMessage);
        setChat({...chat});
        inputRef.current.value = "";
        setTyping(true);
        await sendRequestToChatGPT(messages);
    }
    return (
        <div className="flex flex-col h-screen">
            <Navbar/>
            <h1>Chat Page for chat id number: {chat.id}</h1>
            <section className="flex-grow overflow-auto p-4">
                { messages && messages.map(message => (
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
                { typing && (
                    <div className="flex justify-start my-2">
                        <div className="bg-gray-200 p-2 rounded-lg">
                            <div className="">...</div>
                        </div>
                    </div>
                )}
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