//assign port and load required modules
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
//get restaurant.js
const Restaurant = require('./models/restaurant')

//set handlebars and body-parser
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

//connect and get connection status of database
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
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

//delete restaurant
app.post('/restaurants/:id/delete', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

//create new restaurant page and create function
app.get('/new', (req, res) => {
    res.render('new')
})

app.post('/restaurant', (req, res) => {
    const newRestaurant = req.body
    return Restaurant.create(newRestaurant)
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

//edit restaurant page and edit function
app.get('/restaurants/:id/edit', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', {restaurant}))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
    .then(restaurant => {
        restaurant.name = req.body.name
        restaurant.name_en = req.body.name_en
        restaurant.category = req.body.category
        restaurant.image = req.body.image
        restaurant.location = req.body.location
        restaurant.phone = req.body.phone
        restaurant.google_map = req.body.google_map
        restaurant.rating = req.body.rating
        restaurant.description = req.body.description
        return restaurant.save()
    })
    .then(res.redirect('/'))
    .catch(error => console.log(error))
})

//search function
app.get('/search', (req, res) => {
    const keyword = req.query.keyword.trim()
    return Restaurant.find({$or: [{name: { "$regex": keyword, "$options": "i" }}, {name_en: { "$regex": keyword, "$options": "i" }}, {category: { "$regex": keyword, "$options": "i" }}]})
    .lean()
    .then(restaurant => res.render('index', { restaurant, keyword }))
    .catch(error => console.log(error))
})

//listen server
app.listen(port , () => {
    console.log(`Restaurant list is running on http://localhost:${port}`)
})