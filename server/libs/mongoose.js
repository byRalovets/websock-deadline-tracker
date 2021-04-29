const mongoose = require('mongoose');

const url = 'mongodb+srv://harry_potter:F60nnNRFFru1LIVK@cluster0.rivuz.mongodb.net/deadline-tracker?retryWrites=true';

mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(url, {useNewUrlParser: true})
    .then(() => console.log('Connection to database was established successfully'));

module.exports = mongoose;
