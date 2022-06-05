const express = require('express');
const developer = require('./src/controllers/developer');
const games = require('./src/controllers/games');

const port = 3000;

const app = express();

app.use('/', games);
app.use('/developer', developer);

app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));

app.listen(port, () => {
  console.log(`server nyala di localhost:${port}`);
});