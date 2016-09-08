var config = {
  development: {
    url: 'http://127.0.0.1',
    port: 3434
  },
  production: {
    url: 'http://boundaries-api.seattle.io',
    port: process.env.PORT
  }
}

module.exports = config[process.env.NODE_ENV || 'development']
