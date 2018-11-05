const app = require('express')()
const users = require('./users')
const items = require('./items')
const lists = require('./list')

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use('/users', users)
app.use('/items', items)
app.use('/lists', lists)

app.get('/', (req, res) => {
    res.send('Hello world !')
})

app.listen(9999, () => {
     console.log('App listening on port 9999')
    })
