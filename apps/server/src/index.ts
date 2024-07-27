import http, { Server } from 'http'
import SocketService from './services/socket'

async function init() {
    const socketService = new SocketService()

    const httpServer = http.createServer()
    const PORT = process.env.PORT ?? 8000

    socketService.io.attach(httpServer)
    try {
    } catch (error) {
        console.log(error)
    }
    httpServer.listen(PORT, () => {
        console.log(`http server started at ${PORT}`)
    })

    socketService.initListeners()
}

init();