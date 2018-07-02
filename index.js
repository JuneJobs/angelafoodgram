var _webPort = 3000; //Web server port
var _path = __dirname + '/';
//Import express module
var express = require("express");
const app = express();
const router = express.Router();

app.use("/", router);

//Client request listner
app.listen(_webPort, function () {
    console.log("The server is working on the port 3000.");
});
console.log(__dirname);
app.use('/css', express.static(__dirname + "/webclient/css"));
app.use('/js', express.static(__dirname + "/webclient/js"));

//Router
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
