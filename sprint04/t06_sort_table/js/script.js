'use strict';

let rows = 3;
let cols = 10;
let data = ['Name', 'Strength', 'Age',
    "Black Panther", '66', '53',
    'Captain America', '79', '137',
    'Captain Marvel', '97', '26',
    'Hulk', '80', '49',
    'Iron Man', '88', '48',
    'Spider-Man', '78', '16',
    'Thanos', '99', '1000',
    'Thor', '95', '1000',
    'Yon-Rogg', '73', '52'
];

document.getElementById('placeholder').innerHTML = '';
tableCreate();

function tableCreate() {
    let ph, tbl, tblBody, row, cell, cellText, id = 0;

    ph = document.getElementById('placeholder');
    tbl = document.createElement('table');
    tblBody = document.createElement('tbody');

    for (let j = 0; j < cols; ++j) {
        row = document.createElement('tr');
        for (let i = 0; i < rows; ++i) {
            cell = document.createElement('td');

            cell.setAttribute('id', id);
            if (id >= 0 && id <= 2)
                cell.setAttribute('onclick', `tableSort(${id})`);
            cellText = document.createTextNode(`${data[id++]}`);

            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    ph.appendChild(tbl);
    tbl.setAttribute('id', 'table');
}

let tableSort = (n) => {
    let tbl, rows, switching, shouldSwitch,
        i, row1, row2, direction, switchCount = 0;

    tbl = document.getElementById('table');
    switching = true;
    direction = 'asc';
    while (switching) {
        switching = false;
        rows = tbl.rows;
        for (i = 1; i < (rows.length - 1); ++i) {
            shouldSwitch = false;
            row1 = rows[i].getElementsByTagName('td')[n].innerHTML.toLowerCase();
            row2 = rows[i + 1].getElementsByTagName('td')[n].innerHTML.toLowerCase();
            if ((direction === 'asc' && tableSortComparator(row1, row2)) ||
                (direction === 'desc' && tableSortComparator(row2, row1))) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchCount++;
        } else if (switchCount === 0 && direction === "asc") {
            direction = "desc";
            switching = true;
        }
    }
    showMessage(n, direction);
}
let tableSortComparator = (row1, row2) => {
    let num1 = Number.parseFloat(row1);
    let num2 = Number.parseFloat(row2);

    if (isFloatOrInteger(num1) && isFloatOrInteger(num2)) {
        return num1 > num2;
    }
    return row1 > row2;
}

function isFloatOrInteger(n) {
    return n === +n;
}

function showMessage(n, dir) {
    let msg, name;

    msg = document.getElementById('notification');
    name = document.getElementById(n).innerHTML;
    msg.innerHTML = `Sorting by ${name}, order: ${dir.toUpperCase()}`;
}