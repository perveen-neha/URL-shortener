
const express = require('express')
const path = require('path')
const connectToMongoDBAtlas = require('./connect.js');
const URL = require('./models/url')
const cookieParser = require('cookie-parser')
const {checkForAuthentication, restrictTo} =  require('./middlewares/auth')

const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/users')

const app = express();

app.set('view engine' , 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser())
app.use(express.static('views'));
app.use(checkForAuthentication)

app.use('/url', restrictTo(['NORMAL', 'ADMIN']), urlRoute)
app.use('/users', userRoute)
app.use('/' , checkForAuthentication, staticRoute)

app.get('/url/:shortId' , async (req,res)=> {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortID : shortId}, {
        $push : {
            visitHistory : {timeStamp : Date.now()}
        }
    })
    // const entry = await URL.find({shortId})
    console.log(entry);
    res.redirect(entry.redirectURL)
})

PORT = process.env.PORT || 3001;

app.listen(PORT, () => {console.log(`server listening at PORT: ${PORT}`);})
connectToMongoDBAtlas();


