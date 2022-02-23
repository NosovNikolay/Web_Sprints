/*
  Task name: LinkedList
*/

const { LList } = require("./LList");

const list = new LList();

list.add(10);
list.add(11);
list.add(12);
list.add(13);
//list.addFromArray([100, 1, 2, 3, 100, 4, 5, 100]);
//console.log(list)
let current = list.head
console.log(current)
while (current.next) {
    current = current.next;
    console.log(current)
}
// const onlySmallList = list.filter((data) => {
//     return data < 18;
// });

// let sumOfAll = 0;

// for (const data of list) {
//     sumOfAll += data;
// }

// console.log([...list]); // [ 100, 1,   2,  3, 100, 4, 5, 100, 10 ]
// console.log([...onlySmallList]); // [ 1, 2, 3, 4, 5, 10 ]
// console.log(sumOfAll); // 325
// console.log(list.contains(10)); // true
// console.log(list.contains(22)); // false

// list.clear()

// console.log([...list]); // []