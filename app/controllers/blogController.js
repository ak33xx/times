"use strict"
var Posts= require('../models/post.js');
module.exports = {

    index: {

        get : (req,res)=>{
        Posts.findAll().then(post=>{
        	res.render('blog',{posts:post});

	});

		}
	},
	single: {
		get : (req,res)=>{
			Posts.findAll({where:{id:req.params.id}}).then(post=>{
                res.render('blog-single',{post: post.dataValues});
			});

		}
	}

}