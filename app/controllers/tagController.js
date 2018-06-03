var Tags = require('../models/tags');

module.exports = {

    index: {
        get : (req,res)=>{ res.render('tags-form')},

        post: (req,res)=>{
            console.log(req.body.tags);

            Tags.findAll().then(result=>{

                if(!result.length){  //checking if tags is empty

                    Tags.create({tag : [req.body.tags]}).then(result=>{ res.redirect('/')});
                }
                else{                           //updating tags array if tags is already there in db

                    var tag_array = result[0].dataValues.tag;
                    tag_array.push(req.body.tags);

                    Tags.update({tag: tag_array},{where: {id:1}}).then(result=>{res.redirect('/')});
                }
            })



        }
}

}