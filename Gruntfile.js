var packageFile = 'package.json';
var awsConfigFile = 'aws-config.json';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON(packageFile),
        aws: (function() {
            if (grunt.file.exists(awsConfigFile)) {
                return grunt.file.readJSON(awsConfigFile);
            } else {
                return grunt.file.readJSON(awsConfigFile + '.template');
            }
        })(),

        aws_s3: {
            options: {
                // Load Access Key and Secret from AWS config file
                accessKeyId: '<%= aws.AWSAccessKeyId %>',
                secretAccessKey: '<%= aws.AWSSecretKey %>',
                region: 'us-east-1',
                uploadConcurrency: 5, // 5 simultaneous uploads
                downloadConcurrency: 5 // 5 simultaneous downloads
            },
            upload: {
                options: {
                    bucket: '<%= aws.AWSS3BucketName %>',
                    //debug: true // Doesn't actually delete but shows log
                },
                files: [
                    {dest: '/', action: 'delete'},
                    {cwd: 'output', src: ['**'], dest: '', expand: true},
                ]
            }
        },

        'exec': {
            build: 'node eyebeam.js routes.js',
            test: 'node eyebeam.js test-routes.js'
        },

        'prompt': {
            aws: {
                options: {
                    questions: [
                        {
                            name: 'aws.AWSAccessKeyId',
                            type: 'input', // list, checkbox, confirm, input, password
                            message: 'AWS Access Key ID',
                            default: 'XXX', // default value if nothing is entered
                            //choices: 'Array|function(answers)',
                            validate: function(value) { return true; },
                            filter:  function(value) { return value; }, // modify the answer
                            when: function() {
                                var accessKey = grunt.config('aws').AWSAccessKeyId;
                                if (accessKey && accessKey !== 'XXX') {
                                    return false;
                                } else {
                                    return true;
                                }
                            }
                        },
                        {
                            name: 'aws.AWSSecretKey',
                            type: 'input',
                            message: 'AWS Secret Key',
                            default: 'XXX',
                            validate: function(value) { return true; },
                            filter: function(value) { return value; },
                            when: function() {
                                var secretKey = grunt.config('aws').AWSSecretKey;
                                if (secretKey && secretKey !== 'XXX') {
                                    return false;
                                } else {
                                    return true;
                                }
                            }
                        },
                        {
                            name: 'aws.AWSS3BucketName',
                            type: 'input',
                            message: 'AWS S3 Bucket Name',
                            default: 'XXX',
                            validate: function(value) { return true; },
                            filter: function(value) { return value; },
                            when: function() {
                                var bucketName = grunt.config('aws').AWSS3BucketName;
                                if (bucketName && bucketName !== 'XXX') {
                                    return false;
                                } else {
                                    return true;
                                }
                            }
                        }
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-aws-s3');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-prompt');

    grunt.registerTask('write_config', function() {
        grunt.file.write(awsConfigFile, JSON.stringify(grunt.config('aws'), null, 4));
    });

    grunt.registerTask('setup', ['prompt:aws', 'write_config']);
    grunt.registerTask('test', ['exec:test']);
    grunt.registerTask('build', ['exec:build']);
    grunt.registerTask('upload', ['build', 'aws_s3']);
};
