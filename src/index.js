// Importing dependencies
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setting the handlebars templating engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Seving the static Directories 
app.use(express.static(publicDirectoryPath));

// Setting the routes
app.get('/', (req, res) => {
    res.render('index', {
       title: 'Weather',
       author: 'Himanshu Verma' 
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: 'Himanshu Verma' 
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help Message',
        author: 'Himanshu Verma'
    });
});

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address must be provided.'
        });
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error: error
            }); 
        }

        forecast(latitude,longitude, (error, {temperature, feelslike, weather_desc, precip} = {}) => {
            if(error) {
                return res.send({
                    error: error
                });
            }

            res.send({
                temperature: temperature,
                feelslike: feelslike,
                weather_desc:weather_desc,
                precip:precip,
                location: location
            });
        });

    });
});

app.get('/help/*', (req, res) => {
    res.render('errorPage', {
        title: '404',
        errorMsz: 'Help article not found',
        author: 'Himanshu Verma'
    });
});

app.get('/*', (req, res) => {
    res.render('errorPage', {
        title: '404',
        errorMsz: 'Page not found',
        author: 'Himanshu verma'
    });
});

app.listen(port, () => {
    console.log("Server is running on port" + port + ".");
});