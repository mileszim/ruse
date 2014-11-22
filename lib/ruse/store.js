/** Dependencies */
var s3 = require('./stores/s3.js');



/**
 * Store API
 */
var Store = function() {
	this.store = new s3();
};

Store.prototype = {
	
	create: function(name) {
		this.s3.create(name);
	}
	
};



/** Export */
module.exports = Store = new Store();