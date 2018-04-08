var watch           = require('gulp-watch');
var jade            = require('gulp-jade');

module.exports = function(gulp, callback) {
	// return watch('./jade/template-builder/pages/*.jade')
	return watch(config.source.template + '/pages/*.jade')
		.pipe(jade({
			pretty: true,
			data: {
                // debug: false,
                useLayout: myLayout, // Predefined layout name i.e vertical-light-sidebar
                useDirection: myTextDirection,
                rtl: rtl
            }
		}))
		.pipe(gulp.dest(config.html+ '/' + myTextDirection + '/' + myLayoutName));
};