'use strict'

let LLData = require('./LLData');

module.exports.LList = class LList {
    constructor() {
        this.head = null
        this.length = 0
    }
    getFirst() {
        return this.head
    }
    getLast() {
        for (let q = this.head; q; q = q.next) {
            if (!q.next) {
                return q;
            }
        }
        return null;
    }
    add(value) {
        let node = new LLData(value)
        if (this.length === 0) {
            this.head = node
        } else {
            let q = this.head
            while (q.next) {
                q = q.next
            }
            q.next = new LLData(value)
        }
        this.length++
    }
    addFromArray(arrayOfData) {
        arrayOfData.forEach(element => this.add(element))
    }
    remove(value) {
        if (!this.head) {
            return false
        }
        for (let q = this.head; q.next; q = q.next) {
            if (q.next.data === value) {
                q.next = q.next.next
                this.length--
                return true
            }
        }
        return false
    }
    removeAll(value) {
        if (!this.head) {
            return
        }
        for (let q = this.head; q.next; q = q.next) {
            if (q.next.data === value) {
                q.next = q.next.next
                this.length--
            }
        }
    }
    contains(value) {
        return [...this].includes(value)
    }
    clear() {
        this.head = null
    }
    count() {
        return this.length
    }
    toString() {
        return [...this].join(", ")
    }
    [Symbol.iterator] = function* () {
        for (let q = this.head; q; q = q.next) {
            yield q.value
        }
    }
    filter(callback) {
        return [...this].filter(callback);
    }
}
