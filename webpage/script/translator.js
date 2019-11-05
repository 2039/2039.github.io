const inText = document.getElementById('input');

const vowels = "aeiouy";
const punctutation = ".,?!;:"

const startsWithVowel = (word) => vowels.includes(word[0]);

const endsWithPunctuation = (word) => {
    return punctutation.includes(word.slice(-1))
}

const translateWord = (word) => {
    let punctuationEnd = "";
    let validWord = word;

    if (endsWithPunctuation(word)) {
        punctuationEnd = word.slice(-1);
        validWord = word.slice(0, -1);
    }
    if (startsWithVowel(validWord)) {
        var newWord = validWord + "'ay" + punctuationEnd;

    } else {
        var newWord = validWord.slice(1) + validWord.charAt(0) + "ay" + punctuationEnd;
    }
    // Correct capitalization if messed up
    if (newWord != newWord.toLowerCase()) {
        newWord = newWord.charAt(0).toUpperCase() + newWord.slice(1).toLowerCase();
    }
    return newWord;
}


// // const testText = "This is a test sentence."
// const translatedArray = testText.split(" ").map(translateWord);
//
// const translatedText = translatedArray.join(" ");
// console.log(translatedText)
const translateButton = document.getElementById("translate_button")

translateButton.onclick = () => {
    const translatedArray = inText.value.split(" ").map(translateWord);
    const translatedText = translatedArray.join(" ");
    document.getElementById("output").innerText = translatedText;
}