const SESSION_STORAGE = {}

const updateSession = (key, data) => {
    SESSION_STORAGE[key] = data
}

const removeSession = key => {
    delete SESSION_STORAGE[key]
}

const getSession = key => SESSION_STORAGE[key]

module.exports = {
    updateSession,
    removeSession,
    getSession
}
