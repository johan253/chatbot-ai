import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import getChatFromId from "../../api/getChatFromId";
import Navbar from "../../components/Navbar";

const ChatPage = () => {
    const { id } = useParams();
    const chat = getChatFromId(id);
    return (
        <div>
            <Navbar/>
            <h1>Chat Page for chat id number: {chat.id}</h1>
            <section>
                {chat.messages.map(message => (
                    message.role === "user" ? (
                        <div key={message.id} className="flex justify-end">
                            <div className="bg-blue-500 text-white p-2 rounded-lg">
                                {message.text}
                            </div>
                        </div>
                    ) : (
                        <div key={message.id} className="flex justify-start">
                            <div className="bg-gray-200 p-2 rounded-lg">
                                {message.text}
                            </div>
                        </div>
                    )
                ))}
            </section>
        </div>
    );
};

export default ChatPage;