const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const Todo = require('../models/todoSchema');
const User = require('../models/user')
const checkLogin = require('../middlewares/cheklogin');


// get all todos 
router.get('/', checkLogin, async(req, res) => {
        try {
            console.log(req.email)
            const data = await Todo.find({})
                .populate('user', "name email -_id")
                .select({
                    __v: 0,
                    date: 0,
                }).limit(2)
                .exec()
            res.status(200).json({
                result: data,
                message: "todo was updated successfully"
            });

        } catch (err) {
            res.status(500).json({
                error: "There was a server side error!"
            });
        }

    })
    // get all active 
router.get('/actives', async(req, res) => {

        try {
            const todo = new Todo()
            const data = await todo.findActive()
            res.status(200).json({
                data: data,
                message: 'Success'
            })
        } catch (err) {
            res.status(200).json({
                error: err.message
            })
        }
    })
    // get active with callback 
router.get('/actives-callback', (req, res) => {
        const todo = new Todo()
        todo.findActiveCallBack((err, data) => {
            res.status(200).json({
                data: data
            })
        })




    })
    // custom statics methods use for custom function
router.get('/js', async(req, res) => {
        try {
            const data = await Todo.findByJS()
            res.status(200).json({
                data: data
            })
        } catch (err) {
            res.status(200).json({
                error: err.message
            })
        }

    })
    // get todos by query helper custom
router.get('/lang', async(req, res) => {
    try {
        const data = await Todo.find().byLanguage('mongo')
        res.status(200).json({
            data: data
        })
    } catch (err) {
        res.status(200).json({
            error: err.message
        })
    }

})

// await Todo.find({ status: "active" }, (err, data) => {
//         if (err) {
//             res.status(500).json({
//                 error: "There was a server side error!"
//             });
//         } else {
//             res.status(200).json({
//                 result: data,
//                 message: "todo was updated successfully"
//             });
//         }
//     })
// try catch
// try {
//     const result = await Todo.find({ status: "active" })
//     res.status(200).json({
//         result: result,
//         message: "todo was updated successfully"
//     });

// } catch (err) {
//     res.status(500).json({
//         error: "There was a server side error!"
//     });
// }

//get a todo by id 
router.get('/:id', async(req, res) => {
    try {
        const data = await Todo.find({ _id: req.params.id })
        res.status(200).json({
            result: data,
            message: "todo was updated successfully"
        });
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!"
        });
    }

})

// post a todo 
router.post('/', checkLogin, async(req, res) => {
    try {
        const NewTodo = new Todo({
            ...req.body,
            user: req._id
        })

        const todo = await NewTodo.save();
        await User.updateOne({
            _id: req._id
        }, {
            $push: {
                todos: todo._id
            }
        })

        res.status(200).json({
            message: "todo was inserted successfully"
        });
    } catch (err) {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!"
            });
        }
    }


})

// post multiple todo
// router.post('/all', async(req, res) => {
//         await Todo.insertMany(req.body, (err) => {
//             if (err) {
//                 res.status(500).json({
//                     error: "There was a server side error!"
//                 });
//             } else {
//                 res.status(200).json({
//                     message: "todo was inserted successfully"
//                 });
//             }
//         })

//     })
// with try catch
router.post('/all', async(req, res) => {
        try {
            await Todo.insertMany(req.body)
            res.status(200).json({
                message: "todo was inserted successfully"
            });
        } catch (err) {
            if (err) {
                res.status(500).json({
                    error: "There was a server side error!"
                });
            }
        }


    })
    // put todo 
router.put('/:id', async(req, res) => {
        try {
            const result = await Todo.findByIdAndUpdate({ _id: req.params.id }, {
                $set: {
                    status: 'active',
                    title: 'Express  js and mongo'
                },
            }, {
                new: true,
                useFindAndModify: false
            }, )
            console.log(result)
            res.status(200).json({
                message: "todo was updated successfully"
            });
        } catch (err) {
            res.status(200).json({
                message: "todo was updated successfully"
            });
        }
        // const result = await Todo.findByIdAndUpdate({ _id: req.params.id }, {
        //         $set: {
        //             status: 'inactive',
        //             title: 'Express js'
        //         },
        //     }, {
        //         useFindAndModify: false
        //     },

        //     (err) => {
        //         if (err) {
        //             res.status(500).json({
        //                 error: "There was a server side error!"
        //             });
        //         } else {
        //             res.status(200).json({
        //                 message: "todo was updated successfully"
        //             });
        //         }
        //     });
        // console.log(result)
    })
    // delete todo
router.delete('/:id', async(req, res) => {
    try {
        const data = await Todo.deleteOne({ _id: req.params.id })
        res.status(200).json({

            message: "todo was deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!"
        });
    }

})
router.delete('/:id', async(req, res) => {
    try {
        const result = await Todo.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({

            message: "todo was deleted successfully"
        });
        console.log(result)
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!"
        });
    }

})

module.exports = router;