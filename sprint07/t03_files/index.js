const http = require('http');

const url = require("url");

const {resolveRequest, renderPage} = require('./resolver')

const {PORT, HOSTNAME} = require("./constants");

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
    const ctx = await parseRequest(req)

    resolveRequest(req, res, ctx)

    if (ctx.location.pathname !== '/') {
        res.statusCode = 302
        res.setHeader("Location", '/')
        res.end()
        return
    }

    res.statusCode = 200
    res.setHeader("Content-Type", 'text/html')
    res.end(await renderPage())
}

http.createServer(listener).listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
