module.exports = (rawText) => {

    if (rawText.indexOf("you:") !== -1)
        rawText = rawText.substring(0, rawText.indexOf("You:"));

    if (rawText.indexOf("Me:") !== -1)
        rawText = rawText.substring(0, rawText.indexOf("Me:"));

    if (!rawText.endsWith("\n"))
        rawText += '\n';

    //rawText = rawText.endsWith("\n") ? rawText.substring(0, rawText.length - 1) : rawText;
    return rawText;
}