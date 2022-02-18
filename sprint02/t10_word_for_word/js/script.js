function clean(string) {
    return string
        .split(' ')
        .filter(function(item, pos, self) {
            return self.indexOf(item) == pos
        })
        .join(' ')
        .replace(/\s\s+/g, ' ')
        .trim()
}

function addWords(obj, wrds) {
    obj.words += ' ' + wrds
    obj.words = clean(obj.words)
    return obj
}

function removeWords(obj, wrds) {
    wrds = clean(wrds)
    wordArray = wrds.split(' ');
    for (let i = 0; i < wordArray.length; i++) {
        obj.words = obj.words.replace(wordArray[i], '')
    }
    obj.words = clean(obj.words)
    return obj
}

function changeWords(obj, str1, str2) {
    removeWords(obj, str1);
    addWords(obj, str2);
}

// const obj = {
//     words: 'newspapers newspapers  books magazines'
// };

// console.log(obj); // {words: "newspapers newspapers  books magazines"}

// addWords(obj, 'radio newspapers   ');
// console.log(obj); // {words: "newspapers books magazines radio"}

// removeWords(obj, 'newspapers   radio');
// console.log(obj); // {words: "books magazines"}

// changeWords(obj, 'books radio  magazines', 'tv internet');
// console.log(obj); // {words: "tv internet"}