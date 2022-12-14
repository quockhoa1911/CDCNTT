import express from "express"
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
import connectDB from "./config/connectDB"
import morgan from 'morgan'
import cors from "cors"
import { createJWT } from "./middleware/JWTActions"
import { verifyToken } from "./middleware/JWTActions"

require('dotenv').config();

let app = express();
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('combined'))

createJWT()
let decodedData = verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2NzA2NjQ1Mzl9.8dnzli7A9urcuWJM4C4RrSJUomArtTYc9PrRVn5MFds')
console.log(decodedData)

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

viewEngine(app)
connectDB();
initWebRoutes(app);

let port = process.env.PORT || 5000

app.listen(port, () => {
    console.log("Backend Node.JS on port:", port)
})
