"use strict"
var Bio = require('../models/bio.js');
var User = require('../models/user.js');
var Post = require('../models/post.js');
var Tags = require('../models/tags.js');

var multer  = require('multer');
var path    = require('path');

// Multer config to store profile Pictures
const storage = multer.diskStorage({
    destination: 'assets/profile_photos/',

    filename: function (req, file, cb) {
        cb(null, file.fieldname+'-'+Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({

    storage: storage

}).single('profile_photo');


//***********************************

module.exports = {

    index: {

        get: (req, res) => {
		if(req.user==null) res.redirect('/login');
        //check if  currently logged in  user present in BIO data base

        //if not present render dashboard form page and if present render his dashboard.

        Bio.findOne({where: {userId: req.user.id}}).then(user => {
        if(user) {
            var position;
            User.findOne({where: {id: req.user.id}}).then(usr => {
                position = usr.position;
                
                if(position == "photographer" || position == "head of photography" || position == "illustrator" || position == "illustrator head"){
                        var r = [];
                        Post.findAndCountAll({where: {userId: req.user.id, category: 'image'}}).then(result => {
                            console.log("User's posts");
                            r = result;
                            console.log(r.count);
                            console.log(r.rows);
                        });

                        Post.findAndCountAll({where: {approval_status: false, category: 'image'}}).then(result2 => {
                            console.log("Unapproved posts");
                            console.log(result2.count);
                            console.log(result2.rows);
                            if (position == "head of photography" || position == "illustrator head"){
                                res.render('profile_photohead', {
                                    bio: user,
                                    count_post: r.count,
                                    posts: r.rows,
                                    count: result2.count,
                                    approval: result2.rows
                                });
                            }
                            else{
                                res.render('profile_photographer', {
                                    bio: user,
                                    count_post: r.count,
                                    posts: r.rows,
                                    count: result2.count,
                                    approval: result2.rows
                                });
                            }
                    });

                }
                else{
                        var r = [];
                        Post.findAndCountAll({where: {userId: req.user.id, category: 'article'}}).then(result => {
                            console.log("User's posts");
                            r = result;
                            console.log(r.count);
                            console.log(r.rows);
                        });

                        Post.findAndCountAll({where: {approval_status: false, category: 'article'}}).then(result2 => {
                            console.log("Unapproved posts");
                            console.log(result2.count);
                            console.log(result2.rows);
                            if (position == "student head" || position == "web development head" || position == "editor in cheif" || position == "assistant editor" || position == "student advisor" || position == "student coordinator" || position == "assosiate editor"){
                                res.render('profile_columnhead', {
                                    bio: user,
                                    count_post: r.count,
                                    posts: r.rows,
                                    count: result2.count,
                                    approval: result2.rows
                                });
                            }
                            else{
                                res.render('profile_columnists', {
                                    bio: user,
                                    count_post: r.count,
                                    posts: r.rows,
                                    count: result2.count,
                                    approval: result2.rows
                                });
                            }

                    })

                }
            });
        }
        else{
        	// res.render('dashboard-form');
            res.redirect('/user/profile/settings');
        }	

})

},
post: (req, res) => {

    upload(req, res, (err) => {

        if(err)
        throw err
        else{

            // req.file contains file uploads information
            //req.user contains info about currently loggedIn user

            //Storing Bio-data of user to Database
            Bio.create({
	            name: req.body.name,
	            ph_no: req.body.ph_no,
	            email: req.body.email,
	            dob: req.body.dob,
	            bio_text: req.body.bio_text,
	            branch: req.body.branch,
	            userId: req.user.id,
	            profile_pic: req.file.path.replace('assets', ''), 
	            Facebook: req.body.fb,
	            LinkedIn: req.body.linkedin
                
        	})

            .then((result) => {

            	console.log(result.dataValues);
    			res.redirect('/user/profile')
			})

			.catch((err) => {throw err});


		}

	})
    }
},
    settings: {
        get: (req, res) => {
            Bio.findOne({where: {userId: req.user.id}}).then(user => {
        
                if(user) {
                    res.render('dashboard-form', {bio: user});
                }
                else{
        
                    res.render('dashboard-form',{bio:null});
        		}
        
        
        	});
    //         res.render('dashboard-form');
        }

    }


}
