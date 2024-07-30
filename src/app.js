
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const hbs = require('hbs');
const path = require('path');
const geocode = require('./geocode');
const forecast = require('./forecast');

const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../temp1/views');

app.use(express.static(publicDir));
app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        desc: 'This Is Home Page'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }

    geocode(req.query.address, (error, { latitude, longtitude } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location: req.query.address,
                latitude,
                longtitude
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
