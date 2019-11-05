// This is a script to fetch an input text and translate it to pig-latin. 
// Hauk-Morten H. Lykke November 2019


const inText = document.getElementById('input');

const vowels = "aeiouy";
const punctutation = ".,?!;:"

const startsWithVowel = (word) => vowels.includes(word[0]);

const endsWithPunctuation = (word) => {
    return punctutation.includes(word.slice(-1))
}

const translateWord = (word) => {
    // Translate one single word to pig-latin
    let punctuationEnd = "";
    let validWord = word;

    // Cut away punctuation if present
    if (endsWithPunctuation(word)) {
        punctuationEnd = word.slice(-1);
        validWord = word.slice(0, -1);
    }

    // Apply translation, append punctuation again
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

const translateButton = document.getElementById("translate_button")

translateButton.onclick = () => {
    // Split up text into words, apply translation to word array, join together text and display.
    const translatedArray = inText.value.split(" ").map(translateWord);
    const translatedText = translatedArray.join(" ");
    document.getElementById("output").innerText = translatedText;
}