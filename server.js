const cookieParser = require('cookie-parser');
const express = require('express')
const mongoose = require('mongoose');
// const Reservation = require('./src/reservation/reservation.model');
require('dotenv').config();
const app = express();

// middllware
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


// app.get('/set-cookie', (req, res) => {
//   res.cookie('userId', 'coockie   2', { maxAge: 30000, httpOnly: true }); // Set a cookie with options
//   res.send('Cookie has been set');
// });

// const checkAuthentication = (req, res, next) =>{
//     if (!req.cookies.userId){
//         res.status(4901).send(401)("unauthorized");
//     }
//     next();
// }

// app.get('/notes', checkAuthentication, (req, res) =>{
//     res.send("NOTES");
// })

app.listen(process.env.PORT, () => {
    console.log("Server is runing on port ", process.env.PORT);
})