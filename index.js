const express = require('express')
const app = express()
const port = 3000
const connection = require('./conf/connection')
const validator = require('validator');

app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.send(' Welcome to our API MFer :)')
})

// HERE STARTS USERS

app.use('/api/users', require('./users'))

// HERE ENDS USERS

// HERE STARTS ORDERS

app.use('/api/orders', require('./orders'))

// HERE ENDS ORDERS

// HERE STARTS EXTRA STUFF

app.get('/api/:id/orders', (req, res) => {
    let { id } = req.params
    connection.query(`SELECT * FROM orders WHERE user_id = ${id}`, (err, results) => {
        if (err) throw err
        res.json(results)   
    })
})

app.put('/api/:id/check-inactive', (req, res) => {
    let { id } = req.params
    connection.query(`UPDATE orders RIGHT JOIN users ON users.id=orders.user_id SET users.active='0' WHERE users.id='${id}' AND orders.price IS NULL`, (err, results) => {
        if (err) throw err
        res.json(results)
    })
})

// HERE ENDS EXTRA STUFF

app.listen(port, console.log(`Server is listening on port ${port}`));
