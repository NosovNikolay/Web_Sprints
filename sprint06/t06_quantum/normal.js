'use strict';

module.exports.calculateTime = function calculateTime() {
    let date = new Date(1939, 1, 1)
    let now = new Date()

    Date.prototype.years = () => { return now.getFullYear() - date.getFullYear() }
    Date.prototype.months = () => { return now.getMonth() - date.getMonth() }
    Date.prototype.days = () => { return now.getDate() - date.getDate() }

    return date;
}