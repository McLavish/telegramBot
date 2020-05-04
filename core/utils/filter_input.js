module.exports = (input, separatorChar) => {
    //Remove the tilde as it would bug out all the program
    return input.split(separatorChar).join("");
};
