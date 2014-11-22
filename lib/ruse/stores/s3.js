/** Dependencies */
var config = require('dotfun')('.ruserc', { home: true });
var AWS    = require('aws-sdk');
var s3     = new AWS.S3(config.get('aws'));
var RSVP   = require('rsvp');



/**
 * S3 Store API
 */
var S3Store = function() {
	// ?
};


S3Store.prototype = {
	
	create: function(name) {
		var self = this;
		self._createBucket(name)
		.then(function(data) {
			return self._setWebsite(name);
		})
		.then(function(data) {
			console.log(data);
		})
		.catch(function(error) {
			console.log(error);
		});
	},
	
	
	
	
	_createBucket: function(name, cb) {
		var params = {
			Bucket: name,
			ACL:   'public-read'
		};
		return new RSVP.Promise(function(resolve, reject) {
			s3.createBucket(params, function(err, data) {
				if (err) reject(err);
				resolve(data);
			});
		});
	},
	
	
	_setWebsite: function(name, cb) {
		var params = {
			Bucket: name,
			WebsiteConfiguration: {
				ErrorDocument: { Key:    'error.html' },
				IndexDocument: { Suffix: 'index.html' }
			}
		};
		return new RSVP.Promise(function(resolve, reject) {
			s3.putBucketWebsite(params, function(err, data) {
				if (err) reject(err);
				resolve(data);
			});
		});
	}
	
};



/** Export */
module.exports = S3Store;