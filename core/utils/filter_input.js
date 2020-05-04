/**
 * Remove the tilde as it would bug out all the program
 * @param {string} input
 * @param {string} separatorChar
 * @returns {string}
 */
module.exports = (input, separatorChar) => {
    return input.split(separatorChar).join("");
};
