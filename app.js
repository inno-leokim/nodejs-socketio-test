const http = require('http');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { Server } = require('socket.io');

const port = 8080;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 디버깅을 위한 환경 변수 설정

// 윈도우
// SET DEBUG=socket.io*

// 리눅스, 맥
// export DEBUG=socket.io*


app.use(morgan('combined'));
app.use(express.static(path.join(__dirname,'/public')));


// 웹 서버 실행
server.listen(port, () => {
    console.log(`Server is running at ${port}`);
});

// 소켓 서버 실행
io.sockets.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('rint',(data) => {
        
        // 클라이언트가 전송할 데이터를 출력한다.
        console.log('Client Send Data:', data);

        socket.emit('smart', data);
    });
});

