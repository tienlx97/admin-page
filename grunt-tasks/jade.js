module.exports = function() {
    "use strict";

    return {
        html: {
            options: {
                basedir: '<%= config.source.template %>/pages',
                pretty: true,
                client: false,
                data: {
                    //debug: true,
                    useLayout: myLayout,
                    useDirection: myTextDirection,
                    rtl: rtl
                }
            },
            files: [{
                cwd: '<%= config.source.template %>/pages',
                src: jadeSrc,
                dest: 'html/' + myTextDirection + '/' + myLayoutName,
                expand: true,
                ext: ".html"
            }]
        },
        sk_html: {
            options: {
                basedir: '<%= config.source.template %>/pages/starter-kit',
                pretty: true,
                client: false,
                data: {
                    //debug: true,
                    useLayout: myLayout,
                    useDirection: myTextDirection,
                    rtl: rtl
                }
            },
            files: [{
                cwd: '<%= config.source.template %>/pages/starter-kit',
                src: jadeSrc,
                dest: '<%= config.starter_kit %>/' + myTextDirection + '/' + myLayoutName,
                expand: true,
                ext: ".html"
            }]
        },
        documentation: {
            options: {
                basedir: '<%= config.source.documentation %>/pages',
                pretty: true,
                client: false,
                data: {
                    //debug: true,
                    useLayout: myLayout,
                    useDirection: myTextDirection,
                    rtl: rtl
                }
            },
            files: [{
                cwd: '<%= config.source.documentation %>/pages',
                src: jadeSrc,
                dest: 'html/' + myTextDirection + '/' + myLayoutName,
                expand: true,
                ext: ".html"
            }]
        },
    };
};
