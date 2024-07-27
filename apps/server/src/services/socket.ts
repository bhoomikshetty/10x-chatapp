import { Server } from 'socket.io';

class SocketService {
    private _io: Server;

    constructor() {
        console.log("Init Socket Service...");
        this._io = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
            }
        });
    }

    public initListeners() {
        const io = this._io;
        io.on("connect", (socket) => {
            socket.emit("log", "Hello from server")
            socket.on("event:message", (message) => {
                console.log(`clientToServerMessage triggeres ${message}`)
            })
        })

    }

    get io() {
        return this._io;
    }
}

export default SocketService