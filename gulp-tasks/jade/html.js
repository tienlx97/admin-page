var jade = require('gulp-jade');

module.exports = function(gulp, callback) {
	return gulp.src(jadeSrc, { cwd: config.source.template + '/pages/' })
		.pipe(jade({
			pretty: true,
			data: {
                // debug: false,
                useLayout: myLayout, // Predefined layout name i.e vertical-light-sidebar
                useDirection: myTextDirection,
                rtl: rtl
            }
		}))
		.pipe(gulp.dest(config.html + '/' + myTextDirection + '/' + myLayoutName));
};