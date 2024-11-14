import React from "react";
import './style.css'
import { Route, Routes } from "react-router-dom";
import WhatsApp from "./WhatsApp";
import ChatsList from "./Chats";


function App() {
    return(
        <div>
            <Routes>
                <Route path="/" element={<WhatsApp />} />
                <Route path="/home" element={<WhatsApp />} />
                <Route path="/chats/:userChatID" element={<ChatsList />} />
            </Routes>
        </div>
    )
}

export default App