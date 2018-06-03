"use strict"
let db =  require('../../config/db.js');
let Sequelize = require('sequelize'); 

const bio = db.define('bio',{
    id : {      // Set by default. Don't change!
        type : Sequelize.UUID,
        defaultValue : Sequelize.UUIDV1,
        primaryKey : true
    },
    name : {
        type : Sequelize.STRING
    },
    ph_no : {
        type : Sequelize.BIGINT(10)
    },
    email : {
        type : Sequelize.STRING
    },
    dob : {
        type : Sequelize.DATEONLY
    },
    bio_text : {
        type : Sequelize.TEXT
    },
    branch : {
        type : Sequelize.STRING
    },
    profile_pic : {     // url of profile picture
        type : Sequelize.TEXT,
        unique : true,
        // validate : {isUrl: true}
    },
    LinkedIn : {
        type : Sequelize.STRING,
        allowNull : true,

    },
    Facebook : {
        type : Sequelize.STRING,
        allowNull : true,

    }
});

db.sync();
module.exports = bio;
