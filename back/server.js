const cookieParser = require('cookie-parser');
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())


mongoose.connect(process.env.DATABASE_URL)
        .then(()=>{
            app.use('/', require('./src/user/user.routes'));
            app.use('/', require('./src/note/note.routes'));

            console.log("Connected to dataBase");
        })
        .catch((error)=>{
            console.log("error : ", error);
        })




app.listen(process.env.PORT, () => {
    console.log("Server is runing on port ", process.env.PORT);
})
//https://jsonplaceholder.typicode.com/posts
