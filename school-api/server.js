const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB } = require("./database/connection");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");

const app = express();

app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/students", require("./routes/studentsRoutes"));
app.use("/courses", require("./routes/coursesRoutes"));

// Swagger 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Port
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});