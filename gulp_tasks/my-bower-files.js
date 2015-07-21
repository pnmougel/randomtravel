var bowerFiles = require('bower-files')({
    overrides: {
        moment: {
            main: ['moment.js', 'locale/fr.js', 'locale/en.js']
        }
    }
});

exports.bowerFiles = bowerFiles;