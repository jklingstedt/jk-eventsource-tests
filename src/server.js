const express = require('express');

const app = express();

function sseDemo(req, res) {
    let messageId = 0;

    const intervalId = setInterval(() => {
        res.write(`id: ${messageId}\n`);
        res.write(`data: Test Message -- ${Date.now()}\n\n`);
        messageId += 1;
    }, 1000);

    req.on('close', () => {
        clearInterval(intervalId);
    });
}

app.get('/event-stream', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
    });
    res.write('\n');

    sseDemo(req, res);
});

app.listen(3001, () => console.log('Running SSE server'));
