const express = require("express")
const mustache = require("mustache-express")
const bodyParser = require("body-parser")
const app = express()
const mongoose = require('mongoose')
const Cars = require('./cars')

app.engine('mustache', mustache())
app.set("view engine", 'mustache')
app.set("views", './views')
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/cars')

// var cars = new Cars({
//   make: 'Buggati',
//   year: 2017
// })



// Cars.updateOne({make: 'Buggati'}, {$push: {image: "http://images.caricos.com/b/bugatti/2017_bugatti_chiron/images/2560x1440/2017_bugatti_chiron_12_2560x1440.jpg"}}).catch(function(error){
//     console.log(error)
// })




app.get('/', function(req, res) {
  Cars.find().sort('year').then(function(cars, from) {
    res.render('index', {
      cars: cars
    })
  })
})

app.post("/index", function(req, res){
   var cars = new Cars()
     cars.make = req.body.make
     cars.year = req.body.year
     cars.doors = req.body.doors
     cars.image = req.body.image
     cars.save()
   .then(function(cars){
     res.render('index', {
       cars: cars
     })
   })
})

app.post("/delete", function(req, res){
  Cars.deleteOne({
    '_id': req.body.id
  }).then(function(cars){
    res.redirect('/')
  }).catch(function(err){
    throw err
  })

})


app.listen(3000, function() {
  console.log('Express is running!')
})
