var mongoose = require("mongoose");
var User = mongoose.model("User");

module.exports = {
    // ======================= LOGIN ======================= //
    logging_in: function(req, res) {
        User.findOne({ username: req.body.username }, function(e, user) {
            console.log("users / logging_in / findOne (user):", user);
            if(!user) {
                User.create({ username: req.body.username }, function(e, user) {
                    if(e){
                        console.log("users / logging_in / create (error):\n", e);
                    } else {
                        req.session.user = user;
                        req.session.save();
                        console.log("users / logging_in / created:", req.session.user);
                        res.json({user: req.session.user});
                    }
                });
            } else {
                User.findOne({ username: req.body.username }).populate({path: 'pendings'}).populate({path: 'mutuals'}).exec(function(e, user) {
                    if(e){
                        console.log("users / logging_in / populate (error):\n", e);
                    } else {
                        req.session.user = user;
                        req.session.save();
                        console.log("users / logging_in / populated:", req.session.user);
                        res.json({user: req.session.user});
                    }
                })
            }
        })
    },

    logged_in: function(req, res) {
        if (req.session.user) {
            console.log("users / logged_in (true):", req.session.user);
            res.json({user: req.session.user});
        } else {
            console.log("users / logged_in (false)");
            res.json({user: null});
        }
    },

    logout: function(req, res) {
        req.session.destroy(function(e){
            if(e) {
                console.log("users / logout (error):\n", e);
            } else {
                console.log("user / logged out");
                res.redirect("/login");
            }
        });
    },

    // ======================== FRIENDS ======================= //
    get_user: function(req, res) {
        User.findById(req.body.id, function(e, profile) {
            var idx_arr = [profile.pendings.indexOf(req.session.user._id)]; // user -> profile , profile -> user
            console.log("users / get_user (idx[0]):", idx_arr);
            User.findById(req.session.user._id, function(e, sessuser) {
                idx_arr[1] = sessuser.pendings.indexOf(req.body.id);
                console.log("users / get_user (idx):", idx_arr);
                User.findById(req.body.id).populate({path: 'pendings'}).populate({path: 'mutuals'}).exec(function(e, user) {
                    if (e) {
                        console.log("users / get_user (error):\n", e);
                    } else {
                        console.log("users / get_user:", user);
                        res.json({user: user, idx: idx_arr});
                    }
                })
            })
        })
    },

    get_users: function(req, res) {
        User.find({}, function(e, users) {
            if (e) {
                console.log("users / get_users (error):\n", e);
            } else {
                // console.log("users / get_users:", users);
                res.json({users: users});
            }
        })
    },

    pending_friend: function(req, res) {
        User.findById(req.body.id, function(e, user) {
            if (e) {
                console.log("users / pending_friend (error):\n", e);
            } else {
                console.log("users / pending_friend (user):", user);
                user.pendings.push(req.session.user._id);
                user.save(function(e) {
                    if (e) {
                        console.log("users / pending_friend / user.save (error):\n", e);
                    } else {
                        console.log("users / pending_friend / user.save:", user);
                        res.json({user: user});
                    }
                })
            }
        })
    },

    add_friend: function(req, res) {
        User.findById(req.session.user._id, function(e, user) {
            if (e) {
                console.log("users / add_friend (error):\n", e);
            } else {
                console.log("users / add_friend:", user);
                user.pendings.pull({_id: req.body.id});
                console.log("users / add_friend / user.pendings.pull:", user.pendings);

                // let idx = user.pendings.indexOf(req.body.id);
                // console.log("users / add_friend (idx):", idx);
                // user.pendings.splice[idx, 1];
                // console.log("users / add_friend / user.splice:", user);
                user.save();
                req.session.user = user;
                User.findById(req.body.id, function(e, friend) {
                    friend.mutuals.push(req.session.user._id);
                    friend.save(function(e) {
                        if (e) {
                            console.log("users / add_friend (error):\n", e);
                        } else {
                            console.log("users / add_friend / friend.mutuals.push (friend):", friend);
                            user.mutuals.push(req.body.id);
                            user.save(function(e) {
                                if (e) {
                                    console.log("users / add_friend (error):\n", e);
                                } else {
                                    console.log("users / add_friend / user.mutuals.push (user):", user);
                                    res.json({friend: friend});
                                }
                            })
                        }
                    })
                })
            }
        })
    },

    edit_about: function(req, res) {
        User.findById(req.session.user._id, function(e, user) {
            if (e) {
                console.log("users / edit_about (error):\n", e);
            } else {
                console.log("users / edit_about:", user);
                user.about = req.body.about;
                user.save(function(e) {
                    if (e) {
                        console.log("users / edit_about / user.save (error):\n", e);
                    } else {
                        req.session.user.about = req.body.about;
                        req.session.save(function(e) {
                            if (e) {
                                console.log("users / edit_about / req.session.save (error):\n", e);
                            } else {
                                console.log("users / edit_about / req.session.save:", req.session.user);
                                res.json({user: user});
                            }
                        })
                    }
                })
            }
        })
    },

    remove_friend: function(req, res) {
        User.findById(req.session.user._id, function(e, user) {
            if (e) {
                console.log("users / edit_about (error):\n", e);
            } else {
                console.log("users / edit_about:", user);
                User.findById(req.body.id, function(e, profile) {
                // let idx = profile.mutuals.indexOf(req.session.user._id)
                // profile.
                //
                //
                // save(function(e) {
                //     if (e) {
                //         console.log("users / edit_about / user.save (error):\n", e);
                //     } else {
                //         req.session.user.about = req.body.about;
                //         req.session.save(function(e) {
                //             if (e) {
                //                 console.log("users / edit_about / req.session.save (error):\n", e);
                //             } else {
                //                 console.log("users / edit_about / req.session.save:", req.session.user);
                //                 res.json({user: user});
                //             }
                //         })
                //     }
                })
            }
        })
    },

    // ======================= ADMIN ======================= //
    show_all: function(req, res) {
        User.find({}, function(e, users) {
            console.log("users / show_all", users);
            res.json(users);
        })
    }
}
