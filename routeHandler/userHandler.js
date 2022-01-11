const mongoose = require('mongoose');
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router();
const User = require('../models/user')



// signUp 
router.post('/signup', async(req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(req.body.password, salt)
            const newUser = await new User({
                name: req.body.name,
                email: req.body.email,
                password: hashPass,
            })
            newUser.save()
            res.status(200).json({
                    message: "User created successfully",
                })
                //console.log(res.send())
        } catch (err) {
            res.status(500).json({
                error: err.message
            })
        }

    })
    // login
router.post('/login', async(req, res) => {
        console.log(req.body)
        try {
            const user = await User.findOne({ email: req.body.email })
            console.log('user', user)
            if (user) {
                console.log(user.password)
                const isValidPassword = await bcrypt.compare(req.body.password, user.password);

                console.log(isValidPassword)

                if (!isValidPassword) {
                    res.status(401).json({
                        error: "Authentication failed"
                    })
                }
                const token = user.generateJWT();
                console.log(token)
                res.status(200).json({
                    "access_token": token,
                })

                // if (isValidPassword) {
                //     // generate json web token 
                //     const token = jwt.sign({
                //         username: user[0].userName,
                //         userId: user[0]._id,
                //     }, process.env.JWT_Secret, {
                //         expiresIn: "1h"
                //     });
                //     res.send(token)

                //} 

            } else {
                res.status(401).json({
                    error: "Authentication  failed"
                })
            }

        } catch (err) {
            res.status(401).json({
                error: "Authentication failed"
            })
        }
    })
    // get all users 
router.get('/all', async(req, res) => {
    try {
        const users = await User.find({ status: 'active' })
            .populate('todos');
        res.status(200).json({
            data: users,
            message: "success"
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error"
        })
    }
})
module.exports = router;