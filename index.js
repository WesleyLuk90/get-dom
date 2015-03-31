var request = require('request');
var Q = require('q');
var cheerio = require('cheerio');

var DEFAULT_TIMEOUT = 2 * 60 * 1000; // 2 minutes

module.exports = function getDOM(options){
	var defer = Q.defer();
	if(typeof options == "string"){
		options = {url: options};
	}
	if(options.timeout == null){
		options.timeout = DEFAULT_TIMEOUT;
	}
	request(options, function(error, response, body){
		if(error){
			return defer.reject(error);
		}
		if(response.statusCode !== 200){
			var err = new Error("Got status code " + response.statusCode);
			err.statusCode = response.statusCode;
			err.body = response.body;
			return defer.reject(err);
		}
		try {
			return defer.resolve(cheerio.load(body));
		} catch(e){
			return defer.reject(e);
		}
	});
	return defer.promise;
};