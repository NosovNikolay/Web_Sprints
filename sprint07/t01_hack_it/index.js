const http = require('http');
const path = require("path");
const fs = require("fs");
const url = require("url");
const {removeSession, updateSession, getSession} = require("./session");
const {hashPassword} = require("./encription");

const HOSTNAME = '127.0.0.1';
const PORT = 3000;

const FILE_TYPES = {
    "html": "text/html",
    "htm": "text/html",
    "shtml": "text/html",
    "css": "text/css",
    "xml": "text/xml",
    "gif": "image/gif",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "application/x-javascript",
    "atom": "application/atom+xml",
    "rss": "application/rss+xml",
    "mml": "text/mathml",
    "txt": "text/plain",
    "jad": "text/vnd.sun.j2me.app-descriptor",
    "wml": "text/vnd.wap.wml",
    "htc": "text/x-component",
    "png": "image/png",
    "tif": "image/tiff",
    "tiff": "image/tiff",
    "wbmp": "image/vnd.wap.wbmp",
    "ico": "image/x-icon",
    "jng": "image/x-jng",
    "bmp": "image/x-ms-bmp",
    "svg": "image/svg+xml",
    "webp": "image/webp",
    "jar": "application/java-archive",
    "war": "application/java-archive",
    "ear": "application/java-archive",
    "hqx": "application/mac-binhex40",
    "doc": "application/msword",
    "pdf": "application/pdf",
    "ps": "application/postscript",
    "eps": "application/postscript",
    "ai": "application/postscript",
    "rtf": "application/rtf",
    "xls": "application/vnd.ms-excel",
    "ppt": "application/vnd.ms-powerpoint",
    "wmlc": "application/vnd.wap.wmlc",
    "kml": "application/vnd.google-earth.kml+xml",
    "kmz": "application/vnd.google-earth.kmz",
    "7z": "application/x-7z-compressed",
    "cco": "application/x-cocoa",
    "jardiff": "application/x-java-archive-diff",
    "jnlp": "application/x-java-jnlp-file",
    "run": "application/x-makeself",
    "pl": "application/x-perl",
    "pm": "application/x-perl",
    "prc": "application/x-pilot",
    "pdb": "application/x-pilot",
    "rar": "application/x-rar-compressed",
    "rpm": "application/x-redhat-package-manager",
    "sea": "application/x-sea",
    "swf": "application/x-shockwave-flash",
    "sit": "application/x-stuffit",
    "tcl": "application/x-tcl",
    "tk": "application/x-tcl",
    "der": "application/x-x509-ca-cert",
    "pem": "application/x-x509-ca-cert",
    "crt": "application/x-x509-ca-cert",
    "xpi": "application/x-xpinstall",
    "xhtml": "application/xhtml+xml",
    "zip": "application/zip",
    "bin": "application/octet-stream",
    "exe": "application/octet-stream",
    "dll": "application/octet-stream",
    "deb": "application/octet-stream",
    "dmg": "application/octet-stream",
    "eot": "application/octet-stream",
    "iso": "application/octet-stream",
    "img": "application/octet-stream",
    "msi": "application/octet-stream",
    "msp": "application/octet-stream",
    "msm": "application/octet-stream",
    "mid": "audio/midi",
    "midi": "audio/midi",
    "kar": "audio/midi",
    "mp3": "audio/mpeg",
    "ogg": "audio/ogg",
    "ra": "audio/x-realaudio",
    "3gpp": "video/3gpp",
    "3gp": "video/3gpp",
    "mpeg": "video/mpeg",
    "mpg": "video/mpeg",
    "mov": "video/quicktime",
    "flv": "video/x-flv",
    "mng": "video/x-mng",
    "asx": "video/x-ms-asf",
    "asf": "video/x-ms-asf",
    "wmv": "video/x-ms-wmv",
    "avi": "video/x-msvideo",
    "m4v": "video/mp4",
    "mp4": "video/mp4"
}

const EXCLUDED_FILES = [
    '/index.js',
    '/package.json',
]

const getFileTypeByExt = ext => FILE_TYPES[ext.replace(/^\./, '').toLowerCase()]

const prepareUrl = url => {
    if (url === '/') return '/index.html'
    if (EXCLUDED_FILES.includes(url)) return null
    return decodeURI(url)
}

const readFile = async filename =>
    new Promise((res, rej) =>
        fs.readFile(filename, 'utf8', (err, data) =>
            err ? rej(err) : res(data)))

const resolveOutput = async search => {
    if (!search) return null
    const filepath = path.join(__dirname, search)
    const ext = path.extname(filepath) || '.html'
    try {
        return {
            body: await readFile(path.parse(filepath).name + ext),
            contentType: getFileTypeByExt(ext)
        }
    } catch (e) {
        if (e.code === 'ENOENT') return null
        console.log(e)
        return null
    }
}

const entriesToObject = entries => {
    const result = {}
    for (const [key, value] of entries)
        result[key] = value;
    return result;
}

const parseRequest = async req => {
    const location = new url.URL(req.url, `${req.protocol}://${req.headers.host}`)
    if (req.method === 'GET')
        return {
            data: entriesToObject(location.searchParams),
            location
        }
    const buffers = [];
    for await (const chunk of req)
        buffers.push(chunk);
    return {
        location,
        data: entriesToObject(new URLSearchParams(Buffer.concat(buffers).toString()).entries())
    }
}

const listener = async (req, res) => {
    const {location, data: newSessionData} = await parseRequest(req)

    if (location.pathname === '/clear') removeSession(req.socket.remoteAddress)

    const isHacking = !newSessionData.salt && newSessionData.password && getSession(req.socket.remoteAddress)?.salt
    const isSaving = newSessionData.salt && newSessionData.password

    let isHacked = false

    if (isSaving)
        updateSession(req.socket.remoteAddress, {
            salt: newSessionData.salt,
            hash: await hashPassword(newSessionData.password, newSessionData.salt)
        })

    const sessionData = getSession(req.socket.remoteAddress)

    if (isHacking && sessionData?.salt)
        isHacked = (await hashPassword(newSessionData.password, sessionData.salt)) === sessionData.hash

    if (isHacked) removeSession(req.socket.remoteAddress)

    if (location.pathname !== '/') {
        res.statusCode = 302
        res.setHeader("Location", '/')
        res.end()
        return
    }

    let data
    if (isSaving || (isHacking && !isHacked)) {
        data = await resolveOutput('/hackTemplate.html')
        data.body = data.body
            .replace('{{status}}', isSaving ? '' : '<p class="status">Access denied!</p>')
            .replace('{{hash}}', sessionData.hash)
    } else {
        data = await resolveOutput('/createPasswordTemplate.html')
        data.body = data.body
            .replace('{{status}}', isHacked ? '<p class="status">Hacked!</p>' : '')
    }
    res.statusCode = 200
    res.setHeader("Content-Type", data.contentType)
    res.end(data.body)
}

http.createServer(listener).listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
