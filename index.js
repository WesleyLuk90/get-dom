var request = require('request');
var Q = require('q');
var cheerio = require('cheerio');

module.exports = function getDOM(url){
	var defer = Q.defer();
	var options = null;
	if(typeof url == "string"){
		options = {url: url};
	} else {
		options = url;
	}
	request(options, function(error, response, body){
		if(error){
			return defer.reject(err);
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
	}).on('error', function(err){
		return defer.reject(err);
	});
	return defer.promise;
};