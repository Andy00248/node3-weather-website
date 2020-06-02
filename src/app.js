const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Abhi',
        footNotes: 'Created by'
    });
});

const obj = {
    name: 'Abhi',
    age: 27,
    gender: 'Male'
};

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        message: 'This website is for fetching real-time weather info for any location.',
        footNotes: 'Created by',
        name: 'Abhi',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Abhi',
        footNotes: 'Created by'
    });
});

app.get('/weather', (req, res) => {
    const { address } = req.query;
    if(!address) {
       return res.send({
           error: "Please provide the address"
       }) 
    }

    geocode(address, (error, {latitude, longitude, location}={})=>{
        if(error) {
            return res.send({
                "error": error,
            });
        }

        forecast(latitude, longitude, (error, foreCastData) => {
            if(error) {
                return res.send({
                    "error": error,
                });
            }

            return res.send({
                foreCast: foreCastData,
                location: location,
                address
            });
        });
    });

    // res.send({
    //     forecast: 'clear and sunny',
    //     location: 'Bengaluru',
    //     address: address
    // });
});

app.get('/products', (req, res) => {
    const { query } = req;
    console.log(query);
    console.log(query.productid);
    res.send({
        products: []
    });
});

app.get('/test', (req, res)=>{
    res.send("Test Successful!")
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found',
        name: 'Abhi',
        title:'404 Error'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found',
        name: 'Abhi',
        title:'404 Error'
    });
});

app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
});