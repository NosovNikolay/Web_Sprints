const File = require("./File");
const FileList = require("./FileList");
const fs = require("fs");
const path = require("path");

const state = {
    fileList: new FileList(),
    selectedFile: null
}

const readFile = async filename =>
    new Promise((res, rej) =>
        fs.readFile(filename, 'utf8', (err, data) =>
            err ? rej(err) : res(data)))

const interpolate = (str, data) => Object.entries(data).reduce((acc, [k, v]) => acc.replaceAll(`{{${k}}}`, v), str)

const renderPage = async () => interpolate(await readFile(path.join(__dirname, 'fileViewTemplate.html')), {
    files: state.fileList.getHTMLList(),
    display: state.selectedFile ? 'auto' : 'none',
    fileName: state.selectedFile?.name ?? '',
    fileContent: state.selectedFile?.read() ?? ''
})

const createFileHandler = (req, res, ctx) => {
    const file = new File(ctx.data.filename)
    file.write(ctx.data.content)
    if (!file.justCreated) state.selectedFile = file
}

const selectFileHandler = (req, res, ctx) => {
    if (!ctx.data.file) return
    state.selectedFile = new File(ctx.data.file)
}

const deleteFileHandler = () => {
    if (!state.selectedFile) return
    state.selectedFile.delete()
    state.selectedFile = null
}

module.exports = {
    resolveRequest(req, res, ctx) {
        switch (ctx.location.pathname) {
            case '/create-file':
                return createFileHandler(req, res, ctx)
            case '/delete-file':
                return deleteFileHandler(req, res, ctx)
            case '/select-file':
                return selectFileHandler(req, res, ctx)
        }
    },
    renderPage
}
