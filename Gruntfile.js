module.exports = function(grunt) {
    'use strict';

    var path               = require('path');
    global.myLayout        = grunt.option('Layout'); // Jade layout name
    global.myLayoutName    = grunt.option('LayoutName'); // Created layout folder name
    global.jadeSrc         = ['*.jade', '!**/template.jade'];
    global.dashboardRename = '';
    global.rtl             = '';

    //Suffix for rtl files includes in html
    if (grunt.option('TextDirection') !== undefined) {
        global.myTextDirection = grunt.option('TextDirection').toLowerCase(); // Text direction (Eg. LTR, RTL)
        if (myTextDirection == 'rtl')
            global.rtl = '-rtl';
    }
    else{
        global.myTextDirection = '';
    }

    //Index Replacement and exclude those page which are not specif template supported or you don't want to include        
    if (myLayout == 'vertical-menu-template') {
        dashboardRename = '<%= config.vertical_menu_template.dashboardRename %>';
        jadeSrc = '<%= config.vertical_menu_template.jadeSrc %>';
    } else if (myLayout == 'vertical-menu-template-light') {
        dashboardRename = '<%= config.vertical_menu_template_light.dashboardRename %>';
        jadeSrc = '<%= config.vertical_menu_template_light.jadeSrc %>';
    } else if (myLayout == 'vertical-menu-template-nav-dark') {
        dashboardRename = '<%= config.vertical_menu_template_nav_dark.dashboardRename %>';
        jadeSrc = '<%= config.vertical_menu_template_nav_dark.jadeSrc %>';
    } else if (myLayout == 'vertical-menu-template-semi-dark') {
        dashboardRename = '<%= config.vertical_menu_template_semi_dark.dashboardRename %>';
        jadeSrc = '<%= config.vertical_menu_template_semi_dark.jadeSrc %>';
    } else if (myLayout == 'vertical-overlay-menu-template') {
        dashboardRename = '<%= config.vertical_overlay_menu_template.dashboardRename %>';
        jadeSrc = '<%= config.vertical_overlay_menu_template.jadeSrc %>';
    } else if (myLayout == 'vertical-modern-menu-template') {
        dashboardRename = '<%= config.vertical_modern_menu_template.dashboardRename %>';
        jadeSrc = '<%= config.vertical_modern_menu_template.jadeSrc %>';
    } else if (myLayout == 'horizontal-menu-template') {
        dashboardRename = '<%= config.horizontal_menu_template.dashboardRename %>';
        jadeSrc = '<%= config.horizontal_menu_template.jadeSrc %>';
    } else if (myLayout == 'horizontal-menu-template-nav') {
        dashboardRename = '<%= config.horizontal_menu_template_nav.dashboardRename %>';
        jadeSrc = '<%= config.horizontal_menu_template_nav.jadeSrc %>';
    }

    require('load-grunt-config')(grunt, {
        // path to task.js files, defaults to grunt dir
        configPath: path.join(process.cwd(), 'grunt-tasks'),

        // auto grunt.initConfig
        init: true,

        // data passed into config.  Can use with <%= test %>
        data: {
            pkg: grunt.file.readJSON('package.json'),
            config: grunt.file.readJSON('config.json'),
            //color: grunt.file.readYAML('color.yml'),
            banner: '/*!\n' +
                ' * <%= pkg.name %> (<%= pkg.homepage %>)\n' +
                ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
                ' * Licensed under the <%= pkg.license %>\n' +
                ' */\n'
        },

        // can optionally pass options to load-grunt-tasks.
        // If you set to false, it will disable auto loading tasks.
        loadGruntTasks: {
            pattern: 'grunt-*',
            config: require('./package.json'),
            scope: ['devDependencies', 'dependencies']
        }
    });


    var JadeInheritance = require('jade-inheritance');
    var changedFiles = [];

    var onChange = grunt.util._.debounce(function() {
        var options = grunt.config('jade.html.options');
        var dependantFiles = [];

        changedFiles.forEach(function(filename) {
            var directory = options.basedir;
            var inheritance = new JadeInheritance(filename, directory, options);
            dependantFiles = dependantFiles.concat(inheritance.files);
        });

        var config = grunt.config('jade.html.files')[0];
        config.src = dependantFiles;
        grunt.config('jade.html.files', [config]);

        changedFiles = [];
    }, 200);

    grunt.event.on('watch', function(action, filepath) {
        changedFiles.push(filepath);
        onChange();
    });

    // Clean task.
    grunt.registerTask('dist-clean', ['clean:css', 'clean:js']);

    // Html distribution task.
    grunt.registerTask('dist-html', ['clean:html', 'jade:html', 'copy:rename', 'prettify', 'notify:html']);
    grunt.registerTask('dist-sk-html', ['clean:sk_html', 'jade:sk_html', 'notify:html']);


    // JS distribution task.
    grunt.registerTask('dist-js', ['clean:js', 'copy:js', 'uglify:min', 'notify:js']);

    // CSS distribution task.
    grunt.registerTask('sass-compile', ['sass:main', 'sass:core', 'sass:pages', 'sass:plugins', 'notify:css']);
    grunt.registerTask('dist-css', ['clean:css', 'sass-compile', 'autoprefixer:css', 'csscomb:css', 'cssmin:css', 'notify:css']);
    grunt.registerTask('dist-css-rtl', ['clean:css_rtl', 'sass-compile', 'rtlcss', 'autoprefixer:css_rtl', 'csscomb:css_rtl', 'cssmin:css_rtl', 'notify:css']);

    // Full distribution task.
    grunt.registerTask('dist', ['dist-js', 'dist-css', 'notify:all']);

    // Watch jade & scss changes
    grunt.registerTask('monitor', ['concurrent:monitor']);
    // Start server
    grunt.registerTask('server', ['browserSync', 'notify:server']);

    //Default
    grunt.registerTask('default', 'dist');
};
