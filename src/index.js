const express = require('express');
const appSettings = require('./consts/app.settings');

const app = express();

app.listen(appSettings.port, function () {
  console.log(`Server: ${appSettings.host}:${appSettings.port}`);
});

app.use('/api', require('./routes/hello/GET/helloGet'));
app.use('/api', require('./routes/swagger/GET/swaggerGet'));
app.use('/api', require('./routes/swagger.json/GET/swaggerJsonGet'));
app.use('/api', require('./routes/redoc/GET/redocGet'));
