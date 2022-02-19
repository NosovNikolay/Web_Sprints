String.prototype.removeDuplicates = function removeDuplicates() {
    let strArr = this.replace(/\s+/g, ' ').trim().split(" ")
    return strArr.filter((item, pos) => strArr.indexOf(item) == pos).join(" ")
};