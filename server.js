const fs = require('fs')

const express = require('express')
const hbs = require('hbs')

let app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
    let now = new Date().toString()
    let log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    })
    next()
})

app.get('/', (req, res) => {
    res.send({
        name: 'Yoav',
        likes: [
            'javascript',
            'swift'
        ],
        numbres: [34, 12, 943],
        lastname: 'Mashraki'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
        currentYear: new Date().getFullYear()
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})







