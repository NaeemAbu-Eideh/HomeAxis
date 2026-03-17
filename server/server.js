const express = require("express");
const cors = require('cors')
const app = express();

require('dotenv').config();

const port = process.env.PORT || 3001;

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors());

require("./config/mongoose.config");



const AllMyUserRoutes = require("./routes/user.route");

AllMyUserRoutes(app);


app.listen(port, () => console.log(`Listening on port: ${port}`) );
