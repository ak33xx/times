"use strict"

var Image = rootRequire('app/models/post.js');
var Tag   = rootRequire('app/models/tags.js');
var multer  = require('multer');
var path    = require('path');

// Multer config to store images
const storage = multer.diskStorage({
    destination: 'assets/up/',
	
    filename: function (req, file, cb) {
        cb(null, file.fieldname+'-'+Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({

    storage: storage

}).single('image_upload');


//**************

module.exports = {

    index: {
        get : (req,res)=>{ 
        		res.render('photo-dashboard');//Two options upload/recheck
			}
	},
	upload:{
        get : (req,res)=>{

                res.render('gallery_upload',{Tags:Tag.tag});
        },
		post :(req ,res)=>{

        	upload(req,res, (err)=>{
        		if(err) res.redirect('error.ejs');
        		else{
				var i = Image.build({
					category:"image",
				url:"assets/up/"+file.originalname,
				tag: req.body.tag;
					
				})
				i.save();
         			console.log(req.file);
				console.log(i);
 				res.render('thanks');
			}

			})

		}


	},
	resent: {
		get : (req,res)=>{
				images = Image
							.findAll({ where : { Image.approval_status : false } })
							.then(image => {
								Image.approval_status = false;
								res.render('gallery_category', {images : image});
							});
				          }
	},
		post :(req ,res)=>{

        	upload(req,res, (err)=>{
        		if(err) res.redirect('error.ejs');
        		else{var i = Image.build({
				url:"assets/up/"+file.originalname,
				tag: req.body.tag,
				category:"image";
					
				})
				i.save();
         			console.log(req.file);
				console.log(i);
 				res.render('thanks');
			}

			})

		}

	

}
