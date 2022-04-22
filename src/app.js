import express from 'express';
import path from 'path';
import hbs from 'hbs';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import geoCode from './utils/geoCode.js';
import foreCast from './utils/foreCast.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//console.log(__dirname);
//console.log(path.join(__dirname, '../public'));



const app = express();
// define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars Engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

//Setup static directory to server
app.use(express.static(path.join(__dirname, '../public')));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Andrew Mead'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This page is for some of your help',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address details to inquire '
        })
    }

    geoCode(req.query.address, (error, { longitude, latitude, location } = {}) => {

        if (error) {
            return res.send({
                error: error
            })
        }

        foreCast(longitude, latitude, (error, foreCastdata) => {

            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                location: location,
                forecast: foreCastdata
            })

        })
    })

})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Andrew mead',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Andrew mead',
        errorMessage: 'Page not found'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})


