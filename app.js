const express = require('express');
const cors = require('cors');

const appSettings = require('./config/app.settings');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', require('./routes/swagger'));
app.use('/api', require('./routes/swagger.json'));
app.use('/api', require('./routes/redoc'));
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/contact-types'));
app.use('/api', require('./routes/contacts'));

app.listen(appSettings.APP__PORT, function () {
  console.log(`Server: ${appSettings.APP__HOST}:${appSettings.APP__PORT}`);
});
