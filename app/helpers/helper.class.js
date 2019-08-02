var crypto = require('crypto')

class HelperClass {
  hash (text, algorithm = 'sha256', enncoding = 'hex') {
    var hash = crypto.createHash(algorithm).update(text).digest(enncoding)
    return hash
  }
}

module.exports = HelperClass
