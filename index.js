let express = require("express");
let app = express();
let port = 3700;

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

app.get("/", function(req, res){
    res.render("page");
});

app.listen(port);
console.log("Listening on port: ", port);
