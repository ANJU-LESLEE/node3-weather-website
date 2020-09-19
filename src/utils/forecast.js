const request = require('request')

const forecast = (latitude, longitude, callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=a36a11c75c1f6eeffc40cbbb025d9971&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json:true}, (error, {body}= {}) =>{

        if(error){
            callback('Unable to connect with Weather services', undefined)
        } else if(body.error){
            callback('Unable to find the location',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degree out. But it feels like '+body.current.feelslike+' degree out. The humidity is '+body.current.humidity+'% .')
        }
    })

}

module.exports = forecast

