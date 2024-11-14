require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
const cors = require("cors")


const app = express();

app.use(cors())


// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Routes
app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
