var express = require('express');
var server = express();
server.use(express.static("./angularjs"));
server.listen(8080);