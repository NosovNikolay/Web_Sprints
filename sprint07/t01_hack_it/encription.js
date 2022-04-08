const crypto = require('crypto');

const hashPassword = async (password, salt) => (await new Promise((res, rej) => {
    crypto.pbkdf2(password, new TextEncoder().encode(salt), 1000, 64, 'sha512', (err, hash) =>
        err ? rej(err) : res(hash))
})).toString('hex')

module.exports = {
    hashPassword
}
