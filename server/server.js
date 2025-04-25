import express from "express";
import connectDB from "./config/db.js";
import routes from "./routes/routes.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

const app = express();

// Connect to MongoDB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cookieParser("pitstop"));
app.use(
  session({
    secret: "pitstop",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 60 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Define Routes
app.get("/", (req, res) => res.send("Pit Stop API Running"));