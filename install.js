var fs = require('fs');
var path = require('path');
var unzipper = require('unzipper');
var util = require('util');

const zipFilePath = path.join(__dirname, 'lab.zip'); // Path to the lab.zip file
const outputDir = path.join(__dirname, 'lab_output'); // Directory to extract files into

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Unzip the file
fs.createReadStream(zipFilePath)
    .pipe(unzipper.Extract({ path: outputDir }))
    .on('close', () => {
        console.log('Unzipping completed successfully.');
    })
    .on('error', (err) => {
        console.error('An error occurred while unzipping:', err);
    });

var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

console.log( "This script is run at the end of the nodejs installation" )
console.log( "Bye!" )
