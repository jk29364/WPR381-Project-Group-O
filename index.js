const express = require("express");
const path = require("path");

const app = express();

// Tell Express to use EJS for rendering pages
app.set("view engine", "ejs");

// Serve files from the public folder (CSS, images, JS)
app.use(express.static(path.join(__dirname, "public")));

// Allow Express to read form data submitted by users
app.use(express.urlencoded({ extended: true }));


// HOME PAGE
app.get("/", (req, res) => {
    res.render("index", {
        events: [],
        user: null,
        search: ""
    });
});

// EVENTS PAGE
app.get("/events", (req, res) => {
    res.render("events", {
        events: [],
        user: null,
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

// DASHBOARD PAGE
app.get("/dashboard", (req, res) => {
    res.render("dashboard", {
        user: { name: "Test User", role: "user" },
        bookings: [],
        event: null,
        success: null,
        error: null
    });
});

// CONTACT PAGE
app.get("/contact", (req, res) => {
    res.render("contact", {
        user: null,
        success: null,
        error: null
    });
});

// ADMIN PAGE
app.get("/admin", (req, res) => {
    res.render("admin", {
        user: { name: "Admin", role: "admin" },
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
