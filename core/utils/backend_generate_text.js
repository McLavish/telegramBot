const axios = require('axios');

//Make a request to the backend GPT-2 model using the following parameters
module.exports =  (prompt = "", length = 60, timeout = 5000) => {
    return axios.post(process.env.BACKEND_URL + "/predict", {
            prompt: prompt,
            length: length,
            timeout: timeout
        });
}
