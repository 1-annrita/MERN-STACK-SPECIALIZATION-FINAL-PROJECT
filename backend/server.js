const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const conditionRouter = require("./routes/conditionRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));


// Connect DB
connectDB();

// Routes
app.get("/", (req, res) => res.send("Conditions API is up and running..."));
app.use("/api/conditions", conditionRouter);

// app.use("/api/conditions", require("./routes/conditionRoutes"));
// app.use("/api/healthlogs", require("./routes/healthLogRoutes"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
