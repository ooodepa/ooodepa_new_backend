const express = require('express');

const appSettings = require('./config/app.settings');

const app = express();

app.listen(appSettings.APP__PORT, function () {
  console.log(`Server: ${appSettings.APP__HOST}:${appSettings.APP__PORT}`);
});

app.use('/api', require('./routes/swagger'));
app.use('/api', require('./routes/swagger.json/'));
app.use('/api', require('./routes/redoc'));
