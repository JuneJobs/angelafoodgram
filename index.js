var _webPort = 8080;
var _path = __dirname + '/';
var express = require("express");
const app = express();
const router = express.Router();

app.use("/", router);

var allowCORS = function (req, res, next) {
    res.header('Acess-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    (req.method === 'OPTIONS') ?
        res.send(200) :
        next();
};

app.listen(_webPort, function () {
    console.log("The server is working on the port 8080.");
});
console.log(__dirname);
app.use('/css', express.static(__dirname + "/webclient/css"));
app.use('/js', express.static(__dirname + "/webclient/js"));
//app.use('/data', express.static(__dirname + "/"));

app.get("/css/bootstrap.min.css", function (req, res) {
    res.sendFile("./webClient/css/bootstrap.min.css", {
        'root': _path
    });
});
app.get("/css/dc.css", function (req, res) {
    res.sendFile("./webClient/css/dc.css", {
        'root': _path
    });
});
app.get("/js/d3.js", function (req, res) {
    res.sendFile("./webClient/js/d3.js", {
        'root': _path
    });
});
app.get("/js/dc.min.js", function (req, res) {
    res.sendFile("./webClient/js/dc.min.js", {
        'root': _path
    });
});
app.get("/js/crossfilter.js", function (req, res) {
    res.sendFile("./webClient/js/crossfilter.js", {
        'root': _path
    });
});
app.get("/js/chart.js", function (req, res) {
    res.sendFile("./webClient/js/chart.js", {
        'root': _path
    });
});


app.get("/", function (req, res) {
    res.sendFile("./webClient/index.html", {
        'root': _path
    });
});

app.get("/data/industry.csv", function (req, res) {
    res.sendFile("./webClient/data/industry.csv", {
        'root': _path
    });
    console.log("file sent");
});
