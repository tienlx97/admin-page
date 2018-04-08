module.exports = function() {
    "use strict";

    return {
        jade: {
            files: ['<%= config.source.template %>/pages/**/*.jade'],
            tasks: ['jade:html'],
            options: {
                interrupt: false,
                spawn: false,
                // livereload: true,
                data: {
                    //debug: true,
                    useLayout: myLayout,
                    useDirection: myTextDirection,
                    rtl: rtl
                }
            },            
        },
        sass: {
            files: ['<%= config.source.sass %>/**/*.scss'],
            tasks: ['sass-compile', 'autoprefixer:css'],
            options: {
                interrupt: false,
                spawn: false,
                // livereload: true,
            },
        },
        documentation: {
            files: ['<%= config.source.documentation %>/pages/**/*.jade'],
            tasks: ['jade:documentation'],
            options: {
                interrupt: false,
                spawn: false,
                // livereload: true,
                data: {
                    //debug: true,
                    useLayout: myLayout,
                    useDirection: myTextDirection,
                    rtl: rtl
                }
            },            
        }
    }
};