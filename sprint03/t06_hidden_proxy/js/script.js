'use strict';

let validator = {
    set(target, PropertyKey, receiver) {
        if (PropertyKey === 'age') {
            if (!Number.isInteger(receiver)) {
                throw new TypeError('The age is not an integer');
            }
            if (receiver < 0 || receiver > 200) {
                throw new RangeError('The age is invalid');
            }
        }
        target[PropertyKey] = receiver;
        return true;
    },
    get: function(target, PropertyKey) {
        if (PropertyKey in target) {
            console.log(`Trying to access the property \'${PropertyKey}\'...`);
            return target[PropertyKey];
        } else {
            throw new Error(`Property ${PropertyKey} do not exist...`);
        }
    }
}

let person = new Proxy({}, validator);
person.age = 100;
// Setting value '100' to 'age'
console.log(person.age);
// Trying to access the property 'age'...
// 100
person.gender = "male";
// Setting value 'male' to 'gender'

//person.age = 'young';
// Uncaught TypeError: The age is not an integer

person.age = 199;
// Uncaught RangeError: The age is invalid

// console.log(person.size);
// script.js:21 Uncaught Error: Property size do not exist...