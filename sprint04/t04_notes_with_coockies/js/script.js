let createP = (str) => {
    let p = document.createElement('p');
    p.textContent = str;
    list.append(p);
}

let addCookies = () => {
    let children = document.querySelectorAll('#cookiesList p');
    if (children.item(0) != null && children.item(0).textContent === '[Empty]') {
        children.item(0).textContent = ''
    }

    let expDate, textValue = input.value.trim();
    if (input.value === '' || textValue.length === 0) {
        return;
    }
    expDate = new Date();
    expDate.setDate(expDate.getDate() + 30);
    document.cookie = `${cookieCount}=${textValue};expires=${expDate.toUTCString()};path=/`;
    createP(`--> ${textValue}`);
    input.value = '';
    cookieCount++;
}


let clearCookies = () => {
    document.querySelectorAll('#cookiesList p').forEach(p => p.remove());
    createP('[Empty]');

    let all = document.cookie.split(';');
    for (let i in all)
        document.cookie = `${all[i].split('=')[0]}='';expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;

    cookieCount = 0;
}

let input = document.getElementById('aboba')
let list = document.getElementById('cookiesList')
let cookieCount = 0