const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const port = 3000
const hostName = '127.0.0.1'

const corsOption = {
	origins: "http://localhost:5173"
}

const {Sequelize} = require('sequelize')
const { body, param, validationResult } = require('express-validator')
const db = require('./models')
const student = db.student

const http = require('http');
const WebSocket = require('ws');

const path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


const authRoutes = require('./routes/authRoutes.js')
const studentRoutes = require('./routes/studentRoutes.js')
const majorRoutes = require('./routes/majorRoutes.js')
const postingRoutes = require('./routes/postingRoutes.js')
const commentRoutes = require('./routes/commentRoutes.js')

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const clients = new Set();


//routing main

app.use('/v1/auth' , cors(corsOption), authRoutes(express))
app.use('/v1' , cors(corsOption), majorRoutes(express))
app.use('/v1/student' , studentRoutes(express))
app.use('/v1/post' , cors(corsOption), postingRoutes(express))
app.use('/v1/comment' , cors(corsOption), commentRoutes(express))


// Middleware untuk menangani WebSocket
wss.on('connection', (ws) => {
    clients.add(ws);
    console.log('Klien terhubung');

	ws.send(JSON.stringify({
		type: 'connection',
		message: 'Terhubung ke server WebSocket'
	}));

	ws.on('message', (message) => {
		try {
			const parsedMessage = JSON.parse(message);
			console.log('Diterima:', parsedMessage);
			
			clients.forEach((client) => {
				if (client.readyState === WebSocket.OPEN) {
					client.send(JSON.stringify({
						type: 'broadcast',
						data: parsedMessage
					}));
				}
			});
		} catch (error) {
			console.error('Error parsing pesan:', error);
		}
	});

ws.on('close', () => {
	clients.delete(ws);
    console.log('Klien terputus');
	});
});

app.get('/', (req, res) => {
	res.send({
		message: 'Halaman Utama'
	});
});



app.post('/send-notification', (req, res) => {
	const notification = req.body;

	clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify({
				type: 'notification',
				data: notification
			}));
		}
	});
	res.status(200).json({ message: 'Notifikasi berhasil dikirim' });
});

// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Database connection established successfully.');
//         await sequelize.sync({ alter: true });
//         console.log('Database synchronized successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database or sync model:', error);
//     }
// })();

app.listen(port, () => {console.log(`Server running at http://${hostName}:${port}`)})

// app.use('/', () => {
//     routes.get('/student', (req, res) => {
//         res.status(200).json({
//             message: "helo dunia"
//         })
//     })
// })

// const {createServer} = require('http')

// const hostName = '127.0.0.1'
// const port = 3000

// const server = createServer((req, res) => {
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'text/plain')
//     res.end('Hello World! im a human programmer hahayyyy')
// })

// server.listen(port, hostName, () => {
//     console.log(`server running at http://${hostName}:${port}`)
// })