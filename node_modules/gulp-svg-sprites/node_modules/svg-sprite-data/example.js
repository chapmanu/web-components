var SpriteData = require("./index");
var fs  = require("fs");

var config = {
    common: "icon",
    dims: true,
    layout: "diagonal",
    render: {
        css: true
    }
};

// Create instance
var spriter = new SpriteData(config);

// Read a file however you like
var path = "./test/fixtures/fb.svg";
var svg  = fs.readFileSync(path, "utf-8");

// Add the files CONTENTS only.
spriter.add(path, svg).compile(function (err, svg) {

    // Do crazy-ass shit with templates etc
    console.log(svg);

});