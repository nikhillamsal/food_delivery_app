const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "MyNameIsNikhilAndThisIsMyProject";

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('location', 'Enter a valid location').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secpassword = await bcrypt.hash(req.body.password,salt)
    try {
        await User.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: secpassword
        });
        res.json({ success: true });
    }
    catch (err) {
        console.log(err);
        res.json({ success: false });
    }
});

router.post('/loginuser',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    
    try {
        let userData = await User.findOne({email})
        if (!userData) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const compPassword = await bcrypt.compare(req.body.password,userData.password);
        if (!compPassword) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: userData.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret);
        return res.json({ success: true, authToken: authToken });
    }
    catch (err) {
        console.log(err);
        res.json({ success: false });
    }
});
module.exports = router;