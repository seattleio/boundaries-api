var config = {
  development: {
    port: 3434
  },
  production: {
    port: process.env.PORT
  }
}

module.exports = config[process.env.NODE_ENV || 'development']
