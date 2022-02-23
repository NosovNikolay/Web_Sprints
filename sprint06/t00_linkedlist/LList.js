const { LLData } = require("./LLData");

exports.LList =
    class LList {
        constructor() {
            this.head = null
            this.length = 0
        }
        addFromArray(array) {

        }
        add(value) {
            let node = new LLData(value); //creating the node using class Node
            if (this.length === 0) {
                this.head = node;
            } else {
                let current = this.head;
                while (current.next) {
                    current = current.next;
                }
                current.next = new LLData(value);
            }
            this.length++;
        }
    }