const fs = require('fs');
const axios = require('axios');

/**
 * Download an image and save it to the local storage
 * @param {string} url
 * @param {string} localPath
 */
module.exports = (url = "https://xxx/my.pdf", localPath = "/temp/my.pdf") => {
    axios({
        method: "get",
        url: url,
        responseType: "stream"
    }).then(function (response) {
        response.data.pipe(fs.createWriteStream(localPath));
    });
};
