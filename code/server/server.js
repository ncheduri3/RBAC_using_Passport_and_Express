// imported libraries
const express = require('express')
const helmet = require('helmet')
const next = require('next')
const session = require('express-session')
const dotenv = require('dotenv')

//imported custom middleware
const isAuth = require('./routes/authCheckMiddleware').isAuth;

// Authentication
const passport = require('passport');
const localStr = require('./strategies/local');

// precaution against denial of service
const toobusy = require('toobusy-js');

dotenv.config()

// create the database 
const db = require("./models");

db.sequelize.sync().then(()=> console.log("db ready"));

var logger = require('morgan');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


app.prepare().then(() => {
    const server = express()
    // frontend sends data in "application/json" or "application/x-www-form-urlencoded"

    // Denial of Service
    // if overwhelm, sends 503 server too busy
    // server.use(function(req, res, next) {
    //     if (toobusy()) {
    //         // log if you see necessary
    //         res.send(503, "Server Too Busy");
    //     } else {
    //     next();
    //     }
    // });

    server.use(express.urlencoded({ extended: true, limit: "1kb" })); // add request size limit
    server.use(express.json({limit: "1kb"})) // add request size limit

    // needed for passport 
    server.use(session({secret: 'anything', resave: false, cookie: {maxAge: 24 * 60 * 60 * 1000}, saveUninitialized: false }));
    
    // login

    /* Refersh the passport middleware for every route, 
    to ensure that the session hasn't become stale*/
    server.use(passport.initialize()); 

    /* express-session gives us access to req.session object and anything
    that we store req.session obj inside the routes is going to be persisted
    to the database. Passport uses this for authentication. */
    server.use(passport.session());

    //middleware to help in debugging
    server.use((req, res, next) => {
        console.log(req.session);
        console.log(req.user);
        next();
    });

    //healthcheck
    server.use('/healthcheck', (req, res) => { return res.status(200).send("")}) 

    // dummy path 
    server.use('/dummy', isAuth, require('./routes/dummy'))
    
    // api path 
    server.use('/api', require('./routes/api'))   

    // route corresponding to /
    server.post('/',require('./routes/index'))

    // registration path
    server.post('/reg',require('./routes/reg'))

    // login path
    server.post('/login',require('./routes/login'))

    // logout path
    server.post('/logout',require('./routes/logout'))

    // all the routes not defined in express will be handled by nextjs
    server.all("*/*", (req, res) => {
        return handle(req, res);
    });
    
    server.use(helmet())
    // define PORT
    const PORT = process.env.PORT || 5000
    
    
      // https
    //   .createServer({
    // 	key: fs.readFileSync("./server/norp.key"),
    // 	cert: fs.readFileSync("./server/norp.crt"),
    //   },app)
    //   .listen(PORT, ()=>{
    // 	console.log(`Server running at port ${PORT}`);
    // });

    // start server 
    server.listen(PORT, ()=>{
        console.log(`Server running at http://localhost:${PORT}`);
    }); 
});


