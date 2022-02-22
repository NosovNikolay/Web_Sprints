module.exports = {
    checkDivision(start = 1, end = 60) {
        // start == undefined ? 1 : start
        // end == undefined ? 60 : end
        for (let i = start; i < end + 1; i++) {
            let output = ''
            if (!(i & 1)) {
                output += 'is divisible by 2'
            }
            if (i % 3 == 0) {
                if (output.length > 0) {
                    output += ', is divisible by 3'
                } else {
                    output = 'is divisible by 3'
                }
            }

            if (i % 10 == 0) {
                output += ', is divisible by 10'
            }
            console.log(`The nubmer ${i} - ${output}`)
        }
    }

}