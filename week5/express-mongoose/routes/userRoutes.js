const express = require('express');
const User = require('../models/users');
const router = express.Router();
const bcrypt = require('bcryptjs');

//const { getAllUsers } = require('../controllers/userControllers');
const userController = require('../controllers/userControllers');

router.get('/', userController.getAllUsers);


// router.get('/', (req, res) => {
//     console.log('hello');
//     User.find().then((users) => {
//         return res.json(users);
//         //return res.status('Hello');
//         //return res.status(200).json(users);
//     }).catch(err=>err);
// })



// router.get('/', (req, res) => {
//     if(users.length == 0) {
//         return res.status(404).json({confirmation: 'failed', message: "No users found"});
//     }
//     return res.status(200).json({ confirmation: 'success', users });
// });

// router.get('/:id', (req, res) => {
//     const user = users.filter(user => user.id === req.params.id);

//     if(user.length == 0) {
//     return res.status(404).json({confirmation: 'failed', message: "User not found"});
//     }

//     return res.status(200).json({confirmation: 'success', user});
//     //res.send(req.params.id);
// });

// /*
// // create user
// router.post('/', (req, res) => {
//     return res.json(req.body);
// });
// */

//REDIRECT
//doesn't matter whether it is get, post, put, delete
// router.post('/pass', (req, res) => {
//   //do whatever you want in here then
//   res.redirect(`/api/v1/mypath`);
// });
// router.get('/mypath', (req, res) => {
//   res.send('This is the redirected path');
// });

router.post('/createUser', (req, res) => {
    const {name, email, password} = req.body;
    if(name.length == 0 || email.length == 0) {
        return res
            .status(504)
            .json({confirmation: 'fail', message: 'All fields must be completed'});
    }

    User.findOne({email: req.body.email})
        .then((user) => {
            if(user) {
                return res.status(400).json({confirmation: 'fail', message: 'User already exists'});
            }

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            const newUser = new User();
            newUser.name = req.body.name;
            newUser.email = req.body.email;
            newUser.password = hash;

            return newUser.save().then(user=> {
                return res.status(200).json({confirmation: "success", user});
            }).catch(err => {
                res.json({
                    confirmation: 'fail',
                    message: 'user not saved to database'
                });
            });
        }).catch(err => {
            res.json({
                confirmation: 'fail',
                message: 'server error'
            });
        });
});

// Find one user
router.get('/getbyid/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id)
    .then((user) => {
        if(user) {
            return res.status(200).json({
                confirmation: 'success', user
            });
        } else {
            return res
                .status(404)
                .json({
                    confirmation: 'fail',
                    message: 'User not found'
                })
        }
    })
    .catch((err) => {
        res.json({
            confirmation: 'fail',
            message: 'Server error'
        });
    });
})


// login user
router.post('/login', (req, res) => {
    User.findOne({email: req.body.email}).then(user => {
        if(user) {
            //const matchPassword = user.password == req.body.password ? true : false;
            const matchPassword = bcrypt.compareSync(req.body.password, user.password);

            if(!matchPassword) {
                return res.status(404).json({ message: 'Incorrect input' });
            } else {
                return res.status(200).json({ message: 'You are logged in' });
            }
        } else {
            return res.status(404).json({ message: 'Incorrect input' });
        }
    });
});

// Update user
router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id).then(user => {
        if(!user) {
            return res
                .status(404)
                .json({confirmation: 'fail', message: 'User not found'});
        } else {
            const updatedUser = req.body;

            user.name = updatedUser.name ? updatedUser.name : user.name;
            user.email = updatedUser.email ? updatedUser.email : user.email;

            user.save().then(user => {
                return res.status(200).json({message: "user updated", user});
            }).catch(err=>res.json({confirmation: "fail", message: "User not updated"}));
        }
    });
});

// Delete user
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id).then(() => {
        return res.status(200).json({message: 'User deleted'});
    })
    .catch(err => res.status(404).json({ message: 'User not found'}));
});

// // create user
// router.post('/', (req, res) => {
//     if(!req.body.name || !req.body.email || !req.body.password) {
//         return res
//             .status(400)
//             .json({ confirmation: "failed", message: "You must specify username, email, password"})
//     }

//     const user = users.filter(user => user.email === req.body.email);

//     if(user.length > 0) {
//         return res.status(400).json({ confirmation: 'fail', message: "user already exists" });
//     }

//     let newUser = {};

//     newUser.id = Date.now();
//     newUser.name = req.body.name;
//     newUser.email = req.body.email;
//     newUser.password = req.body.password;

//     users.push(newUser);

//     return res.status(201).json({ message: 'User created', users })
// });

// // Update user
// router.put('/:id', (req, res) => {
//     const user = users.filter(user => user.email === req.body.email);
//     let updatedUser = req.body;

//     if(user.length > 0) {
//         user.name = updatedUser.name ? updatedUser.name : user.name;
//         user.email = updatedUser.email ? updatedUser.email : user.email;
//     }
// });

// // Delete user
// router.delete('/:id', (req, res) => {
//     const user = users.filter(user => user.id !== req.params.id);

//     return res.status(200).json({ message: 'User deleted', user });
// });

// /*
// hEADERS:
// Content-Type: application/json


// POST mode body:
// {
// "name":"hans",
// "email":"eh@eh.com",
// "password":"woo"
// }






// */


module.exports = router;