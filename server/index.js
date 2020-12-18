const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO, {
  useNewUrlParser : true,
  useCreateIndex : true,
  useUnifiedTopology : true,
  useFindAndModify : false,
});

const { connection } = mongoose;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
