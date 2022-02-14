// configure .ENV file
const dotenv = require("dotenv");
dotenv.config();

// EXPRESS 
const express = require('express');

const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const adminRoutes = require('./routes/admin');

const errorController = require('./controllers/error');

const app = express();

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

app.use(bodyParser.json());

app.use((req, res, next) => {
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // 
  const allowedOrigins = [process.env.FRONT_END_IP, 'http://localhost', 'http://localhost:4200', 'http://localhost:3306', 'http://0.0.0.0', 'http://0.0.0.0:4200', 'http://127.0.0.1', 'http://127.0.0.1:4200', 'http://127.0.0.1:3306'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
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

app.use('/auth', authRoutes);

app.use('/admin', adminRoutes);

app.use(errorController.get404);

app.use(errorController.get500);

app.listen(3000, () => {
  console.log('Auth server running on port 3000');
})