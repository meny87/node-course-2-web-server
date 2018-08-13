const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (textToScream) => {
    return textToScream.toUpperCase();
})


app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append server.log.');
        }
    });
    console.log(log);
    next();
});

//app.use((req, res, next) =>{
//   res.render('maintenance.hbs'); 
//});

app.get('/', (req, res) => {
    //res.send('Hello Express!');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Emmanuel hey'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
})

app.get('/portfolio', (req,res) =>{
   res.render('portfolio.hbs', {
       pageTitle: 'Portfolio Page Title'
   }) 
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill this request'
    });
});

app.listen(port, () => {
    console.log(`Server is ready in port ${port}`);
});