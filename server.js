const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const helmet = require('helmet');
const compression = require('compression');

app.use(cors({
  origin: '*', // 모든 출처 허용 옵션. true 를 써도 된다.
}));
app.use(compression());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('App is working'))

app.use('/api', routes)

app.listen(3000, () => console.log('Example app listening on port 3000!'))

module.exports = {
  app
}