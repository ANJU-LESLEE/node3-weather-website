const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Defining the path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and Views path location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name : 'Anju Maria'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me:',
        name : 'Anju Maria'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        name : 'Anju Maria',
        message : 'For any queries and suggestions...Ping me at ....'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error:'Address is not added.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location }= {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        title : '404 Error',
        name : 'Anju Maria',
        errorMsg : 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error',{
        title : '404 Error',
        name : 'Anju Maria',
        errorMsg : 'Page not found'
    })
})

app.listen(port, ()=>{
    console.log("Server started succesfully on port "+port+" ...")
})