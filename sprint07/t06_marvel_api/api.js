const axios = require('axios')
const { API_KEY_PUB, API_KEY } = require('./constants')
const crypto = require('crypto')

const api = axios.create({
  baseURL: 'https://gateway.marvel.com:443/v1/public/',
})

api.interceptors.request.use(config => {
  if (!config.params) config.params = {}
  config.params.ts = +new Date()
  config.params.apikey = API_KEY_PUB
  config.params.hash = crypto.createHash('md5').update(`${config.params.ts}${API_KEY}${config.params.apikey}`).digest('hex')
  return config
})

module.exports = {
  api
}
