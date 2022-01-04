let express = require('express')
let app = express() 
let cors = require('cors')
let bodyParser = require('body-parser')
let film = require('./films')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())

app.get('/api/get_all_films', (req, res) => {
    res.json(film)
})

app.get('/api/get_film/:id', (req, res) => {
    for (let i = 0; i < film.length; i++) {
        if (film[i].id == req.params.id) {
            res.json(film[i])
            return
        }
    }
    res.json('error')
})


let PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('Working...');
})