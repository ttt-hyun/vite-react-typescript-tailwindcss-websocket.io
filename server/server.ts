import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const port = 5000;

// CORS 설정
app.use(cors({
  origin: 'http://localhost:5173', // React 앱의 주소
  methods: ['GET', 'POST'],
  credentials: true
}));

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 기본 라우트
app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Hello TypeScript + Express!' });
});

// HTTP 서버 생성
const httpServer = createServer(app);

// Socket.IO 서버 설정
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

let socketsConnected = new Set();

io.on('connection', onConnected);

function onConnected(socket: any) {
  console.log('user connected. socket id: ', socket.id);
  socketsConnected.add(socket.id);
  io.emit('clients-total', {clients: socketsConnected.size});

  socket.on('message', (message: string) => {
    console.log('message: ', message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected. socket id: ', socket.id);
    socketsConnected.delete(socket.id);
    io.emit('clients-total', {clients: socketsConnected.size});
  });
}

// 서버 시작
httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

