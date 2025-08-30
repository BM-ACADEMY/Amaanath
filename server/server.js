// server.js
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./config/db");
const mainHeadingRoutes = require("./routes/mainHeadingRoutes");
const subHeadingRoutes = require("./routes/subHeadingRoutes");
const realEstateContentRoutes = require("./routes/realEstateContentRoutes");

dotenv.config();
const app = express();

// ✅ Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// ✅ Setup CORS
const allowedOrigins = [process.env.CLIENT_URL];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/api/main-headings", mainHeadingRoutes);
app.use("/api/sub-headings", subHeadingRoutes);
app.use("/api/contents", realEstateContentRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
