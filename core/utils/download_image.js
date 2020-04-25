const fs = require('fs');
const https = require('https');

//UNUSED
//Node.js Function to save image from External URL.
function saveImageToDisk(url, localPath) {
    const fullUrl = url;
    const file = fs.createWriteStream(localPath);
    const request = https.get(url, function(response) {
        response.pipe(file);
    });}