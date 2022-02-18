function checkDivision(beginRange, endRange) {
    for (i = beginRange; i <= endRange; i++) {
        let message
        if (!(i & 1))
            message = ' is even'
        if (i % 3 === 0) {
            if (message)
                message += ', is a multiple of 3'
            else
                message = ' is a multiple of 3'
        }
        if (i % 10 === 0) {
            message += ', is a multiple of 10'
        }
        if (!message)
            message = ' -'
        console.log(i + message)
    }
}

let begin = +prompt('Enter the number for the beginning of a range', '1')
let end = +prompt('Enter the number for the beginning of a range', '100')

checkDivision(begin, end)