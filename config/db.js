"use strict"

var debug = true; // False in production

var Sequelize = require('sequelize');

if (debug){
	var db = new Sequelize('demo', 'postgres', '', {
		host:'localhost',
		dialect :'postgres'
	});
}
else{
	var db = new Sequelize('dcqgppcq4ol0tn', 'dcdxmdwelmlkvo', 'e09ac7c0b5aecec91556b0b999eda93108dd6149a124245eae4af0d2d084ba32', {
		host:'ec2-54-243-54-6.compute-1.amazonaws.com',
		dialect :'postgres'
	});
}


db
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = db;
