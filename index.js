const express = require('express');
const path = require('path');
const port = 8000;
const moment = require('moment');

const db = require('./config/mongoose');
const Todo = require('./models/todo');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
app.locals.moment = require('moment');

app.get('/', function (req, res) {

    Todo.find({}, function (err, tasks) {
        if (err) {
            console.log("Error in fetching tasks.");
            return;
        }

        return res.render('home', {
            title: 'ToDo List',
            todo_list: tasks
        });
    });
});

app.get('/practice', function (req, res) {
    return res.render('practice', { title: 'Practice' });
});

app.post('/create-task', function (req, res) {
    Todo.create({
        name: req.body.name,
        deadline: req.body.deadline,
        category: req.body.category,
    }, function (err, newTask) {
        if (err) {
            console.log('Error in creating task.');
            return;
        }
        console.log('********', newTask);
        return res.redirect('back');
    });
});

app.get('/delete-task/', function (req, res) {
    let id = req.query.id;
    Todo.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log('Error in deleting TASK.');
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