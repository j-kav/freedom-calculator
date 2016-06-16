/// <binding ProjectOpened='watch:tasks' />
/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
	grunt.initConfig({
		jshint: {
			files: ['wwwroot/scripts/*.js'],
			options: {
				'-W069': false,
			}
		},
		watch: {
			files: ['wwwroot/scripts/*.js'],
			tasks: ['lint']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('lint', ['jshint']);
};