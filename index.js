const express = require('express')
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList = [
    {
        name: 'Tom',
        phone: '9899166745',
    },
    {
        name: 'John',
        phone: '9899166769'
    },
    {
        name: 'John',
        phone: '9899166769'
    }
];

app.get('/', function (req, res) {

    Contact.find({}, function (err, contacts) {
        if (err) {
            console.log("Error in fetching contacts.");
            return;
        }

        return res.render('home', {
            title: 'Contact List',
            contact_list: contacts
        });
    });
});

app.get('/practice', function (req, res) {
    return res.render('practice', { title: 'Practice' });
});

app.post('/create-contact', function (req, res) {
    //contactList.push(
    //    {
    //        name: req.body.name,
    //        phone: req.body.phone,
    //    }
    //);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone,
    }, function (err, newContact) {
        if (err) {
            console.log('Error in creating contact.');
            return;
        }
        console.log('********', newContact);
        return res.redirect('back');
    });
});

app.get('/delete-contact/', function (req, res) {
    let id = req.query.id;
    Contact.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log('Error in deleting contact.');
            return;
        }
        return res.redirect('back');
    });
});

app.listen(port, function (err) {
    if (err) {
        console.log('Error ', err);
    }

    console.log('Express is running on port: ', port);
});