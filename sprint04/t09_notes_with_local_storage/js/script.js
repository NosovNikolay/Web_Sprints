let createP = (str) => {
    let p = document.createElement('p');
    p.textContent = str;
    list.append(p);
}

let getStorage = () => {
    if (window.localStorage.length === 0) createP('[Empty]');
    for (let i = 0; i < window.localStorage.length; i += 1) {
        createP(`--> ${window.localStorage.getItem(i)}`)
    }
}

let addToStorage = () => {

    let children = document.querySelectorAll('#cookiesList p');
    if (children.item(0) != null && children.item(0).textContent === '[Empty]') {
        children.item(0).textContent = ''
    }

    let textValue = input.value.trim();
    if (input.value === '' || textValue.length === 0) {
        return;
    }
    window.localStorage.setItem(window.localStorage.length, textValue)
    createP(`--> ${textValue}`);
    input.value = '';
}


let clearStorage = () => {
    if (!confirm('are you sure?')) return

    document.querySelectorAll('#cookiesList p').forEach(p => p.remove());
    createP('[Empty]');

    window.localStorage.clear()
}

let input = document.getElementById('textArea')
let list = document.getElementById('cookiesList')

getStorage()