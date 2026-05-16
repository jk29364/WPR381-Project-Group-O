const express = require("express");
const path = require("path");

const app = express();

// Tell Express to use EJS for rendering pages
app.set("view engine", "ejs");

// Serve files from the public folder (CSS, images, JS)
app.use(express.static(path.join(__dirname, "public")));

// Allow Express to read form data submitted by users
app.use(express.urlencoded({ extended: true }));

const sessionuser = null

// HOME PAGE
app.get("/", (req, res) => {
    res.render("index", {
        events: [],
        user: sessionuser,
        search: ""
    });
});

// EVENTS PAGE
app.get("/events", (req, res) => {
    res.render("events", {
        events: [],
        user: sessionuser,
        search: req.query.search || ""
    });
});

// LOGIN PAGE
app.get("/login", (req, res) => {
    res.render("login", {
        user: null,
        error: null
    });
});

// REGISTER PAGE
app.get("/register", (req, res) => {
    res.render("register", {
        user: null,
        error: null
    });
});

// CONFIRM PASSWORD PAGE
app.post('/confirmPass', (req, res) => {

    const { name, email, password } = req.body;

    res.render('confirmPass', {
        name,
        email,
        password
    });

});

//REGISTER POST
app.post('/register', async (req, res) => {
    
    const accman = require('./public/js/accman.js');

    const {
        name,
        email,
        password,
        passconf
    } = req.body;

    // Check passwords match
    if(password !== passconf){

        return res.render('confirmPass', {
            name,
            email,
            password,
            error: "Passwords do not match"
        });

    }

    try {

        await accman.register(name, email, password);

        res.redirect('/login');

    }
    catch(error){

        console.log(error);

        res.render('confirmPass', {
            name,
            email,
            password,
            error: "Failed to create account"
        });

    }

});

//LOGIN POST
app.post('/login', async (req, res) => {
    
    const accman = require('./public/js/accman.js');

    const {
        email,
        password
    } = req.body;

    try {

        sessionuser = await accman.login(email, password);

        res.redirect('/login');

    }
    catch(error){

        console.log(error);

        res.render('login', {
            email,
            password,
            error: "Failed to log in. " + error.message
        });

    }

    res.render('dashboard', {
        user: sessionuser
    })

});

// DASHBOARD PAGE
app.get("/dashboard", (req, res) => {
    res.render("dashboard", {
        user: sessionuser,
        bookings: [],
        event: null,
        success: null,
        error: null
    });
});

// CONTACT PAGE
app.get("/contact", (req, res) => {
    res.render("contact", {
        user: sessionuser,
        success: null,
        error: null
    });
});

// ADMIN PAGE
app.get("/admin", (req, res) => {
    res.render("admin", {
        user: sessionuser,
        events: [],
        enquiries: [],
        totalBookings: 0,
        totalEvents: 0,
        totalUsers: 0,
        success: null
    });
});

// START SERVER
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
