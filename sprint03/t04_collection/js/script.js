'use strict';

class GuestList {
    guestList = new WeakSet();

    add(guest) {
        this.guestList.add(guest);
    }
    isInvited(guest) {
        return this.guestList.has(guest);
    }
    removeGuest(guest) {
        this.guestList.delete(guest);
    }
}

class Menu {
    menu = new Map();
    add(name, price) {
        if (!this.menu.has(name)) {
            this.menu.set(name, price);
        }
    }
    printAll() {
        this.menu.forEach((value, key) => console.log(`${key}, \$${value}`));
    }
}

class BankVault {
    vault = new WeakMap();

    add(key, box) {
        this.vault.set(key, box);
    }
    isPresent(key) {
        return this.vault.has(key);
    }
    remove(key) {
        this.vault.delete(key);
    }
}

class Coins {
    coins = new Set();
    add(name) {
        this.coins.add(name);
    }
    printAll() {
        let res = '';
        this.coins.forEach(value => res += value + ' ');
        console.log(`Coins collection: ${res}`);
    }
}

const guestList = new GuestList();
let mary = { name: 'Mary' },
    sof = { name: 'Sofie' },
    mark = { name: 'Mark' },
    ant = { name: 'Antony' },
    val = { name: 'Valery' }
guestList.add(mary);
guestList.add(sof);
guestList.add(mark);
guestList.add(sof);
guestList.add(ant);
guestList.add(val);
console.log(guestList.guestList);

console.log(guestList.isInvited(mary));
console.log(guestList.isInvited("me"));

guestList.removeGuest(mark);
console.log(guestList.guestList);

console.log(' ');

const menu = new Menu();
menu.add("Cookies", 2);
menu.add("Salad", 5.5);
menu.add("Ribs", 8);
menu.add("Ribs", 234);
menu.add("Steak", 12.5);
menu.add("Pie", 6.99);
menu.printAll();

console.log(' ');

const bank = new BankVault();
let key1 = { credentials: '1234' },
    key2 = { credentials: '345' },
    key3 = { credentials: 'Ma675985798rk' },
    key4 = { credentials: 'Ant6794679756ony' },
    key5 = { credentials: '9999999' }
bank.add(key1, 'Gold');
bank.add(key2, 'Documents');
bank.add(key3, 'Human head');
bank.add(key1, 'trash, steal gold');
bank.add(key4, 'silver spoons');
bank.add(key5, 'legal papers');
console.log(bank.vault);

console.log(bank.isPresent(key1));
console.log(bank.isPresent({ credentials: '1234' }));

bank.remove(key3);
console.log(bank.vault);

console.log(' ');

const coins = new Coins();
coins.add("coin1");
coins.add("coin1");
coins.add("coin2");
coins.add("coin3");
coins.add("coin1");
coins.printAll();
console.log(coins.coins.size);

console.log(this)