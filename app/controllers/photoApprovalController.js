"use strict"

var Image = rootRequire('app/models/post.js');

var multer  = require('multer');
var path    = require('path');

// Multer config to store images
const storage = multer.diskStorage({
    destination: 'assets/approved_photos/',

    filename: function (req, file, cb) {
        cb(null, file.fieldname+'-'+Date.now()+path.extname(file.originalname));
    }
});
const back = multer.diskStorage({
    destination: 'assets/up/',

    filename: function (req, file, cb) {
        cb(null, file.fieldname+'-'+"recheck");
    }
});

const upload = multer({

    storage: storage

}).single('image_upload');

const resend = multer({

    storage: back;

}).single('image_resend');
//**************

module.exports = {

    index: {
        get : (req,res)=>{ 
        		res.render('view-dashboard');//Two options upload/recheck
			}
	},
	approval:{
        get : (req,res)=>{

                res.render('approve-dashboard',{img:Image.post});
        },
		post :(req ,res)=>{

        	upload(req,res, (err)=>{
        		if(err) res.redirect('error.ejs');
        		else{
				req.file.approval_status = "true";
        			console.log(req.file);

        			//save data to database
			}

			})

		}


	},

	resend: {
		post :(req ,res)=>{

        	resend(req,res, (err)=>{
        		if(err) res.redirect('error.ejs');
        		else{

        			console.log(req.file);

        			//save data to database
			}

			})

		}
