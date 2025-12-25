const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Auth Service is running on port ${PORT}`);
});