function checkBrackets(str) {
    if (!str || typeof str !== 'string')
        return -1;

    let left = 0;
    let right = 0;
    let result = 0;

    if (!str)
        return -1;

    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(')
            left++;
        else if (str[i] === ')') {
            right++;
            if (right > left) {
                result++;
                right = 0;
                left = 0;
            }
        }
    }
    if (left === 0 && right === 0 && result === 0)
        result = -1;
    else if (left > right)
        result += left - right;
    return result
}

// console.log(checkBrackets('1)()(())2(()'));
// console.log(checkBrackets(NaN));