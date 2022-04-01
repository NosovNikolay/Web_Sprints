module.exports.calculateTime = function calculateTime() {
    let date = new Date(1939, 1, 1)
    let now = new Date()

    let diff = (Math.abs(date) + Number(now)) / 7
    let quantumDate = new Date(Number(date) + Number(diff))

    let result = []
    result.push(quantumDate.getFullYear() - date.getFullYear())
    result.push(quantumDate.getMonth() - date.getMonth())
    result.push(quantumDate.getDate() - date.getDate())
    return result;
}