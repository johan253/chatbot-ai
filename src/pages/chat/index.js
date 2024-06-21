import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import getChatFromId from "../../api/getChatFromId";
import addMessage from "../../api/addMessage";
import Navbar from "../../components/Navbar";


const ChatPage = () => {
    const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false);
    const inputRef = useRef(null);
    useEffect(() => {
        const fetchData = async() => {
            const chat = await getChatFromId(id);
            setMessages(chat.messages);
        };
        fetchData();
    }, [id]);

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
        console.log("requestOptions: ", requestOptions);
        console.log("messages: ", messages);
        console.log("apiMessages: ", apiMessages);
        fetch("https://api.openai.com/v1/chat/completions", requestOptions)
        .then(response => response.json())
        .then(data => {
            const newMessage = {
                chatId: id,
                id: String(messages.length + 1),
                text: data.choices[0].message.content,
                role: "assistant"
            };
            setMessages([...messages, newMessage]);
            // causes error currently
            addMessage(newMessage);
            setTyping(false);
        }).catch(error => {
            console.error("Error: ", error);
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
            id: String(messages.length + 1),
            text: message,
            role: "user"
        };
        console.log("messages BEFORE ADDING: ", messages)
        messages.push(newMessage);
        console.log("messages AFTER ADDING: ", messages)
        // causes error currently
        addMessage(newMessage);
        inputRef.current.value = "";
        setTyping(true);
        await sendRequestToChatGPT(messages);
    }
    return (
        <div className="flex flex-col h-screen">
            <Navbar/>
            <h1>Chat Page for id number: {id}</h1>
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