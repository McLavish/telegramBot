module.exports = (rawText) => {

    if (rawText.indexOf("You:") !== -1)
        rawText = rawText.substring(0, rawText.indexOf("You:"));

    if (rawText.indexOf("Me:") !== -1)
        rawText = rawText.substring(0, rawText.indexOf("Me:"));

    if (!rawText.endsWith("\n"))
        rawText += '\n';

    else if (rawText.endsWith("\n\n"))
        rawText.replace("\n\n","\n");

    if(rawText.includes("<|endoftext|>"))
        rawText.replace("<|endoftext|>","");

    //rawText = rawText.endsWith("\n") ? rawText.substring(0, rawText.length - 1) : rawText;
    return rawText;
}