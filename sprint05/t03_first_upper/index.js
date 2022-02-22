module.exports = {
    firstUpper(str) {
        if (str == null)
            return ''
        str = String(str).trim()
        first = String(str.charAt(0))
        if (RegExp(/^\p{L}/, 'u').test(first))
            return first.toUpperCase() + str.slice(1).toLowerCase()
        return str.toLowerCase()
    }
}