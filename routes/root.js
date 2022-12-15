import express from 'express';
import path from "path";
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();
const __dirname = path.resolve();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})


router.use('/register', await import("./register.js").then((res) => res.default));
router.use('/auth', await import("./auth.js").then((res) => res.default));

router.use(verifyJWT);
router.use('/users', await import("./api/users.js").then((res) => res.default));

router.all('*', (req, res) => {
    res.status(404);
    res.json({ "error": "404 Not Found" });

    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});




export default router ;