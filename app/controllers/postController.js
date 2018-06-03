var Columns = rootRequire('app/models/post.js');
var Tags   = rootRequire('app/models/tags.js');
var path    = require('path');

module.exports = {

   index: {
        get : (req,res)=>{ 
        		// res.render('column-dashboard');
				res.send('Columns list');
			}
	},
	edit:{
        get : (req,res)=>{

                console.log(req.user);

                res.render('column-form',{currentUser:req.user});


        },
		post :(req ,res)=>{
        	var data = req.body;
        	console.log(data);

        	Columns.create({category: data.category, title: data.title , article:data.article,tag:null,subcategory:[data.subcategory],userId: req.user.id})
				.then(var col = result=>)
                .catch((err)=> { 
                              console.log(err)
                              res.render('error.ejs')

                          });
                Columns.findAll({category: data.category, title: data.title}).then({console.log(col.dataValues)});



		}


	}
    delete: 
    {
        post :(req ,res)=>{
            
                Columns.findAll({id:req.params.post_id}).then(result=>delete(result));

        }
    }
}
