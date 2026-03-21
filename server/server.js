const express = require("express");
const cors = require('cors');
const path = require('path');
const app = express();

require('dotenv').config();

const port = process.env.PORT || 3001;

// Middleware
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

require("./config/mongoose.config");

const AllMyUserRoutes = require("./routes/user.route");
const AllMyApartmentRoutes = require("./routes/apartment.route");

AllMyUserRoutes(app);
AllMyApartmentRoutes(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));