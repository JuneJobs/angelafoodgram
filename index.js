var _webPort = 8080;
var _path = __dirname + '/';
var express = require("express");
const app = express();
const router = express.Router();

app.use("/", router);
app.listen(_webPort, function () {
    console.log("The server is working on the port 8080.");
});

app.use('/css', express.static(__dirname + "/webclient/css"));
app.use('/js', express.static(__dirname + "/webclient/js"));
app.use('/data', express.static(__dirname + "/"));


app.get("/", function (req, res) {
    res.sendFile("./webClient/index.html", {
        'root': _path
    });
});

app.get("/data/ndx.csv", function (req, res) {
    res.sendFile("./webClient/data/ndx.csv", {
        'root': _path
    });
    console.log("file sent");
});
