var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/* Campground.create({
    name: "Mountain Goat's Rest", 
    image: "https://images.unsplash.com/photo-1466971060667-16467c7d04ee?dpr=1&auto=format&fit=crop&w=1080&h=473&q=80&cs=tinysrgb&crop=",
    desc: "A rest full of mountain goats"
}, function (err, campground) {
    console.log(campground);
}); */

var campgrounds = [
        {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1466971060667-16467c7d04ee?dpr=1&auto=format&fit=crop&w=1080&h=473&q=80&cs=tinysrgb&crop="},
        {name: "Granite Hill", image: "https://images.unsplash.com/photo-1466971060667-16467c7d04ee?dpr=1&auto=format&fit=crop&w=1080&h=473&q=80&cs=tinysrgb&crop="},
        {name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1466971060667-16467c7d04ee?dpr=1&auto=format&fit=crop&w=1080&h=473&q=80&cs=tinysrgb&crop="}
    ];

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

app.post("/campgrounds", function (req, res) {
    var image = req.body.image;
    var name = req.body.name;
    var desc = req.body.desc;
    
    Campground.create({
        name: name,
        image: image,
        desc: desc
    }, function (err, campground) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
            console.log(campground);
        }
    });
});

app.get("/campgrounds/new", function (req, res) {
   res.render("newCampground");
});

app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {campground: campground});
        }
    })
    
})
app.listen(3000, function () {
    console.log("Server started");
});