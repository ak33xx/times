"use strict"
let tags = require('./tags.js');

// Helper methods for model validation and operations.

let validate = {
	positions : {
		// Add permissions in format : -
		// head : ['permission1','permission2',...];
	},
	// Check permission of user to perform an action.
	permission : (position,action) => {
					return this.positions.position.includes(action);		// Gives true or false.
	},
	// Verify tag before adding to database.
	validate_tag : (tag) => {
					const all = tags.findAll({
									attributes: ['tag']
								})
						.then(result_tag=>{
							var allTags = result_tag[0].dataValues.tag;
							return allTags.includes(tag);
							return true;
					});


	}
};

module.exports = validate;