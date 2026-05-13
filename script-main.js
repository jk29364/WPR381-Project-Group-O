const express = require("express");
const bcrypt = require("bcrypt");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// view engine (EJS)
app.set("view engine", "ejs");

// routes
app.get("/", (req, res) => {
    res.render("register");
});

// server-side validation + registration
app.post("/register", async (req, res) => {

    const { email, password, passwordConfirm } = req.body;

    // backend validation (IMPORTANT even if frontend checks exist)
    if (!email || !password || !passwordConfirm) {
        return res.status(400).json({ error: "Missing fields" });
    }

    if (password !== passwordConfirm) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("NEW USER:");
        console.log("Email:", email);
        console.log("Hash:", hashedPassword);

        // TODO: database insert goes here

        return res.json({ success: true });

    } catch (err) {
        return res.status(500).json({ error: "Server error" });
    }
});

// start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});