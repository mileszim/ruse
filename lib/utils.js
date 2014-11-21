/** Dependencies */
var chance = require('chance').Chance();
var words  = require('./words.json');
	


/**
 * Utils
 */
module.exports = {
	
	randomName: function() {
		var first  = chance.pick(words.nato);
		var second = chance.first().toLowerCase();
		var third  = chance.integer({ min: 1000, max: 9999 });
		return [first, second, third].join('-');
	}
	
	
};