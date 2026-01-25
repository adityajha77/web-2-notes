const express = require("express");
const z = require("zod");
const bcrypt = require("bcrypt");
const { connectdatabase, UserModel, BlogModel } = require("./db");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname)); // This serves your HTML/CSS/JS

// Middleware
function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verifyToken.id;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
}

// Schemas
const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
    name: z.string(),
});

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

// Routes
app.post("/signup", async function (req, res) {
    const checkIncomingData = signupSchema.safeParse(req.body);
    if (!checkIncomingData.success) {
        return res.status(400).json({ message: "Invalid data format" });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        await UserModel.create({
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name
        });
        res.json({ message: "User successfully signed up!" });
    } catch (error) {
        res.status(400).json({ message: "User already exists" });
    }
});

app.post("/signin", async function (req, res) {
    const parsed = signinSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ message: "Invalid input" });
    }

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(403).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(403).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET);
    res.json({ token });
});

app.post("/blogpost", auth, async function (req, res) {
    const { title, content } = req.body;
    try {
        const blog = await BlogModel.create({
            title: title,
            content: content,
            authorId: req.userId
        });
        res.json({ message: "Blog created successfully", blog });
    } catch (error) {
        res.status(403).json({ message: "Error creating blog" });
    }
});

// Start Server
connectdatabase();
app.listen(3000, () => console.log("Server running on port 3000"));