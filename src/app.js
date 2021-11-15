const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const views = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', views)
hbs.registerPartials(partialPath)
app.use(express.static(publicDirectoryPath));

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Weather App',
    name: 'Avinash Kini'
  });
});

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Avinash Kini'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    msg: 'Help section to get to know things about this website.',
    title: 'Weather App',
    name: 'Avinash Kini'
  });
});

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    res.send({
      error: 'You must provide an address'
    });
    return false;
  }

  geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      res.send({ error });
      return false;
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        res.send({ error });
        return false;
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    res.send({
      error: 'You must provide a search term'
    });
    return false;
  }
  console.log(req.query.search);
  console.log(req.query.rating);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('pageNotFound', {
    msg: 'Help Article not Found',
    title: '404',
    name: 'Avinash Kini'
  });
});

app.get('*', (req, res) => {
  res.render('pageNotFound', {
    msg: 'The page you are looking for does not exist',
    title: '404',
    name: 'Avinash Kini'
  });
});



app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
