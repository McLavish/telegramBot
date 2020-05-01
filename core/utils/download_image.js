const fs = require('fs');
const axios = require('axios');

//UNUSED
module.exports = (url = "https://xxx/my.pdf", localPath = "/temp/my.pdf") => {
    axios({
        method: "get",
        url: url,
        responseType: "stream"
    }).then(function (response) {
        response.data.pipe(fs.createWriteStream(localPath));
    });
}
