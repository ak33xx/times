//THIS CONTROLLER IS USED BY PHOTOGRAPHERS TO UPLOAD PHOTOS
var Sequelize = require('sequelize');
var Photos = rootRequire('app/models/post.js');
var Tags   = rootRequire('app/models/tags.js');
var path    = require('path');
var multer  = require('multer');


// Multer config to store profile Pictures
const storage = multer.diskStorage({
    destination: 'assets/uploaded_photos/',

    filename: function (req, file, cb) {
        cb(null, file.fieldname+'-'+Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({

    storage: storage

}).single('url');

//**********************************

module.exports = {

    index: {
        get : (req,res)=>{
        // res.render('column-dashboard');
        res.send('Uploaded Photos');
}
},
upload:{
    get : (req,res)=>{

            console.log(req.user);

            res.render('photo-form',{currentUser:req.user});

    },
    post :(req ,res)=>{
        upload(req,res,(err)=>{

            if(err) throw err;

            else{

                var data = req.body;
                console.log(data);

                // console.log(data);
                Photos.create({category: 'image', title: data.title , biLiner: data.biliner, url:req.file.path.replace('assets',''),tag:'null',subcategory: [data.subcategory],userId: req.user.id})
                    .then(result=>{
                        // console.log(result);
                        res.redirect('/user/profile');
                    })
                    .catch((err)=> { 
                              console.log(err)
                              res.render('error.ejs')

                          });



    }
    })
    }

},

approve : {

        get :  (req,res)=>{
            if(req.user.position == 'student head' || req.user.position =='head of photography') {
                Photos.findById(req.params.id).then(result => {
                    res.render('profile',{approved_post : result});

            })
            }
            else {
                res.send('ACCESS DENIED');
            }
    },
    post : (req,res)=>{

            if(req.user.position == 'student head' || req.user.position =='head of photography'){

                Photos.update({
                    approved_id: req.user.id,
                    approval_status: true,
                    approved_at: Sequelize.literal('CURRENT_TIMESTAMP')
                }, {where: {id: req.params.id}}).then(result => {

                    console.log(result);
                console.log('approved');
            })
            }
            }


    }

}

