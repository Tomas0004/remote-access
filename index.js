const path = require('path');

const express = require('express');
const { Server } = require('socket.io');
const app = express();
const httpServer = require('http').createServer(app);

const io = new Server(httpServer);

const PORT = 3000;

const password = 'tomas200712*/*#';
let status = { "status": 1 };

io.on('connection', (socket) => {
    console.log('Alguien se conecto al http');
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'public', 'script')));

app.get('/', (req, res) => {
    console.log('express: Alguien se conecto a la pagina');
    res.sendFile(path.join(__dirname, 'index.html'));
})

// app.get('/status', (req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'text/event-stream',
//         'Cache-Control': 'no-cache',
//         'Connection': 'keep-alive',
//         'Access-Control-Allow-Origin': '*'
//     });
//     res.write('data: ' + JSON.stringify(status) + '\n\n');

//     res.status(200).send();
// })

app.post('/status', (req, res) => {
    if (req.body.password == password) {

        res.redirect(req.body.redirect);

        status.status = 1;
        let num = 0;

        let interval = setInterval(() => {
            num ++;
            io.emit('message_server', status, num);

            console.log(num);

            if(num >= 70) interval.close();
        }, 1000);

    } else {
        res.redirect(req.body.redirect);
    }
})

httpServer.listen(PORT, () => {
    console.log(`Servidor http levantado en http://localhost:${PORT}`);
})
