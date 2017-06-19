module.exports = function (grunt) {

    grunt.initConfig({
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';\n'
            },
            dist: {
                // the files to concatenate
                src: ['js/src/*.js'],
                // the location of the resulting JS file
                dest: 'js/build/script.main.js'
            }
        },

        uglify: {
            dist: {
                // the files to concatenate
                src: ['js/build/script.main.js'],
                // the location of the resulting JS file
                dest: 'js/build/script.main.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('con', ['concat']);
    grunt.registerTask('ugl', ['uglify']);

};