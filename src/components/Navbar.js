import React, { useState } from 'react';
import Logo from "../assets/logo.png";
import app from "../firebaseConfig";
import { getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "firebase/auth";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const auth = getAuth(app);
    auth.onAuthStateChanged((user) => {
        if (user) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    });

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithRedirect(auth, provider);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-slate-600 flex">
            <div className="flex items-center p-2">
                <img 
                    src={Logo}
                    alt="logo"
                    height="64"
                    width="64"
                />
                <h1 className="ml-2 text-3xl text-white">
                    Chatbot.ai
                </h1>
            </div>
            <div className="ml-auto my-auto mr-6">
                <button 
                    className="flex items-center justify-center px-4 py-2 text-white bg-slate-700 rounded-md hover:bg-slate-800 focus:outline-none my-auto"
                    onClick={toggleMenu}
                >
                    Menu
                </button>
                {isMenuOpen && (
                    <div className="absolute right-2 mt-2 w-48 bg-white rounded-md shadow-lg">
                        <div className="py-1">
                            {!loggedIn ?
                            <a href="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Login</a>
                            :
                            <a href="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</a>
                            }
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
