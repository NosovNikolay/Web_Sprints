const {DIR} = require("./constants");
const fs = require("fs");

module.exports = class FileList {
    getList() {
        return fs.readdirSync(DIR)
    }

    hasFiles() {
        return !!this.getList().length
    }

    getHTMLList() {
        return '<ul>' + this.getList().reduce((acc, file) =>
            `${acc}<li><a href="/select-file?file=${file}">${file}</a></li>`, '</ul>')
    }
}
