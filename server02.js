const path = require('path');
const Dataset = require('nedb');
const express = require('express');
const hbs = require('express-handlebars');

const app = express();
const PORT = 3000;

const cars = new Dataset({
    filename: 'cars.db',
    autoload: true
});

app.use(express.urlencoded({extended: true}));
app.use(express.static('static'));

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({
    extname: '.hbs',
    defaultLayout: 'main.hbs',
    partialsDir: path.join(__dirname, 'views/partials'),
}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index.hbs', {title: 'kars'});
});

app.post('/addVehicle', (req, res) => {
    const doc = {
        insured: req.body.insured === 'on' ? 'TAK' : 'NIE',
        gas: req.body.gas === 'on' ? 'TAK' : 'NIE',
        broken: req.body.broken === 'on' ? 'TAK' : 'NIE',
        fxf: req.body.fxf === 'on' ? 'TAK' : 'NIE'
    };

    cars.insert(doc, (err, addedDoc) => {
        if(err) {
            res.send("error while adding vehicle " + err.message);
        } else {
            res.render('index.hbs', {title: 'kars', vehicle: cars.getAllData()});
        }
    });
});

app.post('/removeVehicle', (req, res) => {
    console.log(req.body);
    cars.remove({_id: req.body.vehicle_id}, {}, (err, numRemoved) => {
        if(err) {
            res.send("error while removing vehicle " + err.message);
        } else if(numRemoved == 0) {
            res.send("can't find vehicle");
        } else {
            res.render('index.hbs', {title: 'kars', vehicle: cars.getAllData()});
        }
    });
});

app.listen(PORT, () => {
    console.log("server listening on port", PORT);
});