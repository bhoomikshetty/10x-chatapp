import { Server } from 'socket.io';

class SocketService {

    private _io: Server;

    constructor() {
        this._io = new Server({
            cors: {
                allowedHeaders: "*",
                origin: "*",
            }
        });
        this.initListeners();
    }

    get io() {
        return this._io;
    }

    public initListeners() {
        const io = this.io;
        io.on("connect", server => {
            console.log("socket init listeners", server);
        })
    }
}

export default SocketService