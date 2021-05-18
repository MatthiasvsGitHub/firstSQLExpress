const express = require('express')
const orders = express()
const connection = require('./conf/connection')
const validator = require('validator');


orders.use(express.urlencoded({ extended: false }))
// HERE STARTS ORDERS

orders.get('/', (req, res) => {
    connection.query(`SELECT * FROM orders`, (err, results) => {
        if (err) throw err
        res.json(results)
    })
})

orders.get('/:id', (req, res) => {
    let { id } = req.params
    connection.query(`SELECT * FROM orders WHERE id = ${id}`, (err, results) => {
        if (err) throw err
        res.json(results)
    })
})

orders.post('/', (req, res) => {
    const { price, date, user_id } = req.body
    if (validator.isInt(price, { min: 1, max: 99 })) {
        connection.query(`INSERT INTO orders (price, date, user_id) VALUES('${price}', '${date}', '${user_id}')`, (err, results) => {
            if (err) throw err
            res.json(results)
        })
    }
    else res.send('Wrong Price')
})

orders.delete('/:id', (req, res) => {
    let { id } = req.params
    connection.query(`DELETE FROM orders WHERE ID = ?`, Number(id), (err, results) => {
        if (err) throw err
        res.send('Order deleted')
    })
})

orders.put('/:id', (req, res) => {
    let { id } = req.params
    const { price, date, user_id } = req.body
    if (validator.isInt(price, { min: 1, max: 99 })) {
        connection.query(`UPDATE orders SET price='${price}', date='${date}', user_id='${user_id}'  WHERE ID = ${id}`, (err, results) => {
            if (err) throw err
            res.json(results)
        })
    }
    else res.send('Wrong Price')
})

// HERE ENDS ORDERS

module.exports = orders