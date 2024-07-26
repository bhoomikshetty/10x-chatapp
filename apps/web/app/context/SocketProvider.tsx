"use client"

import React, { useEffect, useContext } from "react";
import { io } from "socket.io-client";


interface ISocketProviderProps {
    children: React.ReactNode;
}

interface ISocketContext {
    messages: Message[],
    sendMessage: (msg: String) => any,
}

interface Message {
    messageType: MessageType,
    body: String | null,
    links: String[],
    timestamp: String, // microsecondsSinceEpoch
    isEdited: boolean | false,
    sender: User
}

interface User {
    name: String,
    avatar: String | null,
}


enum MessageType { text, image, video, audio, document }

const SocketContext = React.createContext<ISocketContext | null>(null)

export const useSocket = () => {
    const state = useContext(SocketContext);
    if (!state) throw new Error(`state is undefined`);

    return state;
};
const SocketProvider: React.FC<ISocketProviderProps> = ({ children }) => {

    const messages: Message[] = []
    const sendMessage: ISocketContext['sendMessage'] = (msg: String) => {
        console.log(msg);
    }
    const socket = io({
        host: "localhost",
        port: 3000
    });

    useEffect(() => {
        console.log('SocketProvider useEffect');
        socket.on("connect", () => {
            console.log("Socket connected", socket.id)
        })
    }, [])

    return <SocketContext.Provider value={{ messages, sendMessage }} >
        {children}
    </SocketContext.Provider >
}

export default SocketProvider