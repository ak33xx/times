"use strict"
let db =  require('../../config/db.js');
let Sequelize = require('sequelize');

const tags = db.define('tags',{
	tag : {
		type: Sequelize.ARRAY(Sequelize.STRING)
	}
});





db.sync();
module.exports = tags;