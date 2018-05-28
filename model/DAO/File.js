const CRUD = require('./CRUD')
const strings = require('../../config/strings')

class File extends CRUD {
  constructor () {
    super('file', 'file')
  }
  put (file) {
    file.file_id = CRUD.generateID()
    file.file_url = `${strings.host}/file/${file.file_id}`
    return new Promise((resolve, reject) => {
      this.db.query(`INSERT INTO ${this.table} SET ?`, [file], (err) => {
        if (err) reject(new Error(err.message))
        else {
          resolve(this.get(file.file_id))
        }
      })
    })
  }
}
module.exports = File
