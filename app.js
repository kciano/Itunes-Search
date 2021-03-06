const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require("path");

const app = express();

const searchRoutes = require('./modules/search');

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api', searchRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));