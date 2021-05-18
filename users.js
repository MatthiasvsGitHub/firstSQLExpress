const express = require('express')
const users = express()
const connection = require('./conf/connection')
const validator = require('validator');

users.use(express.urlencoded({ extended: false }))
// HERE STARTS USERS

users.get('/', (req, res) => {
    connection.query(`SELECT * FROM users`, (err, results) => {
        if (err) throw err
        res.json(results)
    })
})

users.get('/:id', (req, res) => {
    let { id } = req.params
    connection.query(`SELECT * FROM users WHERE id = ${id}`, (err, results) => {
        if (err) throw err
        res.json(results)
    })
})

users.post('/', (req, res) => {
    const { first_name, last_name, age } = req.body
    connection.query(`INSERT INTO users (first_name, last_name, age) VALUES('${first_name}', '${last_name}', '${age}')`, (err, results) => {
        if (err) throw err
        res.json(results)
    })
})


users.delete('/:id', (req, res) => {
    let { id } = req.params
    connection.query(`DELETE FROM users WHERE ID = ?`, Number(id), (err, results) => {
        if (err) throw err
        res.send('User deleted')
    })
})

users.put('/:id', (req, res) => {
    let { id } = req.params
    const { first_name, last_name, age, active } = req.body
    connection.query(`UPDATE users SET first_name='${first_name}', last_name='${last_name}', age='${age}', active='${active}' WHERE ID = ${id}`, (err, results) => {
        if (err) throw err
        res.json(results)
    })
})

// HERE ENDS USERS

module.exports = users