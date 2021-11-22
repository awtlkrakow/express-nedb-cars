const path = require('path');
const Dataset = require('nedb');
const express = require('express');
const hbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

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
    res.render('index2.hbs', {title: 'kars', vehicle: cars.getAllData()});
});

app.get('/editVehicle', (req, res) => {
    const vehicles = cars.getAllData().slice();
    const editIndex = vehicles.findIndex(vehicle => vehicle._id === req.query.id);
    if(editIndex === -1) {
        res.send("can't find vehicle");
    } else {
        vehicles[editIndex] = {...vehicles[editIndex], edit: true};
        res.render('index2.hbs', {title: 'kars', vehicle: vehicles});
    }
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
            res.redirect('/');
        }
    });
});

app.post('/updateVehicle', (req, res) => {
    const newDoc = {
        insured: req.body.insured,
        gas: req.body.gas,
        broken: req.body.broken,
        fxf: req.body.fxf
    };
    cars.update({_id: req.body.id}, {$set: newDoc}, {}, (err, numModified, _) => {
        if(err) {
            res.send("error while updating vehicle: " + err.message);
        } else if(numModified === 0) {
            res.send("can't find vehicle");
        } else {
            res.redirect('/');
        }
    });
});

app.post('/removeVehicle', (req, res) => {
    cars.remove({_id: req.body.id}, {}, (err, numRemoved) => {
        if(err) {
            res.send("error while removing vehicle " + err.message);
        } else if(numRemoved === 0) {
            res.send("can't find vehicle");
        } else {
            res.redirect('/');
        }
    });
});

app.all('/ri', (req, res) => {
    res.redirect(301, '/');
});

app.listen(PORT, () => {
    console.log("server listening on port", PORT);
});
