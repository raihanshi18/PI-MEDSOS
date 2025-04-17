const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const port = 3000
const hostName = '127.0.0.1'

const {Sequelize} = require('sequelize')
const { body, validationResult } = require('express-validator')

// const sequelize = new Sequelize({
//     database: 'pi_medsos',
//     username: 'root',
//     password: '',
//     host: 'localhost',
//     dialect: 'mysql'
// });  

app.get('/', async(req, res) => {

    // try {
    //     await sequelize.authenticate();
    //     console.log('Connection has been established successfully.');
    // } catch (error) {
    //     console.error('Unable to connect to the database:', error);
    // }

    res.send({
        message: "Home Page"
    })
})

app.get('/student', (req, res) => {
    res.send({
        message: "Endpoint for fetching student data"
    })
})

app.post('/addstudent', [
    body('firstName').notEmpty().withMessage('all field is required'),
],(req, res) => {

    const error = validationResult(req)
    if (!!error){
        return res.status(422).json({
            error: error.array(),
        })
    }

    res.send({
        message: "Endpoint for add student data"
    })
})

app.delete('/student/:id', (req, res) => {
    res.send({
        message: "Endpoint for deleting student data"
    })
})

app.get('/student/:id', (req, res) => {
    res.send({
        message: "Endpoint for detail student data"
    })
})

app.put('/student/:id', (req, res) => {
    res.send({
        message: "Endpoint for updating student data"
    })
})

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