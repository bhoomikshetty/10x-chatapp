import http, { Server } from 'http'
import SocketService from './services/socket'

async function init() {
    const httpServer = http.createServer()
    const PORT = process.env.PORT ?? 3000

    const socketService = new SocketService()
    socketService.io.attach(httpServer)

    httpServer.listen(() => {
        console.log(`http server started at ${PORT}`)
    })

    socketService.initListeners()
}

init()