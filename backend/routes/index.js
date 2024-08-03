const express = require('express');
const router = express.Router();
const path = require('path');
const apiRouter = require('./api');
const { getRequestHandler } = require('next');

const dev = process.env.NODE_ENV !== 'production';
const next = require('next');
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

// Initialize Next.js
nextApp.prepare().then(() => {
    router.use('/api', apiRouter);

    // Serve the frontend's index.html file at the root route
    if (process.env.NODE_ENV === 'production') {
        router.get('/', (req, res) => {
            res.cookie('XSRF-TOKEN', req.csrfToken());
            handle(req, res);
        });

        // Serve the frontend's index.html file at all other routes NOT starting with /api
        router.get(/^(?!\/api).*/, (req, res) => {
            res.cookie('XSRF-TOKEN', req.csrfToken());
            handle(req, res);
        });
    }

    // Add a XSRF-TOKEN cookie in development
    if (process.env.NODE_ENV !== 'production') {
        router.get('/api/csrf/restore', (req, res) => {
            res.cookie('XSRF-TOKEN', req.csrfToken());
            res.status(201).json({});
        });
    }
});

module.exports = router;
