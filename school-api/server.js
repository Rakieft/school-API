const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB } = require("./database/connection");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");


const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/students", require("./routes/studentsRoutes"));
app.use("/courses", require("./routes/coursesRoutes"));

app.listen(process.env.PORT, () => {
  console.log("🚀 Server running");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));