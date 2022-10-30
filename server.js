const HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const app = express();

app.engine(".hbs", handlebars.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({ extended: true }));



// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    res.render("blog", { layout: false });
});

app.get("/article", function (req, res) {
    res.render("read_more", { layout: false });
});

app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "/login/login.html"));
});
app.post("/login", (req, res) => {
    var userdata = {
        user: req.body.username,
        pass: req.body.password,
        expression: /[~`!#@$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(req.body.username)
    }

    if (userdata.user == "" || userdata.pass == "") {

        res.render("login", { data: userdata, layout: false });
        return;
    }

    if (userdata.expression) {
        res.render("login", { data: userdata, layout: false });
        return;
    }

    res.render("dashboard", { layout: false });

});

app.get("/registration", function (req, res) {
    res.sendFile(path.join(__dirname, "/registration/registration.html"));
});
app.post("/registration", (req, res) => {

    var userdata = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        city: req.body.city,
        phonetest: /^\d{10}$/.test(req.body.phonenumber),
        Address1: req.body.Address1,
        Address2: req.body.Address2,
        postalcode: req.body.postalcode,
        postaltest: /^[AaBbCcEeGgHiJjKkLlMmNnPpRrSsTtVvXxYy]\d[A-Za-z] \d[A-Za-z]\d$/.test(req.body.postalcode),
        country: req.body.country,
        password: req.body.password,
        passwordtest: /^[0-9a-zA-Z]{6,12}$/.test(req.body.password),
        confirmpassword: req.body.confirmpassword,
    }

    checkpass = () => {
        if (userdata.password == userdata.confirmpassword) {
            return true;
        }
        return false;
    }

    userdata.checkpassword = checkpass;

    if (userdata.fname == "" ||
        userdata.lname == "" ||
        userdata.email == "" ||
        userdata.phonenumber == "" ||
        userdata.Address1 == "" ||
        userdata.city == "" ||
        userdata.postalcode == "" ||
        userdata.country == "" ||
        userdata.password == "" ||
        userdata.confirmpassword == "") {

        res.render("registration", { data: userdata, layout: false });
        return;
    }

    if (!userdata.phonetest) {
        res.render("registration", { data: userdata, layout: false });
        return;
    }
    if (!userdata.postaltest) {
        res.render("registration", { data: userdata, layout: false });
        return;
    }
    if (!userdata.passwordtest) {
        res.render("registration", { data: userdata, layout: false });
        return;
    }
    if (!userdata.checkpassword) {
        res.render("registration", { data: userdata, layout: false });
        return;
    }

    res.render("dashboard", { layout: false });

});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT);