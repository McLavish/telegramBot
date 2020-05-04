const axios = require('axios');

/**
 * Makes a request to the backend GPT-2 model using the following parameters
 * @param {string} prompt - The prompt to generate text from
 * @param {number} [length=60]
 * @param {number} [timeout=5000]
 * @returns {Promise<AxiosResponse<any>>}
 */
module.exports =  (prompt = "", length = 60, timeout = 5000) => {
    return axios.post(process.env.BACKEND_URL + "/predict", {
            prompt: prompt,
            length: length,
            timeout: timeout
        });
};
