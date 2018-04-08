module.exports = function() {
	"use strict";

	return {		
		options: {
			logConcurrentOutput: true,
			limit: 10,
		},
		monitor: {
			tasks: ["watch:jade", "watch:sass"/*, "server"*/, "notify:watching"]
		},	
	}
};