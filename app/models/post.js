"use strict"
let db =  require('../../config/db.js');
let Sequelize = require('sequelize');
// let validatation = require('./helper.js');

const post = db.define('post',{
	id : { 		// Set by default. Don't change!
        type : Sequelize.UUID,
        defaultValue : Sequelize.UUIDV1,
        primaryKey : true

	},
	userId:{
		type : Sequelize.UUID
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
	category : {  // Tells type of post. Can be one of ['image','article']
		type : Sequelize.STRING,
		allowNull : false
	},
	url : {   // If post contain any media, Store it to server and add url here. Leave to default if no media is available.
		type : Sequelize.STRING,
		defaultValue : 'nomedia@this.post',
		// validate : {isUrl: true}
	},
	title : { 
		type : Sequelize.STRING,
		allowNull : true
	},
	article : { // Leave blank if no article submitted.
		type : Sequelize.STRING,
		allowNull : true
	},
	biLiner : { // Leave blank if no article submitted.
		type : Sequelize.STRING,
		allowNull : true
	},
	uploaded_at : { 
		type : Sequelize.DATE,
		defaultValue : Sequelize.NOW
	},  // Type can be changed to "DATEONLY" to avoid add date without time.
	approved_at : {		// Set to current time when approved.
		type : Sequelize.DATE,


	},
	tag : {
		type : Sequelize.STRING,
		allowNull : true,

		// validate : {
		// 	isValid(value){
		// 		if(validatation.validate_tag(value)){
		// 			throw new Error('Tag not valid!');
		// 		}
		// 	}
		// }
	},
	subcategory : {
		type : Sequelize.ARRAY(Sequelize.STRING),
		allowNull : false,
	}
});

db.sync();
module.exports = post;
