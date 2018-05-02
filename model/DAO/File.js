const CRUD = require('./CRUD')

class File extends CRUD {
  constructor () {
    super('file', 'file')
  }
}
module.exports = File
