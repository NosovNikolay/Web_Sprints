console.log("Enter 'q' to exit")
let prev = 1;
while (true) {
    let input = prompt(`Previous result: ${prev}. Enter a new number:`);
    if (input === 'q') break;
    if (+input && !isNaN(+input) && +input > 0)
        prev += (+input);
    else
        console.error('Invalid number!');

    if (prev > 10000) prev = 1;
}