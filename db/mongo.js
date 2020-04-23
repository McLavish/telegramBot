const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_CNN, {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
        // we're connected!
        console.log("connected");
});