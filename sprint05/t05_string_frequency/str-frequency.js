module.exports =
    class StrFrequency {
        constructor(str) {
            this.str = str
        }

        letterFrequencies() {
            if (!this.str) {
                return ''
            }
            let result = {}

            this.str.toUpperCase()
                .split('')
                .filter(letter => letter.match(/[A-Z]/g))
                .forEach(i => result[i] = (result[i] || 0) + 1)
            return result
        }

        wordFrequencies() {
            if (!this.str) {
                return { '': 1 }
            }
            let result = {};

            this.str.toUpperCase()
                .split(/[^A-Z]+/g)
                .filter(f => f !== '')
                .forEach(i => result[i] = (result[i] || 0) + 1)

            return result
        }

        reverseString() {
            if (!this.str)
                return ''
            return this.str.split('').reverse().join('')
        }

    }