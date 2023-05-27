const mongoose = require('mongoose');

mongoose.connect('`mongodb+srv://aneeahanish:YAs1pXAHVvpDd8sn@cluster0.oqrtkfl.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});