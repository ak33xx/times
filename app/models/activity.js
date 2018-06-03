"use strict"
let db =  require('../../config/db.js');
let Sequelize = require('sequelize');
let post = require('./post.js')

const log = db.define('activity_log',{
	id : {		// Set by default. Don't change!
		type : Sequelize.UUID,
		defaultValue : Sequelize.UUIDV1,
		primaryKey : true
	},
	time_of_activity : {
		type : Sequelize.DATE,
		defaultValue : Sequelize.NOW
	},
	action : {		// can be one of ['upload','approve','delete','edit']
		type : Sequelize.STRING,
		allowNull : false
	}
});

db.sync();
module.exports = log;