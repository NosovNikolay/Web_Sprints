'use strict';

let houseMixin = {

    wordReplace: function(word, replacement) {
        let words = this.description.split(' ');
        let result = '';
        words.forEach(value => {
            result += value === word ? replacement : value;
            result += ' ';
        });
        this.description = result.trim();
    },
    wordInsertAfter(word, insertion) {
        let words = this.description.split(' ');
        let result = '';
        words.forEach(value => {
            result += value + ' ';
            result += value === word ? insertion + ' ' : '';
        });
        this.description = result.trim();
    },
    wordDelete(word) {
        let res = this.description.split(word);
        this.description = res.join('');
    },

    wordEncrypt() {
        let chars = Object.assign([], this.description);
        let result = '';
        chars.forEach(c => {
            result += String.fromCharCode(c.charCodeAt(0) - 13);
        });
        this.description = result;
    },
    wordDecrypt() {
        let chars = Object.assign([], this.description);
        let result = '';
        chars.forEach(c => {
            result += String.fromCharCode(c.charCodeAt(0) + 13);
        });
        this.description = result;
    }
}

const house = new HouseBuilder('88 Crescent Avenue',
    'Spacious town house with wood flooring, 2-car garage, and a back patio.',
    'J. Smith', 110, 5);
Object.assign(house, houseMixin);
console.log(house.getDaysToBuild());
// 220
console.log(house.description);
// Spacious town house with wood flooring, 2-car garage, and a back patio.
house.wordReplace("wood", "tile");
console.log(house.description);
// Spacious town house with tile flooring, 2-car garage, and a back patio.
house.wordDelete("town ");
console.log(house.description);
// Spacious house with tile flooring, 2-car garage, and a back patio.
house.wordInsertAfter("with", "marble");
console.log(house.description);
// Spacious house with marble tile flooring, 2-car garage, and a back patio.
house.wordEncrypt();
console.log(house.description);
// Fcnpvbhf ubhfr jvgu zneoyr gvyr sybbevat, 2-pne tnentr, naq n onpx cngvb.
house.wordDecrypt();
console.log(house.description);
// Spacious house with marble tile flooring, 2-car garage, and a back patio.