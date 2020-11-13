const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
//get restaurant.js
const Restaurant = require('./models/restaurant')

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

//get connection status of database
const db = mongoose.connection
db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected!')
})

//homepage
app.get('/', (req, res) => {
    Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

//restaurant details
app.get('/restaurants/:id', (req,res) => {
    const id = req.params.id
    return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
    
})


/*search function to be modified
app.get('/search', (req, res) => {
    const restaurants = restaurantList.results.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', {restaurants: restaurants, keyword: keyword})
})
*/


app.listen(port , () => {
    console.log(`Restaurant list is running on http://localhost:${port}`)
})