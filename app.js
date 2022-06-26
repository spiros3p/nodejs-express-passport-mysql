// configure .ENV file
const dotenv = require("dotenv");
dotenv.config();

// EXPRESS 
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const viewsRoutes = require('./routes/views'); // html
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const errorController = require('./controllers/error');

// PASSPORT 
const passport = require('passport');
const session = require('express-session');
const initializePassport = require('./passport/passport-config');
initializePassport(passport);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  // --------- USE for same origin - e.g., the html auth branch of this repo ---------
  res.setHeader('Access-Control-Allow-Origin', '*');
  // 
  // --------- USE BELOW for CORS on SPA ---------
  // const allowedOrigins = [process.env.FRONT_END_IP, 'http://localhost', 'http://localhost:4200', 'http://localhost:3306', 'http://0.0.0.0', 'http://0.0.0.0:4200', 'http://127.0.0.1', 'http://127.0.0.1:4200', 'http://127.0.0.1:3306'];
  // const origin = req.headers.origin;
  // if (allowedOrigins.includes(origin)) {
  //   res.setHeader('Access-Control-Allow-Origin', origin);
  // }
  // 
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Credentials',
    true
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept, X-Custom-Header, Authorization, Access-Control-Allow-Headers, Origin, X-Requested-With, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// serve the static files from public folder - like css, js, images or even (optionally) index.js
app.use(express.static("public"));

/* // SWAGGER - start
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Radio Management Server API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
	},
	apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);
const swaggerResourceDocument = require('./openapiTMF639.json');
app.use("/rms-api-docs", swaggerUI.serve, (...args) => swaggerUI.setup(specs)(...args));
app.use("/resource-api-docs", swaggerUI.serve, (...args) => swaggerUI.setup(swaggerResourceDocument)(...args));
// SWAGGER - end */

// const proxyRoutes = require('./routes/proxy');
// app.use('/proxy', proxyRoutes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/auth', authRoutes);
// app.use('/admin', adminRoutes);
app.use('/', viewsRoutes);

app.use(errorController.get404);
app.use(errorController.get500);

app.listen(3000, () => {
  console.log('Auth server running on port 3000');
})