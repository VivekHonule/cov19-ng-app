const express = require('express');
const path = require('path');
const ngApp = express();
ngApp.use(express.static('./dist/cov19-ng-app'));
ngApp.get('/*', function (request, response) {
  response.sendFile(path.join(__dirname, '/dist/cov19-ng-app/index.html'));
});
ngApp.listen(process.env.PORT || 8081);
