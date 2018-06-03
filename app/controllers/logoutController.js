"use strict"

module.exports = {

    index: {
        get : (req,res)=>{ 
	        	if (req.hasOwnProperty('user')){
		            //User is already logged in          
		        	req.logout();
		        	res.redirect('/')
		        }
		        else{
		        	// User user logged in
		        	res.render('error.ejs')
		        }

	        },


},

}

