const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const Todo = require('../models/todoSchema');


// get all todos 
router.get('/', async(req, res) => {
        await Todo.find({ status: "active" }).select({
                _id: 0,
                __v: 0,
                date: 0,
            }).limit(2)
            .exec((err, data) => {
                if (err) {
                    res.status(500).json({
                        error: "There was a server side error!"
                    });
                } else {
                    res.status(200).json({
                        result: data,
                        message: "todo was updated successfully"
                    });
                }
            })
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
    await Todo.find({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!"
            });
        } else {
            res.status(200).json({
                result: data,
                message: "todo was updated successfully"
            });
        }
    })
})

// post a todo 
router.post('/', async(req, res) => {
    try {
        const NewTodo = await new Todo(req.body)
        NewTodo.save()
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
    await Todo.deleteOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!"
            });
        } else {
            res.status(200).json({

                message: "todo was deleted successfully"
            });
        }
    })
})
router.delete('/:id', async(req, res) => {
    const result = await Todo.findByIdAndDelete({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!"
            });
        } else {
            res.status(200).json({

                message: "todo was deleted successfully"
            });
        }
        console.log(result)
    })
})

module.exports = router;