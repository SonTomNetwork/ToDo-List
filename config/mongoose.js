const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contact_list_db', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;