var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [
        {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1466971060667-16467c7d04ee?dpr=1&auto=format&fit=crop&w=1080&h=473&q=80&cs=tinysrgb&crop="},
        {name: "Granite Hill", image: "https://images.unsplash.com/photo-1466971060667-16467c7d04ee?dpr=1&auto=format&fit=crop&w=1080&h=473&q=80&cs=tinysrgb&crop="},
        {name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1466971060667-16467c7d04ee?dpr=1&auto=format&fit=crop&w=1080&h=473&q=80&cs=tinysrgb&crop="}
    ];

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
    var image = req.body.image;
    var name = req.body.name;
    campgrounds.push({name: name, image: image});
    
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
   res.render("newCampground");
});

app.listen(3000, function () {
    console.log("Server started");
});