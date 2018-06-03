// THIS CONTROLLER IS USED FOR COLUMNS UPLOADS BY COLUMNISTS
var Columns = rootRequire('app/models/post.js');
var Tags   = rootRequire('app/models/tags.js');
var path    = require('path');
let Sequelize = require('sequelize');

module.exports = {

    index: {
        get : (req,res)=>{ 
        		// res.render('column-dashboard');
				res.send('Columns list');
			}
	},
	upload:{
        get : (req,res)=>{

                console.log(req.user);

            res.render('column-form',{currentUser:req.user});

        },
		post :(req ,res)=>{
        	var data = req.body;
        	console.log(data);

        	Columns.create({category: 'article', title: data.title, biLiner: data.biliner , article:data.article,tag:'null',subcategory:[data.subcategory],userId: req.user.id})
				.then(result=>{console.log(result.dataValues), res.redirect('/')})
                .catch((err)=> { 
                              console.log(err)
                              res.render('error.ejs')

                          });



		}



	},

approve : {
    	get : (req,res)=>{
        if(req.user.position == 'student head' || req.user.position =='editor in chief' || req.user.position == 'head of web developement' || req.user.position =='assistant editor') {
            Columns.findById(req.params.id).then(result => {
                res.render('profile',{approved_post : result});

        })
        }
        else {
            res.send('ACCESS DENIED');
        }
    },
    post : (req,res)=>{

        if(req.user.position == 'student head' || req.user.position == 'editor in chief' || req.user.position == 'assistant editor' || req.user.position == 'head of web development' ){

            Columns.update({
                approved_id: req.user.id,
                approval_status: true,
                approved_at: Sequelize.literal('CURRENT_TIMESTAMP')
            }, {where: {id: req.params.id}}).then(result => {

                console.log(result);
                console.log('approved');
                res.redirect('/user/profile');
        })
            .catch((err) => {
                console.error(err);
                res.render('error.ejs');
            });
        }
    }
	}
}

