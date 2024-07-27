"use client"

import React, { useEffect, useContext, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";


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
}

const SocketProvider: React.FC<ISocketProviderProps> = ({ children }) => {

    const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage: ISocketContext["sendMessage"] = useCallback(
        async (msg) => {
            console.log("Sending Message", msg);
            if (socket) {
                console.log(`${socket?.id}`);
                try {
                    socket.emit("event:message", { message: "msg" });
                } catch (err) {
                    console.error(err);
                }

            }
        },
        [socket]
    );

    useEffect(() => {
        console.log('SocketProvider useEffect');
        const _socket = io("http://localhost:8000");


        _socket.on("connect", () => {
            console.log("Socket connected", _socket.id)
            _socket.emit("event:message", { message: "msg" });

        })
        _socket.on("connect_error", (error) => {
            console.log("Socket connection error:", error);
        });
        _socket.on('log', (message) => {
            console.log(message);
        })

        _socket.on('message', (message) => {
            console.log(message);
        })
        setSocket(_socket);


        return () => {
            _socket.off("connect");
            _socket.off("connect_error");
            _socket.off("log");
            _socket.off("message");
            _socket.disconnect()
            setSocket(undefined)
        }
    }, [])

    return (
        <SocketContext.Provider value={{ messages, sendMessage }} >
            {children}
        </SocketContext.Provider >
    );
}

export default SocketProvider