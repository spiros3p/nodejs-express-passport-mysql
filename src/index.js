import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { initializePassport } from './passport/passport.config.js';
import { get404, get500 } from './controllers/error.controller.js';
import authRoutes from './routes/authentication.route.js';
import adminRoutes from './routes/admin.route.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

// PASSPORT
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// HEADER Configuration
app.use((req, res, next) => {
    // --------
    res.setHeader('Access-Control-Allow-Origin', '*');
    // --------
    /**
     * For CORS
     */
    // --------
    // const allowedOrigins = [process.env.FRONT_END_IP, 'http://localhost', 'http://localhost:4200', 'http://localhost:3306', 'http://0.0.0.0', 'http://0.0.0.0:4200', 'http://127.0.0.1', 'http://127.0.0.1:4200', 'http://127.0.0.1:3306'];
    // const origin = req.headers.origin;
    // if (allowedOrigins.includes(origin)) {
    //   res.setHeader('Access-Control-Allow-Origin', origin);
    // }
    // --------
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Accept, X-Custom-Header, Authorization, Access-Control-Allow-Headers, Origin, X-Requested-With, Access-Control-Request-Method, Access-Control-Request-Headers'
    );
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

// ROUTES
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

// ERRORS
app.use(get404);
app.use(get500);

// START server
const PORT = process.env.PORT_BE || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
