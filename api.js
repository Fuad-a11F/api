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

app.get('/api/sort_films', (req, res) => {
    if (req.query.genge) {
        let films = []

        for (let i = 0; i < film.length; i++) {
            for (let j = 0; j < film[i].genre.length; j++) {
                if (req.query.genge.split(',').includes(film[i].genre[j])) {
                    films.push(film[i])
                }
            }
        }

        res.json(films)
        return
    }

    else if (req.query.date) {
        let films = []

        for (let i = 0; i < film.length; i++) {
            if (film[i].date.includes(req.query.date)) {
                films.push(film[i])
            }
        }

        res.json(films)
        return
    }

    res.json('error')
})



let PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('Working...');
})