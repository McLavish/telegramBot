const axios = require('axios');

module.exports =  (prompt = "", length = 60, timeout = 5000) => {
    return axios.post(process.env.BACKEND_URL + "/predict", {
            prompt: prompt,
            length: length,
            timeout: timeout
        });
}