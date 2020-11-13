const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // 載入 todo model
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

const restaurantList = require('./restaurant.json');
for (i = 0; i < restaurantList.results.length; i++) {
    Restaurant.create(restaurantList.results[i]);
}