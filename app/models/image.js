"use strict"
// Temporary model just to make the form work until Main system is developed.

let db = rootRequire('config/db.js');
let Sequelize = require('sequelize');
let validatation = require('./helper.js');

const Image = db.define('image', {
	id : { 
		type : Sequelize.BIGINT,
		primaryKey : true,
		autoIncrement : true
	},
	userid :{
		type: Sequelize.UUID
	},
	approver_id : {
		type : Sequelize.UUID
		// 	references: {
		//             // This is a reference to another model
		//             model: user,

		//             // This is the column name of the referenced model
		//             key: 'id',

		//             // This declares when to check the foreign key constraint. PostgreSQL only.
		//             deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
		//        }
	},
	approval_status : {
		type : Sequelize.BOOLEAN,
			defaultValue : false,
			allowNull : false
	},
	category : {
		type : Sequelize.STRING,
		allowNull : false
	},
	url : { 
		type : Sequelize.STRING,
		allowNull : false,
		unique : true,
		//validate : {isUrl: true}
	},
	title : { 
		type : Sequelize.STRING,
		allowNull : true
	},
	article : { 
		type : Sequelize.STRING,
		allowNull : true
	},
	blog : { 
		type : Sequelize.STRING,
		allowNull : true,
		validate : {isUrl : true}
	},
	uploaded_at : {
	type : Sequelize.DATE,
	defaultValue : Sequelize.NOW
	},//Type can be changed to "DATEONLY" to avoid add date without time.

	approved_at : {		// Set to current time when approved.
		type : Sequelize.DATE,


	},
tag : {
    type : Sequelize.STRING,
        allowNull : false,

        validate : {
        isValid(value){
            if(validatation.validate_tag(value)){
                throw new Error('Tag not valid!');
            }
        }
    }
},
});

db.sync();
module.exports = Image;