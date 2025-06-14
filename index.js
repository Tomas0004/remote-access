const express = require('express');
const path = require('path');

const PORT = 3000;
const app = express();

const password = 'tomas1234';
let status = { "status": 1 };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public', 'script')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/status', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
    });
    res.write('data: ' + JSON.stringify(status) + '\n\n');

    res.status(200).send();
})

app.post('/status', (req, res) => {
    if (req.body.password == password) {
        status.status = 2;

        res.redirect(req.body.redirect);

        setTimeout(() => {
            status.status = 1;
        }, 70000)
    }else{
        res.redirect(req.body.redirect);
    }
})

app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`);
})