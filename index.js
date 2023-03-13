const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const hotelRoutes = require('./src/routes/hotel');
const liveRoutes = require('./src/routes/lives');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

// app.use((req, res, next) => {
//     res.setHeader("Acces-Control-Allow-Origin", "*");
//     res.setHeader(
//         "Acces-Control-Allow-Origin-Methods", 
//         "GET, POST, PUT, PATCH, DELETE, OPTIONS"
//     );
//     res.setHeader(
//         "Acces-Control-Allow-Headers", 
//         "Content-Type", 
//         "Authorization"
//     );
//     next();
// });

// handling upload image
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg'
    ) {
        cb(null, true);
    } else {
        cb(null, true);
    }
};

app.use(cors());
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images"))); //middleware to access image
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single("image"));

app.use("/v1/api/hotel", hotelRoutes);
app.use("/v1/api/live", liveRoutes);

// handle error
app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
});

// serve
// const PORT = 8080;

require('dns').resolve('www.google.com', function(err) {
    if (err) {
       console.log("Connection Fail!");
       stop
    } else {
        console.log("Connection Success!")
    }
});

// mongoose.connect('mongodb+srv://dc:272829@cluster0.ukrbjbv.mongodb.net/tamasengge?retryWrites=true&w=majority')
mongoose.connect('mongodb+srv://dc:272829@cluster0.ukrbjbv.mongodb.net/tamasengge?appName=mongosh+1.8.0')
// mongoose.connect('mongodb://localhost:27017/tamasengge?appName=mongosh+1.8.0')
.then(() => {
    app.listen(process.env.PORT || 8080, () => console.log("Connected"))
})
.catch(err => console.log('Error :=> ', err))
