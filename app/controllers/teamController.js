"use strict"
var User = rootRequire('app/models/bio.js');
var User2 = rootRequire('app/models/user.js');
module.exports = {


    index: {
        get : (req,res)=>{ var users = User.findAll().then(users =>{
            var user_array = [];

    users.forEach(function(user)
    {
        var usr = user;
        var temp = {};

        User2.findOne({where: {id: usr.userId}}).then(result => {
            temp.position = result.dataValues.position;
            temp.bio = usr.dataValues;
            user_array.push(temp);
            if(user_array.length==users.length)
            {
                
                renderData();
            }

    });


});

function renderData()
{
    
    res.render("team",{users:user_array});
}
// while(true){
//     console.log(user_array);
//     if(i==a){
//         res.render("team",{users: user_array});
//         break;
//     }
// }
});
},

},
}