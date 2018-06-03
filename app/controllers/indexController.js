"use strict"
var Image = rootRequire('app/models/image.js');
var Post = rootRequire('app/models/post.js');
module.exports = {

    index: {
        get : (req,res)=>{ 
                          var category =[]; //array to store to categories of images
            Image.findAll().then((image)=>{
                image.forEach(function(image)
                {
                    category.push(image.dataValues.category);
                });


                category = Array.from(new Set(category));  // finding unique category
               var galleryData = []; //array to store multiple array containing unique category with single image
               var post_cat= [];
               var posts = Post
                            .findAll({ where : { approval_status : true } })
                            .then( post => {
                                
                                
                                post.forEach(function(post)
                                {
                                    post_cat.push(post)
                                    
                                });
                            });

                if (category.length == 0){
                	res.render('index', {images: [], posts: post_cat});
                }

                category.forEach(function(cat)
                {
                    Image.findAll({where:{category:cat}}).then((res)=>{
                        var data = [cat,res[0].dataValues.url];   // extracting first image associated with unique category
                        galleryData.push(data);
                        if(galleryData.length == category.length)
                        {
                            res.render('index',{images: galleryData,posts:post_cat});
                        }

                    })
                    .catch((err)=> {
                        console.log(err);
                        res.render('error.ejs')

                    });
                });

                 console.log(post_cat);

});

                         
                         }
    }

}
